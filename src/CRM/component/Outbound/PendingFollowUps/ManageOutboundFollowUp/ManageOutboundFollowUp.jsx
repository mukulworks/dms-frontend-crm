import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Button from "react-bootstrap-button-loader";
import useWindowSize from "../../../../../Hooks/useWindowSize";
import useGetUrl from "../../../../../Hooks/useGetUrl";
import {
  OutboundCaseByIdAction,
  saveCaseFollowUp,
  emptySaveOutboundResponse,
  GetCaseDatasheetAction,
} from "../../../../store/actions/outboundActions/outboundActions";
import NavbarTab from "../../../common/Navbar/NavbarTab";
import PageHeading from "../../../common/PageHeading/PageHeading";
import CustomerFeedbackForm from "./CustomerFeedbackForm/CustomerFeedbackForm";
import CustomerSalesVerificationDetails from "./CustomerSalesVerificationDetails/CustomerSalesVerificationDetails";
import CustomerVerification from "./CustomerVerification/CustomerVerification";
import Feedback from "./Feedback/Feedback";
import CustVerificationImg from "../../../../../images/Customer Verification- H.png";
import CustFeedbackImg from "../../../../../images/Customer Feedback.png";
//import CaseSummary from '../../CaseSummary/CaseSummary'
import CaseDatasheet from "../../CaseDatasheet/CaseDatasheet";
import func from "../../../../../utils/common.functions";
import Controls from "./Controls/Controls";
import PopUpModal from "../../../common/PopUpModal/PopUpModal";
import PopUpImage from "../../../../../images/already-modified.png";
import SaveConfirmation from "../../../../../components/Shared/SaveConfirmation/SaveConfirmation";

