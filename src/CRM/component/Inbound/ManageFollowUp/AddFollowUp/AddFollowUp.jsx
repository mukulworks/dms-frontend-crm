import React, { useState } from "react";
import FileUpload from "../../CreateCase/ActionDetails/FileUpload/FileUpload";
import SalesAddAction from "../../CreateCase/ActionDetails/SalesAddAction/SalesAddAction";
import ServiceAddAction from "../../CreateCase/ActionDetails/ServiceAddAction/ServiceAddAction";
import ChartView from "./ChartView/ChartView";
import ListView from "./ListView/ListView";
import * as constants from "../../../../../utils/constant";

const AddFollowUp = ({
  caseUniqueId,
  uploadDocuments,
  screenData,
  nextActionList,
  caseType,
  screenType,
  setSelectedFileGuid,
}) => {
  const [isFileUploadMandatory, setIsFileUploadMandatory] = useState(false);

  const addActionFormType = () => {
    switch (caseType) {
      case constants.SALES:
        return (
          <SalesAddAction
            nextActionList={nextActionList}
            salesCaseResponseModel={screenData}
            setIsFileUploadMandatory={setIsFileUploadMandatory}
          />
        );
      case constants.SERVICE:
        return (
          <ServiceAddAction
            nextActionList={nextActionList}
            serviceCaseResponseModel={screenData}
            setIsFileUploadMandatory={setIsFileUploadMandatory}
          />
        );
      default:
        return null;
    }
  };

  const [toggleView, setToggleView] = useState(false);
  return (
    <div className="row justify-content-between mt-1">
      <div className="col-12 bg-tab pt-1">
        <div className="row justify-content-between">
          <div className="col-12 process-flow">
            <div className="row booking-details grid-section">
              <div className="col-7">
                <div className="row">
                  {addActionFormType()}
                  <FileUpload
                    caseUniqueId={caseUniqueId}
                    uploadDocuments={uploadDocuments}
                    screenType={screenType}
                    isFileUploadMandatory={isFileUploadMandatory}
                    setSelectedFileGuid={setSelectedFileGuid}
                  />
                </div>
              </div>
              <div className="col-5">
                <ChartView
                  toggleView={toggleView}
                  setToggleView={setToggleView}
                />
                <ListView
                  toggleView={toggleView}
                  setToggleView={setToggleView}
                  uploadDocuments={uploadDocuments}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFollowUp;
