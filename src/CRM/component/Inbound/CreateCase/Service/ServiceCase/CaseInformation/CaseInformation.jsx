import React from "react";

import * as constants from "../../../../../../../utils/constant";
import CourtesyCar from "./CourtesyCar/CourtesyCar";
import Services from "./Services/Services";
const CaseInformation = ({
  serviceCaseResponseModel,
  payload,
  setIsTagROChecked,
  isTagROChecked,
  selectedJobCard,
  setShowAllotedDealer,
  isCourtesyCarAlloted,
  courtesyCarAllotments,
}) => {
  const showHideFormSections = (e) => {
    if (e.target.value) {
      let subCategoryId = parseInt(e.target.value);
      let subCategoryDetails;
      if (subCategoryId !== "") {
        if (
          serviceCaseResponseModel !== undefined &&
          serviceCaseResponseModel !== null
        ) {
          if (serviceCaseResponseModel?.categories?.length > 0) {
            subCategoryDetails = serviceCaseResponseModel.categories
              .find((category) => {
                return category.categoryID === payload.categoryId;
              })
              ["subCategories"].find(
                (subCategory) => subCategory.subCategoryID === subCategoryId
              );
          }
        }
      }
      setShowAllotedDealer(subCategoryDetails?.isAllotedDealerControlEnable);
    }
  };

  return (
    <div className="col-6">
      <div className="card">
        <div className="card-header">Case Information</div>
        <div className="card-body p-1">
          <Services
            activeForm={constants.SERVICE}
            serviceCaseResponseModel={serviceCaseResponseModel}
            showHideFormSections={showHideFormSections}
            setIsTagROChecked={setIsTagROChecked}
            isTagROChecked={isTagROChecked}
            setShowAllotedDealer={setShowAllotedDealer}
            selectedJobCard={selectedJobCard}
          />
        </div>
      </div>
      {isCourtesyCarAlloted && (
        <CourtesyCar courtesyCarAllotments={courtesyCarAllotments} />
      )}
    </div>
  );
};

export default CaseInformation;
