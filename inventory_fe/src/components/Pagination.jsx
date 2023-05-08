import { useState } from "react";

export default function Pagination(props){

   
    const recordsPerPage=props.recordsPerPage;
   const nPages=Math.ceil(props.data.length/recordsPerPage)
   const numbers=[...Array(nPages+1).keys()].slice(1)
 

    return(
        <nav>
        <ul className="pagination">
          <li  className="page-item">
          {<a href="#" className={`page-link ${props.currentPage==1 ? "prevPageClass":""}`} onClick={prePage}>Prev</a>}
          </li>
          {
            numbers.map((n,i)=>(
              <li className={`page-item ${props.currentPage===n ? 'active' : ''}`} key={i}>
                <a href="#" className="page-link" onClick={()=>changeCurrentPage(n)}>{n}</a>
              </li>
            ))
          }
           <li  className="page-item">
          <a href="#"  className={`page-link ${props.currentPage==nPages ? "prevPageClass":""}`} onClick={nextPage}>Next</a>
          </li>
        </ul>
      </nav>
    )


    
  function nextPage(){
    if(props.currentPage!==nPages){
        props.setCurrentPage(props.currentPage+1)
    }
  }
  function prePage(){
      if(props.currentPage!==1){
        props.setCurrentPage(props.currentPage-1)
      }
  }
  function changeCurrentPage(n){
    props.setCurrentPage(n)
  }
}