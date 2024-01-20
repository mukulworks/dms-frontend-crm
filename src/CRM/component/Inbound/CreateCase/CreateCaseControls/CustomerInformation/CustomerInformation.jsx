import React from "react";
import * as constants from "../../../../../../utils/constant";
import func from "../../../../../../utils/common.functions";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);

const CustomerInformation = ({ cust, switchControl, customerInfo }) => {
  let mobileIndex = 0;
  let emailIndex = 0;
  let mobilealternativeIndex = 0;
  let emailAlternativeIndex = 0;
  const clickHandler = () => {
    switchControl(cust ? "" : constants.CUSTOMER_INFORMATION);
  };

  const calcTotal = () => {
    return (
      customerInfo?.customerCaseAnalysis?.preSalesCaseCount +
      customerInfo?.customerCaseAnalysis?.bookingCaseCount +
      customerInfo?.customerCaseAnalysis?.salesCaseCount +
      customerInfo?.customerCaseAnalysis?.serviceCaseCount
    );
  };

  const dataSource = {
    chart: {
      //   caption: "Top 5 countries with Global Oil Reserves",
      //   subcaption: "MMbbl= One Million barrels",
      //   enablesmartlabels: "1",
      //   showlabels: "1",
      //   numbersuffix: " MMbbl",
      //   usedataplotcolorforlabels: "1",
      //   plottooltext: "$label, <b>$value</b> MMbbl",
      theme: "fusion",
      showLegend: "0",
      showLabels: "0",
      //   labelFontColor: "0075c2",
      //   labelFontSize: "1",
      showValues: "1",
      valuePosition: "0",
      minAngleForValue: "75",
      defaultCenterLabel: `Total Cases ${calcTotal()}`,
      centerLabel: `$label: $value`, //Work on mouse hover
      centerLabelBold: "1",
      chartLeftMargin: "1",
      chartTopMargin: "1",
      chartRightMargin: "1",
      chartBottomMargin: "1",
      pieRadius: "70",
      doughnutRadius: "50",
      captionPadding: "-10",
    },
    data: [
      {
        label: "Pre-Sales",
        value: customerInfo?.customerCaseAnalysis?.preSalesCaseCount,
        color: "#ffc107",
        // showLabels: "0",
      },
      {
        label: "Booking",
        value: customerInfo?.customerCaseAnalysis?.bookingCaseCount,
        color: "#dc3545",
        // showLabels: "0",
      },
      {
        label: "Sales",
        value: customerInfo?.customerCaseAnalysis?.salesCaseCount,
        color: "#007bff",
      },
      {
        label: "Service",
        value: customerInfo?.customerCaseAnalysis?.serviceCaseCount,
        color: "#28a745",
      },
    ],
  };

  return (
    <li className={"nav-item customer-info" + (cust ? " active" : "")}>
      <div className="sub-content-wrapper">
        <a className="nav-link" href="#" onClick={clickHandler}>
          <span className="mdi mdi-account-outline"></span>{" "}
          <span className="text-title">Customer Information</span>
        </a>
        <div className={"sub-content pt-0" + (cust ? " " : " d-none")}>
          <div className="row bg-light  pt-2 px-2 pb-2">
            <div className="col-12 mb-2">
              <div className="card p-2">
                <div className="row">
                  <div className="col-auto text-center font-16">
                    <i className="mdi mdi-account"></i>
                  </div>
                  <div className="col-10 pl-0">
                    <strong>
                      {customerInfo?.custTitle} {customerInfo?.custFirstName}
                      &nbsp;{customerInfo?.custMiddleName}&nbsp;
                      {customerInfo?.custLastName}
                    </strong>
                    <span className="status bg-secondary ml-2">
                      {customerInfo.custType === "I"
                        ? "Individual"
                        : "Business"}
                    </span>
                    <p className="text-success mb-0">
                      CCMS-ID/PID:{" "}
                      {func.emptyStringFormatter(
                        customerInfo?.custMasterSerial
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="card border-0 mb-2">
                <div className="card-header border p-1 px-2">
                  Primary Contact
                </div>
                <div className="card-body bg-light p-1 px-2">
                  <ul className="nav flex-column">
                    <li className="mb-2">
                      <span className="mdi mdi-cellphone-iphone font-16"></span>
                      +91{" "}
                      {customerInfo?.primaryContacts?.map((x) => {
                        if (x.type == "MOBILE") {
                          mobileIndex++;
                          return (mobileIndex > 1 ? ", +91 " : "") + x.value;
                        }
                      })}
                    </li>
                    <li>
                      <span className="mdi mdi-email font-16"></span>{" "}
                      {customerInfo?.primaryContacts?.map((x) => {
                        if (x.type == "EMAIL") {
                          emailIndex++;
                          return (emailIndex > 1 ? ", " : "") + x.value;
                        }
                      })}
                    </li>
                  </ul>
                </div>
              </div>
              {customerInfo?.alternateContact && (
                <div className="card border-0">
                  <div className="card-header border p-1 px-2">
                    Alternate Contact
                  </div>
                  <div className="card-body bg-light p-1 px-2">
                    <ul className="nav flex-column">
                      <li className="mb-2">
                        <span className="mdi mdi-cellphone-iphone font-16"></span>{" "}
                        {customerInfo?.alternateContacts?.map((x) => {
                          if (x.type == "MOBILE") {
                            mobilealternativeIndex++;
                            return (
                              (mobilealternativeIndex > 1 ? ", +91 " : "") +
                              x.value
                            );
                          }
                        })}
                      </li>
                      <li>
                        <span className="mdi mdi-email font-16"></span>{" "}
                        {customerInfo?.alternateContacts?.map((x) => {
                          if (x.type == "MOBILE") {
                            emailAlternativeIndex++;
                            return (
                              (emailAlternativeIndex > 1 ? ", " : "") + x.value
                            );
                          }
                        })}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className="col-6 pl-0">
              <div className="card p-2 px-3 h-100">
                <p className="">Customer Complaint Analysis</p>
                <ReactFusioncharts
                  type="doughnut2d"
                  width="300"
                  height="250"
                  dataFormat="JSON"
                  dataSource={dataSource}
                />
                <div className="row">
                  <div className="col-6">
                    {/* <p className="mb-1"><span className="p-1 bg-warning rounded-circle d-inline-block mr-2" width="20" height="20"></span>{customerInfo?.customerCaseAnalysis.preSalesCaseCount}</p> */}
                    <p className="mb-1">
                      <span
                        className="p-1 bg-warning rounded-circle d-inline-block mr-2"
                        width="20"
                        height="20"
                      ></span>
                      Pre-Sales
                    </p>
                  </div>
                  <div className="col-6">
                    {/* <p className="mb-1"><span className="p-1 bg-danger rounded-circle d-inline-block mr-2" width="20" height="20"></span>{customerInfo?.customerCaseAnalysis.bookingCaseCount}</p> */}
                    <p className="mb-1">
                      <span
                        className="p-1 bg-danger rounded-circle d-inline-block mr-2"
                        width="20"
                        height="20"
                      ></span>
                      Booking
                    </p>
                  </div>
                  <div className="col-6">
                    {/* <p className="mb-1"><span className="p-1 bg-primary rounded-circle d-inline-block mr-2" width="20" height="20"></span>{customerInfo?.customerCaseAnalysis.salesCaseCount}</p> */}
                    <p className="mb-1">
                      <span
                        className="p-1 bg-primary rounded-circle d-inline-block mr-2"
                        width="20"
                        height="20"
                      ></span>
                      Sales
                    </p>
                  </div>
                  <div className="col-6">
                    {/* <p className="mb-1"><span className="p-1 bg-success rounded-circle d-inline-block mr-2" width="20" height="20"></span>{customerInfo?.customerCaseAnalysis.serviceCaseCount}</p> */}
                    <p className="mb-1">
                      <span
                        className="p-1 bg-success rounded-circle d-inline-block mr-2"
                        width="20"
                        height="20"
                      ></span>
                      Service
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default CustomerInformation;
