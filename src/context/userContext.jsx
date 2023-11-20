"use client";
import { useState, useContext, createContext } from "react";

const userContext = createContext();

const Usercontextcmp = ({ children }) => {
  const [authToken, setAuthtoken] = useState(null);
  const [userDetails,setUserDetails]=useState({username:"",userID:"",profilePic:""})
  return (
    <userContext.Provider value={{authToken,setAuthtoken,userDetails,setUserDetails}}>
        {children}
    </userContext.Provider>
  )
};

export const useUserContext = () => useContext(userContext);

export default Usercontextcmp;


