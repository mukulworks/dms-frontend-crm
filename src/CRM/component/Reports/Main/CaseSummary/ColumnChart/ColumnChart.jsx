import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { CDN_BASE_URL } from "../../../../../../utils/constant";

const ColumnChart = ({ chartData }) => {
  ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

  const columnChartConfigs = {
    type: "column2d",
    width: "100%",
    height: "150",
    dataFormat: "json",
    dataSource: {
      chart: {
        logoURL: `${CDN_BASE_URL}/PRODUCT_IMAGES/${window.brandCode}/LOGO/tn_LOGO.JPG`,
        logoAlpha: "40",
        logoScale: "60",
        logoPosition: "TL",
        xaxisvalueFontSize: "10",
        yaxisvalueFontSize: "10",
        xaxisvalueFontColor: "4D565C",
        yaxisvalueFontColor: "4D565C",
        labelFontSize: "10",
        theme: "fusion",
        palettecolors: "C4C4C4,4AA82D,4AA82D",
        showLegend: "1",
        xaxislinecolor: "#B8B8B8",
        yaxislinecolor: "#B8B8B8",
        showxaxisline: "1",
        showyaxisline: "1",
        interactiveLegend: "0",
      },
      data: chartData,
    },
  };

  return (
    <div>
      <ReactFC {...columnChartConfigs}></ReactFC>
    </div>
  );
};

export default ColumnChart;
