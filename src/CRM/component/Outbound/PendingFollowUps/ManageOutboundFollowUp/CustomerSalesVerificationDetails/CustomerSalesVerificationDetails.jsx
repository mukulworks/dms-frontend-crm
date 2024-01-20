import React from "react";
import func from "../../../../../../utils/common.functions";
import StatusLabel from "../../../../common/StatusLabel/StatusLabel";
import CustomerInfo from "../../../../Inbound/ManageFollowUp/CaseDetails/CustomerInfo/CustomerInfo";
import ImageRenderer from "../../../../common/ImageRenderer/ImageRenderer";

const CustomerSalesVerificationDetails = ({
  outboundCase,
  isArrowUp,
  openCaseDataSheet,
}) => {
  return (
    <div
      className={
        "row justify-content-between tab-section-form border-top border-bottom shadow-sm my-1 py-2 " +
        (isArrowUp ? "" : "d-none")
      }
    >
      <div className="col-4 manage-case font-12">
        <div className="row">
          <div className="col-3 pr-0">
            <span>Case ID</span>
          </div>
          <div className="col-8">
            <strong>
              <a
                href="#"
                onClick={() => openCaseDataSheet(outboundCase?.caseUniqueId)}
              >
                {outboundCase?.caseUniqueId}
              </a>
            </strong>
          </div>
        </div>
        <div className="row">
          <div className="col-3 pr-0">
            <span>Opened On</span>
          </div>
          <div className="col-8">
            <strong>{func.dateFormatter(outboundCase?.openedOn)}</strong>
          </div>
        </div>
        <div className="row">
          <div className="col-3 pr-0">
            <span>Call to</span>
          </div>
          <div className="col-8">
            <strong>
              +91{" "}
              {func.emptyStringFormatter(outboundCase?.customer?.custMobile)}
            </strong>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <span>Dealer</span>
          </div>
          <div className="col-9">
            <strong className="text-uppercase">
              {func.emptyStringFormatter(
                outboundCase?.allotedDealer !== null
                  ? outboundCase?.allotedDealer?.dealerName
                  : "-"
              )}
            </strong>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <span>Outlet</span>
          </div>
          <div className="col-9">
            <strong className="text-uppercase">
              {func.emptyStringFormatter(
                outboundCase?.allotedOutlet !== null
                  ? outboundCase?.allotedOutlet?.branchName
                  : "-"
              )}
            </strong>
          </div>
        </div>
        
        <div className="pos-top-right">
          <div className="caseData-Status active">
            <p>
              <span className="mdi mdi-folder"></span>
            </p>
            <p className="text-uppercase font-10">
              <strong>
                {func.statusDescriptionFormatter(outboundCase?.caseStatus)}
              </strong>
            </p>
          </div>
        </div>
        <StatusLabel
          color={func.setColor(outboundCase?.caseStatus)}
          imgSrc={func.statusImageSelector(outboundCase?.caseStatus)}
          status={func.statusDescriptionFormatter(outboundCase?.caseStatus)}
        />
      </div>
      <div className="col-4 border-left border-right manage-dealer font-12">
        
        <div className="row">
          <div className="col-3">
            <span>Model</span>
          </div>
          <div className="col-9">
            <strong className="text-uppercase">
              {func.emptyStringFormatter(outboundCase?.vehVariant)}
            </strong>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <span>{outboundCase?.tagRpo?.rpoLabel}</span>
          </div>
          <div className="col-9">
            <strong className="text-uppercase">
              {func.dateFormatter(outboundCase?.tagRpo?.rpoDate)}
            </strong>
          </div>
        </div>
        <div className="row">
          <div className="col-3 pr-0">
            <span>Reschedule Date</span>
          </div>
          <div className="col-9">
            <strong>
              {func.dateFormatter(outboundCase?.caseRescheduleDate)}
            </strong>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <span>Reply</span>
          </div>
          <div className="col-9">
            <strong className="two-line-wrap" title={func.emptyStringFormatter(outboundCase?.callerReply)}>
              {func.emptyStringFormatter(outboundCase?.callerReply)}
            </strong>
          </div>
        </div>
        <div className="rounded img-right">
          <ImageRenderer imageCode={outboundCase.vehModel} />
        </div>
      </div>
      <CustomerInfo
        customer={outboundCase?.customer}
        dmsInfoId={outboundCase?.dmsKeyValue}
      />
    </div>
  );
};

export default CustomerSalesVerificationDetails;
