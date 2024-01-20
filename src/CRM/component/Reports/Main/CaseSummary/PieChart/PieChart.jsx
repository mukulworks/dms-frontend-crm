import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Pie from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { CDN_BASE_URL } from "../../../../../../utils/constant";
const PieChart = ({ chartData }) => {
  ReactFC.fcRoot(FusionCharts, Pie, FusionTheme);

  const pieChartConfigs = {
    type: "pie3d",
    width: "100%",
    height: "150",
    color: "green",
    dataFormat: "json",
    dataSource: {
      chart: {
        logoURL: `${CDN_BASE_URL}/PRODUCT_IMAGES/${window.brandCode}/LOGO/tn_LOGO.JPG`,
        logoAlpha: "40",
        logoScale: "60",
        logoPosition: "TL",
        showvalues: "1",
        legendNumRows: "1",
        legendPosition: "bottom-right",
        //legendNumColumns:"4",
        valuefontsize: "10",
        valuefontcolor: "4D565C",
        legendItemFontSize: "12",
        legendItemFontColor: "4D565C",
        showpercentvalues: "0",
        showpercentintooltip: "0",
        enablemultislicing: "1",
        theme: "fusion",
        paletteColors: "4AA82D,C4C4C4,514C4C,ADE99A",
      },

      data: chartData,
    },
  };

  return (
    <div>
      <ReactFC {...pieChartConfigs}></ReactFC>
    </div>
  );
};

export default PieChart;
