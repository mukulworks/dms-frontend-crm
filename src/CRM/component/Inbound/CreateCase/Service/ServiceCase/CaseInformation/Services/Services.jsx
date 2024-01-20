import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormContext } from "react-hook-form";
import * as constants from "../../../../../../../../utils/constant";
import { handleNextAction } from "../../../../../../../store/actions/inboundActions";
import Input from "../../../../../../common/Input/Input";
import Select from "../../../../../../common/Select/Select";
import SelectWithVal from "../../../../../../common/Select/SelectWithVal";
import CasesSearchType from "../CasesSearchType/CasesSearchType";

const Services = ({
  activeForm,
  serviceCaseResponseModel,
  showHideFormSections,
  setIsTagROChecked,
  isTagROChecked,
  setShowAllotedDealer,
  selectedJobCard,
}) => {
  const dispatch = useDispatch();
  const { register, errors, setValue } = useFormContext();
  useEffect(() => {
    setValue("service.category", "");
    setValue("service.subCategory", "");
  }, [activeForm]);

  const [subCategoryList, setSubCategoryList] = useState();
  const [categoryList, setCategoryList] = useState();
  const hasError = (inputName) =>
    Boolean(errors && errors["service"] && errors["service"][inputName]);
  const showCaseSource = serviceCaseResponseModel?.showCaseSource;
  const showCaseType = serviceCaseResponseModel?.showCaseType;
  const showComplaintType = serviceCaseResponseModel?.showComplaintType;
  const isRepeatCaseEnable = serviceCaseResponseModel?.isRepeatCaseEnable;
  const selectListOptions = (selectCode) => {
    let list;
    switch (selectCode) {
      case constants.SOURCE:
        list =
          serviceCaseResponseModel &&
          serviceCaseResponseModel.caseSources &&
          serviceCaseResponseModel.caseSources.map((caseSource, key) => (
            <option value={caseSource.code} key={key}>
              {caseSource.description}
            </option>
          ));
        return list;
      case constants.COMPLAINT_TYPE:
        list =
          serviceCaseResponseModel &&
          serviceCaseResponseModel.complaintTypes &&
          serviceCaseResponseModel.complaintTypes.map((complaintType, key) => (
            <option value={complaintType.code} key={key}>
              {complaintType.description}
            </option>
          ));
        return list;
      case constants.CASE_TYPE:
        list =
          serviceCaseResponseModel &&
          serviceCaseResponseModel.caseTypes &&
          serviceCaseResponseModel.caseTypes.map((caseType, key) => (
            <option value={caseType.code} key={key}>
              {caseType.description}
            </option>
          ));
        return list;
      case constants.CATEGORY:
        list =
          categoryList &&
          categoryList.map((category, key) => (
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

  const handleSubCategory = (e) => {
    let subCategory = [];
    if (e.target.value !== "") {
      let categoryId = parseInt(e.target.value);
      let payload = {
        listTypeCode: constants.SERVICE,
        categoryId: categoryId,
      };
      dispatch(handleNextAction(payload));

      if (
        serviceCaseResponseModel !== null ||
        serviceCaseResponseModel !== undefined
      ) {
        if (
          serviceCaseResponseModel.categories !== undefined &&
          serviceCaseResponseModel.categories !== null
        ) {
          subCategory = serviceCaseResponseModel.categories.find((category) => {
            return category.categoryID === categoryId;
          });
        }
      }
      subCategory = subCategory.subCategories;
      setSubCategoryList(subCategory);
    } else {
      setSubCategoryList([]);
    }
  };

  const handleCategory = (e) => {
    let categories = [];

    if (e.target.value !== "") {
      let complaintType = e.target.value;
      if (
        serviceCaseResponseModel !== null ||
        serviceCaseResponseModel !== undefined
      ) {
        if (
          serviceCaseResponseModel.categories !== undefined &&
          serviceCaseResponseModel.categories !== null
        ) {
          categories = serviceCaseResponseModel.categories.filter(
            (category) => {
              return category.complaintType === complaintType;
            }
          );
        }
      }
      setCategoryList(categories);
    } else {
      setCategoryList([]);
      setSubCategoryList([]);
      setShowAllotedDealer();
    }
  };

  const validate = {
    service: {
      source: {
        required: true,
      },
      complaintType: {
        required: true,
      },
      caseType: {
        required: true,
      },
      category: {
        required: true,
      },
      subCategory: {
        required: true,
      },
    },
  };
  const complaintTypeList = selectListOptions(constants.COMPLAINT_TYPE);
  const isSingleComplaintType = complaintTypeList?.length > 0;
  return (
    <div
      className={
        "services " + (activeForm === constants.SERVICE ? "" : "d-none")
      }
    >
      <CasesSearchType type="service" />

      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Called From</label>
        <div className="row is-invalid">
          <div className="col-3 text-center">
            <input type="text" className="form-control" value="+91" readOnly />
          </div>
          <div className="col-9 pl-0">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Caller Mobile No."
              autoComplete="disable"
              maxLength={10}
            />
          </div>
        </div>
      </div>
      {serviceCaseResponseModel?.showTagRO && (
        <Input
          label="KMS"
          type="text"
          inputClassName={
            "form-control" + (hasError("kms") ? " is-invalid" : "")
          }
          star="star"
          name="service.kms"
          id="service.kms"
          autoComplete="disable"
          placeholder="Enter KMS"
          customRef={register({ required: true })}
          value={selectedJobCard?.listD?.kms}
          readOnly={true}
        />
      )}
      {showCaseSource && (
        <Select
          label="Source"
          name="service.source"
          id="service.source"
          selectClassName={
            "form-control" + (hasError("source") ? " is-invalid" : "")
          }
          star="star"
          emptyOption="Select Source"
          selectList={selectListOptions(constants.SOURCE)}
          customRef={register(validate.service.source)}
        />
      )}
      {showComplaintType &&
        (!isSingleComplaintType ? (
          <Select
            label="Complaint Type"
            name="service.complaintType"
            id="service.complaintType"
            selectClassName={
              "form-control" + (hasError("complaintType") ? " is-invalid" : "")
            }
            star="star"
            emptyOption="Select Complaint Type"
            selectList={complaintTypeList}
            customRef={register(validate.service.complaintType)}
            onChangeFunction={handleCategory}
          />
        ) : (
          <SelectWithVal
            label="Complaint Type"
            name="service.complaintType"
            id="service.complaintType"
            selectClassName={
              "form-control" + (hasError("complaintType") ? " is-invalid" : "")
            }
            star="star"
            selectList={complaintTypeList[0]}
            customRef={register(validate.service.complaintType)}
            onChangeFunction={handleCategory}
            defaultValue={complaintTypeList[0].props.value}
          />
        ))}
      {showCaseType && (
        <Select
          label="Case Type"
          name="service.caseType"
          id="service.caseType"
          selectClassName={
            "form-control" + (hasError("caseType") ? " is-invalid" : "")
          }
          star="star"
          emptyOption="Select Case Type"
          selectList={selectListOptions(constants.CASE_TYPE)}
          customRef={register(validate.service.caseType)}
        />
      )}
      <Select
        label="Category"
        name="service.category"
        id="service.category"
        selectClassName={
          "form-control" + (hasError("category") ? " is-invalid" : "")
        }
        star="star"
        emptyOption="All Category"
        selectList={selectListOptions(constants.CATEGORY)}
        customRef={register(validate.service.category)}
        onChangeFunction={handleSubCategory}
      />
      <Select
        label="Sub Category"
        name="service.subCategory"
        id="service.subCategory"
        selectClassName={
          "form-control" + (hasError("subCategory") ? " is-invalid" : "")
        }
        star="star"
        emptyOption="All Sub Category"
        selectList={selectListOptions(constants.SUBCATEGORY)}
        customRef={register}
        onChangeFunction={(e) => showHideFormSections(e)}
      />
      <div className="form-group position-relative mt-2">
        <div className="row">
          {isRepeatCaseEnable && (
            <div className="col-6">
              <label htmlFor="">
                Repeat Case
                <div className="custom-control custom-switch d-inline-block ml-2">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch3"
                    name="service.repeatCase"
                    ref={register}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch3"
                  >
                    <span className="switch-position">Yes</span>
                  </label>
                </div>
              </label>
            </div>
          )}
          {serviceCaseResponseModel?.showTagRO && (
            <div className="col-6">
              <label htmlFor="">
                Tag RO#
                <div className="custom-control custom-switch d-inline-block ml-2">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch4"
                    name="service.tagRO"
                    ref={register}
                    onChange={() =>
                      setIsTagROChecked(isTagROChecked === "D" ? "" : "D")
                    }
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch4"
                  >
                    <span className="switch-position">Yes</span>
                  </label>
                </div>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
