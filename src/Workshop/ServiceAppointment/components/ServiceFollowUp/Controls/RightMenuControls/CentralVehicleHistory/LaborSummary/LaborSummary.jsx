import React from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import func from "../../../../../../../../utils/common.functions";

const LaborSummary = ({ control, styleObject }) => {
  return (
    <div className="card border-0 bg-transparent">
      <div className="card-body px-0 py-2">
        <h6 className="card-title mb-0 px-2 font-weight-bold">
          Labour Summary <span className="mdi mdi-chat ml-2"></span>{" "}
        </h6>
        <hr className="mt-1 mb-1" />
        <div
          className="px-2 table-section overflow-auto"
          style={styleObject.tableStyle}
        >
          <AgGridReact
            rowData={control.laborList}
            defaultColDef={styleObject.defaultColDef}
          >
            <AgGridColumn
              width="140px"
              field="laborCode"
              headerName="LbrCode"
              valueFormatter={func.agNumberHyphenFormatter}
            ></AgGridColumn>
            <AgGridColumn
              width="250px"
              field="laborDescription"
              headerName="Description"
              valueFormatter={func.agStringFormatter}
            ></AgGridColumn>
            <AgGridColumn
              width="200px"
              field="card"
              headerName="Card#"
              valueFormatter={func.agStringFormatter}
            ></AgGridColumn>
            <AgGridColumn
              width="100px"
              field="date"
              headerName="Date"
              valueFormatter={func.dateFormatter}
            ></AgGridColumn>
            <AgGridColumn
              width="150px"
              field="kms"
              headerName="KMS"
              valueFormatter={func.numberFormatter}
            ></AgGridColumn>
            <AgGridColumn
              width="150px"
              field="type"
              headerName="Type"
              valueFormatter={func.agStringFormatter}
            ></AgGridColumn>
            <AgGridColumn
              width="150px"
              field="mechanic"
              headerName="Mechanic"
              valueFormatter={func.agStringFormatter}
            ></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default LaborSummary;
