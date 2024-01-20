import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomerInformation from "./CustomerInformation/CustomerInformation";
import VehicleInformation from "./VehicleInformation/VehicleInformation";
import * as constants from "../../../../../utils/constant";
import AllotedDealerDetails from "./AllotedDealerDetails/AllotedDealerDetails";
import ProspectInformation from "./ProspectInformation/ProspectInformation";
import ServicePlans from "../../../../../Workshop/ServiceAppointment/components/ServiceFollowUp/Controls/RightMenuControls/ServicePlans/ServicePlans";
import CentralVehicleHistory from "../../../../../Workshop/ServiceAppointment/components/ServiceFollowUp/Controls/RightMenuControls/CentralVehicleHistory/CentralVehicleHistory";

const CreateCaseControls = ({
  isControlActive,
  isAllotedControlActive,
  departmentCode,
}) => {
  const [controlName, setControlName] = useState(
    isControlActive ? constants.PROSPECTS : ""
  );
  const [allotedControlName, setAllotedControlName] = useState(
    isAllotedControlActive ? constants.ALLOTED_DEALER_DETAILS : ""
  );
  React.useEffect(() => {
    if (isAllotedControlActive)
      setAllotedControlName(
        isAllotedControlActive ? constants.ALLOTED_DEALER_DETAILS : ""
      );
  }, [isAllotedControlActive]);
  const [isCVHClick, setIsCVHClick] = useState(false);
  const {
    searchCustomerInfo,
    seacrhcustomerVehicleInfo,
    dealerOutletInfo,
    name,
    isCircularLoading,
    prospectControlPayload,
    requestData,
    primaryContact,
  } = useSelector((state) => {
    let searchCustomerInfo =
      state.inboundReducer.inboundModel?.customerHistory?.dmsCustomer;
    let seacrhcustomerVehicleInfo = searchCustomerInfo?.customerVehicle;
    let primaryContact = searchCustomerInfo?.primaryContacts;
    let dealerOutletInfo = state.inboundReducer.inboundModel.dealerOutletInfo;
    let name = state.inboundReducer.inboundModel.name;
    let isCircularLoading = state.inboundReducer.isCircularLoading;
    let prospectControlPayload =
      state.inboundReducer.control.prospectControlPayload;
    let serviePlanQueryParam = state.inboundReducer.searchRecord?.data;
    let requestData = {
      chassisNo: serviePlanQueryParam?.value,
    };

    return {
      searchCustomerInfo: searchCustomerInfo,
      seacrhcustomerVehicleInfo: seacrhcustomerVehicleInfo,
      dealerOutletInfo: dealerOutletInfo,
      name: name,
      isCircularLoading: isCircularLoading,
      prospectControlPayload: prospectControlPayload,
      requestData: requestData,
      primaryContact: primaryContact,
    };
  });

  let prospectMasterSerial = prospectControlPayload.prospectMasterSerial;

  const switchControl = (controlShortName) => {
    setControlName(controlShortName);
  };

  const switchAllotedControl = (controlShortName) => {
    setAllotedControlName(controlShortName);
  };

  return (
    <div className="right-hover case-control">
      <ul className="nav flex-column">
        {/* components belongs to service cases */}
        {searchCustomerInfo && (
          <CustomerInformation
            switchControl={switchControl}
            cust={controlName === constants.CUSTOMER_INFORMATION ? true : false}
            customerInfo={searchCustomerInfo}
          />
        )}
        {seacrhcustomerVehicleInfo && (
          <VehicleInformation
            switchControl={switchControl}
            vehicle={
              controlName === constants.VEHICLE_INFORMATION ? true : false
            }
            vehicleInfo={seacrhcustomerVehicleInfo}
            primaryContact={primaryContact}
          />
        )}
        {departmentCode === constants.SERVICE && searchCustomerInfo && (
          <ServicePlans
            requestData={requestData}
            switchControl={switchControl}
            spOpen={controlName === "sp" ? true : false}
          />
        )}
        {departmentCode === constants.SERVICE && searchCustomerInfo && (
          <li className="nav-item">
            <div className="sub-content-wrapper">
              <a
                className="nav-link"
                href="#"
                onClick={() => {
                  switchControl("vh");
                  setIsCVHClick(true);
                }}
              >
                <span className="mdi mdi-car"></span>
                <span className="text-title">Vehicle History</span>
              </a>
            </div>
          </li>
        )}

        {controlName === "vh" && departmentCode === constants.SERVICE && (
          <CentralVehicleHistory
            chassisNo={requestData.chassisNo}
            searchTypeValue="C"
            isCVHClick={isCVHClick}
            setIsCVHClick={setIsCVHClick}
          />
        )}

        {/* components belongs to Sales/Pre-Sales Cases */}
        {isAllotedControlActive && (
          <AllotedDealerDetails
            switchAllotedControl={switchAllotedControl}
            controlName={
              allotedControlName === constants.ALLOTED_DEALER_DETAILS
                ? true
                : false
            }
            dealerOutletInfo={dealerOutletInfo}
            isAllotedControlActive={isAllotedControlActive}
            isCircularLoading={isCircularLoading}
          />
        )}
        {prospectControlPayload.isControlActive &&
          departmentCode === constants.SALES && (
            <ProspectInformation
              controlName={controlName === constants.PROSPECTS ? true : false}
              switchControl={switchControl}
              prospectControlPayload={prospectControlPayload}
              prospectMasterSerial={prospectMasterSerial}
            />
          )}
      </ul>
    </div>
  );
};

export default CreateCaseControls;
