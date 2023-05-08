import { useNavigate } from "react-router-dom"
import { useAuth } from "./security/AuthContext";
import bg_image from "../images/d.jpg"
import "./Welcome.css"
export default function Welcome(){

    const navigate=useNavigate();
    
    
    const authContext=useAuth();
    const username=authContext.username

    function handleInventory(){
        // <Navigate to='/'/>
        navigate(`/${username}/inventory`)

    }
    function handleInvoiceGenerator(){
        // <Navigate to='/'/>
        navigate(`/${username}/invoice-generator`)

    }
    function handleInvoiceHistory(){
        navigate(`/${username}/invoice-history`)
    }

    function handleSalesReport(){
        navigate(`/${username}/sales-report`)
    }
    return(
        <div className="welcomeDiv" style={{backgroundImage:`url(${bg_image})`}}>
            <h2 className="pt-5" style={{"color":"navy"}}>Welcome to the dashboard</h2>
            <div className="dashboardButtons container ">
            <button type="button" class="btn btn-dark  btn-lg me-5" onClick={handleInventory}>Inventory</button>
            <button type="button" class="btn btn-primary btn-lg me-5" onClick={handleInvoiceGenerator}>Invoice Generator</button>
            <button type="button" class="btn btn-dark btn-lg" onClick={handleInvoiceHistory}>Invoice History</button>
            <div className="mt-3">
            <button type="button" class="btn btn-dark btn-lg me-5" onClick={handleSalesReport}>Sales Report</button>
            </div>
            </div>
        </div>
    )
}