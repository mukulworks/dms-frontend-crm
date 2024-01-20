import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Maps from 'fusioncharts/fusioncharts.maps';
import useFetchChartData from '../../../Hooks/useFetchChartData'
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import worldwithcountries from "fusionmaps/maps/fusioncharts.worldwithcountries";
ReactFC.fcRoot(FusionCharts,Maps,worldwithcountries, FusionTheme);

const Country = ({ sectionControl, data, refresh }) => {

  let { chartData } = useFetchChartData(sectionControl, data, refresh)
  
  const chartConfigs = {
      type: "maps/worldwithcountries", 
      width: "100%", 
      height: "300", 
      color:"green",
      renderAt:'chart-container',
      dataFormat: "json", 
      dataSource: {
          chart: {
            theme: "fusion",
            valuefontsize:"5",
            showBorder: "1",
            borderAlpha: "9",
            showLegend: "0",
            showCanvasBorder: "0"
          },
          colorrange: {
            color : [
              
              {
                   "minvalue":"0",                        
                  "maxvalue": "100",                        
                  "code": "#26d3ca"
              },
              {
                "minvalue": "100",
                "maxvalue": "1000000",
                "code": "#00800D"
              }
              
            ]
        },
        data: chartData?.dataWithLabels,
      }
  };
  return(
      <ReactFC {...chartConfigs} />
    )
  }

 
  
  export default Country