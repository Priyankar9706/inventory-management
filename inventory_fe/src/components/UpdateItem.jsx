import { useState } from "react";
import { useParams } from "react-router-dom"
import { retrieveAllInventoryItems, retrieveInventoryItem } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";

export default function UpdateItem(){
    const {id,username}=useParams();
    const [data, setData] = useState([]);

    const authContext = useAuth();

    function refreshInventory() {
        retrieveInventoryItem(authContext.username,id)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => console.log(error));
      }
    return(
        <div>
            
      </div>
    )
}