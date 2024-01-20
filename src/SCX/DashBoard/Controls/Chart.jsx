import React from "react";
import { Rolling } from "react-loading-io";
import useFetchChartData from "../../../Hooks/useFetchChartData";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Funnel from "fusioncharts/fusioncharts.widgets";
import Pie from "fusioncharts/fusioncharts.charts";
import Column2D from "fusioncharts/fusioncharts.charts";
import Pareto2D from "fusioncharts/fusioncharts.charts";
import Line from "fusioncharts/fusioncharts.charts";
import Sunburst from "fusioncharts/fusioncharts.powercharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { CDN_BASE_URL } from "../../../utils/constant";
const Chart = ({ sectionControl, data, refresh }) => {
  const chartType = () => {
    switch (sectionControl?.control?.description) {
      case "FUNNEL":
        return Funnel;
      case "PIE_CHART":
        return Pie;
      case "STACKED_CHART":
        return Pie;
      case "COLUMN_CHART":
        return Column2D;
      case "PARETO_CHART":
        return Pareto2D;
      case "LINE_CHART":
        return Line;
      case "SUNBURST":
        return Sunburst;
      default:
        return Funnel;
    }
  };

  ReactFC.fcRoot(FusionCharts, chartType(), FusionTheme);
  let { chartData } = useFetchChartData(sectionControl, data, refresh);

  const funnelChartConfigs = {
    type: "funnel",
    width: "100%",
    height: "200",
    dataFormat: "json",
    dataSource: {
      chart: {
        logoURL: `${CDN_BASE_URL}/PRODUCT_IMAGES/${window.brandCode}/LOGO/tn_LOGO.JPG`,
        logoAlpha: "40",
        logoScale: "60",
        logoPosition: "TL",
        showLegend: "1",
        decimals: "1",
        isHollow: "1",
        is2D: "1",
        showvalues: "1",
        labelfontsize: "10",
        labelfontcolor: "4D565C",
        legendItemFontSize: "12",
        legendItemFontColor: "4D565C",
        palettecolors: "514C4C,C4C4C4,35A929,4AA82D",
        showpercentintooltip: "0",
        showPercentValues: "0",
        theme: "fusion",
        streamlineddata: "0",
      },
      data: chartData?.dataWithLabels,
    },
  };

  const pieChartConfigs = {
    type: "pie3d",
    width: "300",
    height: "200",
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

      data: chartData?.dataWithLabels,
    },
  };

  const columnChartConfigs = {
    type: "column2d",
    width: "100%",
    height: "200",
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
      data: chartData?.dataWithLabels,
    },
  };

  const paretoChartConfigs = {
    type: "pareto2D",
    width: "100%",
    height: "200",
    dataFormat: "json",
    dataSource: {
      chart: {
        logoURL: `${CDN_BASE_URL}/PRODUCT_IMAGES/${window.brandCode}/LOGO/tn_LOGO.JPG`,
        logoAlpha: "40",
        logoScale: "60",
        logoPosition: "TL",
        xaxislinecolor: "#B8B8B8",
        yaxislinecolor: "#B8B8B8",
        showxaxisline: "1",
        legendNumRows: "1",
        showyaxisline: "1",
        xaxisvalueFontSize: "10",
        yaxisvalueFontSize: "10",
        xaxisvalueFontColor: "4D565C",
        yaxisvalueFontColor: "4D565C",
        labelFontSize: "10",
        theme: "fusion",
        palettecolors: "#4AA82D",
        showLegend: "1",
        interactiveLegend: "0",
      },
      data: chartData?.dataWithLabels,
    },
  };

  const lineChartConfigs = {
    type: "line",
    width: "100%",
    height: "200",
    dataFormat: "json",
    dataSource: {
      chart: {
        logoURL: `${CDN_BASE_URL}/PRODUCT_IMAGES/${window.brandCode}/LOGO/tn_LOGO.JPG`,
        logoAlpha: "40",
        logoScale: "60",
        logoPosition: "TL",
        showValues: "0",
        valueFontColor: "#000000",
        valueFontSize: "12",
        rotateLabels: "0",
        labelFontSize: "10",
        flatScrollBars: "1",
        scrollheight: "10",
        numVisiblePlot: "12",
        theme: "fusion",
        palettecolors: "4AA82D,C4C4C4,4AA82D",
        showLegend: "1",
        xaxisvalueFontSize: "10",
        yaxisvalueFontSize: "10",
        xaxisvalueFontColor: "4D565C",
        yaxisvalueFontColor: "4D565C",
        labelFontSize: "10",
        xaxislinecolor: "#B8B8B8",
        yaxislinecolor: "#B8B8B8",
        showxaxisline: "1",
        showyaxisline: "1",
        interactiveLegend: "0",
      },
      data: chartData?.dataWithLabels,
    },
  };

  const sunburstChartConfigs = {
    type: "sunburst",
    renderAt: "container",
    width: "100%",
    height: "200",
    color: "green",
    dataFormat: "json",
    dataSource: {
      chart: {
        logoURL: `${CDN_BASE_URL}/PRODUCT_IMAGES/${window.brandCode}/LOGO/tn_LOGO.JPG`,
        logoAlpha: "40",
        logoScale: "60",
        logoPosition: "TL",
        theme: "fusion",
        showValues: "1",
        valuefontsize: "12",
        palettecolors: "C4C4C4,00800D,ADE99A,2CAB25",
        showPlotBorder: "1",
        animation: "1",
        animationDuration: "2",
        centerAngle: "360",
        legendNumRows: "1",
        legendItemFontSize: "8",
      },
      data: chartData?.sunBurstItems,
    },
  };

  const chartConfig = () => {
    switch (sectionControl?.control?.description) {
      case "FUNNEL":
        return funnelChartConfigs;
      case "PIE_CHART":
        return pieChartConfigs;
      case "STACKED_CHART":
        return pieChartConfigs;
      case "COLUMN_CHART":
        return columnChartConfigs;
      case "PARETO_CHART":
        return paretoChartConfigs;
      case "LINE_CHART":
        return lineChartConfigs;
      case "SUNBURST":
        return sunburstChartConfigs;
      default:
        break;
    }
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
        <ReactFC {...chartConfig()} />
      )}
    </React.Fragment>
  );
};

export default Chart;
