import { useEffect, useState, useRef } from "react";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, limit, getDocs, startAfter } from "firebase/firestore";

const PAGE_SIZE = 20; // Adjust page size based on performance

const useShortlets = () => {
  const [shortlets, setShortlets] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const firstLoad = useRef(true);

  const fetchShortlets = async (initialLoad = false) => {
    if (loading) return; // Prevent duplicate fetches

    try {
      setLoading(true);
      console.log("Fetching shortlets...");

      let q = query(
        collection(db, "shortlets"), // Firestore collection for shortlets
       
        limit(PAGE_SIZE)
      );

      if (lastDoc && !initialLoad) {
        q = query(collection(db, "shortlets"), orderBy("createdAt", "desc"), startAfter(lastDoc), limit(PAGE_SIZE));
      }

      const querySnapshot = await getDocs(q);
      const newShortlets = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (initialLoad) {
        setShortlets(newShortlets); // Replace data on initial load
      } else {
        setShortlets(prev => [...prev, ...newShortlets]); // Append for pagination
      }

      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
    } catch (error) {
      console.error("Error fetching shortlets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShortlets(true);
  }, []);

  return { shortlets, loadMore: () => fetchShortlets(), loading };
};

export default useShortlets;
