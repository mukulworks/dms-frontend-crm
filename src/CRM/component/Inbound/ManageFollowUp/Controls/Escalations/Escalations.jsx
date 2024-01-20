import React from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { Rolling } from "react-loading-io";
import func from "../../../../../../utils/common.functions";
import * as constants from "../../../../../../utils/constant";

const Escalations = ({ actLog, switchControl, data }) => {
  const clickHandler = () => {
    switchControl(actLog ? "" : constants.ESCALATIONS);
  };

  const createDateFormatter = (params) => {
    const createDate = func.agDateTimeFormatter({
      value: params?.data?.createdOn,
    });
    return <span title={createDate}>{createDate}</span>;
  };

  const escalationsColumnDefs = [
    {
      width: "30px",
      field: "",
      headerName: "Sr.",
      valueGetter: func.agGetSerialNumber,
    },
    {
      width: "190px",
      field: "empName",
      headerName: "Name",
      valueFormatter: func.agStringFormatter,
      tooltipField: "empName",
    },
    {
      width: "130px",
      field: "empEmail",
      headerName: "Email",
      valueFormatter: func.agStringFormatter,
      tooltipField: "empEmail",
    },
    {
      width: "110px",
      field: "empMobile",
      headerName: "Mobile",
      valueFormatter: func.agStringFormatter,
      tooltipField: "empMobile",
    },
    {
      width: "130px",
      field: "createdOn",
      headerName: "Create Date",
      cellRendererFramework: createDateFormatter,
    },
  ];

  return (
    <li className={"nav-item activityLog" + (actLog ? " active" : "")}>
      <div className="sub-content-wrapper">
        <a className="nav-link" href="#" onClick={clickHandler}>
          <span className="mdi mdi-notebook"></span>
          <span className="text-title">Escalations</span>
        </a>
        {
          <div
            className={"sub-content pt" + (actLog ? " " : " d-none")}
            style={{ height: "280px", fontSize: "12px", fontWeight: "normal" }}
          >
            <AgGridReact
              columnDefs={escalationsColumnDefs}
              rowData={data}
              tooltipShowDelay={0}
              enableBrowserTooltips={true}
            ></AgGridReact>
          </div>
        }
      </div>
    </li>
  );
};

export default Escalations;
