import React, { useState } from "react";
import { Link } from "react-router-dom";
import MostRecentService from "./MostRecentActivity/MostRecentService";
import CustomerAddressDetail from "./CustomerAddressDetail/CustomerAddressDetail";
import ServicePlans from "./ServicePlans/ServicePlans";
import MaintenanceSchedule from "./MaintenanceSchedule/MaintenanceSchedule";
import CustomerFeedback from "./CustomerFeedback/CustomerFeedback";
import ContactHistory from "./ContactHistory/ContactHistory";
const Controls = ({ requestData }) => {
  const [controlName, setControlName] = useState("");

  const switchControl = (controlShortName) => {
    setControlName(controlShortName);
  };

  return (
    <div className="right-hover">
      <ul className="nav flex-column">
        <MostRecentService
          requestData={requestData}
          switchControl={switchControl}
          mrcOpen={controlName === "mrc" ? true : false}
        />
        <CustomerAddressDetail
          requestData={requestData}
          switchControl={switchControl}
          cadOpen={controlName === "cad" ? true : false}
        />
        <ServicePlans
          requestData={requestData}
          switchControl={switchControl}
          spOpen={controlName === "sp" ? true : false}
        />
        <li className="nav-item">
          <div className="sub-content-wrapper">
            <Link
              to={`/CentralVehicleHistory/C/${requestData.chassisNo}`}
              target="_blank"
              className="nav-link"
              onClick={() => switchControl("cvh")}
            >
              <span className="mdi mdi-car"></span>
              <span className="text-title">Vehicle History</span>
            </Link>
          </div>
        </li>

        <ContactHistory
          requestData={requestData}
          switchControl={switchControl}
          chOpen={controlName === "ch" ? true : false}
        />
        <CustomerFeedback
          requestData={requestData}
          switchControl={switchControl}
          cfbOpen={controlName === "cfb" ? true : false}
        />
        <MaintenanceSchedule
          requestData={requestData}
          switchControl={switchControl}
          msOpen={controlName === "ms" ? true : false}
        />
      </ul>
    </div>
  );
};

export default React.memo(Controls);
