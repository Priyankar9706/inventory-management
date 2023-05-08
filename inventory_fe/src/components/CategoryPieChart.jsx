import { useState } from "react";
import Chart from "react-google-charts";
import { retrieveAllInventoryItems } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect } from "react";

export default function CategoryPieChart(){

    const authContext = useAuth();
    const[datas,setDatas]=useState([])
    const[data,setData]=useState([])


    useEffect(()=>refreshInventory(),[])
    useEffect(()=>  getCategoryCount(),[datas])

    function getCategoryCount(){
        const filterData = datas.map((data) => {
            return [data.item,data.category.categoryName,data.quantity];
          });

          setData([["Item","Category","Count"],
          ...filterData
      ])
        }





    function refreshInventory() {
        retrieveAllInventoryItems(authContext.username)
          .then((response) => {
            setDatas(response.data);
          
          })
          .catch((error) => console.log(error));
      }
    
 

     const options = {

        chartArea: { left: 15, top: 15, right: 0, bottom: 0 },
        pieSliceText: "label",
      };
    return (
        <Chart
          chartType="PieChart"
          width="80%"
          height="400px"
          data={data}
          options={options}
          chartWrapperParams={{ view: { columns: [0, 2] } }}
          chartPackages={["corechart", "controls"]}
          controls={[
            {
            //   controlEvents: [
            //     {
            //       eventName: "statechange",
            //       callback: ({ chartWrapper, controlWrapper }) => {
            //         console.log("State changed to", controlWrapper?.getState());
            //       },
            //     },
            //   ],
              controlType: "CategoryFilter",
              options: {
                filterColumnIndex: 1,
                ui: {
                  labelStacking: "vertical",
                  label: "Category Selection:",
                  allowTyping: false,
                  allowMultiple: false,
                },
                
              },
            },
          ]}
        />
      );
    }
    