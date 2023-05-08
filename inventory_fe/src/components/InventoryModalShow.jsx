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
import { Typeahead } from "react-bootstrap-typeahead";
import { Autocomplete, TextField } from "@mui/material";

export default function InventoryModalShow(props) {
  //++++++++++++++++++++++++++++++++++++++ USE STATE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [validated, setValidated] = useState(false);
  const [buttonColor, setButtonColor] = useState("secondary");
  const [form, setForm] = useState({});
  const [categoryErrorMessage, setCategoryErrorMessage] = useState(false);
  const [categoryInput, setCategoryInput] = useState(false);
  const [categoryName, setCategoryName] = useState("Category");

  //--------------------------------------- USE STATE ------------------------------------------------------------------------

  const unitList = ["unit", "gram", "kg", "ml", "lt", "m", "foot", "hand"];

  const authContext = useAuth();
  const username = authContext.username;
  const validForm = useRef(false);

  const filterData = props.datas.map((data) => {
    return data.category.categoryName;
  });

  const arr = filterData.filter((v, i, self) => {
    return i === self.indexOf(v);
  });

  //++++++++++++++++++++++++++++++++++++++ USE EFFECT +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  useEffect(() => {
    let temp = null;
    if (props.updateStatus) {
      temp = props.datas.find((d) => d.id === props.id);
    }

    if (temp != null) {
      setForm({ ...temp, category: temp.category?.categoryName });

      console.log(temp);
    } else {
      setTimeout(
        () =>
          setForm({
            item: "",
            price: "",
            quantity: "",
            category: "",
            unit: "unit",
          }),
        150
      );
    }
  }, [props.show]);

  useEffect(() => props.refreshInventory(), [props.datas.length]);

  //------------------------------------- USE EFFECT -------------------------------------------------------------------------

  const modalClose = () => {
    props.setShow(false);

    props.setUpdateStatus(false);
  };
  const modalShow = () => {
    props.setShow(true);
    if (!props.updateStatus) {
      setCategoryName("Category");
      setButtonColor("secondary");
    }
  };

  //++++++++++++++++++++++++++++++++++++++++++ FUNCTIONS  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  function handleNewItemNameChange(event) {
    if (event != null) {
      setForm({ ...form, item: event.target.value });
    }
  }
  function handleItemName(event) {
    setForm({ ...form, item: event.target.textContent });
  }

  function handleQuantityChange(event) {
    setForm({ ...form, quantity: event.target.value });
  }

  function handleUnitChange(event) {
    setForm({ ...form, unit: event });
  }

  function handlePriceChange(event) {
    setForm({ ...form, price: event.target.value });
  }

  function handleCategoryNameChange(event) {
    if (event === "Create New") {
      setCategoryInput(true);
      setButtonColor("secondary");

      setForm({ ...form, category: null });
    } else {
      setCategoryInput(false);
      setButtonColor("success");
      setForm({ ...form, category: event });
    }
    setCategoryErrorMessage(false);
    setCategoryName(event);
  }

  function handleNewCategoryNameChange(event) {
    console.log(form);
    setCategoryErrorMessage(false);
    setForm({ ...form, category: event.target.value });
  }

  function handleAddItem(event) {
    const formm = event.currentTarget;

    if (
      form.category === null ||
      form.category === undefined ||
      form.category === ""
    ) {
      setCategoryErrorMessage(true);
      event.preventDefault();
      event.stopPropagation();
    } else {
      setCategoryErrorMessage(false);
    }

    if (
      formm.checkValidity() &&
      !(
        form.category === null ||
        form.category === undefined ||
        form.category === ""
      )
    ) {
      setValidated(false);
      validForm.current = true;
    }

    setValidated(true);
    event.preventDefault();

    if (validForm.current) {
      props.setShow(true);
      addNewInventoryItem(username, form);

      props.setShowAlert("show");
      props.setShowAlertMessage("added");
      setCategoryInput(false);
      props.datas.length = props.datas.length + 1;
      validForm.current = false;

      props.setShow(false);
      setValidated(false);
    }
  }

  //------------------------------------ FUNCTIONS-------------------------------------------------------------
  return (
    <div>
      <Button variant="success" onClick={modalShow}>
        +Add
      </Button>
      <Modal show={props.show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new item to inventory</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleAddItem}>
            <Form.Group as={Col} controlId="formGridItemName">
              <Form.Label>Item Name</Form.Label>
              <Autocomplete
                value={form.item}
                onChange={handleItemName}
                onInputChange={handleNewItemNameChange}
                id="controllable-states-demo"
                options={props.datas.map((data) => data.item)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Enter Item Name" />
                )}
              />
            </Form.Group>

            <Row>
              <Form.Group controlId="formGridQuantity" as={Col}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  onChange={handleQuantityChange}
                  min="1"
                  max="1000000"
                  step="1"
                  placeholder="Enter quantity"
                  defaultValue={form.quantity}
                  required
                />
              </Form.Group>

              {/* ------------------------------------------------------- */}
              <Form.Group controlId="formGridQuantity" as={Col}>
                <Form.Label>Unit</Form.Label>
                <fieldset className="dropdownFieldset">
                  <DropdownButton
                    variant={"primary"}
                    title={form.unit}
                    onSelect={handleUnitChange}
                    defaultValue={form.unit}
                  >
                    {unitList.map((data) => (
                      <Dropdown.Item eventKey={data}>{data}</Dropdown.Item>
                    ))}
                  </DropdownButton>
                </fieldset>
              </Form.Group>
            </Row>
            {/* ----------------------------------------------------------------- */}

            <Form.Group controlId="formGridPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                onChange={handlePriceChange}
                type="number"
                min="0"
                max="1000000"
                step="1"
                placeholder="Enter price"
                defaultValue={form.price}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridCategory">
              <Form.Label>Category</Form.Label>
              <fieldset className="dropdownFieldset">
                <DropdownButton
                  variant={form.category ? "success" : buttonColor}
                  title={form.category ? form.category : categoryName}
                  onSelect={handleCategoryNameChange}
                  defaultValue={form.category}
                >
                  {arr.map((data) => (
                    <Dropdown.Item eventKey={data}>{data}</Dropdown.Item>
                  ))}

                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="Create New">
                    Create New
                  </Dropdown.Item>
                </DropdownButton>
                {categoryInput && (
                  <input
                    type="text"
                    className="inputCategory"
                    name="categoryname"
                    onChange={handleNewCategoryNameChange}
                    required
                  />
                )}
              </fieldset>
              {categoryErrorMessage && (
                <div style={{ color: "red" }}>
                  <stong>Add new category...</stong>
                </div>
              )}
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={modalClose}>
                Dismiss
              </Button>
              <Button variant="primary" type="submit">
                Add item
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
