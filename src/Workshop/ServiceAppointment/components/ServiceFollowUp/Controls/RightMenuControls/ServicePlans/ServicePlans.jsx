import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Rolling } from "react-loading-io";
import { fetchServicePlans } from "../../../../../store/services/manageFollowUpService";
import {
  showCircularLoader,
  hideCircularLoader,
} from "../../../../../store/actions/serviceAppointmentAction";
import func from "../../../../../../../utils/common.functions";

const ServicePlans = ({ requestData, switchControl, spOpen }) => {
  const dispatch = useDispatch();

  const { servicePlanCircularLoader } = useSelector((state) => {
    return {
      servicePlanCircularLoader:
        state.serviceAppointment.servicePlanCircularLoader,
    };
  });

  const [servicePlans, setServicePlans] = useState([]);
  useEffect(() => {
    setServicePlans([]);
  }, [requestData?.chassisNo]);
  const clickHandler = () => {
    switchControl(spOpen ? "" : "sp");

    if (servicePlans.length > 0) {
      return "";
    } else {
      dispatch(showCircularLoader());
      let apiData = fetchServicePlans(requestData);
      Promise.resolve(apiData)
        .then((res) => {
          dispatch(hideCircularLoader());
          setServicePlans(res);
        })
        .catch((error) => {
          dispatch(hideCircularLoader());
          setServicePlans(error);
        });
    }
  };

  return (
    <li className={"nav-item Service-Plans" + (spOpen ? " active" : "")}>
      <div className="sub-content-wrapper">
        <a className="nav-link" href="#" onClick={clickHandler}>
          <span className="mdi mdi-calendar-text-outline"></span>
          <span className="text-title">Service Plans</span>
        </a>
        {servicePlanCircularLoader ? (
          <div
            className={"sub-content servicePlan" + (spOpen ? " " : " d-none")}
          >
            <Rolling size={30} thickness={5} speed={0.8} color="#42bd3b" />
          </div>
        ) : (
          <div
            className={"sub-content servicePlan" + (spOpen ? " " : " d-none")}
          >
            <div className="row bg-light mx-1 p-3 mb-1">
              {servicePlans?.map((plan) => {
                return (
                  <div className="col-6 bg-white border text-center py-2">
                    <p className="text-uppercase mb-0">{plan.planDesc}</p>
                    {plan.servicePlans[0]?.planStatus?.toLowerCase() ==
                      "na" && (
                      <div className="text-muted">
                        <span className="mdi mdi-close"></span> No Record
                      </div>
                    )}
                    {plan.servicePlans[0]?.planStatus?.toLowerCase() == "e" && (
                      <div className="text-danger">
                        <span className="mdi mdi-check"></span>
                        {func.dateFormatter(plan.servicePlans[0]?.toDate)}
                      </div>
                    )}
                    {plan.servicePlans[0]?.planStatus?.toLowerCase() == "a" && (
                      <div className="text-success">
                        <span className="mdi mdi-check"></span>
                        {func.dateFormatter(plan.servicePlans[0]?.toDate)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default ServicePlans;
