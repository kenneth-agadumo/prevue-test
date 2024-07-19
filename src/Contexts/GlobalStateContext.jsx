import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { auth, db, storage } from "../firebaseConfig";

// Create a context
const GlobalStateContext = createContext();

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [userImageUrl, setUserImageUrl] = useState();
  const [restaurantId, setRestaurantId] = useState()
  const [restaurantImagesMap, setRestaurantImagesMap] = useState({});

  const restaurantRef = collection(db, 'restaurants');
  const rentalRef = collection(db, 'rentals'); // Assuming you have a rentals collection

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getDocs(restaurantRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRestaurants(filteredData);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();

    const unsubscribeRestaurants = onSnapshot(restaurantRef, (snapshot) => {
      const updatedRestaurants = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRestaurants(updatedRestaurants);
    });

    return () => unsubscribeRestaurants();
  }, [restaurantRef]);

  useEffect(() => {
    if (auth.currentUser) {
      const imageRef = ref(storage, `/userImages/${auth.currentUser.uid}/image-1`);
      getDownloadURL(imageRef)
        .then((url) => {
          setUserImageUrl(url);
        })
        .catch((error) => {
          console.error('Error getting download URL:', error);
        });
    }
  }, [auth.currentUser]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const data = await getDocs(rentalRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRentals(filteredData);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentals();

    const unsubscribeRentals = onSnapshot(rentalRef, (snapshot) => {
      const updatedRentals = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRentals(updatedRentals);
    });

    return () => unsubscribeRentals();
  }, [rentalRef]);


  useEffect(() => {
    const fetchImages = async () => {
      try {
        
        const restaurantsRef = ref(storage, 'restaurants');
        const imageFiles = await listAll(restaurantsRef);

        for (const imageFile of imageFiles.items) {
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
        console.log(restaurantImagesMap)
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <GlobalStateContext.Provider value={{
      restaurants, setRestaurants,
      rentals, setRentals,
      userData, setUserData,
      loading, setLoading,
      restaurantImagesMap,
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