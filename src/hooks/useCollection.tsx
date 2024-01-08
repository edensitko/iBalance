import { useEffect, useState } from "react";
import { projectFireStore } from "../firebase/firebase";

export const useCollection = (

  collection: any,
  query: any[] ,
  orderBy: any[] 
) => {

  const [documents, setDocuments] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

// fetching the real time data from collection firebase 
  useEffect(() => {
    let ref = projectFireStore.collection(collection);

//
    const unsubscribe = ref.onSnapshot((snapshot) => {
        const res:any = [];
        snapshot.docs.forEach(doc => {
          res.push({ ...doc.data(), id: doc.id })
        })
        setDocuments(res);
        setError(null);
      },
      (error) => {
        console.error(error);
        setError("Error fetching data from Firestore");
      });
   

    return () => 
      unsubscribe();
  }, [collection]);

  return { documents, error ,orderBy};
};
