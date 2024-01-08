import React, { createContext, useReducer, ReactNode, useEffect } from "react";
import { projectAuth } from "../firebase/firebase";
import { UserCredential } from "firebase/auth";

interface AuthContextValue { 
    user: User ;
    dispatch: React.Dispatch<AuthAction>;
    authIsReady: boolean;
  }
  
export type User = import('firebase/auth').User;

  type AuthAction = 
  | { type: 'LOGIN'; payload: any } 
  | { type: 'LOGOUT' }
  | { type: 'AUTH_IS_READY'; payload: any }
  | GoogleSignInAction;

type GoogleSignInAction = { type: 'GOOGLE_SIGN_IN'; payload: UserCredential };

// Create the initial state for your context
const initialAuthState = {
  user: null, 
  authIsReady: false,

};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

//create the reducer of auth states 
const authReducer = (state: typeof initialAuthState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true };
    case 'GOOGLE_SIGN_IN':
      return { ...state, user: action.payload.user, authIsReady: true };
    default:
      return state;
  }
};
 
// provider for auth 
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer,{
    user:null,
    authIsReady:false
  });

// set the correct state  
 useEffect(()=>{
const unsub= projectAuth.onAuthStateChanged((user)=>{
dispatch({type:'AUTH_IS_READY',payload: user})
unsub()
})
 },[]) 
  console.log('auth state : ', state)


  return (
    <AuthContext.Provider value={{ ...state, authIsReady: true, dispatch }}>
    {children}
    </AuthContext.Provider>
  );
};