const ManageOutboundFollowUp = () => {
  const [activeId, setActiveId] = useState("FOLLOW_UP");
  const [isCaseSummaryActive, setIsCaseSummaryActive] = useState(false);
  const [caseSummaryApiReqData, setCaseSummaryApiReqData] = useState();
  const [isCaseDataSheetActive, setIsCaseDataSheetActive] = useState(false);
  const [caseDataSheetApiReqData, setCaseDataSheetApiReqData] = useState();
  const [isCallConnected, setIsCallConnected] = useState();
  const [isArrowUp, setIsArrowUp] = useState(true);
  const [isCustVerificationValidated, setIsCustVerificationValidated] =
    useState(null);
  const [reason, setReason] = useState("");
  const size = useWindowSize();
  const { caseUniqueId } = useGetUrl();
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalState, setModalState] = useState({
    open: false,
    event: null,
    formData: null,
  });
  const isLoading = useSelector((state) => {
    return state.inboundReducer.isLoading;
  });
  useEffect(() => {
    if (isCallConnected != "Y") {
      setActiveId("FOLLOW_UP");
    }
  }, [isCallConnected]);
  const goToFeedBack = () => {
    setActiveId("FEEDBACK");
  };
  const methods = useForm({
    defaultValues: {
      verificationParamCodes: [
        // { paramUniqueId: "", flagVerified: "", textResponse: "", actualResponse: "" },
      ],
      // surveyResponses: [
      //     // { surveyId: '', questionNo: '', responseNo: '', responseText: ''}
      // ],
      selectedConcerns: [{ value: "", label: "" }],
    },
  });

  useEffect(() => {
    if (caseUniqueId) {
      dispatch(OutboundCaseByIdAction(caseUniqueId));
      dispatch(GetCaseDatasheetAction(caseUniqueId));
    }
  }, [caseUniqueId]);
  useEffect(() => {
    if (!func.emptyObjectCheck(methods.errors)) {
      if (methods.errors.followUp === undefined) {
        setIsCustVerificationValidated(true);
      } else {
        setIsCustVerificationValidated(false);
      }
    }
  }, [methods.errors]);
  const {
    isEditEnable,
    outboundCase,
    customerMultiVerificationParams,
    callConnectFlags,
    nextActions,
    caseConcern,
    surveyQuestions,
    isTrueCallerVisible,
    outboundDataSheet,
    headerText,
    screenTabs,
    dmsCustomerBasicInfo,
    customerIdentification,
    surveyPageCount,
    satisfiedCustomerRange,
  } = useSelector((state) => {
    let manageOutboundFollowUp =
      state.outboundReducer.outboundModel.manageOutboundFollowUp;
    let isEditEnable = manageOutboundFollowUp?.isEditEnable;
    let outboundCase = manageOutboundFollowUp?.outboundCase;
    let dmsCustomerBasicInfo = manageOutboundFollowUp?.dmsCustomerBasicInfo;
    let customerIdentification = outboundCase?.customerIdentification;
    // let customerVerificationAddress = manageOutboundFollowUp?.customerVerificationAddress
    // let caseMultiVerificationParams = manageOutboundFollowUp?.caseMultiVerificationParams
    let customerMultiVerificationParams =
      manageOutboundFollowUp?.customerMultiVerificationParams;
    // let caseCustomerRepairOrders = manageOutboundFollowUp?.caseCustomerRepairOrders
    let callConnectFlags = manageOutboundFollowUp?.callConnectFlags;
    let nextActions = manageOutboundFollowUp?.nextActions;
    let caseConcern = manageOutboundFollowUp?.caseConcern;
    let surveyQuestions =
      manageOutboundFollowUp?.surveyFeedback?.surveyQuestions;
    let surveyPageCount = manageOutboundFollowUp?.surveyFeedback?.pageCount;
    let isTrueCallerVisible = manageOutboundFollowUp?.isTrueCallerVisible;
    let outboundDataSheet = manageOutboundFollowUp?.outboundDataSheet;
    let saveStatusCode = state.outboundReducer.saveStatusCode;
    let headerText = manageOutboundFollowUp?.screenHeading;
    let screenTabs = manageOutboundFollowUp?.screenTabs;
    let satisfiedCustomerRange =
      manageOutboundFollowUp?.surveyFeedback?.satisfiedCustomerRange;
    screenTabs = screenTabs?.map((screentab, i) => {
      let img = i == 0 ? CustVerificationImg : CustFeedbackImg;
      return {
        ...screentab,
        isValid: isCustVerificationValidated,
        imgId: img,
      };
    });

    if (saveStatusCode === 200) {
      dispatch(emptySaveOutboundResponse());
      history.push({
        pathname: "/Outbound/Index",
        state: { calledFrom: "SAVE" },
      });
    }

    return {
      isEditEnable: isEditEnable,
      outboundCase: outboundCase,
      customerMultiVerificationParams: customerMultiVerificationParams,
      callConnectFlags: callConnectFlags,
      nextActions: nextActions,
      caseConcern: caseConcern,
      surveyQuestions: surveyQuestions,
      isTrueCallerVisible: isTrueCallerVisible,
      outboundDataSheet: outboundDataSheet,
      headerText: headerText,
      screenTabs: screenTabs,
      dmsCustomerBasicInfo: dmsCustomerBasicInfo,
      customerIdentification: customerIdentification,
      surveyPageCount: surveyPageCount,
      satisfiedCustomerRange: satisfiedCustomerRange,
    };
  });

  const validate = {
    followUp: {
      flagCallConnected: {
        required: true,
      },
      reasons: {
        required: false,
      },
      nextActionEventId: {
        required: true,
      },
      callContactNumber: {
        required: true,
        minLength: 10,
        maxLength: 10,
      },
      telecallerText: {
        required: true,
      },
      caseConcerns: {
        required: true,
      },
      nextAppointmentOn: {
        required: true,
      },
      selectedInboundCategories: {
        required: false,
      },
    },
  };

  const openCaseSummary = (caseUniqueId) => {
    setIsCaseSummaryActive(!isCaseSummaryActive);
    setCaseSummaryApiReqData(caseUniqueId);
  };
  const openCaseDataSheet = (caseUniqueId) => {
    setIsCaseDataSheetActive(!isCaseDataSheetActive);
    setCaseDataSheetApiReqData(caseUniqueId);
  };

  const retrieveValue = (array) => {
    let data = [];
    if (array?.length > 0) {
      data = array.map((arr) => {
        return arr.value;
      });
      return data;
    }
    return data;
  };

  const parsingSurveyResponses = (surveyRes) => {
    let surveyResponses = [];

    if (surveyRes) {
      //parsing string data into object which is being stringified in CustomerFeedbackForm.jsx
      for (var survey of surveyRes) {
        if (survey) {
          for (const key in survey) {
            if (Object.hasOwnProperty.call(survey, key)) {
              if (
                key !== "responseText" &&
                key != "subcategory1" &&
                key != "subcategory2"
              ) {
                if (survey[key] != "") survey[key] = parseInt(survey[key] || "0"); //edit by mukul
                else survey[key] = "0"; // edit by mukul
                
              }
            }
          }
          surveyResponses.push(survey);
        }
      }
      return surveyResponses;
    }
    return surveyResponses;
  };

  const parsingVerificationParamCodes = (verificationParamCodes) => {
    if (verificationParamCodes) {
      verificationParamCodes.forEach((verificationParamCode) => {
        verificationParamCode.paramUniqueId = parseInt(
          verificationParamCode.paramUniqueId
        );
      });
      return verificationParamCodes;
    }
    return verificationParamCodes;
  };

  const onSubmit = (e, createCaseModel) => {
    let data = {
      caseCallerText: createCaseModel.followUp.telecallerText,
      scriptDispositionCode: createCaseModel.followUp.reasons,
      nextActionEventId: parseInt(createCaseModel.followUp.nextActionEventId),
      flagCallConnected: createCaseModel.followUp.flagCallConnected,
      callContactNumber: createCaseModel.followUp.callContactNumber,
      trueCallerVerified: createCaseModel.followUp.trueCallerVerified
        ? "Y"
        : "N",
      nextAppointmentOn:createCaseModel.followUp.nextAppointmentOn ,
      selectedConcerns: retrieveValue(createCaseModel.followUp.caseConcerns),
      selectedInboundCategories: retrieveValue(
        createCaseModel.followUp.selectedInboundCategories
      ),
      // followUpStatus: createCaseModel.followUp.followUpStatus

      surveyResponses:
        isCallConnected == "Y"
          ? parsingSurveyResponses(createCaseModel.surveyResponses)
          : null,
      verificationParamCodes:
        isCallConnected == "Y"
          ? parsingVerificationParamCodes(
              createCaseModel.verificationParamCodes
            )
          : null,
    };
    
    
   
    let temp = createCaseModel.surveyResponses?.filter((item) => {
      return item.responseNo === 0  && item.responseText === "";
    });
      
    if (temp && temp.length > 0) 
    {
      alert("Please Complete the Feedback ");
     hide();
    } 
     else 
     {
        let payload = {
        caseMasterSerial: caseUniqueId,
        data: data,
         };
        dispatch(saveCaseFollowUp(payload));
     }

  };

  const show = (formData, event) => {
    event.preventDefault();
    // console.log("show fired");
    setModalState({ open: true, event: event, formData: formData });
  };

  const confirm = () => onSubmit(modalState.event, modalState.formData);
 

  const hide = () =>
    setModalState({ open: false, event: null, formData: null });

  if (outboundCase === null || outboundCase === undefined) return null;
  const showFeedback = callConnectFlags.filter((x) => x.code == "Y")[0]
    .showFeedback;
  return (
    <React.Fragment>
      <SaveConfirmation
        isLoading={isLoading}
        confirm={confirm}
        modalState={modalState}
        hide={hide}
        message="Are you sure to update the case?"
      />
      <section className="left-space">
        <div className="col-12">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(show)}>
              <div className="row">
                <PageHeading
                  heading={headerText}
                  assignedTo={outboundCase.assignedUserId}
                />
                <div className="col-6 text-right">
                  <div className="col-12 text-right">
                    <Link
                      to={{
                        pathname: "/Outbound/Index",
                        state: { calledFrom: "BACK" },
                      }}
                      className="btn btn-outline-success"
                    >
                      Back
                    </Link>
                    {outboundCase?.caseStatus != "C" && (
                      <Button className="btn btn-success ml-3" type="submit">
                        Save
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <CustomerSalesVerificationDetails
                outboundCase={outboundCase}
                outboundDataSheet={outboundDataSheet}
                openCaseDataSheet={openCaseDataSheet}
                openCaseSummary={openCaseSummary}
                isArrowUp={isArrowUp}
              />
              <div className="row justify-content-between mt-1">
                <div className="col-12 bg-tab pt-2">
                  <div className="row justify-content-between">
                    <div className="col-12 process-flow">
                      <NavbarTab
                        activeId={activeId}
                        setActiveId={setActiveId}
                        screenTabs={screenTabs}
                        isCallConnected={isCallConnected}
                        reason={reason}
                        showFeedback={showFeedback}
                      />
                      <hr className="my-2" />
                      <div
                        className={"row grid-section call-details"}
                        style={{
                          height:
                            size.height !== undefined ? size.height - 360 : 0,
                        }}
                      >
                        <Feedback
                          setIsCallConnected={setIsCallConnected}
                          callConnectFlags={callConnectFlags}
                          nextActions={nextActions}
                          isTrueCallerVisible={isTrueCallerVisible}
                          caseConcern={caseConcern}
                          followUpValidation={validate.followUp}
                          show={activeId == "FOLLOW_UP"}
                          isCallConnected={isCallConnected}
                          goToFeedBack={goToFeedBack}
                          reason={reason}
                          setReason={setReason}
                          showFeedback={showFeedback}
                        />

                        <CustomerVerification
                          customerMultiVerificationParams={
                            customerMultiVerificationParams
                          }
                          show={activeId == "VERIFICATION"}
                        />

                        <CustomerFeedbackForm
                          surveyQuestions={surveyQuestions}
                          show={surveyQuestions && activeId == "FEEDBACK"}
                          screenHeading={headerText}
                          surveyPageCount={surveyPageCount}
                          satisfiedCustomerRange={satisfiedCustomerRange}
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
      <Controls
        outboundCase={outboundCase}
        dmsCustomerBasicInfo={dmsCustomerBasicInfo}
        customerIdentification={customerIdentification}
      />
      <CaseDatasheet
        surveyQuestions={surveyQuestions}
        isCaseDataSheetActive={isCaseDataSheetActive}
        setIsCaseDataSheetActive={setIsCaseDataSheetActive}
        caseDataSheetApiReqData={caseDataSheetApiReqData}
      />
      {isEditEnable === false ? (
        <PopUpModal
          show={!isEditEnable}
          image={PopUpImage}
          pathname="/Outbound/Index"
          calledFrom="BACK"
          caseType="Outbound"
        />
      ) : null}
    </React.Fragment>
  );
};

export default ManageOutboundFollowUp;
