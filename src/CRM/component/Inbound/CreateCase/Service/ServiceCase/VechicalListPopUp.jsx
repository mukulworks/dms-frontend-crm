import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { selectedVinNumber } from "../../../../../store/actions/inboundActions";
import "./VechicalListPopUp.css";
import Groupcar from "../../../../../../images/Groupcar.png";
const VechicalListPopUp = ({
  isPopUpActive,
  setIsPopUpActive,
  distinctVehicles,
}) => {
  const dispatch = useDispatch();
  const [selectedRadioValue, setSelectedRadioValue] = useState(null);
  const customStyle = {
    show: {
      display: "block",
      paddingRight: "17px",
    },
    hide: {
      display: "none",
    },
  };
  const popUpStyle = {
    display: isPopUpActive ? "block" : "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "999",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    width: "52%",
    height: "60%",
  };

  const handleOkButtonClick = () => {
    dispatch(selectedVinNumber(selectedRadioValue));
    setIsPopUpActive(!isPopUpActive);
  };

  return (
    <div style={popUpStyle}>
      <div
        className={"modal modal-margin  " + (isPopUpActive ? "show" : "")}
        aria-labelledby="exampleModalLabel"
        style={isPopUpActive ? customStyle.show : customStyle.hide}
      >
        <div className="modal-dialog" id="modelpopup">
          <div className="modal-content border-0">
            <div className="modal-body " id="modelbody">
              <div className="headersection">
                <img className="imagecars" src={Groupcar} alt="carsimg" />{" "}
                <span className="titlename">
                  Please Select the Vehicle Details
                </span>
                <button
                  id="submitbtn"
                  type="button"
                  className="btn btn-success"
                  onClick={handleOkButtonClick}
                >
                  {" "}
                  Submit
                </button>
                <button
                  type="button"
                  id="closebtn"
                  className="btn "
                  onClick={() => setIsPopUpActive(!isPopUpActive)}
                >
                  Close
                </button>
              </div>
              <div className="tableheader">
                <div className="tableheader1">
                  <ul className="d-inline-flex text-center">
                    <li className="hederlist2">Vehicle Regn1</li>
                    <li className="hederlist3">Vehicle Regn2</li>
                    <li className="hederlist4">Vehicle Model</li>
                    <li className="hederlist5">Vehicle ChassisNo</li>
                  </ul>
                  {distinctVehicles.map((itemdata) => (
                    <ul
                      className="d-flex text-center"
                      style={{ marginLeft: "-66px" }}
                    >
                      <li className="tablebodylist">
                        <div
                          class="form-check form-check-inline"
                          id="datachackbox1"
                          key={itemdata}
                        >
                          <div className="custom-radio1">
                            <input
                              className="rd"
                              type="radio"
                              name="flexRadioDefault"
                              id={`flexRadioDefault_${itemdata.id}`}
                              value={itemdata.vehChassisNo}
                              checked={
                                selectedRadioValue === itemdata.vehChassisNo
                              }
                              onChange={() =>
                                setSelectedRadioValue(itemdata.vehChassisNo)
                              }
                            />
                          </div>
                        </div>
                      </li>
                      <li className="tablebodylist1">
                        {itemdata.vehicleRegn1}
                      </li>
                      <li className="tablebodylist2">
                        {itemdata.vehicleRegn2}
                      </li>
                      <li className="tablebodylist3">
                        {itemdata.vehicleModel}
                      </li>
                      <li className="tablebodylist4">
                        {itemdata.vehChassisNo}
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VechicalListPopUp;
