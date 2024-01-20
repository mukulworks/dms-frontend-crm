import React from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import moment from "moment";
import func from "../../../../../../../../utils/common.functions";

const WarrantyCard = ({ control, styleObject }) => {
  return (
    <div className="card border-0 bg-transparent">
      <div className="card-body  px-2 py-2">
        <h6 className="card-title mb-0 px-2 font-weight-bold">
          Warranty Card <span className="mdi mdi-chat ml-2"></span>{" "}
        </h6>
        <hr className="mt-1 mb-1" />
        <div className="px-0 table-section mb-0">
          <div className="card px-1 py-1 rounded-0">
            <div className="row">
              <div className="col-3">
                <div className="row">
                  <div className="col-6">
                    <p className="text-muted">Mfgr Invoice No</p>
                  </div>
                  <div className="col-6">
                    <strong>
                      {func.emptyStringFormatter(
                        control.vehicleDetails.mfgrInvoiceNo
                      )}
                    </strong>
                  </div>
                  <div className="col-6">
                    <p className="text-muted">Dealer Invoice No</p>
                  </div>
                  <div className="col-6">
                    <strong>
                      {func.emptyStringFormatter(
                        control.vehicleDetails.dealerInvoiceNo
                      )}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="col-3 border-left">
                <div className="row">
                  <div className="col-6">
                    <p className="text-muted">Ignition Key No</p>
                  </div>
                  <div className="col-6">
                    <strong>
                      {func.emptyStringFormatter(
                        control.vehicleDetails.ignitionKeyNo
                      )}
                    </strong>
                  </div>
                  <div className="col-6">
                    <p className="text-muted">FIP Serial Number</p>
                  </div>
                  <div className="col-6">
                    <strong>
                      {func.emptyStringFormatter(
                        control.vehicleDetails.fipSerialNo
                      )}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="col-3 border-left">
                <div className="row">
                  <div className="col-6">
                    <p className="text-muted">Battery Serial No</p>
                  </div>
                  <div className="col-6">
                    <strong>
                      {func.emptyStringFormatter(
                        control.vehicleDetails.batterySerialNo
                      )}
                    </strong>
                  </div>
                  <div className="col-6">
                    <p className="text-muted">Tyre Make/Serial</p>
                  </div>
                  <div className="col-6">
                    <strong>
                      {func.emptyStringFormatter(
                        control.vehicleDetails.typeMake
                      )}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="col-3 border-left">
                <div className="row">
                  <div className="col-6">
                    <p className="text-muted">Immobiliser Code</p>
                  </div>
                  <div className="col-6">
                    <strong>
                      {func.emptyStringFormatter(
                        control.vehicleDetails.immobiliserCode
                      )}
                    </strong>
                  </div>
                  <div className="col-6">
                    <p className="text-muted">Immobiliser No</p>
                  </div>
                  <div className="col-6">
                    <strong>
                      {func.emptyStringFormatter(
                        control.vehicleDetails.immobiliserNo
                      )}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-2 table-section overflow-auto">
          <div style={styleObject.tableStyle}>
            <AgGridReact
              rowData={control.vehicleWarrantyCardList}
              defaultColDef={styleObject.defaultColDef}
            >
              <AgGridColumn
                width="50px"
                valueGetter={func.agGetSerialNumber}
                headerName="Sr."
                // cellStyle={styleObject.alignCenter}
              ></AgGridColumn>
              <AgGridColumn
                width="120px"
                field="qReportNo"
                headerName="Q Report No"
                valueFormatter={func.agNumberHyphenFormatter}
                // cellStyle={styleObject.alignCenter}
              ></AgGridColumn>
              <AgGridColumn
                width="120px"
                field="qReportDate"
                headerName="Q Report Date"
                valueFormatter={func.dateFormatter}
                cellStyle={styleObject.alignCenter}
              ></AgGridColumn>
              <AgGridColumn
                width="120px"
                field="jobCardNo"
                headerName="Job Card No"
                valueFormatter={func.agNumberHyphenFormatter}
                // cellStyle={styleObject.fontColorAlign}
              ></AgGridColumn>
              <AgGridColumn
                width="80px"
                field=""
                headerName="Date"
                valueFormatter={func.dateFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="70px"
                field="kms"
                headerName="KM"
                valueFormatter={func.numberFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="200px"
                field="partDescription"
                headerName="Parts/Operation Description"
                valueFormatter={func.agStringFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="250px"
                field="partSupply"
                headerName="Parts Supplied by SAIPL/Used From Stock"
                valueFormatter={func.agStringFormatter}
              ></AgGridColumn>
              <AgGridColumn
                width="100px"
                field="partValue"
                headerName="Parts Value"
                valueFormatter={func.agNumberHyphenFormatter}
              ></AgGridColumn>
            </AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarrantyCard;
