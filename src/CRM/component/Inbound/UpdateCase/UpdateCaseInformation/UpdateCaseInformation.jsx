import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

const UpdateCaseInformation = ({
  states,
  dealers,
  assignedState,
  assignedDealer,
  assignedOutlet,
  screenData,
  inboundCaseModel,
}) => {
  const { register, errors } = useFormContext();

  const hasError = (inputName) =>
    Boolean(errors && errors["caseInfo"] && errors["caseInfo"][inputName]);
  const reassignHasError = (inputName) =>
    Boolean(errors && errors["reassign"] && errors["reassign"][inputName]);
  let { caseSources, caseTypes, categories, showCaseSource, showCaseType } =
    screenData;
  let { caseSource, caseType, caseCategory, caseSubCategory } =
    inboundCaseModel;

  const [subCategoryList, setSubCategoryList] = useState(
    categories.find((x) => x.categoryID === caseCategory?.categoryID)
      ?.subCategories
  );

  const [dealerList, setDealerList] = useState(
    dealers.filter((x) => x.stateCode === assignedState)
  );
  const [outletList, setOutletList] = useState(
    dealers.find((dealer) => dealer.dealerCode === assignedDealer)?.outets
  );
  const handleOutlet = (e) => {
    let outlet = [];
    if (e.target.value !== "") {
      let dealerCode = e.target.value;
      if (dealers.length > 0) {
        outlet = dealers.find((dealer) => {
          return dealer.dealerCode === dealerCode;
        });
      }
      outlet = outlet.outets;
      setOutletList(outlet);
    } else {
      setOutletList([]);
    }
  };

  const handleDealer = (e) => {
    let dealer = [];
    if (e.target.value !== "") {
      let stateCode = e.target.value;
      if (dealers.length > 0) {
        dealer = dealers.filter((dealer) => {
          return dealer.stateCode === stateCode;
        });
      }
      setDealerList(dealer);
      setOutletList([]);
    } else {
      setDealerList([]);
      setOutletList([]);
    }
  };

  const handleSubCategory = (e) => {
    let subCategoryId = [];
    if (e.target.value !== "") {
      let categoryId = parseInt(e.target.value);
      subCategoryId =
        categories &&
        categories.find((x) => x.categoryID === categoryId)?.subCategories;
      setSubCategoryList(subCategoryId);
    } else {
      setSubCategoryList([]);
    }
  };

  const validate = {
    caseInfo: {
      caseSource: {
        required: true,
      },
      caseType: {
        required: true,
      },
      categoryId: {
        required: true,
      },
      subCategoryId: {
        required: true,
      },
    },
    reassign: {
      allotedDealerCode: {
        required: true,
      },
      allotedOutletCode: {
        required: true,
      },
    },
  };

  return (
    <div className="col-6">
      <div className="card">
        <div className="card-header">Case Information</div>
        <div className="card-body p-1">
          {showCaseSource && (
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">
                Source<span className="star">*</span>
              </label>
              <div>
                <select
                  ref={register(validate.caseInfo.caseSource)}
                  name="caseInfo.caseSource"
                  id="caseInfo.caseSource"
                  className={
                    "form-control" +
                    (hasError("caseSource") ? " is-invalid" : "")
                  }
                  defaultValue={caseSource?.code}
                  disabled
                >
                  <option value="">Select Case Source</option>
                  {caseSources &&
                    caseSources.map((caseSource, key) => (
                      <option value={caseSource.code} key={key}>
                        {caseSource.description}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}
          {showCaseType && (
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">
                Case Type<span className="star">*</span>
              </label>
              <div>
                <select
                  ref={register(validate.caseInfo.caseType)}
                  name="caseInfo.caseType"
                  id="caseInfo.caseType"
                  className={
                    "form-control" + (hasError("caseType") ? " is-invalid" : "")
                  }
                  defaultValue={caseType?.code}
                  disabled
                >
                  <option value="">Select Case Type</option>
                  {caseTypes &&
                    caseTypes.map((caseType, key) => (
                      <option value={caseType.code} key={key}>
                        {caseType.description}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              Category<span className="star">*</span>
            </label>
            <div>
              <select
                ref={register(validate.caseInfo.categoryId)}
                name="caseInfo.categoryId"
                id="caseInfo.categoryId"
                className={
                  "form-control" + (hasError("categoryId") ? " is-invalid" : "")
                }
                defaultValue={caseCategory?.categoryID}
                onChange={handleSubCategory}
              >
                <option value="">All Category</option>
                {categories &&
                  categories.map((category, key) => (
                    <option value={category.categoryID} key={key}>
                      {category.categoryDescription}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              Sub Category<span className="star">*</span>
            </label>
            <div>
              <select
                ref={register(validate.caseInfo.subCategoryId)}
                name="caseInfo.subCategoryId"
                id="caseInfo.subCategoryId"
                className={
                  "form-control" +
                  (hasError("subCategoryId") ? " is-invalid" : "")
                }
                defaultValue={caseSubCategory?.subCategoryID}
              >
                <option value="">All Sub-Category</option>
                {subCategoryList &&
                  subCategoryList.map((subCategory, key) => (
                    <option value={subCategory.subCategoryID} key={key}>
                      {subCategory.subCategoryDesc}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCaseInformation;
