import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


export const useAuthContext =() =>{

//check the context existing 
const context = useContext(AuthContext)
 if(!context){
    throw Error (' error authContext ')
 }
 return context
}
