import { Dropdown, DropdownButton } from "react-bootstrap";
import PieChart from "./PieChart";
import { useEffect, useState } from "react";
import "./SalesReport.css";
export default function SalesReportDropdown1(props){

  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Choose Category");
  // const [datas, setDatas] = useState([]);
  const [data, setData] = useState([]);
  // useEffect(() => refreshInventory(), []);
  useEffect(() => getCategoryCount(), [props.datas]);
  useEffect(() => getCategoryCount(), [selectedOption]);



  function getCategoryCount() {
    if (selectedOption === "Choose Category") {
      const filterData = props.datas.map((data) => {
        return data.category.categoryName;
      });

      const arr = filterData.filter((v, i, self) => {
        return i === self.indexOf(v);
      });
      setCategories(arr);
      const categoryCount = arr.map((c) => {
        const count = props.datas.filter((d) => d.category.categoryName === c).length;
        return [c, count];
      });

      setData([["Category", "Count"], ...categoryCount]);
    } else {
      const filterData = props.datas
        .filter((data) => {
          if (data.category.categoryName === selectedOption) {
            return data;
          }
        })
        .map((da) => [da.item, da.quantity]);

      console.log(filterData);
      setData([["Item", "Count"], ...filterData]);
      console.log(filterData);
    }
  }
  function handleSelectCategory(event) {
    setSelectedOption(event);
  }

    return(
        <div className="categoryChartAndDropDown">
        <DropdownButton
        variant="dark"
        title={selectedOption}
        onSelect={handleSelectCategory}
        defaultValue={"Choose Category"}
        className="categoryChartDropdown"
      >
        {categories.map((data) => (
          <Dropdown.Item eventKey={data}>{data}</Dropdown.Item>
        ))}

        <Dropdown.Divider />
        <Dropdown.Item eventKey="Choose Category">
          Choose Category
        </Dropdown.Item>
      </DropdownButton>
      <PieChart data={data} title={"Inventory Data Report Categorywise"} />
      </div>
    )
}