import { useEffect } from "react";
import Chart from "react-google-charts";

export default function PieChart(props){

    const options = {
        title: props.title,
        is3D: true,
        
      };



    return(
    
            <Chart
                    chartType="PieChart"
                    data={props.data}
                    options={options}
                    width={"100%"}
                    height={"300px"}
    />
        
    )
}