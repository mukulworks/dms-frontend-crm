import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import ActionDetails from "./ActionDetails/ActionDetails";
import SalesCase from "./Sales/SalesCase/SalesCase";
import ServiceCase from "./Service/ServiceCase/ServiceCase";
import Button from "react-bootstrap-button-loader";
import * as constants from "../../../../utils/constant";
import CreateCaseControls from "./CreateCaseControls/CreateCaseControls";
import useWindowSize from "../../../../Hooks/useWindowSize";
import PageHeading from "../../common/PageHeading/PageHeading";
import Navbar from "../../common/Navbar/Navbar";
import CaseDetailsImg from "../../../../images/Record Case Details.png";
import ActionDetailsImg from "../../../../images/Record Action Details.png";
import {
  createNewCaseAction,
  saveNewCase,
  emptySaveResponse,
  emptyInboundCasesList,
  emptyCreateCaseScreen,
} from "../../../store/actions/inboundActions";
import func from "../../../../utils/common.functions";
import SaveConfirmation from "../../../../components/Shared/SaveConfirmation/SaveConfirmation";

const CreateCase = () => {
  const { departmentCode } = useParams();
  const dispatch = useDispatch();
  const size = useWindowSize();
  const history = useHistory();
  const [isActive, setIsActive] = useState(true);
  const [isCaseDetailsValidated, setIsCaseDetailsValidated] = useState(null);
  const [isActionDetailsValidated, setIsActionDetailsValidated] =
    useState(null);
  const [isControlActive, setIsControlActive] = useState(false);
  const [isAllotedControlActive, setIsAllotedControlActive] = useState(false);
  const [selectedFileGuid, setSelectedFileGuid] = useState([]);
  const [modalState, setModalState] = useState({
    open: false,
    event: null,
    formData: null,
  });
  const methods = useForm();
  const { errors } = methods;
  useEffect(() => {
    //empty the state when user comes back to the screen
    dispatch(emptyCreateCaseScreen());

    dispatch(createNewCaseAction(departmentCode));
  }, []);
  const isLoading = useSelector((state) => {
    return state.inboundReducer.isLoading;
  });
  const {
    uploadDocuments,
    searchRecord,
    selectedJobCard,
    nextActionList,
    salesCaseResponseModel,
    serviceCaseResponseModel,
    searchCriteria,
  } = useSelector((state) => {
    let saveResponse = state.inboundReducer.inboundModel.saveResponse;
    let uploadDocuments =
      state.inboundReducer.inboundModel.createNewCase.uploadDocuments;
    let searchRecord = state.inboundReducer.searchRecord;
    let selectedJobCard = state.inboundReducer.selectedJobCard;
    let payload = state.inboundReducer.inboundModel.payload;
    let salesCaseResponseModel =
      state.inboundReducer.inboundModel.createNewCase.salesCaseResponseModel;
    let serviceCaseResponseModel =
      state.inboundReducer.inboundModel.createNewCase.serviceCaseResponseModel;
    let searchCriteria =
      state.inboundReducer?.inboundModel?.createNewCase?.criteria;
    if (saveResponse === 200) {
      dispatch(emptySaveResponse());
      dispatch(emptyInboundCasesList());
      if (departmentCode == "SALES") {
        history.push({
          pathname: "/Inbound/Index",
          state: { calledFrom: "SAVE" },
        });
      } else if (departmentCode == "SERVICE")
        history.push({
          pathname: "/Inbound/ActiveServiceCases",
          state: { calledFrom: "SAVE" },
        });
    }

    let nextActionList = [];
    if (payload !== undefined && payload.categoryId !== "") {
      switch (payload?.listTypeCode) {
        case constants.PRE_SALES:
          if (
            salesCaseResponseModel !== null ||
            salesCaseResponseModel !== undefined
          ) {
            if (
              salesCaseResponseModel.categories !== undefined &&
              salesCaseResponseModel.categories !== null
            ) {
              nextActionList = salesCaseResponseModel.categories?.find(
                (category) => {
                  return category.categoryID === payload.categoryId;
                }
              );
            }
          }
          nextActionList =
            nextActionList !== null ? nextActionList?.caseNextActions : [];
          break;
        case constants.SERVICE:
          if (payload != null && payload !== undefined) {
            if (
              serviceCaseResponseModel !== null ||
              serviceCaseResponseModel !== undefined
            ) {
              if (
                serviceCaseResponseModel.categories !== undefined &&
                serviceCaseResponseModel.categories !== null
              ) {
                nextActionList = serviceCaseResponseModel.categories?.find(
                  (category) => {
                    return category.categoryID === payload.categoryId;
                  }
                );
              }
            }
            nextActionList =
              nextActionList !== null ? nextActionList?.caseNextActions : [];
          }
          break;
        default:
          nextActionList = [];
      }
    } else {
      nextActionList = [];
    }

    return {
      uploadDocuments: uploadDocuments,
      searchRecord: searchRecord,
      selectedJobCard: selectedJobCard,
      nextActionList: nextActionList,
      salesCaseResponseModel: salesCaseResponseModel,
      serviceCaseResponseModel: serviceCaseResponseModel,
      searchCriteria: searchCriteria,
    };
  });

  const onSubmit = (e, createCaseModel) => {
    let createCaseRequest = {
      tagCourtesyCar: {},
    };
    if (createCaseModel.sales !== null && createCaseModel.sales !== undefined) {
      createCaseRequest.categoryId = parseInt(createCaseModel.sales.category);
      createCaseRequest.subCategoryId = parseInt(
        createCaseModel.sales.subCategory
      );
      createCaseRequest.caseSource = createCaseModel.sales.source;
      createCaseRequest.caseType = createCaseModel.sales.caseType;
      createCaseRequest.tagVehicleModel = null; //createCaseModel.preSales.tagVehicleModel //API IS ACCEPTING ONLY NULL

      if (createCaseModel.actionDetails !== null) {
        createCaseRequest.flagCaseEscalated =
          createCaseModel.actionDetails.flagCaseEscalated;
        createCaseRequest.nextActionEventId = parseInt(
          createCaseModel.actionDetails.nextActionEventId
        );
        createCaseRequest.customerQuery =
          createCaseModel.actionDetails.customerQuery;
        createCaseRequest.callerReply =
          createCaseModel.actionDetails.callerReply;
        if (createCaseRequest.flagCaseEscalated === "Y") {
          createCaseRequest.escalateCase =
            createCaseModel.actionDetails.escalateCase;
        }
      }

      switch (searchRecord && searchRecord.searchType) {
        case constants.PROSPECTS:
          createCaseRequest.tagDMS = {
            type: "PROSPECT_NO",
            id: parseInt(searchRecord.searchValue),
          };
          break;
        case constants.ORDERS:
          createCaseRequest.tagDMS = {
            type: "CUST_MASTER_SERIAL",
            id: parseInt(searchRecord.searchValue),
          };
          break;
        case constants.CASES:
          createCaseRequest.tagDMS = {
            type: "CASE_MASTER_SERIAL",
            id: parseInt(searchRecord.searchValue),
          };
          break;
        default:
          break;
      }
    }
    if (
      createCaseModel.service !== null &&
      createCaseModel.service !== undefined
    ) {
      if (
        createCaseModel.service.tagRO &&
        (selectedJobCard == null ||
          selectedJobCard === undefined ||
          parseInt(selectedJobCard?.cardMasterSerial) == 0) &&
        serviceCaseResponseModel?.showTagRO
      ) {
        alert("Kindly Tag RO#");
        return;
      }

      createCaseRequest.categoryId = parseInt(createCaseModel.service.category);
      createCaseRequest.subCategoryId = parseInt(
        createCaseModel.service.subCategory
      );
      createCaseRequest.caseSource = createCaseModel.service.source;
      createCaseRequest.caseType = createCaseModel.service.caseType;
      createCaseRequest.complaintType = createCaseModel.service.complaintType;
      createCaseRequest.repeatCase = createCaseModel.service.repeatCase;
      if (createCaseModel.service.kms != null)
        createCaseRequest.kms = parseInt(createCaseModel.service.kms);

      createCaseRequest.tagVehicleModel = null; //createCaseModel.preSales.tagVehicleModel //API IS ACCEPTING ONLY NULL

      if (createCaseModel.actionDetails !== null) {
        createCaseRequest.flagCaseEscalated =
          createCaseModel.actionDetails.flagCaseEscalated;
        createCaseRequest.nextActionEventId = parseInt(
          createCaseModel.actionDetails.nextActionEventId
        );
        createCaseRequest.customerQuery =
          createCaseModel.actionDetails.customerQuery;
        createCaseRequest.callerReply =
          createCaseModel.actionDetails.callerReply;
        createCaseRequest.flagSupportRequired =
          createCaseModel.actionDetails.flagSupportRequired;
        createCaseRequest.flagVehicleStand =
          createCaseModel.actionDetails.flagVehicleStand;
        createCaseRequest.followUpType =
          createCaseModel.actionDetails.followUpType;
        createCaseRequest.nextActionDate =
          createCaseModel.actionDetails.nextDate;
        if (createCaseRequest.flagCaseEscalated === "Y") {
          createCaseRequest.escalateCase =
            createCaseModel.actionDetails.escalateCase;
        }
        if (createCaseModel?.courtesyCar?.isCourtesyCarAlloted) {
          createCaseRequest.tagCourtesyCar = {
            isCourtesyCarAlloted:
              createCaseModel.courtesyCar.isCourtesyCarAlloted,
            courtesyCarType: createCaseModel.courtesyCar.courtesyCarType,
            courtesyCarFrom: createCaseModel.courtesyCar.courtesyCarFrom,
            courtesyCarTo: createCaseModel.courtesyCar.courtesyCarTo,
          };
        }
      }

      if (selectedJobCard !== null && selectedJobCard != undefined) {
        createCaseRequest.tagDMS = {
          type: "CARD_MASTER_SERIAL",
          id: parseInt(selectedJobCard?.cardMasterSerial),
        };
      }
    }

    if (createCaseModel.allotedDealer !== null) {
      createCaseRequest.tagAllotedDealer = {
        allotedDealerCode: createCaseModel.allotedDealer.allotedDealerCode,
        allotedOutletCode: createCaseModel.allotedDealer.allotedOutletCode,
      };
    }

    if (
      createCaseModel.tagVehicleModel !== null &&
      createCaseModel.tagVehicleModel !== undefined
    ) {
      createCaseRequest.tagVehicleModel = {
        modelCode: createCaseModel.tagVehicleModel?.modelCode,
      };
    }

    if (createCaseModel.callerInfo !== null) {
      createCaseRequest.customer = {
        callerContactNumber: createCaseModel.callerInfo.custMobile,
        custAddress1: createCaseModel.callerInfo.custAddress1,
        custAddress2: createCaseModel.callerInfo.custAddress2,
        custAddress3: createCaseModel.callerInfo.custAddress3,
        custCityCode: createCaseModel.callerInfo.custCityCode,
        custStateCode: createCaseModel.callerInfo.custStateCode,
        custTitle: createCaseModel.callerInfo.custTitle,
        custPincode: createCaseModel.callerInfo.custPincode.toString(),
        custPhoneCountryCode: createCaseModel.callerInfo.custPhoneCountryCode
          .toString()
          .substring(1),
        custName: createCaseModel.callerInfo.custName,
        custMobile: createCaseModel.callerInfo.custMobile.toString(),
        custEmail: createCaseModel.callerInfo.email,
      };
    }
    createCaseRequest.fupDocuments = selectedFileGuid.map((file) => {
      return {
        OriginalFileName: file,
      };
    });

    dispatch(saveNewCase(createCaseRequest));
  };
  useEffect(() => {
    searchCriteria &&
      !localStorage.getItem("selectedCriteria") &&
      localStorage.setItem("selectedCriteria", JSON.stringify(searchCriteria));
  }, [searchCriteria]);
  useEffect(() => {
    if (!func.emptyObjectCheck(errors)) {
      if (departmentCode === constants.SALES) {
        if (
          errors.sales === undefined &&
          errors?.allotedDealer === undefined &&
          errors?.vehicleInformation === undefined &&
          errors?.callerInfo === undefined
        ) {
          setIsCaseDetailsValidated(true);
        } else {
          setIsCaseDetailsValidated(false);
        }

        if (errors.actionDetails === undefined) {
          setIsActionDetailsValidated(true);
        } else {
          setIsActionDetailsValidated(false);
        }
      } else if (departmentCode === constants.SERVICE) {
        if (
          errors?.service === undefined &&
          errors?.callerInfo === undefined &&
          errors?.courtesyCar === undefined
        ) {
          setIsCaseDetailsValidated(true);
        } else {
          setIsCaseDetailsValidated(false);
        }

        if (errors.actionDetails === undefined) {
          setIsActionDetailsValidated(true);
        } else {
          setIsActionDetailsValidated(false);
        }
      }
    }
  }, [errors]);

  const show = (formData, event) => {
    event.preventDefault();

    event = {
      ...event,
      target: { ...event.target, value: event.target.value },
    };
    setModalState({ open: true, event: event, formData: formData });
  };

  const confirm = () => {
    onSubmit(modalState.event, modalState.formData);
  };

  const hide = () =>
    setModalState({ open: false, event: null, formData: null });

  return (
    <React.Fragment>
      <SaveConfirmation
        isLoading={isLoading}
        confirm={confirm}
        modalState={modalState}
        hide={hide}
        message="Are you sure to create the case?"
      />
      <section className="left-space">
        <div className="col-12">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(show)} autoComplete="nope">
              <div className="row">
                <PageHeading heading="Register Incoming" />
                <div className="col-6 text-right">
                  {departmentCode === constants.SALES && (
                    // <Link to='/INBOUND/INDEX' className="btn btn-outline-success" >Back</Link>
                    <Link
                      to={{
                        pathname: "/Inbound/Index",
                        state: { calledFrom: "BACK" },
                      }}
                      className="btn btn-outline-success"
                    >
                      Back
                    </Link>
                  )}
                  {departmentCode === constants.SERVICE && (
                    <Link
                      to={{
                        pathname: "/Inbound/ActiveServiceCases",
                        state: { calledFrom: "BACK" },
                      }}
                      className="btn btn-outline-success"
                    >
                      Back
                    </Link>
                  )}
                  <Button className="btn btn-success ml-3" type="submit">
                    Save
                  </Button>
                </div>
              </div>
              <div className="row justify-content-between mt-1">
                <div className="col-12 bg-tab pt-1">
                  <div className="row justify-content-between">
                    <div className="col-12 process-flow">
                      <Navbar
                        id1="call-details"
                        id2="booking-details"
                        firstHeading="Please record case details here"
                        secondHeading="Please record action details here"
                        isActive={isActive}
                        setIsActive={setIsActive}
                        img1={CaseDetailsImg}
                        img2={ActionDetailsImg}
                        isFirstFormValidationPassed={isCaseDetailsValidated}
                        isSecondFormValidationPassed={isActionDetailsValidated}
                      />
                      <hr className="my-2" />
                      <div className="col-12 bg-tab">
                        {departmentCode === constants.SALES && (
                          <SalesCase
                            isActive={isActive}
                            setIsControlActive={setIsControlActive}
                            isControlActive={isControlActive}
                            isAllotedControlActive={isAllotedControlActive}
                            setIsAllotedControlActive={
                              setIsAllotedControlActive
                            }
                          />
                        )}
                        {departmentCode === constants.SERVICE && (
                          <ServiceCase
                            isActive={isActive}
                            setIsControlActive={setIsControlActive}
                            isControlActive={isControlActive}
                            isAllotedControlActive={isAllotedControlActive}
                            setIsAllotedControlActive={
                              setIsAllotedControlActive
                            }
                          />
                        )}
                        <ActionDetails
                          isActive={isActive}
                          formType={departmentCode}
                          uploadDocuments={uploadDocuments}
                          screenType="CREATE_NEW_CASE"
                          nextActionList={nextActionList}
                          salesCaseResponseModel={salesCaseResponseModel}
                          serviceCaseResponseModel={serviceCaseResponseModel}
                          setSelectedFileGuid={setSelectedFileGuid}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </section>
      <CreateCaseControls
        departmentCode={departmentCode}
        isControlActive={isControlActive}
        isAllotedControlActive={isAllotedControlActive}
      />
    </React.Fragment>
  );
};

export default CreateCase;
