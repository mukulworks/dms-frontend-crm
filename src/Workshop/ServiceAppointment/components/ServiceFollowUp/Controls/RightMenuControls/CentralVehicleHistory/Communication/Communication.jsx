import React from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import func from "../../../../../../../../utils/common.functions";

const Communication = ({ control, styleObject }) => {
  let id = 0;
  function getRowId() {
    id = id + 1;
    return id + ".";
  }

  return (
    <div className="card border-0 bg-transparent">
      <div className="card-body px-0 py-2">
        <div className="col-12 col-sm-12 col-md-auto page-title py-0">
          <h1
            className="d-inline-block card-title mb-0 px-2 font-weight-bold"
            id="dealerName"
          >
            Communication
          </h1>
          <h1 className="d-inline-block">
            <span className="mdi mdi-chat ml-2"></span>
          </h1>
          <a
            href=""
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="mdi mdi-dots-horizontal"></span>
          </a>
          <div className="dropdown-menu item-style">
            <a className="dropdown-item" href="">
              External Communication
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="">
              Internal Communication
            </a>
          </div>
        </div>
        <hr className="mt-2 mb-2" />

        <div className="px-2 table-section overflow-auto">
          <div style={styleObject.tableStyle}>
            <AgGridReact
              rowData={control.vehicleCommunicationList}
              defaultColDef={styleObject.defaultColDef}
            >
              <AgGridColumn
                width="40px"
                valueGetter={func.agGetSerialNumber}
                headerName="Sr."
              ></AgGridColumn>
              <AgGridColumn
                width="80px"
                field="eventId"
                headerName="Event Id"
                valueFormatter={func.agNumberHyphenFormatter}
                // cellStyle={styleObject.fontColorAlign}
              ></AgGridColumn>
              <AgGridColumn
                width="400px"
                field="eventDesc"
                headerName="Description"
                valueFormatter={func.agStringFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="100px"
                field="count"
                headerName="Count"
                valueFormatter={func.numberFormatter}
              ></AgGridColumn>
            </AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;
