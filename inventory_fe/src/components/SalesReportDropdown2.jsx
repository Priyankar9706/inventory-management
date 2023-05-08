import { Dropdown, DropdownButton } from "react-bootstrap";
import PieChart from "./PieChart";
import { useState } from "react";
import { useEffect } from "react";

export default function SalesReportDropdown2(props) {
  const [data2, setData2] = useState([]);
  const [selectedOption2, setSelectedOption2] = useState("Choose Time Period");
  const [timeFilteredData, setTimeFilteredData] = useState([]);
  const [timePeriod, setTimePeriod] = useState([
    "Today",
    "Last Day",
    "Last 7 Days",
    "Last 1 Month",
    "Last 3 Months",
    "Last 1 Year",
  ]);
  const [selectedOption3, setSelectedOption3] = useState("Choose Category");
  const [categories2, setCategories2] = useState([]);

  function handleSelectCategory2(event) {
    setSelectedOption2(event);
  }

  function handleSelectCategory3(event) {
    setSelectedOption3(event);
  }

  function getItemFilter() {
    var allCategories = [];
    if (selectedOption3 === "Choose Category") {
      timeFilteredData.map((list) => {
        JSON.parse(list.data).map((data, index) => {
          let flag = false;
          allCategories.map((category) => {
            if (category[0] === data.category) {
              category[1] = category[1] + data.quantity;
              flag = true;
            }
          });
          if (!flag) {
            allCategories.push([data.category, data.quantity]);
          }
        });
      });

      setData2([["Category", "Count"], ...allCategories]);
    } else {
      const items = [];
      timeFilteredData.map((list) => {
        JSON.parse(list.data).map((data, index) => {
          if (data.category === selectedOption3) {
            let flag = false;
            items.map((arr) => {
              if (arr[0] === data.item) {
                arr[1] = arr[1] + data.quantity;
                flag = true;
              }
            });

            if (!flag) {
              items.push([data.item, data.quantity]);
            }
          }
        });
      });
      setData2([["Items", "Count"], ...items]);
    }
  }

  function filterCategoryTime() {
    console.log(timeFilteredData);
    var temp = [];
    timeFilteredData.map((list) => {
      JSON.parse(list.data).map((data, index) => {
        if (!temp.includes(data.category)) {
          temp.push(data.category);
        }
      });
    });
    setCategories2(temp);
  }

  function getCategoryCount2() {
    var chosenDate;
    setCategories2([]);
    setSelectedOption3("Choose Category");
    setTimeFilteredData([]);
    switch (selectedOption2) {
      case "Today":
        chosenDate = new Date();
        setTimeFilteredData(
          props.datas2.filter(
            (d) => d.date.toString() === chosenDate.toISOString().split("T")[0]
          )
        );
        break;

      case "Last Day":
        chosenDate = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000);
        setTimeFilteredData(
          props.datas2.filter(
            (d) => d.date.toString() === chosenDate.toISOString().split("T")[0]
          )
        );
        break;

      case "Last 7 Days":
        chosenDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
        setTimeFilteredData(
          props.datas2.filter(
            (d) =>
              new Date(d.date) > chosenDate &&
              d.date.toString() !== new Date().toISOString().split("T")[0]
          )
        );

        break;
      case "Last 1 Month":
        chosenDate = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
        setTimeFilteredData(
          props.datas2.filter(
            (d) =>
              new Date(d.date) > chosenDate &&
              d.date.toString() !== new Date().toISOString().split("T")[0]
          )
        );
        break;
      case "Last 3 Months":
        chosenDate = new Date(new Date().getTime() - 90 * 24 * 60 * 60 * 1000);
        setTimeFilteredData(
          props.datas2.filter(
            (d) =>
              new Date(d.date) > chosenDate &&
              d.date.toString() !== new Date().toISOString().split("T")[0]
          )
        );
        break;
      case "Last 1 Year":
        chosenDate = new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000);
        setTimeFilteredData(
          props.datas2.filter(
            (d) =>
              new Date(d.date) > chosenDate &&
              d.date.toString() !== new Date().toISOString().split("T")[0]
          )
        );
        break;
      default:
    }
  }

  useEffect(() => filterCategoryTime(), [timeFilteredData]);
  useEffect(() => getCategoryCount2(), [selectedOption2]);
  useEffect(() => getItemFilter(), [categories2, selectedOption3]);

  return (
    <div className="categoryChartAndDropDown">
      <div className="dropDownGroup">
        <DropdownButton
          variant="dark"
          title={selectedOption2}
          onSelect={handleSelectCategory2}
          defaultValue={"Choose Time Period"}
          className="categoryChartDropdown"
        >
          {timePeriod.map((data) => (
            <Dropdown.Item eventKey={data}>{data}</Dropdown.Item>
          ))}
        </DropdownButton>

        {selectedOption2 !== "Choose Time Period" && (
          <DropdownButton
            variant="dark"
            title={selectedOption3}
            onSelect={handleSelectCategory3}
            defaultValue={"Choose Category"}
            className="categoryChartDropdown mt-3"
          >
            {categories2.map((data) => (
              <Dropdown.Item eventKey={data}>{data}</Dropdown.Item>
            ))}
            <Dropdown.Divider />
            <Dropdown.Item eventKey="Choose Category">
              Choose Category
            </Dropdown.Item>
          </DropdownButton>
        )}
      </div>
      <PieChart data={data2} title={"Sales Data Report Quantitywise"} />
    </div>
  );
}
