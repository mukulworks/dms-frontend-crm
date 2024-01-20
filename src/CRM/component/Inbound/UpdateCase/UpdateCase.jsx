import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Button from "react-bootstrap-button-loader";
import useWindowSize from "../../../../Hooks/useWindowSize";
import * as constants from "../../../../utils/constant";
import PageHeading from "../../common/PageHeading/PageHeading";
import UpdateReassignDealer from "./UpdateReassignDealer/UpdateReassignDealer";
import { fetchManageFollowUpAction } from "../../../store/actions/inboundActions";
import { reassignCaseToDealer } from "../../../store/services/inboundServices";
import CaseDetails from "../ManageFollowUp/CaseDetails/CaseDetails";
import CaseDataSheet from "../CaseDataSheet/CaseDataSheet";
import * as types from "../../../store/actions/index";
import UpdateCaseInformation from "./UpdateCaseInformation/UpdateCaseInformation";

const UpdateCase = () => {
  let { caseUniqueId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const methods = useForm();
  const size = useWindowSize();
  const [isCaseDataSheetActive, setIsCaseDataSheetActive] = useState(false);
  const [caseDataSheetApiReqData, setCaseDataSheetApiReqData] = useState();
  const [isAllotedControlActive, setIsAllotedControlActive] = useState(false);
  const [stateCode, setStateCode] = useState(null);

  const { register, errors } = methods;
  const hasError = (inputName) =>
    Boolean(errors && errors["reassign"] && errors["reassign"][inputName]);

  useEffect(() => {
    dispatch(fetchManageFollowUpAction(caseUniqueId));
  }, [caseUniqueId]);

  const {
    inboundCaseModel,
    screenData,
    caseType,
    dealers,
    states,
    assignedState,
    assignedDealer,
    assignedOutlet,
  } = useSelector((outlet) => {
    let manageFollowUp = outlet.inboundReducer.inboundModel.manageFollowUp;
    let inboundCaseModel = manageFollowUp.inboundCaseModel;
    let salesScreenData = manageFollowUp.salesScreenData;
    let serviceScreenData = manageFollowUp.serviceScreenData;
    let dealers = manageFollowUp.dealers;
    let states = manageFollowUp.states;
    let assignedDealer = inboundCaseModel?.allotedDealer?.dealerCode;
    let assignedOutlet = inboundCaseModel?.allotedOutlet?.branchCode;
    let assignedState = inboundCaseModel?.allotedDealer?.stateCode;
    let saveResponse = outlet.inboundReducer.inboundModel.saveResponse;
    let screenData =
      salesScreenData !== null ? salesScreenData : serviceScreenData;

    let caseType = "";
    //let nextActionList=[]
    if (salesScreenData !== null && salesScreenData !== undefined) {
      caseType = constants.SALES;
    } else {
      if (serviceScreenData !== null && serviceScreenData !== undefined) {
        caseType = constants.SERVICE;
      }
    }

    return {
      inboundCaseModel: inboundCaseModel,
      screenData: screenData,
      caseType: caseType,
      dealers: dealers,
      states: states,
      assignedDealer: assignedDealer,
      assignedOutlet: assignedOutlet,
      assignedState: assignedState,
    };
  });

  const onSubmit = (updateCaseModel, e) => {
    dispatch({ type: types.SHOW_LOADER });
    let requestModel = {
      tagAllotedDealer: {},
    };
    //passing data of caseInfo fields
    if (updateCaseModel) {
      updateCaseModel.caseInfo = {
        ...updateCaseModel.caseInfo,
        categoryId: parseInt(updateCaseModel.caseInfo.categoryId),
        subCategoryId: parseInt(updateCaseModel.caseInfo.subCategoryId),
      };
      requestModel = updateCaseModel.caseInfo;
    }

    //passing data to reassign fields
    if (updateCaseModel.reassign) {
      requestModel = {
        ...requestModel,
        tagAllotedDealer: updateCaseModel.reassign,
      };
    }

    //passing comment
    requestModel = {
      ...requestModel,
      comment: updateCaseModel.comment,
    };

    //gathered data into the payload
    let payload = {
      caseUniqueId: caseUniqueId,
      requestModel: requestModel,
    };

    //call api for saving data
    let apiData = reassignCaseToDealer(payload);
    Promise.resolve(apiData)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: types.HIDE_LOADER });
          history.push({
            pathname: `/Inbound/ManageFollowUp/${caseUniqueId}`,
            state: { calledFrom: "UPDATE", message: res?.data?.response },
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.HIDE_LOADER });
      });
  };

  const setSelectedStateCode = (e) => {
    if (e.target.value !== "") {
      let stateCode = e.target.value;
      if (states !== undefined && states !== null) {
        setStateCode(stateCode);
      }
    }
  };

  const [limitTextAreaLength, setLimitTextAreaLength] = useState(0);

  const countNumberOfCharacters = (e) => {
    let { value } = e.target;
    if (value) {
      setLimitTextAreaLength(value.length);
    }
  };

  const openCaseDataSheet = (caseUniqueId) => {
    setIsCaseDataSheetActive(!isCaseDataSheetActive);
    setCaseDataSheetApiReqData(caseUniqueId);
  };
  if (inboundCaseModel === null || inboundCaseModel === undefined) return null;

  return (
    <React.Fragment>
      <section className="left-space">
        <div className="col-12">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="row">
                <PageHeading heading="Update Case" />
                <div className="col-6 text-right">
                  {caseType === "SALES" && (
                    <Link
                      to={{
                        pathname: `/Inbound/ManageFollowUp/${caseUniqueId}`,
                      }}
                      className="btn btn-outline-success"
                    >
                      Back
                    </Link>
                  )}
                  {caseType === "SERVICE" && (
                    <Link
                      to={{
                        pathname: `/Inbound/ManageFollowUp/${caseUniqueId}`,
                      }}
                      className="btn btn-outline-success"
                    >
                      Back
                    </Link>
                  )}
                  <Button
                    className="btn btn-success ml-3"
                    disabled={methods.formState.isSubmitting}
                    loading={methods.formState.isSubmitting}
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </div>

              <CaseDetails
                inboundCaseModel={inboundCaseModel}
                screenData={screenData}
                openCaseDataSheet={openCaseDataSheet}
              />
              <div
                className="col-12 bg-tab"
                style={{
                  height: size.height !== null ? size.height - 308 : null,
                }}
              >
                <div className="row justify-content-between mt-1">
                  <div className="col-12 bg-tab pt-1">
                    <div className="row justify-content-between">
                      <div className="col-12 process-flow">
                        <div className="row booking-details grid-section">
                          <div className="col-8">
                            <div className="row">
                              {/* <UpdateReassignDealer 
                                                            
                                                        /> */}
                              <UpdateCaseInformation
                                inboundCaseModel={inboundCaseModel}
                                states={states}
                                dealers={dealers}
                                assignedDealer={assignedDealer}
                                assignedOutlet={assignedOutlet}
                                assignedState={assignedState}
                                screenData={screenData}
                              />
                              <UpdateReassignDealer
                                inboundCaseModel={inboundCaseModel}
                                states={states}
                                dealers={dealers}
                                assignedDealer={assignedDealer}
                                assignedOutlet={assignedOutlet}
                                assignedState={assignedState}
                                screenData={screenData}
                              />
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="card">
                              <div className="card-header">
                                Re-Assign Dealer
                              </div>
                              <div className="card-body p-1">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Comment<span className="star">*</span>
                                  </label>
                                  <textarea
                                    name="comment"
                                    id="comment"
                                    placeholder="Enter Caller Query "
                                    ref={register({ required: true })}
                                    className={
                                      "form-control" +
                                      (hasError("comment") ? " is-invalid" : "")
                                    }
                                    onChange={countNumberOfCharacters}
                                    maxLength="1500"
                                    rows="10"
                                  ></textarea>
                                  <p className="text-right mb-0">
                                    <small className="form-text text-muted">
                                      {limitTextAreaLength} / 500
                                    </small>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </section>
      <CaseDataSheet
        isCaseDataSheetActive={isCaseDataSheetActive}
        setIsCaseDataSheetActive={setIsCaseDataSheetActive}
        caseDataSheetApiReqData={caseDataSheetApiReqData}
      />
    </React.Fragment>
  );
};

export default UpdateCase;
