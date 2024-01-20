import React from "react";
import ReactFC from "react-fusioncharts";
import { Rolling } from "react-loading-io";
import useFetchChartData from "../../../Hooks/useFetchChartData";
import FusionCharts from "fusioncharts";
import Doughnut from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { CDN_BASE_URL } from "../../../utils/constant";
ReactFC.fcRoot(FusionCharts, Doughnut, FusionTheme);

const Doughnut3DChart = ({ sectionControl, data, refresh }) => {
  let { chartData } = useFetchChartData(sectionControl, data, refresh);
  const chartConfigs = {
    type: "doughnut3d",
    width: "100%",
    height: "200",
    dataFormat: "json",
    dataSource: {
      chart: {
        logoURL: `${CDN_BASE_URL}/PRODUCT_IMAGES/${window.brandCode}/LOGO/tn_LOGO.JPG`,
        logoAlpha: "40",
        logoScale: "60",
        logoPosition: "TL",
        doughnutRadius: "50",
        pieRadius: "80",
        showvalues: "1",
        showpercentintooltip: "0",
        enablemultislicing: "1",
        paletteColors: "2CAB25,E68312",
        theme: "fusion",
        labelfontsize: "10",
        labelfontcolor: "4D565C",
        valuefontsize: "10",
        valuefontcolor: "4D565C",
        legendItemFontSize: "12",
        legendItemFontColor: "4D565C",
        legendItemFontSize: "10",
        legendItemFontColor: "4D565C",
      },
      data: chartData?.dataWithLabels,
    },
  };

  return (
    <React.Fragment>
      {chartData === null ? (
        <div className="card-body p-1">
          <div className="row text-center">
            <div className="col">
              <Rolling size={30} thickness={5} speed={0.8} color="#42bd3b" />
            </div>
          </div>
        </div>
      ) : (
        <ReactFC {...chartConfigs} />
      )}
    </React.Fragment>
  );
};
export default Doughnut3DChart;
