import { useEffect, useState } from "react";
import { OptionsCategory } from "./OptionsCategory";
import {
  deleteItemsApi,
  retrieveAllInventoryItems,
} from "./api/TodoApiService";
import InventoryModalShow from "./InventoryModalShow";
import { useAuth } from "./security/AuthContext";
import "./UserInventory.css";
import { default as ReactSelect } from "react-select";

export default function UserInventory(props) {
  // <!-------------------------------------------------------------------------------------------------->

  const [filterData, setFilterData] = useState([]);
  const [optionSelected, setOptionSelected] = useState([]);
  const authContext = useAuth();
  const [datas, setDatas] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const [checked, setChecked] = useState(false);
  const [categoryFilterOptions, setCategoryFilterOptions] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const nPages = Math.ceil(datas.length / recordsPerPage);
  const numbers = [...Array(nPages + 1).keys()].slice(1);
  const records = filterData.slice(firstIndex, lastIndex);

  useEffect(() => {
    const temp = [];
    datas.map((data) => {
      const i = temp.findIndex((t) => t.value === data.category.categoryName);
      if (i <= -1) {
        temp.push({
          value: data.category.categoryName,
          label: data.category.categoryName,
        });
      }
    });

    setCategoryFilterOptions(temp);
  }, [datas, filterData]);
  useEffect(() => refreshInventory(), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleSearchBar(), [query, optionSelected, checked]);

  function refreshInventory() {
    retrieveAllInventoryItems(authContext.username)
      .then((response) => {
        setUpdateStatus(false);
        setDatas(response.data);
        setFilterData(response.data);
      })
      .catch((error) => console.log(error));
  }

  function handleItemDelete(id) {
    props.setShowAlert("show");
    props.setShowAlertMessage("deleted");
    deleteItemsApi(authContext.username, id)
      .then((response) => {
        refreshInventory();
      })
      .catch((error) => console.log(error));
  }

  function handleUpdateItem(id) {
    setShow(true);
    setId(id);
    setUpdateStatus(true);
  }

  const handleChange = (selected) => {
    setOptionSelected(selected);
  };

  function handleSearchBar() {
    var temp = [];

    if (optionSelected.length !== 0 || query.length || checked) {
      if (optionSelected.length !== 0) {
        optionSelected.map((option) =>
          datas.map((data) => {
            if (data.category.categoryName === option.value) {
              temp.push(data);
            }
          })
        );
        if (query.length) {
          temp = temp.filter((data) =>
            data.item.toLowerCase().includes(query.toLowerCase())
          );
        }
        if (checked) {
          temp = temp.filter((d) => d.quantity == 0);
        }
      } else if (query.length) {
        temp = datas.filter((data) =>
          data.item.toLowerCase().includes(query.toLowerCase())
        );
        if (optionSelected.length !== 0) {
          optionSelected.map((option) =>
            temp.map((data) => {
              if (data.category.categoryName === option.value) {
                temp.push(data);
              }
            })
          );
        }
        if (checked) {
          temp = temp.filter((d) => d.quantity == 0);
        }
      } else if (checked) {
        temp = datas.filter((d) => d.quantity == 0);
        if (optionSelected.length !== 0) {
          optionSelected.map((option) =>
            temp.map((data) => {
              if (data.category.categoryName === option.value) {
                temp.push(data);
              }
            })
          );
        }
        if (query.length) {
          temp = temp.filter((data) =>
            data.item.toLowerCase().includes(query.toLowerCase())
          );
        }
      }
      setFilterData(temp);
    } else {
      setFilterData(datas);
    }
  }

  return (
    <div>
      <div className="container searchBar">
        <div className="">
          <label>Search</label>
          <input
            type="search"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Name"
          />
        </div>
        <div>
          <input type="checkbox" onChange={() => setChecked(!checked)}></input>
          <label>Out of Stock</label>
        </div>
      </div>

      <div className="mt-3" style={{ backgroundColor: "lavenderblush" }}>
        <span className="addItems">
          <InventoryModalShow
            datas={datas}
            setShowAlert={props.setShowAlert}
            setShowAlertMessage={props.setShowAlertMessage}
            refreshInventory={refreshInventory}
            id={id}
            show={show}
            setShow={setShow}
            updateStatus={updateStatus}
            setUpdateStatus={setUpdateStatus}
          />
        </span>

        <span className="filterCategory">
          {/* -------------------------------------------------------------------- */}

          <ReactSelect
            options={categoryFilterOptions}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              OptionsCategory,
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
                {/* <th></th> */}
                <th></th>
                <th>Name</th>

                <th>Category</th>
                <th>Quantity</th>
                <th>Price(₹)</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {records.map((data, index) => (
                <tr className={!data.quantity && "controlOpacity"}>
                  <td>{firstIndex + index + 1}</td>

                  {/* <td>{data.id}</td> */}
                  <td>
                    {!data.quantity && (
                      <p className="stamp is-nope">Out of Stock</p>
                    )}
                  </td>
                  <td>{data.item} </td>
                  <td>{data.category.categoryName}</td>
                  <td>
                    {data.quantity} {data.unit}
                  </td>
                  <td>
                    {data.price} /{data.unit}
                  </td>
                  <td>
                    <div onClick={() => handleItemDelete(data.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                        className="deleteIcon"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>
                    </div>
                  </td>
                  <td>
                    <div
                      className="btn btn-info"
                      onClick={() => handleUpdateItem(data.id)}
                    >
                      Update
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <Pagination data={filterData} recordsPerPage={3}/> */}
        <nav>
          <ul className="pagination">
            <li className="page-item">
              {
                <a
                  href="#"
                  className={`page-link ${
                    currentPage == 1 ? "prevPageClass" : ""
                  }`}
                  onClick={prePage}
                >
                  Prev
                </a>
              }
            </li>
            {numbers.map((n, i) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={i}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changeCurrentPage(n)}
                >
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a
                href="#"
                className={`page-link ${
                  currentPage == nPages ? "prevPageClass" : ""
                }`}
                onClick={nextPage}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );

  function nextPage() {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCurrentPage(n) {
    setCurrentPage(n);
  }
}
