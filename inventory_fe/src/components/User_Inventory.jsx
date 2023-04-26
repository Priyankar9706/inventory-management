import { ErrorMessage, Field, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { addNewInventoryItem } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import "./UserInventory.css";

export default function User_Inventory(props) {
  
  const modalClose = () => {
    props.setUpdateStatus(false)
    props.setShow(false)
   
  };
  const modalShow = () => props.setShow(true);

  const [form, setForm] = useState({});

  const authContext = useAuth();
  const username = authContext.username;

   

  useEffect(() => {
    let temp=null
    if(props.updateStatus){
       temp = props.datas.find((d) => d.id === props.id);
    }
   
   
    if (temp != null) { 
      setForm({...temp,category:temp.category?.categoryName});
      
      console.log(temp);
    }else{
      setForm({item:"",price:"",quantity:"",category:""})
    }
    console.log("form");
    console.log(form);
 
  }, [props.show]);

  useEffect(() => props.refreshInventory(), [props.datas.length]);

  
function handleAddItem(values){
  console.log("IN IT");
    setForm({
        id:values.id,
        item:values.item,
        price:values.price,
        quantity:values.quantity,
        category:values.category
    })
    
    addNewInventoryItem(username,form)
    .then(response=>{
        modalClose()
    })
    .catch(error=>console.log(error))
   
}



  function validate(values){
    let errors={}
    if(values.item.length<1){
        errors.item="Enetr a valid item name"
    }
    if(values.price<1){
        errors.item="Enetr a valid price"
    }
    if(values.quantity<1){
        errors.item="Enetr a valid quantity"
    }
    if(values.category.length<1){
        errors.item="Enetr a valid category"
    }
  }
  return (
    <div>
      <Button variant="success" onClick={modalShow}>
        +Add
      </Button>
     { <Modal show={props.show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new item to inventory</Modal.Title>
        </Modal.Header>

        <Modal.Body>
    
            <Formik
                    initialValues={ {
                        item:form.item,
                        quantity:form.quantity,
                        price:form.price,
                        category:form.category
                    } } 
                    
                    enableReinitialize = {true}
                    onSubmit = {handleAddItem}
                    validate = {validate}
                    validateOnChange = {false}
                    validateOnBlur = {false}
            >
            {
                    (props) => (
                        <Form>
                            <ErrorMessage 
                                name="item"
                                component="div"
                                className = "alert alert-warning"
                            />
                            
                            <ErrorMessage 
                                name="quantity"
                                component="div"
                                className = "alert alert-warning"
                            />
                            <ErrorMessage 
                                name="price"
                                component="div"
                                className = "alert alert-warning"
                            />

                            <ErrorMessage 
                                name="category"
                                component="div"
                                className = "alert alert-warning"
                            />

                            <fieldset className="form-group">
                                <label className="fw-bold">Item Name</label>
                                <Field type="text" className="form-control" name="item"  />
                            </fieldset>
                            <fieldset className="form-group">
                                <label className="fw-bold">Quantity</label>
                                <Field type="number" className="form-control" name="quantity" min="1" max="100000" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label className="fw-bold">Price</label>
                                <Field type="number" className="form-control" name="price" min="1" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label className="fw-bold">Category</label>
                                <Field type="text" className="form-control" name="category"/>
                            </fieldset>
                            <div>
                                <button className="btn btn-secondary mx-3" onClick={modalClose}>Dismiss</button>
                                <button className="btn btn-success m-4" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>

        </Modal.Body>
      </Modal>}
    </div>
  );
}
