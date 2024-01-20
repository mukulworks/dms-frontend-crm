import React, { useState, useEffect } from "react";
import PendingFollowUps from "./PendingFollowUps/PendingFollowUps";
import AllocateOutboundCase from "./AllocateOutboundCase/AllocateOutboundCase";
import * as constants from "../../../utils/constant";
import useGetUrl from "../../../Hooks/useGetUrl";
import EngagedCases from "../Outbound/EngagedCases/EngagedCases";
import CaseReOpen from "../Outbound/CaseReopen/CaseReopen";
import { useHistory } from "react-router-dom";
const Outbound = (props) => {
  const history = useHistory();
  const { calledFrom } = props?.location?.state ||
    history?.location?.state || { calledFrom: "MENU" };
  let { url } = useGetUrl();
  const [chooseComponent, setChooseComponent] = useState("");
  useEffect(() => {
    let urlName = url.trim().toUpperCase().split("/").pop();

    switch (urlName) {
      case constants.INDEX:
        setChooseComponent(constants.INDEX);
        break;
      case constants.INDEX:
        setChooseComponent(constants.PENDING_FOLLOW_UPS);
        break;
      case constants.ALLOCATE_OUTBOUND_CASE:
        setChooseComponent(constants.ALLOCATE_OUTBOUND_CASE);
        break;
      case constants.GETENGAGEDCASELIST:
        setChooseComponent(constants.GETENGAGEDCASELIST);
        break;
      case constants.CLOSED_CASE:
        setChooseComponent(constants.CLOSED_CASE);
        break;
      default:
        break;
    }
  }, []);

  const renderComponent = (componentCode) => {
    switch (componentCode) {
      case constants.INDEX:
        return (
          <PendingFollowUps
            chooseComponent={chooseComponent}
            calledFrom={calledFrom}
          />
        );
      case constants.ALLOCATE_OUTBOUND_CASE:
        return (
          <AllocateOutboundCase
            chooseComponent={chooseComponent}
            calledFrom={calledFrom}
          />
        );
      case constants.GETENGAGEDCASELIST:
        return <EngagedCases chooseComponent={chooseComponent} />;
      case constants.CLOSED_CASE:
        return <CaseReOpen chooseComponent={chooseComponent} />;
      default:
        break;
    }
  };

  return <React.Fragment>{renderComponent(chooseComponent)}</React.Fragment>;
};

export default Outbound;
