import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/firebase";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setPending] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  // log with firebase auth 
  const login = async (email: string, password: string) => {
    setError(null);
    setPending(true);

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);
      const user = res.user;
  //check if user exist 
      if (user) {
        dispatch({ type: 'LOGIN', payload: user }); 
      }

      setPending(false);
      setError(null);
  // if user not exist 
    } catch (error: any) {
      {
        console.log("Error:", error.message);
        setError(error.message);
        setPending(false);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;

    return () => {
      isMounted = false;
      if (isPending) {
    
      }
    };
  }, [isPending]);

  return { login, error, isPending };
};

export default useLogin;

