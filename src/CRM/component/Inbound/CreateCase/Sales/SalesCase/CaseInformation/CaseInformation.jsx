import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddActionForm } from "../../../../../../store/actions/inboundActions";
import Sales from "./Sales/Sales";
import TagVehicle from "./TagVehicle/TagVehicle";

const CaseInformation = ({
  vehicleModels,
  salesCaseResponseModel,
  payload,
  setSearchValue,
  setShowAllotedDealer,
}) => {
  const dispatch = useDispatch();
  const [activeForm, setActiveForm] = useState("");

  const { caseDepartments } = useSelector((state) => {
    const inboundModel = state.inboundReducer.inboundModel;
    return {
      caseDepartments: inboundModel?.createNewCase?.caseDepartments || [],
    };
  });
  useEffect(() => {
    caseDepartments && setActiveForm(caseDepartments[0]?.code);
  }, [caseDepartments]);
  const toggleCaseType = (formType) => {
    dispatch(toggleAddActionForm(formType));
    setActiveForm(formType);
  };
  const showHideFormSections = (e) => {
    let subCategoryId = parseInt(e.target.value);
    let subCategoryDetails;
    if (subCategoryId !== "") {
      if (
        salesCaseResponseModel !== undefined &&
        salesCaseResponseModel !== null
      ) {
        if (salesCaseResponseModel?.categories?.length > 0) {
          subCategoryDetails = salesCaseResponseModel.categories
            .find((category) => {
              return category.categoryID === payload.categoryId;
            })
            ["subCategories"].find(
              (subCategory) => subCategory.subCategoryID === subCategoryId
            );
        }
      }
    }
    setShowAllotedDealer(subCategoryDetails?.isAllotedDealerControlEnable);
  };

  return (
    <div className="col-6">
      <div className="card">
        <div className="card-header">Case Information</div>
        <div className="card-body p-1">
          <div
            className="btn-group btn-group-toggle w-100 sales-service-group mb-2"
            data-toggle="buttons"
          >
            {caseDepartments.map((department) => {
              return (
                <label
                  className={
                    "btn btn-light " +
                    (activeForm === department.code ? " active " : "")
                  }
                  onClick={() => toggleCaseType(department.code)}
                >
                  <input type="radio" name="options" id="option1" />{" "}
                  {department.code}
                </label>
              );
            })}
          </div>
          <Sales
            activeForm={activeForm}
            salesCaseResponseModel={salesCaseResponseModel}
            showHideFormSections={showHideFormSections}
            setShowAllotedDealer={setShowAllotedDealer}
            setSearchValue={setSearchValue}
          />
        </div>
      </div>

      <TagVehicle vehicleModels={vehicleModels} />
    </div>
  );
};

export default CaseInformation;
