import { useNavigate } from "react-router-dom"
import { useAuth } from "./security/AuthContext";
import "./Welcome.css"
export default function Welcome(){

    const navigate=useNavigate();
    
    
    const authContext=useAuth();
    const username=authContext.username

    function handleInventory(){
        // <Navigate to='/'/>
        navigate(`/${username}/inventory`)

    }

    return(
        <div className="welcomeDiv">
            <h2 className="mt-5">Welcome to the dashboard</h2>
            <div className="dashboardButtons container ">
            <button type="button" class="btn btn-outline-primary  btn-lg me-5" onClick={handleInventory}>Inventory</button>
            <button type="button" class="btn btn-outline-secondary btn-lg">Secondary</button>
            </div>
        </div>
    )
}