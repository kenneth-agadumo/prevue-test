import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { auth, db, storage } from "../firebaseConfig";

// Create a context
const GlobalStateContext = createContext();

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [shortlets, setShortlets] = useState([]);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [userImageUrl, setUserImageUrl] = useState();
  const [restaurantId, setRestaurantId] = useState();
  const [restaurantImagesMap, setRestaurantImagesMap] = useState({});
  const [shortletImagesMap, setShortletImagesMap] = useState({});

  const restaurantRef = collection(db, 'restaurants');
  const shortletRef = collection(db, 'shortlets'); // Assuming you have a shortlets collection

  useEffect(() => {
    const fetchUserImage = async () => {
      if (auth.currentUser) {
        const imageRef = ref(storage, `/userImages/${auth.currentUser.uid}/image-1`);
        
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
  }, [auth.currentUser]);

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
    
      loading, setLoading,
      restaurantImagesMap,
      shortletImagesMap,
      userImageUrl
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the GlobalStateContext
export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
