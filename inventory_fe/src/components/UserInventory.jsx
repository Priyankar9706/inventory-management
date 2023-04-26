import { useEffect,  useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {OptionsCategory} from "./OptionsCategory"
import {
  deleteItemsApi,
  retrieveAllInventoryItems,
} from "./api/TodoApiService";
import InventoryModalShow from "./InventoryModalShow";
import { useAuth } from "./security/AuthContext";

import "./UserInventory.css";
import User_Inventory from "./User_Inventory";
import { default as ReactSelect } from "react-select";
import { data } from "jquery";
export default function UserInventory(props) {

 const[filterData,setFilterData]=useState([])
  const[optionSelected,setOptionSelected]=useState([])
  const authContext = useAuth();
  const [datas, setDatas] = useState([]);
  const navigate=useNavigate();
  const [updateStatus,setUpdateStatus]=useState(false)
  
  const [show, setShow] = useState(false);
  const[id,setId]=useState()
    const [categoryFilterOptions,setCategoryFilterOptions]=useState(null);

    


  useEffect(()=>{
      const temp=[];
    datas.map(data=>{
      const i=temp.findIndex(t=>t.value===data.category.categoryName)
      if(i<=-1){
        temp.push({"value":data.category.categoryName,"label":data.category.categoryName})
      }
    })
  
    setCategoryFilterOptions(temp)
  } 
  ,[datas,filterData])
  useEffect(() => refreshInventory(), []);
  useEffect(() => refreshInventory(), [optionSelected]);

//// function refreshInventory() {
////   retrieveAllInventoryItems(authContext.username)
////     .then((response) => {
////  setUpdateStatus(false)
////    setDatas(response.data);
////    })
////     .catch((error) => console.log(error));
//// }
  function refreshInventory() {
    retrieveAllInventoryItems(authContext.username)
      .then((response) => {
        setUpdateStatus(false)
        setDatas(response.data);
        const temp=[]
        console.log(optionSelected+"   gggg    " + optionSelected.length);
        if(optionSelected.length!==0 ){
          optionSelected.map(option=>datas.map(data=>{
            if(data.category.categoryName===option.value){
              temp.push(data)
            }
          }))
          setFilterData(temp)
        }else{
          setFilterData(response.data)
        }
      
        
      })
      .catch((error) => console.log(error));
  }


  function handleItemDelete(id){
    props.setShowAlert("show")
    props.setShowAlertMessage("deleted")
    deleteItemsApi(authContext.username,id)
    .then(response=>{
        refreshInventory()
        // setMessage("Todo deleted successfully")
    }
    )
    .catch(error=>console.log(error))
}
 
  function handleUpdateItem(id){
    setShow(true)
    setId(id)
    setUpdateStatus(true)
   
  }

   const handleChange = (selected) => {
    
    setOptionSelected(selected)
    console.log(optionSelected);
    refreshInventory()

  };

  return (
    <div className="mt-3">
      <span className="addItems">
        <InventoryModalShow datas={datas} setShowAlert={props.setShowAlert} setShowAlertMessage={props.setShowAlertMessage} refreshInventory={refreshInventory}  id={id} show={show} setShow={setShow} updateStatus={updateStatus} setUpdateStatus={setUpdateStatus}/>
      </span>
     
      <span className="filterCategory">
        {/* -------------------------------------------------------------------- */}
        
          <ReactSelect
        
          options={categoryFilterOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            OptionsCategory
          }}
          onChange={handleChange}
          allowSelectAll={true}
          value={optionSelected}
        />
      

 


        {/* --------------------------------------------------------------------------- */}
      </span>






      <div className="mt-3">
        <table className="table table-striped ">
          <thead>
            <tr>
              <th>Serial No.</th>
              {/* <th>Id</th> */}
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price(₹)</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((data, index) => (
              <tr>
                <td>{index + 1}</td>
                {/* <td>{data.id}</td> */}
                <td>{data.item }</td>
                <td>{data.category.categoryName}</td>
                <td>{data.quantity} {data.unit}</td>
                <td>{data.price} /{data.unit}</td>
                <td><div onClick={()=>handleItemDelete(data.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" className="deleteIcon">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg></div></td>
                <td><div className="btn btn-info" onClick={()=>handleUpdateItem(data.id)}>Update</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>












    </div>
  );
}
