import React, { useState } from "react";
import { useSelector } from "react-redux";
import SalesAddAction from "./SalesAddAction/SalesAddAction";
import FileUpload from "./FileUpload/FileUpload";
import ChartView from "../../ManageFollowUp/AddFollowUp/ChartView/ChartView";
import ListView from "../../ManageFollowUp/AddFollowUp/ListView/ListView";
import ServiceAddAction from "./ServiceAddAction/ServiceAddAction";
import * as constants from ".././../../../../utils/constant";

const ActionDetails = ({
  isActive,
  formType,
  uploadDocuments,
  screenType,
  nextActionList,
  salesCaseResponseModel,
  serviceCaseResponseModel,
  setSelectedFileGuid,
}) => {
  const [toggleView, setToggleView] = useState(false);
  const [isFileUploadMandatory, setIsFileUploadMandatory] = useState(false);

  return (
    <div
      className={
        "row" + (isActive ? " d-none " : " ") + " booking-details grid-section"
      }
    >
      <div className="col-7">
        <div className="row">
          {formType === constants.SERVICE ? (
            <ServiceAddAction
              nextActionList={nextActionList}
              serviceCaseResponseModel={serviceCaseResponseModel}
              setIsFileUploadMandatory={setIsFileUploadMandatory}
            />
          ) : (
            <SalesAddAction
              nextActionList={nextActionList}
              salesCaseResponseModel={salesCaseResponseModel}
              setIsFileUploadMandatory={setIsFileUploadMandatory}
            />
          )}
          <FileUpload
            caseUniqueId={0}
            uploadDocuments={uploadDocuments}
            screenType={screenType}
            isFileUploadMandatory={isFileUploadMandatory}
            setSelectedFileGuid={setSelectedFileGuid}
          />
        </div>
      </div>
      <div className="col-5">
        {/* <ChartView toggleView={toggleView} setToggleView={setToggleView} /> */}
        <ListView
          // toggleView={toggleView}
          setToggleView={setToggleView}
          uploadDocuments={uploadDocuments}
        />
      </div>
    </div>
  );
};

export default ActionDetails;
