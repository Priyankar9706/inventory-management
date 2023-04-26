import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function RegisterPage(){

    const navigate=useNavigate();
    const [name,setName]=useState('')

    const [storeName,setStoreName]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')

    const [errorMessage,setErrorMessage]=useState('')

    function handleNameChange(event){
        setName(event.target.value)
    }

    function handleStoreNameChange(event){
        setStoreName(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }
    function handleConfirmPasswordChange(event){
        setConfirmPassword(event.target.value)
    }
    
    function handleResetbutton(){
        setName('')
        setStoreName('')
        setPassword('')
        setConfirmPassword('')
    }

    function handleRegisterbutton(){
        if(name==''|| storeName=='' || password=='' || confirmPassword==''){
            setErrorMessage("All fields are mandatory")

        }
       else  if(password!=confirmPassword){
            setErrorMessage("Pssword and Confirm Password are not same!")
        }else{
            navigate('/login')
        }
    }
    return(
        <div>
            <h3>Welcome Dear,</h3>
            <div className="form">
                <form>
                <fieldset>
                    <label><strong>Name:</strong> </label>
                    <input type="text" name="name"  onChange={handleNameChange}/>
                </fieldset>
                <fieldset>
                    <label><strong>Store Name:</strong> </label>
                    <input type="text" name="storename"  onChange={handleStoreNameChange}/>
                </fieldset>
                <fieldset>
                    <label><strong>Password: </strong></label>
                    <input type="password" name="password"  onChange={handlePasswordChange}/>
                </fieldset>
                <fieldset>
                    <label><strong>Confirm Password: </strong></label>
                    <input type="password" name="confirmpassword"  onChange={handleConfirmPasswordChange}/>
                </fieldset>
                <br/>
                {errorMessage && <div style={{color: "red"}}>{errorMessage}</div>}
                <br/>
                <button className="btn btn-success" onClick={handleResetbutton}>Reset</button>
          
                <button className="btn btn-primary" type="submit" onClick={handleRegisterbutton}>Register</button>
                </form>
            </div>
        </div>
    )
}