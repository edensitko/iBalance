import { useState } from "react";
import { projectAuth } from "../firebase/firebase";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const [isCancelled, setisCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const { dispatch } = useAuthContext();

//sign up function created user to firebase 
  const signUp = async (email: string, displayName: string, password: string) => {
    setError(null);
    setPending(true);

    try {
    const res = await projectAuth.createUserWithEmailAndPassword(email, password);
    console.log(res.user)
      if (!res.user) {
        throw new Error('User  is null');
      }
//if user signup change the state of user 
      await res.user.updateProfile({ displayName });
     setPending(false)
     setError(null)
     dispatch({ type: 'LOGIN', payload: res.user });

      if (!isCancelled) {
        setPending(false);
        setError("succefuly ")
      }
    } catch (error:any) {
      console.log('Error:', error.message);
          setError(error.message); 
           setPending(false);
      }
  };

  return { error, pending, signUp };
};

