import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { Rolling } from "react-loading-io";
import {
  showCircularLoader,
  hideCircularLoader,
} from "../../../../../store/actions/serviceAppointmentAction";
import { fetchMaintenanceSchedule } from "../../../../../store/services/manageFollowUpService";
import func from "../../../../../../../utils/common.functions";

const MaintenanceSchedule = ({ requestData, switchControl, msOpen }) => {
  const dispatch = useDispatch();
  const { isCircularLoading } = useSelector((state) => {
    return state.serviceAppointment;
  });

  const [maintenanceScheduleData, setMaintenanceScheduleData] = useState([]);
  const clickHandler = () => {
    switchControl(msOpen ? "" : "ms");

    if (maintenanceScheduleData.length > 0) {
      return "";
    } else {
      dispatch(showCircularLoader());
      const apiData = fetchMaintenanceSchedule(requestData);
      Promise.resolve(apiData)
        .then((res) => {
          if (res !== null) {
            dispatch(hideCircularLoader());
            setMaintenanceScheduleData(res);
          }
        })
        .catch((error) => {
          dispatch(hideCircularLoader());
          setMaintenanceScheduleData(error);
        });
    }
  };

  const styleAgGrid = {
    alignCenter: {
      "text-align": "center",
    },
    defaultColDef: {
      resizable: true,
    },
  };

  return (
    <li
      className={"nav-item" + (msOpen ? " active" : "")}
      id="maintence-schedule-link"
    >
      <div className="sub-content-wrapper">
        <a className="nav-link" href="#" onClick={clickHandler}>
          <span className="mdi mdi-clock-time-five"></span>
          <span className="text-title">Maintenance Schedule</span>
        </a>
        {isCircularLoading ? (
          <div className={"sub-content" + (msOpen ? " " : " d-none")}>
            <Rolling size={30} thickness={5} speed={0.8} color="#DA251C" />
          </div>
        ) : (
          <div className={"sub-content" + (msOpen ? " " : " d-none")}>
            <ul
              className="nav nav-tabs nav-fill"
              id="myTab"
              role="tablist"
              style={{ fontSize: "11px" }}
            >
              {maintenanceScheduleData &&
                maintenanceScheduleData.map((maintenanceScheduleObj, key) => (
                  <li key={key} className="nav-item" role="presentation">
                    <a
                      className={
                        maintenanceScheduleObj.groupCode === "000243"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      id={maintenanceScheduleObj.groupCode + "-tab"}
                      data-toggle="tab"
                      href={"#" + maintenanceScheduleObj.groupCode}
                      role="tab"
                      aria-controls={maintenanceScheduleObj.groupCode}
                      aria-selected={
                        maintenanceScheduleObj.groupCode === "000243"
                          ? false
                          : true
                      }
                      style={{ padding: "2px" }}
                    >
                      {maintenanceScheduleObj.groupDesc}
                    </a>
                  </li>
                ))}
            </ul>
            <div className="tab-content" id="myTabContent">
              {maintenanceScheduleData &&
                maintenanceScheduleData.map((maintenanceScheduleObj, key) => (
                  <div
                    className={
                      maintenanceScheduleObj.groupCode === "000243"
                        ? "tab-pane fade p-3 show active"
                        : "tab-pane fade p-3"
                    }
                    id={maintenanceScheduleObj.groupCode}
                    role="tabpanel"
                    aria-labelledby={maintenanceScheduleObj.groupCode + "-tab"}
                    key={key}
                    style={{
                      height: "150px",
                      fontSize: "11px",
                      fontWeight: "normal",
                      background: "white",
                    }}
                  >
                    <AgGridReact
                      rowData={maintenanceScheduleObj.maintenanceSchedule}
                      defaultColDef={styleAgGrid.defaultColDef}
                    >
                      <AgGridColumn
                        width="30px"
                        headerName="Sr."
                        valueGetter={func.agGetSerialNumber}
                        cellStyle={styleAgGrid.alignCenter}
                      ></AgGridColumn>
                      <AgGridColumn
                        width="100px"
                        field="description"
                        headerName="Description"
                        valueFormatter={func.agStringFormatter}
                      ></AgGridColumn>
                      <AgGridColumn
                        width="40px"
                        field="action"
                        headerName="Action"
                        valueFormatter={func.agStringFormatter}
                        cellStyle={styleAgGrid.alignCenter}
                      ></AgGridColumn>
                      <AgGridColumn
                        width="40px"
                        field="kms"
                        headerName="KMS"
                        valueFormatter={func.agNumberHyphenFormatter}
                        cellStyle={styleAgGrid.alignCenter}
                      ></AgGridColumn>
                      <AgGridColumn
                        width="30px"
                        field="month"
                        headerName="M"
                        cellStyle={styleAgGrid.alignCenter}
                      ></AgGridColumn>
                      <AgGridColumn
                        width="30px"
                        field="advisor"
                        headerName="SA"
                        valueFormatter={func.agStringFormatter}
                      ></AgGridColumn>
                      <AgGridColumn
                        width="70px"
                        field="cust"
                        headerName="Cust"
                        valueFormatter={func.agStringFormatter}
                      ></AgGridColumn>
                      <AgGridColumn
                        width="40px"
                        field="laborCode"
                        headerName="Labuor Code"
                        valueFormatter={func.agNumberHyphenFormatter}
                        cellStyle={styleAgGrid.alignCenter}
                      ></AgGridColumn>
                      <AgGridColumn
                        width="40px"
                        field="laborAmt"
                        headerName="Lbr Amt"
                        valueFormatter={func.agNumberHyphenFormatter}
                        cellStyle={styleAgGrid.alignCenter}
                      ></AgGridColumn>
                      <AgGridColumn
                        width="40px"
                        field="partNo"
                        headerName="Part No"
                        valueFormatter={func.agNumberHyphenFormatter}
                        cellStyle={styleAgGrid.alignCenter}
                      ></AgGridColumn>
                      <AgGridColumn
                        width="40px"
                        field="qty"
                        headerName="Qty"
                        valueFormatter={func.agNumberHyphenFormatter}
                        cellStyle={styleAgGrid.alignCenter}
                      ></AgGridColumn>
                      <AgGridColumn
                        width="50px"
                        field="mrp"
                        headerName="MRP"
                        valueFormatter={func.agNumberHyphenFormatter}
                        cellStyle={styleAgGrid.alignCenter}
                      ></AgGridColumn>
                      <AgGridColumn
                        width="50px"
                        field="lastChange"
                        headerName="Last Change"
                        valueFormatter={func.agNumberHyphenFormatter}
                        cellStyle={styleAgGrid.alignCenter}
                      ></AgGridColumn>
                      <AgGridColumn
                        width="50px"
                        field="jobRef"
                        headerName="Job Ref."
                        valueFormatter={func.agNumberHyphenFormatter}
                        cellStyle={styleAgGrid.alignCenter}
                      ></AgGridColumn>
                    </AgGridReact>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default MaintenanceSchedule;
