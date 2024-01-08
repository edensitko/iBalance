import { useReducer, useEffect, useState } from "react";
import { projectFireStore, timestamp } from "../firebase/firebase";

type FirestoreState = {
  document: any | null;
  isPending: boolean;
  error: string | null;
  success: boolean | null;
  loading: boolean; 
};


type FirestoreAction =
  | { type: 'IS_PENDING' }
  | { type: 'FETCHED_COLLECTION'; payload: any[] }
  | { type: 'ADD_ERROR'; payload: string }
  | { type: 'DELETED'; payload: any }
  | { type: 'UPDATED'; payload: any }; 

//set types of firebase states 
  const initialState: FirestoreState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
    loading: false, 
  };

   //reducer for firebase actions 
  const firestoreReducer = (state: FirestoreState, action: FirestoreAction): FirestoreState => {
    switch (action.type) {
      case 'IS_PENDING':
        return { ...state, isPending: true, document: null, error: null, success: false, loading: true };
      case 'FETCHED_COLLECTION':
        return { ...state, isPending: false, document: action.payload, success: true, error: null, loading: false };
      case 'ADD_ERROR':
        return { ...state, isPending: false, document: null, success: false, error: action.payload, loading: false };
      case 'DELETED':
        return { ...state, isPending: false, document: null, success: true, error: null, loading: false };
        case 'UPDATED':
          return { ...state, isPending: false, document: null, success: true, error: null, loading: false };
        default:
          return state;

    }
  };


///////// CRUD ///////


  // READ
  export const useFirestore = (collection: string) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
  
    const ref = projectFireStore.collection(collection);
  
    const getCollection = async (userId: string) => {
      console.log('Fetching collection for user:', userId);
  
      dispatch({ type: 'IS_PENDING' });

  // check data mathing to user uid 
      try {
        let data: any;
        const querySnapshot = await ref.where('uid', '==', userId).get();
        data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
        dispatch({ type: 'FETCHED_COLLECTION', payload: data });
      } catch (error) {
        dispatch({ type: 'ADD_ERROR', payload: (error as Error).message });
      }
    };

// CREATE 
  const addDocument = async (doc: any, user: any) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      await ref.add({ ...doc, createdAt });

      // Fetch the updated collection after adding the document
      if (user) {
        getCollection(user.uid);
      }
    } catch (error) {
      dispatch({ type: "ADD_ERROR", payload: (error as Error).message });
    }
  };

  //UPDATE
  const updateDocument = async (id: string, updatedData: any) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      await ref.doc(id).update(updatedData);
      dispatch({ type: 'UPDATED', payload: updatedData });
      console.log(`Document with ID ${id} has been updated.`);
    } catch (error) {
      console.error('Error updating document:', error);
      dispatch({ type: 'ADD_ERROR', payload: (error as Error).message });
    }
  };

//DELETE
  const deleteDocument = async (id: any) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      await ref.doc(id).delete();
      dispatch({ type: 'DELETED', payload: id });
      console.log(`Document with ID ${id} has been deleted.`);
    } catch (error) {
      console.error('Error deleting document:', error);
      dispatch({ type: 'ADD_ERROR', payload: (error as Error).message });
    }
  };

  useEffect(() => {
    return () => dispatch({ type: 'IS_PENDING' }); // Reset state on unmount
  }, []);

  return { getCollection, addDocument, deleteDocument,updateDocument, response  } as const;
};
