import React from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { Rolling } from "react-loading-io";
import func from "../../../../../../utils/common.functions";
import * as constants from "../../../../../../utils/constant";
import FileWithExtension from "../../../../../../components/Shared/FileWithExtension/FileWithExtension";

const FollowUpList = ({
  fupList,
  switchControl,
  styleAgGrid,
  caseFollowUps,

}) => {

  const clickHandler = () => {
    switchControl(fupList ? "" : constants.FUP_LIST);
  };

  const docRenderer = (val) => {
    const docs = val.data.followUpDocs;
    const res =
      docs &&
      docs.map((doc, key) => {
        return (
          <FileWithExtension
            key={key}
            fileExtension={doc.fileExtention}
            originalFileName={doc.newFileName}
            filePath={doc.newFilePath}
          />
        );
      });

    return res;
  };

  const caseFollowUpsColumnDefs = [
    {
      width: 50,
      field: "",
      headerName: "Sr.",
      valueFormatter: func.agGetSerialNumber,
    },
    {

      width: 150,
      tooltipField: "fupText",
      field: "fupText",
      headerName: "Telecaller Text",
      valueFormatter: func.agStringFormatter,
    },
    {
      width: 80,
      field: "fupMobile",
      headerName: "Mobile",
      valueFormatter: func.agNumberHyphenFormatter,
    },
    {
      width: 90,
      field: "flagTrueCallerVerified",
      headerName: "Truecaller",
      valueFormatter: func.agStringFormatter,
    },
    {
      width: 130,
      field: "fupDate",
      headerName: "Follow-Up Date",
      valueFormatter: func.agDateTimeFormatter,
    },
    {
      width: 140,
      field: "fupDueDatetime",
      headerName: "Next Follow-Up Due On",
      valueFormatter: func.dateFormatter,

    },
    {
      width: 70,
      field: "fupCallConnected",
      headerName: "Connected",
      valueFormatter: func.agStringFormatter,
    },
    {
      width: 70,
      field: "fupStatus",
      headerName: "Status",
      valueFormatter: func.agStatusFormatter,
    },
    {
      width: 100,
      tooltipField: "byCompany",
      field: "byCompany",
      headerName: "By",
      valueFormatter: func.agStringFormatter,
    },
    {
      width: 100,
      tooltipField: "Docs",
      field: "followUpDocs",
      headerName: "Docs",
      cellRendererFramework: docRenderer,
    },
  ];

  return (
    <li
      className={"nav-item custom-width-followup" + (fupList ? " active" : "")}
    >
      <div className="sub-content-wrapper">
        <a className="nav-link" href="#" onClick={clickHandler}>
          <span className="mdi mdi-notebook"></span>
          <span className="text-title">Follow-up List</span>
        </a>
        {
          <div
            className={"sub-content pt" + (fupList ? " " : " d-none")}
            style={{ height: "280px", fontSize: "12px", fontWeight: "normal" }}
          >
            <AgGridReact
              columnDefs={caseFollowUpsColumnDefs}
              rowData={caseFollowUps}
              tooltipShowDelay={0}
              enableBrowserTooltips={true}
              enableCellTextSelection={true}
              suppressRowClickSelection={true}
              suppressCopyRowsToClipboard={true}
              rowSelection={'single'}
            ></AgGridReact>
          </div>
        }
      </div>
    </li>
  );
};

export default FollowUpList;
