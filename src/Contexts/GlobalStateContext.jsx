import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot, doc, getDoc, query, where } from 'firebase/firestore';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import {  managerAuth, db, storage } from "../firebaseConfig";

// Create a context
const GlobalStateContext = createContext();

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [userImageUrl, setUserImageUrl] = useState();
  const [restaurantId, setRestaurantId] = useState();
  const [restaurantImagesMap, setRestaurantImagesMap] = useState({});
  const [shortletImagesMap, setShortletImagesMap] = useState({});
  const [currentUserRole, setCurrentUserRole] = useState('')
  const [rememberMe, setRememberMe] = useState(false);

  const storedUser = localStorage.getItem('userData');
  const [userData, setUserData] = useState(storedUser ? JSON.parse(storedUser) : null);


  const restaurantRef = collection(db, 'restaurants');
  const shortletRef = collection(db, 'shortlets');
  const userRef = collection(db, 'users');

  // // Function to generate a 5-digit alphanumeric code
  // const generateAlphaNumericCode = (length = 5) => {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let result = '';
  //   for (let i = 0; i < length; i++) {
  //     const randomIndex = Math.floor(Math.random() * characters.length);
  //     result += characters[randomIndex];
  //   }
  //   return result;
  // };

  // // Function to generate a custom ID based on name and userId
  // const generateCustomId = (name, userId) => {
  //   const formattedName = name.trim().toLowerCase().replace(/\s+/g, '-'); // Format propertyName
  //   const uniqueCode = generateAlphaNumericCode(); // Generate the 5-digit alphanumeric code
  //   return `${formattedName}-${uniqueCode}-${userId}`; // Combine propertyName, unique code, and userId
  // };


  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'userData') {
        setUserData(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [])


  

  const fetchFilteredData = async (type, dataField, condition, value) => {

    let collectionRef ;

    
    switch (type) { 
      case 'restaurants': 
        collectionRef = restaurantRef
        break; 
      case 'shortlets': 
        collectionRef = shortletRef
        break; 
      default: 
        collectionRef = userRef
    }
    
    // const filteredQuery = query(collectionRef, where("attributes", "array-contains", "Featured"));
    const filteredQuery = query(collectionRef, where(dataField, condition, value));
    const querySnapshot = await getDocs(filteredQuery);
  
    const dataMap = {};
    querySnapshot.forEach((doc) => {
      dataMap[doc.id] = doc.data();
    });
  
    return dataMap;
  };



  useEffect(() => {
    const fetchUserImage = async () => {
      if (managerAuth.currentUser) {
        const imageRef = ref(storage, `/userImages/${managerAuth.currentUser.uid}/image-1`);

        try {
          const url = await getDownloadURL(imageRef);
          setUserImageUrl(url);
        } catch (error) {
          if (error.code === 'storage/object-not-found') {
            setUserImageUrl('/user.png'); // Set default image if not found
          } else {
            console.error('Error getting download URL:', error);
          }
        }
      }
    };

    fetchUserImage();
  }, [managerAuth.currentUser]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const restaurantImagesMap = {};
        const shortletImagesMap = {};

        // Fetching restaurant images
        const restaurantsRef = ref(storage, 'restaurants');
        const restaurantImageFiles = await listAll(restaurantsRef);

        for (const imageFile of restaurantImageFiles.items) {
          const downloadURL = await getDownloadURL(imageFile);
          const imageName = imageFile.name;

          // Assuming the image name follows the convention restaurantId-imageName
          const [restaurantId, ...imageNameParts] = imageName.split('-');
          const imageNameWithoutId = imageNameParts.join('-');

          // Fetch the restaurant document to get restaurant data if needed
          const restaurantDocRef = doc(db, 'restaurants', restaurantId);
          const restaurantDoc = await getDoc(restaurantDocRef);

          if (restaurantDoc.exists()) {
            const restaurantData = restaurantDoc.data();

            // Initialize the array if it doesn't exist
            if (!restaurantImagesMap[restaurantId]) {
              restaurantImagesMap[restaurantId] = {
                ...restaurantData,
                images: []
              };
            }

            // Add the image URL to the restaurant's images array
            restaurantImagesMap[restaurantId].images.push({
              name: imageNameWithoutId,
              url: downloadURL
            });
          }
        }

        setRestaurantImagesMap(restaurantImagesMap);

        // Fetching shortlet images
        const shortletsRef = ref(storage, 'shortlets');
        const shortletImageFiles = await listAll(shortletsRef);

        for (const imageFile of shortletImageFiles.items) {
          const downloadURL = await getDownloadURL(imageFile);
          const imageName = imageFile.name;

          // Assuming the image name follows the convention shortletId-imageName
          const [shortletId, ...imageNameParts] = imageName.split('-');
          const imageNameWithoutId = imageNameParts.join('-');

          // Fetch the shortlet document to get shortlet data if needed
          const shortletDocRef = doc(db, 'shortlets', shortletId);
          const shortletDoc = await getDoc(shortletDocRef);

          if (shortletDoc.exists()) {
            const shortletData = shortletDoc.data();

            // Initialize the array if it doesn't exist
            if (!shortletImagesMap[shortletId]) {
              shortletImagesMap[shortletId] = {
                ...shortletData,
                images: []
              };
            }

            // Add the image URL to the shortlet's images array
            shortletImagesMap[shortletId].images.push({
              name: imageNameWithoutId,
              url: downloadURL
            });
          }
        }

        setShortletImagesMap(shortletImagesMap);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchAll();
  }, []);

  return (
    <GlobalStateContext.Provider value={{
      restaurantImagesMap,
      shortletImagesMap,
      userImageUrl,
      currentUserRole,
      userData,
      rememberMe, 
      setRememberMe,
      setUserData,
      setCurrentUserRole,
      fetchFilteredData,
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the GlobalStateContext
export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
