import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import excelImage from "../../../../images/FileExtension/excel.png";

const ExcelFileModal = ({ criteriaValues, reportSummaryData }) => {
  const { userId } = useSelector((state) => {
    let userContext = state.user.userDetail.userContext;
    let userId = userContext?.userId;

    return {
      userId: userId,
    };
  });

  const getDateRange = () => {
    let from = null;
    let to = null;
    if (criteriaValues?.criteriaParameters?.length > 0) {
      for (const criteriaValue of criteriaValues.criteriaParameters) {
        if (criteriaValue.code === "DATE_FROM") {
          from = criteriaValue.value;
        } else if (criteriaValue.code === "DATE_To") {
          to = criteriaValue.value;
        }
      }
      return `${from} to ${to}`;
    }
  };

  return (
    <div className="export-excel">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header p-2">
            <h5 className="modal-title">Excel File Created</h5>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-8">
                <div className="row mb-2">
                  <div className="col-md-4 text-right">
                    <strong>Report Title</strong>
                  </div>
                  <div className="col-md-8 text-primary font-weight-bold">
                    {reportSummaryData?.header}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-4 text-right">
                    <strong>User-Id</strong>
                  </div>
                  <div className="col-md-8 text-primary font-weight-bold text-uppercase">
                    {reportSummaryData?.userId || userId}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-4 text-right">
                    <strong>IP Address</strong>
                  </div>
                  <div className="col-md-8 text-primary font-weight-bold">
                    {reportSummaryData?.ipAddress || "180.151.78.50"}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-4 text-right">
                    <strong>File</strong>
                  </div>
                  <div className="col-md-8">
                    {/* <button className="btn btn-success">Click Here to Download the file</button> */}
                    {reportSummaryData && (
                      <a
                        href={
                          reportSummaryData?.filePath +
                          reportSummaryData?.fileName
                        }
                        download
                      >
                        Click Here to Download the file
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <img src={excelImage} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelFileModal;
