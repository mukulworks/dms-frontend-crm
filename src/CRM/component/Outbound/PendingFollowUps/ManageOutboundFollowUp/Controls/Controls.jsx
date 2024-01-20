import React, { useState } from "react";
import FollowUpList from "./FollowUpList/FollowUpList";
import * as constants from "../../../../../../utils/constant";
import ContactInformation from "./ContactInformation/ContactInformation";
import JobCardDetails from "./JobCardDetails/JobCardDetails";
import VehicleInfo from "./VehicleInfo/vehicleInfo";

const Controls = ({
  outboundCase,
  dmsCustomerBasicInfo,
  customerIdentification,
}) => {
  const [controlName, setControlName] = useState();
  const switchControl = (controlShortName) => {
    setControlName(controlShortName);
  };

  return (
    <div className="right-hover controls">
      <ul className="nav flex-column">
        <FollowUpList
          switchControl={switchControl}
          fupList={controlName === constants.FUP_LIST ? true : false}
          caseFollowUps={outboundCase?.caseFollowUps}
        />
        {dmsCustomerBasicInfo && (
          <ContactInformation
            switchControl={switchControl}
            contactInfo={controlName === constants.CONTACTINFO ? true : false}
            dmsCustomerBasicInfo={dmsCustomerBasicInfo}
            customerIdentification={customerIdentification}
          />
        )}

        <JobCardDetails
          switchControl={switchControl}
          jobCardControl={
            controlName === constants.JOB_CARD_DETAILS ? true : false
          }
          jobCardDetails={outboundCase.tagJobCard}
        />
        <VehicleInfo
          switchControl={switchControl}
          vehicleInfoControl={
            controlName === constants.VEHICLE_INFORMATION ? true : false
          }
          vehicleInfo={outboundCase.crmCaseVehicle}
        />
      </ul>
    </div>
  );
};

export default Controls;
