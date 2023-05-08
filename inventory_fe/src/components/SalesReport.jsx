import { useState } from "react";
import {
  getInvoiceHistoryList,
  retrieveAllInventoryItems,
} from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect } from "react";
import "./SalesReport.css";
import SalesReportDropdown1 from "./SalesReportDropdown1";
import SalesReportDropdown2 from "./SalesReportDropdown2";
export default function SalesReport() {
  const authContext = useAuth();
  const [datas, setDatas] = useState([]);
  const [datas2, setDatas2] = useState([]);

  useEffect(() => refreshInventory(), []);
  useEffect(() => refreshSalesHistory(), []);
  
  function refreshInventory() {
    retrieveAllInventoryItems(authContext.username)
      .then((response) => {
        setDatas(response.data);
      })
      .catch((error) => console.log(error));
  }
  function refreshSalesHistory() {
    getInvoiceHistoryList(authContext.username)
      .then((response) => {
        setDatas2(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }

 

  return (
    <div  className="chartContainer">
      
      <SalesReportDropdown1 datas={datas}/>
      <SalesReportDropdown2 datas2={datas2}/>
    </div>
  );
}
