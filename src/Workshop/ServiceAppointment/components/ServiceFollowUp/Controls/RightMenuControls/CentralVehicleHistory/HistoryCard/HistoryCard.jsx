import React from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import func from "../../../../../../../../utils/common.functions";

const HistoryCard = ({ control, styleObject }) => {
  const renderCustomerVoice = (params) => {
    return (
      <ul className="nav">
        {params?.value?.map((param) => {
          return <li className="w-100">{param.description}</li>;
        })}
      </ul>
    );
  };

  const renderIssuedPart = (params) => {
    return (
      <ul className="nav">
        {params?.value?.map((param) => {
          return <li className="w-100">{param.partDescription}</li>;
        })}
      </ul>
    );
  };

  const renderAddedLabor = (params) => {
    return (
      <ul className="nav">
        {params?.value?.map((param) => {
          return (
            <li className="w-100">
              {param.laborCode} - {param.description}
            </li>
          );
        })}
      </ul>
    );
  };
  const getRowHeight = (params) => {
    return 180;
  };
  return (
    <div className="card border-0 bg-transparent">
      <div className="card-body px-0 py-2">
        <h6 className="card-title mb-0 px-2 font-weight-bold">
          History Card <span className="mdi mdi-chat ml-2"></span>{" "}
        </h6>
        <hr className="mt-2 mb-2" />
        <div className="px-2 table-section overflow-auto">
          <div style={styleObject.tableStyle}>
            <AgGridReact
              getRowHeight={getRowHeight}
              rowData={control.vehicleHistoryCardList}
              defaultColDef={styleObject.defaultColDef}
            >
              <AgGridColumn
                width="70px"
                field="opened"
                headerName="Opened"
                valueFormatter={func.dateFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="70px"
                field="dealer"
                headerName="Dealer"
                valueFormatter={func.agStringFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="100px"
                field="jobCard"
                headerName="Job#"
                valueFormatter={func.agNumberHyphenFormatter}
                // cellStyle={styleObject.fontColorAlign}
              ></AgGridColumn>
              <AgGridColumn
                width="60px"
                field="kms"
                headerName="KMS"
                valueFormatter={func.numberFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="90px"
                field="repairType"
                headerName="Repair Type"
                valueFormatter={func.agStringFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="90px"
                field="invNo"
                headerName="Inv#"
                valueFormatter={func.agNumberHyphenFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="250px"
                field="jobCardComplaints"
                headerName="Complaints Recorded"
                cellRendererFramework={renderCustomerVoice}
                valueFormatter={func.agStringFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="290px"
                field="laborJobCards"
                headerName="Labour/Job Work Done"
                cellRendererFramework={renderAddedLabor}
                valueFormatter={func.agStringFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="290px"
                field="partsIssued"
                headerName="Parts Issued"
                cellRendererFramework={renderIssuedPart}
                valueFormatter={func.agStringFormatter}
              ></AgGridColumn>
            </AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
