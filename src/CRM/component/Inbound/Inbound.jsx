import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import AllocateCases from "./AllocateCases/AllocateCases";
import * as constants from "../../../utils/constant";
import ActiveCases from "./ActiveCases/ActiveCases";
import EngagedCases from "./EngagedCases/EngagedCases";

const Inbound = (props) => {
  const history = useHistory();

  let { url } = useRouteMatch();
  const [chooseComponent, setChooseComponent] = useState("");

  const { calledFrom } = props?.location?.state ||
    history.location.state || { calledFrom: "MENU" };
  // const calledFrom = "MENU";

  useEffect(() => {
    let urlName = url.trim().toUpperCase().split("/").pop();
    switch (urlName) {
      case constants.ALLOCATECASES:
        setChooseComponent(constants.ALLOCATECASES);
        break;
      case constants.ACTIVECASES:
        setChooseComponent(constants.ACTIVECASES);
        break;
      case constants.INDEX:
        setChooseComponent(constants.ACTIVECASES);
        break;
      case constants.ACTIVESERVICECASES:
        setChooseComponent(constants.ACTIVESERVICECASES);
        break;
      case constants.GETENGAGEDCASELIST:
        setChooseComponent(constants.GETENGAGEDCASELIST);
      default:
        break;
    }
  }, []);

  const renderComponent = (componentCode) => {
    switch (componentCode) {
      case constants.ACTIVECASES:
        return (
          <ActiveCases
            calledBy="SALES"
            chooseComponent={chooseComponent}
            calledFrom={calledFrom}
          />
        );
      case constants.ACTIVESERVICECASES:
        return (
          <ActiveCases
            calledBy="SERVICE"
            chooseComponent={chooseComponent}
            calledFrom={calledFrom}
          />
        );
      case constants.ALLOCATECASES:
        return (
          <AllocateCases
            calledBy="ALL"
            chooseComponent={chooseComponent}
            calledFrom={calledFrom}
          />
        );
      case constants.GETENGAGEDCASELIST:
        return <EngagedCases chooseComponent={chooseComponent} />;

      default:
        break;
    }
  };

  return <React.Fragment>{renderComponent(chooseComponent)}</React.Fragment>;
};

export default Inbound;
