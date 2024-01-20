import React from "react";
import { useFormContext } from "react-hook-form";
import Select from "../../../../../../common/Select/Select";
import * as constants from "../../../../../../../../utils/constant";

const TagVehicle = ({ vehicleModels, show }) => {
  const { register, errors } = useFormContext();
  const hasError = (inputName) =>
    Boolean(
      errors &&
        errors["tagVehicleModel"] &&
        errors["tagVehicleModel"][inputName]
    );

  const selectListOptions = (selectCode) => {
    let list;
    switch (selectCode) {
      case constants.VEHICLE:
        list =
          vehicleModels &&
          vehicleModels.map((vehModel, key) => (
            <option value={vehModel.model} key={key}>
              {vehModel.description}
            </option>
          ));
        return list;
      default:
        return null;
    }
  };

  return (
    <div className="card">
      {/* <div className="card-header">
                Vehicle Model
            </div> */}
      <div className="card-body p-1">
        <Select
          label="Model"
          name="tagVehicleModel.modelCode"
          id="tagVehicleModel.modelCode"
          selectClassName={
            "form-control" + (hasError("modelCode") ? " is-invalid" : "")
          }
          star="star"
          emptyOption="Select Model"
          selectList={selectListOptions(constants.VEHICLE)}
          customRef={register({
            required: "Required",
          })}
        />
      </div>
    </div>
  );
};

export default TagVehicle;
