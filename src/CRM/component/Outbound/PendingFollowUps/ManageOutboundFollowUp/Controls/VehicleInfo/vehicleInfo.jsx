import React from "react";
import * as constants from "../../../../../../../utils/constant";

const VehicleInfo = ({ switchControl, vehicleInfoControl, vehicleInfo }) => {
  const clickHandler = () => {
    switchControl(vehicleInfoControl ? "" : constants.VEHICLE_INFORMATION);
  };
  return (
    <>
      <li
        className={`nav-item VehicleInfo ${vehicleInfoControl ? "active" : ""}`}
      >
        <div className="sub-content-wrapper">
          <a className="nav-link" href="#" onClick={clickHandler}>
            <span className="mdi mdi-notebook"></span>
            <span className="text-title">Vehicle Information</span>
          </a>

          <div
            className={`sub-content pt ${vehicleInfoControl ? "" : "d-none"}`}
            style={{ maxHeight: 380, overflow: "auto" }}
          >
            <div className="bg-light pt-3 px-3 process-flow h-100 overflow-auto">
              <div className="card">
                <div className="card-header">Vehicle Information</div>
                {vehicleInfo?.vehRegnNo ? (
                  <div className="card-body py-2 px-2">
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-3 text-muted">Regn No</div>
                          <div className="col-9 text-uppercase text-black">
                            {vehicleInfo?.vehRegnNo}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3 text-muted">Chassis No</div>
                          <div className="col-9 text-uppercase text-black">
                            {vehicleInfo?.vehChassisNo}{" "}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3 text-muted">Model</div>
                          <div className="col-9 text-uppercase text-black">
                            {vehicleInfo?.vehModel || "-"}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3 text-muted">Variant</div>
                          <div className="col-9 text-uppercase text-black">
                            {vehicleInfo?.vehVariant || "-"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>No Record Exist</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default VehicleInfo;
