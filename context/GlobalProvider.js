import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = ()=> useContext(GlobalContext);

const GlobalProvider = ({ children })=> {
     const [isLoggedIn, setisLoggedIn] = useState(false);
     const [user, setUser] = useState(null);
     const [isLoading, setisLoading] = useState(false);
     useEffect(()=> {
          getCurrentUser()
          .then((res)=> {
               if(res){
                    setisLoggedIn(true);
                    setUser(res);
               }else{
                    setisLoggedIn(false);
                    setUser(null);
               }
          })
          .catch((error)=> {
               console.log(error);
          })
          .finally(()=> {
               setisLoading(false);
          })
     },[])
     return (
          <GlobalContext.Provider 
               value={{
                    isLoading,
                    setisLoading,
                    isLoggedIn,
                    setisLoggedIn,
                    setUser,
                    user
               }}>
               {children}
          </GlobalContext.Provider>
     )
}

export default GlobalProvider