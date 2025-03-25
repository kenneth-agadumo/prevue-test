import { useEffect, useState, useRef } from "react";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, limit, getDocs, startAfter } from "firebase/firestore";

const PAGE_SIZE = 20;

const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const firstLoad = useRef(true);

  const fetchRestaurants = async (initialLoad = false) => {
    if (loading) return; // Prevent duplicate fetches
    try {
      setLoading(true);
      console.log("Fetching restaurants...");

      let q = query(
        collection(db, "restaurants"),
    
        limit(PAGE_SIZE)
      );

      if (lastDoc && !initialLoad) {
        q = query(collection(db, "restaurants"), orderBy("createdAt", "desc"), startAfter(lastDoc), limit(PAGE_SIZE));
      }

      const querySnapshot = await getDocs(q);
      const newRestaurants = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (initialLoad) {
        setRestaurants(newRestaurants); // Replace data on initial load
      } else {
        setRestaurants(prev => [...prev, ...newRestaurants]); // Append for pagination
      }

      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants(true);
  }, []);

  return { restaurants, loadMore: () => fetchRestaurants(), loading };
};

export default useRestaurants;
