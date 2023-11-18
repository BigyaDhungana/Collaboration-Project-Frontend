"use client";
import { useState, useContext, createContext } from "react";

const userContext = createContext();

const Usercontextcmp = ({ children }) => {
  const [authKey, setAuthkey] = useState("klsdfj3984klds");
  return (
    <userContext.Provider value={{authKey,setAuthkey}}>
        {children}
    </userContext.Provider>
  )
};

export const useUserContext = () => useContext(userContext);

export default Usercontextcmp;


