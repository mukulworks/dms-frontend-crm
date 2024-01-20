import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormContext } from "react-hook-form";
import { handleNextAction } from "../../../../../../../store/actions/inboundActions";
import * as constants from "../../../../../../../../utils/constant";
import Select from "../../../../../../common/Select/Select";
import CasesSearchType from "../CasesSearchType/CasesSearchType";

const Sales = ({
  activeForm,
  salesCaseResponseModel,
  showHideFormSections,
  setShowAllotedDealer,
  setSearchValue,
}) => {
  const showCaseSource = salesCaseResponseModel?.showCaseSource;
  const showCaseType = salesCaseResponseModel?.showCaseType;
  const dispatch = useDispatch();
  const { register, errors, setValue } = useFormContext();
  const [subCategoryList, setSubCategoryList] = useState();
  const [calledFrom, setCalledFrom] = useState("");
  useEffect(() => {
    setValue("sales.category", "");
    setValue("sales.subCategory", "");
  }, [activeForm]);
  const hasError = (inputName) =>
    Boolean(errors && errors["sales"] && errors["sales"][inputName]);
  const validate = {
    sales: {
      source: {
        required: "Required",
      },
      caseType: {
        required: "Required",
      },
      category: {
        required: "Required",
      },
      subCategory: {
        required: "Required",
      },
      tagVehicleModel: {
        required: "Required",
      },
    },
  };
  //useEffect(() => {
  //    dispatch(createNewCaseAction(departmentCode))
  //}, [activeForm])
  const handleSubCategory = (e) => {
    let subCategory = [];
    if (e.target.value !== "") {
      let categoryId = parseInt(e.target.value);
      let payload = {
        listTypeCode: constants.PRE_SALES,
        categoryId: categoryId,
      };
      dispatch(handleNextAction(payload));

      if (
        salesCaseResponseModel !== null ||
        salesCaseResponseModel !== undefined
      ) {
        if (
          salesCaseResponseModel.categories !== undefined &&
          salesCaseResponseModel.categories !== null
        ) {
          subCategory = salesCaseResponseModel.categories.find((category) => {
            return category.categoryID === categoryId;
          });
        }
      }
      subCategory = subCategory.subCategories;
      setSubCategoryList(subCategory);
    } else {
      //empty sub category list on selecting empty category
      setSubCategoryList([]);
      //empty alloted dealer and vehicle information list on selecting empty category
      setShowAllotedDealer();
    }
  };

  const selectListOptions = (selectCode) => {
    let list;
    switch (selectCode) {
      case constants.SOURCE:
        list =
          salesCaseResponseModel &&
          salesCaseResponseModel.caseSources &&
          salesCaseResponseModel.caseSources.map((caseSource, key) => (
            <option value={caseSource.code} key={key}>
              {caseSource.description}
            </option>
          ));
        return list;
      case constants.CASE_TYPE:
        list =
          salesCaseResponseModel &&
          salesCaseResponseModel.caseTypes &&
          salesCaseResponseModel.caseTypes.map((caseType, key) => (
            <option value={caseType.code} key={key}>
              {caseType.description}
            </option>
          ));
        return list;
      case constants.CATEGORY:
        list =
          salesCaseResponseModel &&
          salesCaseResponseModel.categories &&
          salesCaseResponseModel.categories
            .filter((cat) => cat.classifictaionGroup === activeForm)
            .map((category, key) => (
              <option value={category.categoryID} key={key}>
                {category.categoryDescription}
              </option>
            ));
        return list;
      case constants.SUBCATEGORY:
        list =
          subCategoryList &&
          subCategoryList.map((subCategory, key) => (
            <option value={subCategory.subCategoryID} key={key}>
              {subCategory.subCategoryDesc}
            </option>
          ));
        return list;
      default:
        return null;
    }
  };

  return (
    <div className="sales">
      <CasesSearchType
        type="sales"
        setCalledFrom={setCalledFrom}
        setSearchValue={setSearchValue}
      />
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Called From</label>
        <div className="row is-invalid">
          <div className="col-3 text-center">
            <input type="text" className="form-control" value="+91" readOnly />
          </div>
          <div className="col-9 pl-0">
            <input
              defaultValue={calledFrom}
              type="text"
              className="form-control"
              placeholder="Enter Caller Mobile No."
              autoComplete="disable"
              maxLength={10}
            />
          </div>
        </div>
      </div>
      {showCaseSource && (
        <Select
          label="Source"
          name="sales.source"
          id="sales.source"
          selectClassName={
            "form-control" + (hasError("source") ? " is-invalid" : "")
          }
          star="star"
          emptyOption="Select Case Source"
          selectList={selectListOptions(constants.SOURCE)}
          customRef={register(validate.sales.source)}
        />
      )}
      {showCaseType && (
        <Select
          label="Case Type"
          name="sales.caseType"
          id="sales.caseType"
          selectClassName={
            "form-control" + (hasError("caseType") ? " is-invalid" : "")
          }
          star="star"
          emptyOption="Select Case Type"
          selectList={selectListOptions(constants.CASE_TYPE)}
          customRef={register(validate.sales.caseType)}
        />
      )}
      <Select
        label="Category"
        name="sales.category"
        id="sales.category"
        selectClassName={
          "form-control" + (hasError("category") ? " is-invalid" : "")
        }
        star="star"
        emptyOption="All Category"
        selectList={selectListOptions(constants.CATEGORY)}
        customRef={register(validate.sales.category)}
        onChangeFunction={handleSubCategory}
      />
      <Select
        label="Sub Category"
        name="sales.subCategory"
        id="sales.subCategory"
        selectClassName={
          "form-control" + (hasError("subCategory") ? " is-invalid" : "")
        }
        star="star"
        emptyOption="All Sub-Category"
        selectList={selectListOptions(constants.SUBCATEGORY)}
        customRef={register(validate.sales.subCategory)}
        onChangeFunction={(e) => showHideFormSections(e)}
      />
    </div>
  );
};

export default Sales;
