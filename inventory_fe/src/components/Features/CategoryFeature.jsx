import { useState } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";

export default function CategoryFeature(props){

    const [categoryErrorMessage, setCategoryErrorMessage] = useState(false);
    const [categoryInput, setCategoryInput] = useState(false);
    const [categoryName, setCategoryName] = useState("Category");
   // const [form, setForm] = useState({});
    const [buttonColor, setButtonColor] = useState("secondary");

    function handleNewCategoryNameChange(event) {
       
        setCategoryErrorMessage(false);
        props.setForm({ ...props.form, category: event.target.value });
      }

      function handleCategoryNameChange(event) {
        if (event === "Create New") {
          setCategoryInput(true);
          setButtonColor("secondary");
          props.setForm({ ...props.form, category: null });
        } else {
          setCategoryInput(false);
          setButtonColor("success");
          props.setForm({ ...props.form, category: event });
        }
        setCategoryErrorMessage(false);
        setCategoryName(event);
      }
      const filterData = props.datas.map((data) => {
        return data.category.categoryName;
      });
    
      const arr = filterData.filter((v, i, self) => {
        return i === self.indexOf(v);
      });
    return(

        <div>
              <Form.Group className="mb-3" controlId="formGridPrice">
                <Form.Label>Category</Form.Label>
                <fieldset className="dropdownFieldset">
                  <DropdownButton
                    variant={buttonColor}
                    title={categoryName}
                    onSelect={handleCategoryNameChange}
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
        </div>


    )
}