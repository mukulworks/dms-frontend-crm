import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import func from "../../../../../../../../utils/common.functions";
import EmptyRecords from "../EmptyRecords/EmptyRecords";
import * as constants from "../../../../../../../../utils/constant";

const TableBody = ({ jcPart }) => {
  return (
    <React.Fragment>
      <tbody>
        {jcPart.map((jc, key) =>
          key === 0 ? (
            <tr>
              <td align="center" rowSpan={jcPart.length}>
                {jc.partNo}
              </td>
              <td align="left" rowSpan={jcPart.length}>
                {func.emptyStringFormatter(jc.partDescription)}
              </td>
              <td align="left" rowSpan={jcPart.length}>
                {func.emptyStringFormatter(jc.category)}
              </td>
              <td align="left">
                <p className="mb-0">{func.emptyStringFormatter(jc.dealer)}</p>
              </td>
              <td align="center">
                <p className="mb-0">{func.emptyStringFormatter(jc.jobCard)}</p>
              </td>
              <td align="center">
                <p className="mb-0">{func.dateFormatter(jc.date)}</p>
              </td>
              <td align="center">
                <p className="mb-0">{func.commaFormatter(jc.kms)}</p>
              </td>
              <td align="center">
                <p className="mb-0">{func.emptyStringFormatter(jc.qty)}</p>
              </td>
              <td align="center">
                <p className="mb-0">{func.emptyStringFormatter(jc.unit)}</p>
              </td>
              <td align="left">
                <p className="mb-0">{func.emptyStringFormatter(jc.chargeTo)}</p>
              </td>
            </tr>
          ) : (
            <tr key={key}>
              <td align="left">
                <p className="mb-0">{func.emptyStringFormatter(jc.dealer)}</p>
              </td>
              <td align="center">
                <p className="mb-0">{func.emptyStringFormatter(jc.jobCard)}</p>
              </td>
              <td align="center">
                <p className="mb-0">{func.dateFormatter(jc.date)}</p>
              </td>
              <td align="center">
                <p className="mb-0">{func.commaFormatter(jc.kms)}</p>
              </td>
              <td align="center">
                <p className="mb-0">{func.emptyStringFormatter(jc.qty)}</p>
              </td>
              <td align="center">
                <p className="mb-0">{func.emptyStringFormatter(jc.unit)}</p>
              </td>
              <td align="left">
                <p className="mb-0">{func.emptyStringFormatter(jc.chargeTo)}</p>
              </td>
            </tr>
          )
        )}
      </tbody>
    </React.Fragment>
  );
};

const PartsSummary = ({ partList, styleObject }) => {
  const uniquePartNoArray = [...new Set(partList.map((list) => list.partNo))];
  const getJobCardByPartId = (partNo) => {
    return partList.filter((part) => part.partNo === partNo);
  };

  return (
    <div className="card border-0 bg-transparent">
      <div className="card-body px-0 py-2">
        <h6 className="card-title mb-0 px-2 font-weight-bold">
          Parts Summary <span className="mdi mdi-chat ml-2"></span>{" "}
        </h6>
        <hr className="mt-1 mb-1" />
        <div className="px-2 table-section overflow-auto" style={{height:450, overflowauto:"auto"}}>
          <table className="table border text-center">
            <thead style={{position:"sticky", top:-1}}>
              <tr>
                <th style={{ textAlign: "center" }}>Part Number</th>
                <th style={{ textAlign: "left", width: "300px" }}>Description</th>
                <th style={{ textAlign: "left" }}>Catg</th>
                <th style={{ textAlign: "left" }}>Dealer</th>
                <th style={{ textAlign: "center" }}>Job Card</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>KMS</th>
                <th style={{ textAlign: "center" }}>Qty</th>
                <th style={{ textAlign: "center" }}>Unit</th>
                <th style={{ textAlign: "left" }}>Change to</th>
              </tr>
            </thead>
            {!uniquePartNoArray?.length ? (
              <tbody>
                <tr>
                  <td colSpan="10">
                    <EmptyRecords
                      message={constants.NO_ROWS_TO_SHOW}
                      styleObject={styleObject.emptyTableStyle}
                    />
                  </td>
                </tr>
              </tbody>
            ) : (
              uniquePartNoArray.map((part, key) => {
                let jcPart = getJobCardByPartId(part);
                return <TableBody key={key} jcPart={jcPart} />;
              })
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default PartsSummary;
