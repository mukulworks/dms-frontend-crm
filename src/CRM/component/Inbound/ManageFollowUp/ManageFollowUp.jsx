import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Button from "react-bootstrap-button-loader";
import {
  fetchManageFollowUpAction,
  saveCaseFollowUpAction,
  emptySaveResponse,
  emptyInboundCasesList,
} from "../../../store/actions/inboundActions";
import CaseDetails from "./CaseDetails/CaseDetails";
import AddFollowUp from "./AddFollowUp/AddFollowUp";
import Controls from "./Controls/Controls";
import useWindowSize from "../../../../Hooks/useWindowSize";
import * as constants from "../../../../utils/constant";
import CaseDataSheet from "../CaseDataSheet/CaseDataSheet";
import PageHeading from "../../common/PageHeading/PageHeading";
import PopUpModal from "../../common/PopUpModal/PopUpModal";
import PopUpImage from "../../../../images/already-modified.png";
import SaveConfirmation from "../../../../components/Shared/SaveConfirmation/SaveConfirmation";
import moment from "moment";

const ManageFollowUp = () => {
  const [isCaseDataSheetActive, setIsCaseDataSheetActive] = useState(false);
  const [caseDataSheetApiReqData, setCaseDataSheetApiReqData] = useState();
  let { caseUniqueId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const methods = useForm();
  const size = useWindowSize();
  const [modalState, setModalState] = useState({
    open: false,
    event: null,
    formData: null,
  });
  const [selectedFileGuid, setSelectedFileGuid] = useState([]);
  const isLoading = useSelector((state) => {
    return state.inboundReducer.isLoading;
  });
  useEffect(() => {
    dispatch(fetchManageFollowUpAction(caseUniqueId));
  }, [caseUniqueId]);

  const [timerCount, setTimeCount] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeCount(false)
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const {
    inboundCaseModel,
    screenData,
    uploadDocuments,
    caseType,
    isEditEnable,
    isUpdateCaseEnable,
    communicationLogs,
  } = useSelector((state) => {
    let inboundCaseModel =
      state.inboundReducer.inboundModel.manageFollowUp.inboundCaseModel;
    let salesScreenData =
      state.inboundReducer.inboundModel.manageFollowUp.salesScreenData;
    let serviceScreenData =
      state.inboundReducer.inboundModel.manageFollowUp.serviceScreenData;
    let uploadDocuments =
      state.inboundReducer.inboundModel.manageFollowUp.uploadDocuments;
    let isUpdateCaseEnable =
      state.inboundReducer.inboundModel.manageFollowUp.isUpdateCaseEnable;
    let saveResponse = state.inboundReducer.inboundModel.saveResponse;
    let screenData =
      salesScreenData !== null ? salesScreenData : serviceScreenData;
    let isEditEnable = inboundCaseModel?.isEditEnable;
    let caseType = "";
    let communicationLogs =
      state.inboundReducer.inboundModel.manageFollowUp.communicationLogs;
    //let nextActionList=[]
    if (salesScreenData !== null && salesScreenData !== undefined) {
      caseType = constants.SALES;
    } else {
      if (serviceScreenData !== null && serviceScreenData !== undefined) {
        caseType = constants.SERVICE;
      }
    }

    if (saveResponse === 200) {
      dispatch(emptySaveResponse());
      dispatch(emptyInboundCasesList());
      if (caseType === "SALES")
        history.push({
          pathname: "/Inbound/Index",
          state: { calledFrom: "SAVE" },
        });
      else if (caseType === "SERVICE")
        history.push({
          pathname: "/Inbound/ActiveServiceCases",
          state: { calledFrom: "SAVE" },
        });
    }
    return {
      inboundCaseModel: inboundCaseModel,
      screenData: screenData,
      uploadDocuments: uploadDocuments,
      caseType: caseType,
      isEditEnable: isEditEnable,
      isUpdateCaseEnable: isUpdateCaseEnable,
      communicationLogs: communicationLogs,
    };
  });

  const updateCaseRequest = {
    categoryId: "",
    subCategoryId: "",
    flagCallConnected: "",
    callerReply: "",
    nextActionEventId: null,
    calledFrom: "",
    activityLog: {
      createCompanyId: "",
      createdIp: "0:0:0:1",
      createdBy: "",
    },
  };

  const onSubmit = (e, caseFollowUp) => {
    updateCaseRequest.caseUniqueId = parseInt(inboundCaseModel.caseUniqueId);
    updateCaseRequest.categoryId = parseInt(
      inboundCaseModel.caseCategory.categoryID
    );
    updateCaseRequest.subCategoryId = parseInt(
      inboundCaseModel.caseSubCategory.subCategoryID
    );
    updateCaseRequest.flagCallConnected = true;
    updateCaseRequest.flagCaseEscalated =
      caseFollowUp.actionDetails?.flagCaseEscalated;
    updateCaseRequest.nextActionEventId = parseInt(
      caseFollowUp.actionDetails?.nextActionEventId
    );
    updateCaseRequest.customerQuery = caseFollowUp.actionDetails?.customerQuery;
    updateCaseRequest.callerReply = caseFollowUp.actionDetails?.callerReply;
    updateCaseRequest.flagSupportRequired =
      caseFollowUp.actionDetails?.flagSupportRequired;
    updateCaseRequest.flagVehicleStand =
      caseFollowUp.actionDetails?.flagVehicleStand;
    updateCaseRequest.followUpType = caseFollowUp.actionDetails?.followUpType;
    // updateCaseRequest.nextActionDate = caseFollowUp.actionDetails?.nextDate;
    updateCaseRequest.nextActionDate = moment(caseFollowUp.actionDetails?.nextDate).format('YYYY-MM-DDT18:30:ss.SSS[Z]'); // edit by mukul 
    if (updateCaseRequest.flagCaseEscalated === "Y") {
      updateCaseRequest.escalateCase = caseFollowUp.actionDetails?.escalateCase;
    }
    updateCaseRequest.fupDocuments = selectedFileGuid.map((file) => {
      return {
        OriginalFileName: file,
      };
    });
    dispatch(saveCaseFollowUpAction(updateCaseRequest));
  };

  if (inboundCaseModel === null || inboundCaseModel === undefined) return null;

  const openCaseDataSheet = (caseUniqueId) => {
    setIsCaseDataSheetActive(!isCaseDataSheetActive);
    setCaseDataSheetApiReqData(caseUniqueId);
  };

  const show = (formData, event) => {
    event.preventDefault();

    event = {
      ...event,
      target: { ...event.target, value: event.target.value },
    };
    setModalState({ open: true, event: event, formData: formData });
  };

  const confirm = () => onSubmit(modalState.event, modalState.formData);

  const hide = () =>
    setModalState({ open: false, event: null, formData: null });

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
            <form onSubmit={
              methods.handleSubmit(show)}>
              <div className="row">
                <PageHeading heading="Manage Inbound Case" />
                <div className="col-6 text-right">
                  {isUpdateCaseEnable && (
                    <Link
                      to={{
                        pathname: `/Inbound/ReAssignDealer/${caseUniqueId}`,
                      }}
                      className="btn btn-outline-success"
                    >
                      Update Case
                    </Link>
                  )}
                  {caseType === "SALES" && (
                    <Link
                      to={{
                        pathname: "/Inbound/Index",
                        state: { calledFrom: "BACK" },
                      }}
                      className="btn btn-outline-success ml-3"
                    >
                      Back
                    </Link>
                  )}
                  {caseType === "SERVICE" && (
                    <Link
                      to={{
                        pathname: "/Inbound/ActiveServiceCases",
                        state: { calledFrom: "BACK" },
                      }}
                      className="btn btn-outline-success ml-3"
                    >
                      Back
                    </Link>
                  )}
                  {inboundCaseModel?.caseStatus != "C" && (
                    <Button
                      className="btn btn-success ml-3"
                      // disabled={activeLoader}
                      // loading={activeLoader}
                      type="submit"
                    >
                      Save Case
                    </Button>
                  )}
                </div>
              </div>
              {history.location?.state?.message &&
                history.location?.state?.calledFrom == "UPDATE" && timerCount ? (
                <div
                  className={`alert alert-success alert-dismissible fade position-absolute show`}
                  role="alert"
                  style={{ right: 15, zIndex: 99, top: 0 }}
                >
                  {history.location.state.message}
                  <button
                    type="button"
                    className="close p-2"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              ) : (
                ""
              )}
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
                <AddFollowUp
                  caseUniqueId={inboundCaseModel?.caseUniqueId}
                  uploadDocuments={uploadDocuments}
                  screenData={screenData}
                  nextActionList={
                    inboundCaseModel?.caseCategory?.caseNextActions
                  }
                  caseType={caseType}
                  screenType="MANAGE_FOLLOW_UP"
                  setSelectedFileGuid={setSelectedFileGuid}
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </section>
      <Controls departmentCode={caseType} inboundCaseModel={inboundCaseModel} />
      <CaseDataSheet
        isCaseDataSheetActive={isCaseDataSheetActive}
        setIsCaseDataSheetActive={setIsCaseDataSheetActive}
        caseDataSheetApiReqData={caseDataSheetApiReqData}
        communicationLogs={communicationLogs}
      />
      {isEditEnable === false ? (
        <PopUpModal
          show={!isEditEnable}
          image={PopUpImage}
          pathname="/Inbound/Index"
          calledFrom="BACK"
          caseType="Inbound"
        />
      ) : null}
    </React.Fragment>
  );
};

export default ManageFollowUp;
