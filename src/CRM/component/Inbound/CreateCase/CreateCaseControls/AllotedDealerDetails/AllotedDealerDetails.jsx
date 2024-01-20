import React from "react";
import { useDispatch } from "react-redux";
import { Rolling } from "react-loading-io";
import * as constants from "../../../../../../utils/constant";
import func from "../../../../../../utils/common.functions";
import SkodaDealerShowroom from "../../../../../../images/SkodaDealerShowroom.png";

const AllotedDealerDetails = ({
  controlName,
  switchAllotedControl,
  name,
  isCircularLoading,
  dealerOutletInfo,
}) => {
  //   const [open, setOpen] = React.useState(false);
  const clickHandler = (check = false) => {
    if (check) {
      switchAllotedControl(constants.ALLOTED_DEALER_DETAILS);
    }
    if (controlName !== null && controlName !== undefined) {
      //dispatch(openCloseCreateCaseControl(null))
      switchAllotedControl(controlName ? "" : constants.ALLOTED_DEALER_DETAILS);
    } else {
      switchAllotedControl("");
    }
  };
  if (dealerOutletInfo === null || dealerOutletInfo === undefined) {
    return null;
  }

  React.useEffect(() => {
    dealerOutletInfo &&
      Object.keys(dealerOutletInfo).length &&
      clickHandler(true);
  }, [dealerOutletInfo]);
  const outletContactDetail = dealerOutletInfo.outletContactDetail;

  return (
    <li
      className={
        "nav-item Alloted-Dealer-Details" + (controlName ? " active" : " ")
      }
    >
      <div className="sub-content-wrapper">
        <a className="nav-link" href="#" onClick={clickHandler}>
          <span className="mdi mdi-calendar-text-outline"></span>
          <span className="text-title">Alloted Dealer Details</span>
        </a>
        <div className={"sub-content pt-0" + (controlName ? "" : " d-none")}>
          {isCircularLoading ? (
            <div className="row bg-light mx-1 pt-3 px-2 pb-3">
              <Rolling size={30} thickness={5} speed={0.8} color="#42bd3b" />
            </div>
          ) : (
            <div className="row bg-light mx-1 pt-3 px-2 pb-3">
              <div className="col-auto">
                <div className="border rounded">
                  <img src={SkodaDealerShowroom} width="100" />
                </div>
              </div>
              <div className="col-8 mb-4">
                <div className="row">
                  <div className="col-2">Dealer:</div>
                  <div className="col-10">
                    {func.emptyStringFormatter(dealerOutletInfo.companyName)}
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">Outlet:</div>
                  <div className="col-10">
                    {func.emptyStringFormatter(dealerOutletInfo.branchName)}
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">Status:</div>
                  <div className="col-10">
                    <span className="status bg-success ml-2">Active</span>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="row">
                  <div className="col-4">Address:</div>
                  <div className="col-8">
                    {func.emptyStringFormatter(outletContactDetail?.address1)}
                    {func.emptyStringFormatter(outletContactDetail?.address2)}
                    {func.emptyStringFormatter(outletContactDetail?.address3)}
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">Phone:</div>
                  <div className="col-8">
                    {func.emptyStringFormatter(outletContactDetail?.phone)}
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-7 pr-0">Concerned Person 1:</div>
                  <div className="col-5">
                    {func.emptyStringFormatter(
                      outletContactDetail?.primaryContactPerson
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-7 pr-0">Mobile:</div>
                  <div className="col-5">
                    {func.emptyStringFormatter(outletContactDetail?.mobile)}
                  </div>
                </div>
                <div className="row">
                  <div className="col-7 pr-0">Concerned Person 2:</div>
                  <div className="col-5">
                    {func.emptyStringFormatter(
                      outletContactDetail?.secondaryContactPerson
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-7 pr-0">Mobile:</div>
                  <div className="col-5">
                    {func.emptyStringFormatter(outletContactDetail?.mobile)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};
export default AllotedDealerDetails;
