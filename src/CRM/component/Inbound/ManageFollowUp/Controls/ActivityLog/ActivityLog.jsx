import React from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { Rolling } from "react-loading-io";
import func from "../../../../../../utils/common.functions";
import * as constants from "../../../../../../utils/constant";

const ActivityLog = ({
  actLog,
  switchControl,
  styleAgGrid,
  caseActivityLog,
}) => {
  const clickHandler = () => {
    switchControl(actLog ? "" : constants.ACTIVITY_LOG);
  };

  const getUserName = (params) => {
    return `${params.data.logDealerId}-${params.data.userName}`;
  };

  const caseActivityLogColumnDefs = [
    {
      width: "30px",
      field: "",
      headerName: "Sr.",
      valueGetter: func.agGetSerialNumber,
    },
    {
      width: "190px",
      field: "actionDescription",
      headerName: "Description",
      valueFormatter: func.agStringFormatter,
      tooltipField: "actionDescription",
    },
    {
      width: "130px",
      field: "logDateTime",
      headerName: "Date",
      valueFormatter: func.agDateTimeFormatter,
    },
    {
      width: "110px",
      field: "userName",
      headerName: "By",
      valueFormatter: getUserName,
    },
    {
      width: "90px",
      field: "logIpAddress",
      headerName: "IP Address",
      valueFormatter: func.agStringFormatter,
    },
  ];

  return (
    <li className={"nav-item activityLog" + (actLog ? " active" : "")}>
      <div className="sub-content-wrapper">
        <a className="nav-link" href="#" onClick={clickHandler}>
          <span className="mdi mdi-notebook"></span>
          <span className="text-title">Activity Log</span>
        </a>
        {
          <div
            className={"sub-content pt" + (actLog ? " " : " d-none")}
            style={{ height: "280px", fontSize: "12px", fontWeight: "normal" }}
          >
            <AgGridReact
              columnDefs={caseActivityLogColumnDefs}
              rowData={caseActivityLog}
              tooltipShowDelay={0}
              enableBrowserTooltips={true}
            ></AgGridReact>
          </div>
        }
      </div>
    </li>
  );
};

export default ActivityLog;
