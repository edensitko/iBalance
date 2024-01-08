import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/firebase"
import { useAuthContext } from "./useAuthContext"


export const useLogout = ()=>{
const [error , setError ] = useState(null)
const [isPending , setPending] = useState(false)
const {dispatch} = useAuthContext()
const [isCancelled , setisCancelled] = useState(false)

//logout function 
 const logout =  async ()=>{
    setError(null)
    setPending(true)
 try {
    await projectAuth.signOut()
    dispatch({ type:'LOGOUT' })
    if (!isCancelled){
    setPending(false)
    setError(null) 

 }
 }catch(err : any){
     if (!isCancelled){
    console.log(err.message)
    setError(err.message)
    setPending(false)

 }
    }}
    useEffect(()=>{
    return ()=> setisCancelled(true)
    },[])
    return {logout , error, isPending}
    }

