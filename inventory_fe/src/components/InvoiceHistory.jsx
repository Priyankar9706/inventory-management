import { useState } from "react";
import "./InvoiceHistory.css";
import { useAuth } from "./security/AuthContext";
import { getInvoiceHistoryList } from "./api/TodoApiService";
import { useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportTable from "./ReportTable";
import Pagination from "./Pagination";
export default function InvoiceHistory() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [invoiceHistoryList, setInvoiceHistoryList] = useState([]);
  const[filteredInvoiceHistoryList,setFilteredInvoiceHistoryList]=useState([])
  const authContext = useAuth();
  const username = authContext.username;



  const[currentPage,setCurrentPage]=useState(1)
  const recordsPerPage=10;
 const lastIndex=currentPage*recordsPerPage;
 const firstIndex=lastIndex-recordsPerPage;

 const nPages=Math.ceil(filteredInvoiceHistoryList.length/recordsPerPage)
 const numbers=[...Array(nPages+1).keys()].slice(1)
 const records=filteredInvoiceHistoryList.slice(firstIndex,lastIndex)

  useEffect(() => getAllInvoicesList, []);

  function handleStartDateChange(event) {
    setStartDate(event.target.value);

  }

  function handleEndDateChange(event) {
    setEndDate(event.target.value);
  }

  useEffect(()=>{
     if(startDate && endDate){
      setFilteredInvoiceHistoryList(invoiceHistoryList.filter((list)=>list.date>=startDate && list.date<=endDate))
     }
    else if(startDate){

      setFilteredInvoiceHistoryList(invoiceHistoryList.filter((list)=>list.date>=startDate))
     }
     else if(endDate){
      setFilteredInvoiceHistoryList(invoiceHistoryList.filter((list)=>list.date<=endDate))
     }
     else{
      setFilteredInvoiceHistoryList(invoiceHistoryList)
     }
   
  },[startDate,endDate])

  function getAllInvoicesList() {
    getInvoiceHistoryList(username)
      .then((response) => {
        setInvoiceHistoryList(response.data);
        setFilteredInvoiceHistoryList(response.data)
        console.log(response.data[0].date);
        console.log(JSON.parse(response.data[0].grandTotal));
        // console.log(JSON.parse(response.data[0].data));
      })
      .catch((error) => console.log(error));
  }



  return (
    <div>
      <div className="dateFormat">
        <div className="mx-3 me-3">
          <label>Start Date</label>
          <br></br>
          <input type="date" onChange={handleStartDateChange} />
        </div>
        <div>
          <label>End Date</label>
          <br></br>
          <input type="date" onChange={handleEndDateChange} />
        </div>
      </div>

      <div className="accordianDiv">
        {records.map((list,id)=>{
            return(
                <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${id+1}`}
                      aria-expanded="true"
                      aria-controls={`collapse${id+1}`}
                    >
                      Accordion Item #1
                    </button>
                  </h2>
                  <div
                    id={`collapse${id+1}`}
                    class="accordion-collapse collapse "
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >

        <div className="mt-3">
        <div className="spanClass">
            <span className="mx-3"><strong>Date: {list.date}</strong></span>
            <PDFDownloadLink document={<ReportTable cartItems={JSON.parse(list.data)} grandTotal={JSON.parse(list.grandTotal)} />} filename="FORM">
            <span><button className="btn btn-success me-3">Download</button></span>
            </PDFDownloadLink>
   
        </div>
       <div>
       <table className="table table-striped ">
        <thead>
            <tr>
              <th>Serial No.</th>
              {/* <th>Id</th> */}
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price(₹)</th>
              <th>Total Rate</th>
    
            </tr>
          </thead>
          {/* <div class="accordion-body"> */}
          <tbody class="accordion-body">
                    {JSON.parse(list.data).map((data,index)=>{
                        return(
            
            <tr>
                <td>{index + 1}</td>
               
                <td>{data.item }</td>
                <td>{data.category}</td>
                <td>{data.quantity} {data.unit}</td>
                <td>{data.price}/{data.unit}</td>
                <td>{data.totalRate}</td>
           
              </tr>
                 
                       
                        )
                    })}
                     
    <tr>
      <td> </td>
      <td></td>
      <td></td>
      <td></td>
      <th scope="row"><strong>Grand Total:</strong></th>
      <th scope="row">{list.grandTotal}</th>

    </tr>
                   
                 </tbody>
                 {/* </div> */}
                 </table>
       </div>
                  </div>
                </div>
              </div>
              </div>
      
            )
        })}
       

      </div>
      {/* {filteredInvoiceHistoryList.length && <Pagination data={filteredInvoiceHistoryList} recordsPerPage={3} currentPage={currentPage} setCurrentPage={setCurrentPage}/>} */}
      <nav>
          <ul className="pagination">
            <li  className="page-item">
            {<a href="#" className={`page-link ${currentPage==1 ? "prevPageClass":""}`} onClick={prePage}>Prev</a>}
            </li>
            {
              numbers.map((n,i)=>(
                <li className={`page-item ${currentPage===n ? 'active' : ''}`} key={i}>
                  <a href="#" className="page-link" onClick={()=>changeCurrentPage(n)}>{n}</a>
                </li>
              ))
            }
             <li  className="page-item">
            <a href="#"  className={`page-link ${currentPage==nPages ? "prevPageClass":""}`} onClick={nextPage}>Next</a>
            </li>
          </ul>
        </nav>
    </div>
  );


  function nextPage(){
    if(currentPage!==nPages){
      setCurrentPage(currentPage+1)
    }
  }
  function prePage(){
      if(currentPage!==1){
        setCurrentPage(currentPage-1)
      }
  }
  function changeCurrentPage(n){
      setCurrentPage(n)
  }
}
