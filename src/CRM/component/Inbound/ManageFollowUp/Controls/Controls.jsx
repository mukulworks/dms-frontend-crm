import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActivityLog from "./ActivityLog/ActivityLog";
import FollowUpList from "./FollowUpList/FollowUpList";
import Conversation from "./Conversation/Conversation";
import Escalations from "./Escalations/Escalations";
import * as constants from "../../../../../utils/constant";
import VehicleInformation from "../../CreateCase/CreateCaseControls/VehicleInformation/VehicleInformation";
import ServicePlans from "../../../../../Workshop/ServiceAppointment/components/ServiceFollowUp/Controls/RightMenuControls/ServicePlans/ServicePlans";
import CentralVehicleHistory from "../../../../../Workshop/ServiceAppointment/components/ServiceFollowUp/Controls/RightMenuControls/CentralVehicleHistory/CentralVehicleHistory";
import { getCustHistoryByIdentification } from "../../../../store/actions/inboundActions";

const Controls = ({ departmentCode, inboundCaseModel }) => {
  const [isCVHClick, setIsCVHClick] = useState(false);
  const dispatch = useDispatch();
  const [controlName, setControlName] = useState();
  const switchControl = (controlShortName) => {
    setControlName(controlShortName);
  };

  useEffect(() => {
    //fetch data for vehicle information
    let data = {
      name: "V",
      value: inboundCaseModel?.vin,
      departmentCode: "SERVICE",
    };
    dispatch(getCustHistoryByIdentification(data));
  }, [inboundCaseModel?.vin]);

  const { customerVehicle, primaryContact, escalations } = useSelector(
    (state) => {
      let searchCustomerInfo =
        state.inboundReducer.inboundModel?.customerHist?.dmsCustomer;
      let customerVehicle = searchCustomerInfo?.customerVehicle;
      let primaryContact = searchCustomerInfo?.primaryContacts;
      let escalations =
        state.inboundReducer?.inboundModel?.manageFollowUp?.caseEscalations;
      return {
        customerVehicle: customerVehicle,
        primaryContact: primaryContact,
        escalations: escalations,
      };
    }
  );

  //for service plan
  const requestData = () => {
    let payload = {
      chassisNo: inboundCaseModel?.vin,
    };
    return payload;
  };
  return (
    <div className="right-hover controls">
      <ul className="nav flex-column">
        <ActivityLog
          switchControl={switchControl}
          actLog={controlName === constants.ACTIVITY_LOG ? true : false}
          caseActivityLog={inboundCaseModel?.caseActivityLog}
        />
        <FollowUpList
          switchControl={switchControl}
          fupList={controlName === constants.FUP_LIST ? true : false}
          caseFollowUps={inboundCaseModel?.caseFollowUps}
        />
        <Conversation
          switchControl={switchControl}
          conver={controlName === constants.CONVERSATION ? true : false}
          caseConversationModel={inboundCaseModel?.caseConversationModel}
          inboundCaseModel={inboundCaseModel}
        />
        {escalations?.length > 0 && (
          <Escalations
            switchControl={switchControl}
            actLog={controlName === constants.ESCALATIONS ? true : false}
            data={escalations}
          />
        )}
        {customerVehicle && (
          <VehicleInformation
            switchControl={switchControl}
            vehicle={
              controlName === constants.VEHICLE_INFORMATION ? true : false
            }
            vehicleInfo={customerVehicle}
            primaryContact={primaryContact}
          />
        )}
        {departmentCode === "SERVICE" && (
          <React.Fragment>
            <ServicePlans
              requestData={requestData()}
              switchControl={switchControl}
              spOpen={controlName === "sp" ? true : false}
            />

            <li className="nav-item">
              <div className="sub-content-wrapper">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => {
                    switchControl("vh");
                    setIsCVHClick(true);
                  }}
                  data-toggle="modal"
                  data-target="#modal"
                >
                  <span className="mdi mdi-car"></span>
                  <span className="text-title">Vehicle History</span>
                </a>
              </div>
            </li>
          </React.Fragment>
        )}
        {departmentCode === "SERVICE" && controlName === "vh" && (
          <CentralVehicleHistory
            chassisNo={inboundCaseModel?.vin}
            searchTypeValue="C"
            isCVHClick={isCVHClick}
            setIsCVHClick={setIsCVHClick}
          />
        )}
      </ul>
    </div>
  );
};

export default Controls;
