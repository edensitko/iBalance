import { useEffect, useState } from 'react';
import { projectFireStore } from '../firebase/firebase';

const useUserData = (userId: string | undefined, collection: string) => {
    const [userData, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  //user data fetch by uid 
    useEffect(() => {
        const fetchData = async () => {
          try {
            if (userId) {
              const querySnapshot = await projectFireStore
                .collection(collection)
                .where('uid', '==', userId)
                .orderBy('createdAt', 'desc')
                .get();
  //mapping data to correct user 
              const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setUserData(data);
            }
          } catch (error) {
            setError((error as Error).message || 'Error fetching data');
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
      }, [userId, collection]);
      
    return { userData, loading, error };
  };
  
  export default useUserData;