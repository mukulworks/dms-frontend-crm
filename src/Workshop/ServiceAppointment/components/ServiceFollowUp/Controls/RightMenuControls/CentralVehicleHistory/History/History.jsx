import React from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import func from "../../../../../../../../utils/common.functions";

const HeaderComponent = () => {
  return (
    <div className="ag-cell-label-container">
      <div className="alignTextCenter">RT</div>
    </div>
  );
};

const History = ({ control, styleObject }) => {
  return (
    <div className="card border-0 bg-transparent">
      <div className="card-body px-0 py-2">
        <h6 className="card-title mb-0 px-2 font-weight-bold">
          Service History <span className="mdi mdi-chat ml-2"></span>{" "}
        </h6>
        <hr className="mt-1 mb-1" />
        <div className="px-2 table-section overflow-auto">
          <p className="mb-1 font-14 font-weight-normal">Owner Details</p>
          <div
            style={{
              height: "65px",
              fontSize: "11px",
              fontWeight: "normal",
              background: "white",
            }}
          >
            <AgGridReact
              rowData={control.ownerDetails}
              defaultColDef={styleObject.defaultColDef}
            >
              <AgGridColumn
                width="50px"
                valueGetter={func.agGetSerialNumber}
                headerName="Sr."
              ></AgGridColumn>
              <AgGridColumn
                width="70px"
                field="custMasterSerial"
                headerName="CCID"
              ></AgGridColumn>
              <AgGridColumn
                width="250px"
                field="name"
                headerName="Name"
              ></AgGridColumn>
              <AgGridColumn
                width="100px"
                field="ownerDate"
                headerName="Start Date"
                valueFormatter={func.dateFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="150px"
                field="entity"
                headerName="Entity"
                valueFormatter={func.agStringFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="150px"
                field="panNo"
                headerName="PAN NO"
                valueFormatter={func.agStringFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="150px"
                field="gstNo"
                headerName="GST NO"
                valueFormatter={func.agStringFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="370px"
                field="gstName"
                headerName="GST Name"
                valueFormatter={func.agStringFormatter}
              ></AgGridColumn>
            </AgGridReact>
          </div>
          <p className="mb-1 font-14 font-weight-normal">Address Details</p>
          <div style={styleObject.tableStyle}>
            <AgGridReact
              rowData={control.serviceHistory}
              defaultColDef={styleObject.defaultColDef}
            >
              <AgGridColumn
                width="150px"
                field="repairOrder"
                headerName="RO"
                // headerComponentFramework={HeaderComponent}
                // cellStyle={styleObject.fontColor}
              ></AgGridColumn>
              <AgGridColumn
                width="70px"
                field="repeat"
                headerName="Repeat"
                valueFormatter={func.numberFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="70px"
                field="openedOn"
                headerName="Opened"
                valueFormatter={func.dateFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="50px"
                field="bookingSerial"
                headerName="Bkg No"
                valueFormatter={func.numberFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="100px"
                field="advisor"
                headerName="Advisor"
              ></AgGridColumn>
              <AgGridColumn
                width="100px"
                field="repairType"
                headerName="Repair Type"
                valueFormatter={func.agStringFormatter}
                // cellStyle={styleObject.fontColor}
              ></AgGridColumn>
              <AgGridColumn
                width="70px"
                field="insuCompany"
                headerName="Insu"
                valueFormatter={func.agStringFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="50px"
                field="kms"
                headerName="Kms"
                valueFormatter={func.numberFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="80px"
                field="invoiceDate"
                headerName="Closed"
                valueFormatter={func.dateFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="70px"
                field="mainEst"
                headerName="Main Est"
                valueFormatter={func.numberFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="70px"
                field="suppEst"
                headerName="Supp Est"
                valueFormatter={func.numberFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="70px"
                field="invNo"
                headerName="Invoice"
                valueFormatter={func.numberFormatter}
                // cellStyle={styleObject.fontColorAlign}
              ></AgGridColumn>
              <AgGridColumn
                width="50px"
                field="instantFeedback"
                headerName="IFB"
                valueFormatter={func.agStringFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="70px"
                field="interval"
                headerName="Interval"
                valueFormatter={func.numberFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="40px"
                field="avg"
                headerName="Avg"
                valueFormatter={func.numberFormatter}
              ></AgGridColumn>
            </AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
