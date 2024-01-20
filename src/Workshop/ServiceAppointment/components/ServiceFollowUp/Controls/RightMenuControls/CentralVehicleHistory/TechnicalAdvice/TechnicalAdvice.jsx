import React from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import func from "../../../../../../../../utils/common.functions";

const TechnicalAdvice = ({ control, styleObject }) => {
  return (
    <div className="card border-0 bg-transparent">
      <div className="card-body px-0 py-2">
        <h6 className="card-title mb-0 px-2 font-weight-bold">
          Technical Advice <span className="mdi mdi-chat ml-2"></span>{" "}
        </h6>
        <hr className="mt-1 mb-1" />
        <div className="px-2 table-section overflow-auto">
          <div style={styleObject.tableStyle}>
            <AgGridReact
              rowData={control.technicalAdviceResponseList}
              defaultColDef={styleObject.defaultColDef}
            >
              <AgGridColumn
                width="50px"
                valueGetter={func.agGetSerialNumber}
                headerName="Sr."
              ></AgGridColumn>
              <AgGridColumn
                width="200px"
                field="dealer"
                headerName="Dealer"
                valueFormatter={func.agStringFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="100px"
                field="outlet"
                headerName="Outlet"
                valueFormatter={func.agStringFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="150px"
                field="repairOrder"
                headerName="RO"
                // cellStyle={styleObject.fontColorAlign}
              ></AgGridColumn>
              <AgGridColumn
                width="90px"
                field="openedOn"
                headerName="Opened"
                valueFormatter={func.dateFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="90px"
                field="invNo"
                headerName="Inv No"
                valueFormatter={func.numberFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="350px"
                field="text"
                headerName="Text"
                valueFormatter={func.agStringFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="90px"
                field="dueDate"
                headerName="Due Date"
                valueFormatter={func.dateFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="80px"
                field="kms"
                headerName="KMS"
                valueFormatter={func.numberFormatter}
              ></AgGridColumn>
            </AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalAdvice;
