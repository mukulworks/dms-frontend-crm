import React from "react";
import CustomerInfo from "./CustomerInfo/CustomerInfo";
import func from "../../../../../utils/common.functions";
import StatusLabel from "../../../common/StatusLabel/StatusLabel";
import ImageRenderer from "../../../common/ImageRenderer/ImageRenderer";

const CaseDetails = ({ inboundCaseModel, openCaseDataSheet }) => {
  if (inboundCaseModel === null || inboundCaseModel === undefined) return null;

  return (
    <div className="row justify-content-between tab-section-form border-top border-bottom shadow-sm my-1 py-2 font-10">
      <div className="col-4 manage-case font-12">
        <div className="row">
          <div className="col-3 pr-0">
            <span>Case ID</span>
          </div>
          <div className="col-8">
            <strong>
              <a
                href="#"
                onClick={() =>
                  openCaseDataSheet(inboundCaseModel?.caseUniqueId)
                }
              >
                {inboundCaseModel?.caseUniqueId}
              </a>
            </strong>
          </div>
        </div>
        <div className="row">
          <div className="col-3 pr-0">
            <span>Opened On</span>
          </div>
          <div className="col-8">
            <strong>
              {func.dayDateTimeFormatter(inboundCaseModel?.openedOn)}
            </strong>
          </div>
        </div>
        <div className="row">
          <div className="col-3 pr-0">
            <span>Call from</span>
          </div>
          <div className="col-8">
            <strong>
              +91{" "}
              {func.emptyStringFormatter(
                inboundCaseModel?.customer?.custMobile
              )}
            </strong>
          </div>
        </div>
        <div className="row">
          <div className="col-3 pr-0">
            <span>Source</span>
          </div>
          <div className="col-8">
            <strong>
              {inboundCaseModel?.caseSource === null
                ? "CRM"
                : inboundCaseModel?.caseSource?.description}
            </strong>
          </div>
        </div>
        <div className="row">
          <div className="col-3 pr-0">
            <span>Department</span>
          </div>
          <div className="col-8">
            <strong>
              {func.emptyStringFormatter(
                inboundCaseModel?.caseDepartment?.description
              )}
            </strong>
          </div>
        </div>
        <div className="row">
          <div className="col-3 pr-0">
            <span>Category</span>
          </div>
          <div className="col-8">
            <strong
              title={func.emptyStringFormatter(
                inboundCaseModel.caseCategory?.categoryDescription
              )}
            >
              {func.emptyStringFormatter(
                inboundCaseModel?.caseCategory?.categoryDescription
              )}
            </strong>
          </div>
        </div>
        <div className="row">
          <div className="col-3 pr-0">
            <span>Sub-Category</span>
          </div>
          <div className="col-8">
            <strong
              title={func.emptyStringFormatter(
                inboundCaseModel.caseSubCategory.subCategoryDesc
              )}
            >
              {func.emptyStringFormatter(
                inboundCaseModel?.caseSubCategory?.subCategoryDesc
              )}
            </strong>
          </div>
        </div>
        <StatusLabel
          color={func.setColor(inboundCaseModel?.caseStatus)}
          imgSrc={func.statusImageSelector(inboundCaseModel?.caseStatus)}
          status={func.statusDescriptionFormatter(inboundCaseModel?.caseStatus)}
        />
      </div>
      <div className="col-4 border-left border-right manage-dealer font-12">
        <div className="row">
          <div className="col-2">
            <span>Dealer</span>
          </div>
          <div className="col-10">
            <strong className="text-uppercase">
              {func.emptyStringFormatter(
                inboundCaseModel?.allotedDealer !== null
                  ? inboundCaseModel?.allotedDealer?.dealerName
                  : "-"
              )}
            </strong>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <span>Outlet</span>
          </div>
          <div className="col-10">
            <strong className="text-uppercase">
              {func.emptyStringFormatter(
                inboundCaseModel?.allotedOutlet !== null
                  ? inboundCaseModel?.allotedOutlet?.branchName
                  : "-"
              )}
            </strong>
          </div>
        </div>
        <div className="rounded img-right">
          <ImageRenderer imageCode={inboundCaseModel?.vehModelCode} />
        </div>
        <hr className="my-1" />
        <div className="row">
          <div className="col-2">
            <span>Model</span>
          </div>
          <div className="col-10">
            <strong className="text-uppercase">
              {func.emptyStringFormatter(inboundCaseModel?.vehModelCode)}
            </strong>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <span>Fuel</span>
          </div>
          <div className="col-10">
            <strong className="text-uppercase">
              {func.emptyStringFormatter(inboundCaseModel?.fuelCode)}
            </strong>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <span>Query</span>
          </div>
          <div className="col-10" title={inboundCaseModel?.caseQuery} >
            <strong onClick={() =>  navigator.clipboard.writeText(inboundCaseModel?.caseQuery)}>   {/* edit  by mukul */}
              {func.substringStringFormatter(inboundCaseModel?.caseQuery, 50)}
            </strong>
            
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <span>Reply</span>
          </div>
          <div className="col-10" title={inboundCaseModel?.callerReply}>
            <strong onClick={() =>  navigator.clipboard.writeText(inboundCaseModel?.callerReply)}>  {/* edit by mukul  */}
              {func.substringStringFormatter(inboundCaseModel?.callerReply, 50)}
            </strong>
          </div>
        </div>
      </div>
      <CustomerInfo
        customer={inboundCaseModel?.customer}
        dmsInfoId={inboundCaseModel?.dmsInfoId}
      />
    </div>
  );
};

export default CaseDetails;
