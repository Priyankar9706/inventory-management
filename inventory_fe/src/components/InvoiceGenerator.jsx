import { Autocomplete, TextField } from "@mui/material";
import { addItemObjectToCart, deleteCart, deleteItemCartApi, getAllCartItems, retrieveAllInventoryItems, updateInventory } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import "./InvoiceGenerator.css";
import ReactPDF, { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
// import PdfInvoiceGenerator, { MyDocument } from "./PdfInvoiceGenerator";
import ReportTable from "./ReportTable";
import DeleteConfirmation from "./DeleteConfirmation";
export default function InvoiceGenerator() {

  const authContext = useAuth();
  const username = authContext.username;
  const [itemObject,setItemObject]=useState()
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [datas, setDatas] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [totalRate,setTotalRate]=useState(0)
  const [grandTotal,setGrandTotal]=useState(0)
  const [showModal,setShowModal]=useState(false)
  const[pdfGenerated,setPdfGenerated]=useState(false)


  const filterData = datas.map((data) => {
    return data.category.categoryName;
  });

  const uniqueCategories = filterData.filter((v, i, self) => {
    return i === self.indexOf(v);
  });

  function refreshCart(){
    setGrandTotal(0)
    getAllCartItems(authContext.username)
    .then((response)=>{
      setCartItems(response.data)
      
      console.log(cartItems);
      console.log(response.data);
    })
    .catch((error) => console.log(error));
  }

  useEffect(()=>{
    let temp=0;
    cartItems.map(cartItem=>temp=temp+cartItem.totalRate)
    setGrandTotal(temp)
  },[cartItems])

  function refreshInventory() {
    retrieveAllInventoryItems(authContext.username)
      .then((response) => {
        setDatas(response.data);
      })
      .catch((error) => console.log(error));
  }
  function handleCategory(event) {
    setCategory(event.target.textContent);
  }
  function handleItem(event) {
    setItemName(event.target.textContent);
  }

  useEffect(() => {refreshInventory();refreshCart()}, []);
  useEffect(() => {
    setItemName("");
    setPrice(0)
    setTotalRate(0)
    setQuantity(1)
    setItems(
      datas
        .filter((data) => data.category.categoryName === category)
        .map((item) => item.item)
    );
}, [category]);

  



  useEffect(() => {
    setPrice(
      datas.filter((data) => data.item === itemName).map((price) => price.price)
    );
    setMaxQuantity(
      datas
        .filter((data) => data.item === itemName)
        .map((quan) => quan.quantity)
    );
    setQuantity(1)
   // setTotalRate(price*quantity)
  }, [itemName]);

  useEffect(()=>{
    setTotalRate(quantity*price)
  },[quantity,price])

  useEffect(()=>{
    addItemObjectToCart(username,itemObject).then(
      ()=> {
        refreshCart()
        setCategory("")
      } 
    )
 

  },[itemObject])

  function handleChange(event) {
    if(Number(event.target.value)<=maxQuantity){
      setQuantity(event.target.value);
      
    }else if(Number(event.target.value)>maxQuantity){
      setQuantity(maxQuantity)
    }
    else{
      setQuantity(1)
    }
   
     }

  function increment() {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  }
  function decrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }
function addItemToCart(){
  if(category!==null && category!=="" && itemName!=="" && itemName!==null){
    setItemObject({
      item:itemName,
      category:category,
      price:price[0],
      quantity:quantity,
      totalRate:totalRate
    })
  }else{
    return
  }
}

function deleteItemFromCart(id){
  deleteItemCartApi(authContext.username,id)
    .then(response=>{
        refreshCart()
        // setMessage("Todo deleted successfully")
    }
    )
    .catch(error=>console.log(error))
}

// function generateInvoicePdf(){
//   setShowModal(true)
  
// }

function showModalFunction(){
  setShowModal(true)
}
function showModalFunctionAfterGeneration(){
  // setShowModal(true)
 updateInventory(username,cartItems)
//  setTimeout()
 deleteCart(username).then(()=>refreshCart())

}
function hideModalFunction(){
  setShowModal(false)
}

function deleteAllCart(){
  setShowModal(false)
  deleteCart(username).then(()=>refreshCart())
  
}


  return (
    <div>
      <div className="itemSelector">
      <div>
        <label className="styleInputBox">Category</label>
        <Autocomplete
        value={category}
          disablePortal
          id="combo-box-demo"
          options={uniqueCategories}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Choose" />}
          onChange={handleCategory}
        />
      </div>

      <div>
        <label className="styleInputBox">Item</label>
        <Autocomplete
          value={itemName}
          disablePortal
          id="combo-box-demo"
          options={items}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Choose" />}
          onChange={handleItem}
        />
      </div>
      <div>
        <label className="styleInputBox">Price</label>
        <input
          className="form-control"
          type="text"
          placeholder="Price"
          value={`₹${price}`}
          size={"1"}
          readonly
        />
      </div>
    
        <div className="quantityAlign">
        <label className="styleInputBox">Quantity</label>
        <div>
        <input
            type="button"
            value="-"
            class="button-minus border rounded-circle  icon-shape icon-sm "
            data-field="quantity"
            onClick={decrement}
          />
          <input
            type="integer"
            step="1"
            min="1"
            max={maxQuantity}
            value={quantity}
            name="quantity"
            class="quantity-field border-0 text-center w-25"
            onChange={handleChange}
          />
          <input
            type="button"
            value="+"
            class="button-plus border rounded-circle icon-shape icon-sm "
            data-field="quantity"
            onClick={increment}
          />
        </div>
        
        </div>
        <div>
        <label className="styleInputBox">Total Rate</label>
        <input
          className="form-control"
          type="text"
          placeholder="Price"
          size="1"
          value={`₹${totalRate}`}
          readonly
        />
      </div>
      <div>
      <button type="button" class="addButton btn btn-success" onClick={addItemToCart}>+Add</button>
      </div>
    
    </div>
    <div>
      <DeleteConfirmation showModal={showModal} showModalFunction={showModalFunction} hideModalFunction={hideModalFunction} deleteAllCart={deleteAllCart} />
    </div>

    <div>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Sl. No.</th>
      <th scope="col">Item</th>
      <th scope="col">Category</th>
      <th scope="col">Price(₹)</th>
      <th scope="col">Quantity</th>
      <th scope="col">Total Rate(₹)</th>
      
      {/* <button>Clear Cart</button> */}
    </tr>
  </thead>
  <tbody>
    {cartItems.map((cartItem,index)=>(
          <tr>
          <th scope="row">{index+1}</th>
          <td>{cartItem.item}</td>
          <td>{cartItem.category}</td>
          <td>{cartItem.price}</td>
          <td>{cartItem.quantity}</td>
          <td>{cartItem.totalRate}</td>
          <td onClick={()=>deleteItemFromCart(cartItem.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" className="deleteIcon">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg></td>
          </tr>
    ))}
  <br></br>
    <tr>
      <td> </td>
      <td></td>
      <td></td>
      <td></td>
      <th scope="row"><strong>Grand Total:</strong></th>
      <th scope="row">{grandTotal}</th>

    </tr>
   
    
  </tbody>
</table>
</div>
      <div>
      <button className="btn btn-warning mx-3" onClick={showModalFunction}>Clear Cart</button>
      <PDFDownloadLink document={<ReportTable cartItems={cartItems} grandTotal={grandTotal} />} filename="FORM">
      <button className="btn btn-success " onClick={showModalFunctionAfterGeneration}>Generate Invoice</button>
      </PDFDownloadLink>
      </div>

    {/* <div>
     
    </div> */}
    </div>
  );
}
