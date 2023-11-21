import { useEffect, useState } from "react";
import { getfromLocalStorage } from "../utils/localstorage";
export const useLocalData = () => {
    const [authToken, setAuthToken] = useState("");
    const [userDetails,setUserDetails] = useState({});
    const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setAuthToken(getfromLocalStorage("authToken"));
    setUserDetails(JSON.parse(getfromLocalStorage("userDetails")));
    setIsMounted(true);
  }, []);
  return { authToken, userDetails,isMounted };
};


  
