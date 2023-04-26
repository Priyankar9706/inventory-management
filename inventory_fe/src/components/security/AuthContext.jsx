import { createContext, useContext, useState } from "react";

export const AuthContext=createContext()

export const useAuth=()=>useContext(AuthContext)

export default function AuthProvider({children}){

    
    const[isAuthenticated,setIsAuthenticated]=useState(false)
    const[username,setUsername]=useState(null)
    // const [form, setForm] = useState({});
    // const [datas, setDatas] = useState([]);

    function login(username,password){
        console.log("INLOGIN")
        if(username==='pinku' && password==='dummy'){
            // console.log(isAuthenticated)
            setIsAuthenticated(true);
            setUsername(username)
            // console.log(authContext.isAuthenticated)
           return true
          
        }else{
           setIsAuthenticated(false);
           setUsername(null)
            return false
        }
    }

    function logout(){
        setIsAuthenticated(false)
    }
        // const valueToBeShared={number,isAuthenticated,setIsAuthenticated}
    return(

        <AuthContext.Provider value={{isAuthenticated,login,logout,username}}>

            {children}
        </AuthContext.Provider>

    )

}