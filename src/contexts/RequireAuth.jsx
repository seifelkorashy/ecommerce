import { Navigate } from "react-router-dom";


import React from 'react'
import { useAuth } from "./AuthContext";

export default function RequireAuth({children}) {
    const { currentUser } = useAuth();
    
    if(!currentUser){
        return <Navigate to={"/login"} ></Navigate>
    }
  return children
}