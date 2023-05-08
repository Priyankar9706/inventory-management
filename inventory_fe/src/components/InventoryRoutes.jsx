
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import  "./Welcome"
import HeaderComponent from './HeaderComponent'
import headerBg from '../images/header_bg.jpg'

import ErrorComponent from './ErrorComponent'
import AuthProvider, { useAuth } from './security/AuthContext'

import Welcome from './Welcome'
import LoginPage from './loginComponent/LoginPage'
import Logout from './loginComponent/Logout'
import UserInventory from './UserInventory'
import "./InventoryRoutes.css"
import RegisterPage from './loginComponent/RegisterPage'
import { useState } from 'react'
import InvoiceGenerator from './InvoiceGenerator'
import InvoiceHistory from './InvoiceHistory'
import SalesReport from './SalesReport'



function AuthenticatedRoute({children}){
    const authContext=useAuth()
    if(authContext.isAuthenticated){
         return  children 
    }
    return <Navigate to='/'/>
   
}

export default function InventoryRoutes(){

    function dismissAlert(){
     
        setShowAlert("hide")
    }
    const[showAlert,setShowAlert]=useState("hide")
    const[showAlertMessage,setShowAlertMessage]=useState("")
  
    return(
        <div className="Inventory">
            {/* TodoApp */}
            <AuthProvider>
            <BrowserRouter>
        
            <HeaderComponent/>
            <div class={`alert alert-warning alert-dismissible fade ${showAlert}`}   role="alert">
                Item <strong>{showAlertMessage}</strong> successfully....
             <button type="button" class="btn-close"  onClick={dismissAlert} aria-label="Close"></button>
            </div>
                <Routes> 
                    <Route path='/' element={<LoginPage/>}/>
                  
                    <Route path='*' element={<ErrorComponent/>}/>
                      
                    <Route path='/login' element={<LoginPage/>}/>

                    <Route path='/register' element={<RegisterPage/>}/>

                    <Route path='/welcome/:username' element={
                    <AuthenticatedRoute>
                        <Welcome/>
                    </AuthenticatedRoute>
                    }/>

                    <Route path='/:username/inventory' element={
                    <AuthenticatedRoute>
                        <UserInventory setShowAlert={setShowAlert} setShowAlertMessage={setShowAlertMessage}/>
                    </AuthenticatedRoute>
                    }/>
                    
                    <Route path='/:username/invoice-generator' element={
                    <AuthenticatedRoute>
                        <InvoiceGenerator />
                    </AuthenticatedRoute>
                    }/>
                   
                    <Route path='/:username/invoice-history' element={
                            <AuthenticatedRoute>
                                <InvoiceHistory/>
                            </AuthenticatedRoute>
                    }/>
                     <Route path='/:username/sales-report' element={
                            <AuthenticatedRoute>
                                <SalesReport/>
                            </AuthenticatedRoute>
                    }/>

                     <Route path='/logout' element={<Logout/>}/>
                   
                
                </Routes>
                
            </BrowserRouter>
            </AuthProvider>
           
            </div>
        
    )
}



