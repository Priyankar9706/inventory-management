
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../security/AuthContext"
import "./LoginPage.css"
export default function LoginPage(){

    const [username,setUsername]=useState("in28minutes")
    const [password,setPassword]=useState("password")
    const [showError,setShowError]=useState(false)
    
    const navigate=useNavigate()

    const authContext=useAuth();

    function handleUserNameChange(event){
        setUsername(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    function handleSubmit(){

        console.log("HANDLE SUBMIT FUNCTION")
        if(authContext.login(username,password)){
           
            navigate(`/welcome/${username}`)
          
        }else{
            setShowError(true)
        }
    }

   


    return(
        <div className="Login">
            <h2>Welcome to Login...</h2>
          {showError && <div className='errorMessage'>Authentication Failed !!!</div>}
          {/* <SuccessMessageComponent/> */}
            <div className="LoginForm">
                <div>
                    <label><strong>Username</strong></label>
                    <input type="text" name="username" onChange={handleUserNameChange}/>
                </div>
                <div>
                    <label><strong>Password</strong></label>
                    <input type="password" name="password" onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="submit" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>

        
    )
}