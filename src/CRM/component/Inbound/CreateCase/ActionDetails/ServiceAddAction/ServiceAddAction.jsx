import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import * as constants from "../../../../../../utils/constant";
import Select from "../../../../common/Select/Select";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ServiceAddAction = ({
  nextActionList,
  serviceCaseResponseModel,
  setIsFileUploadMandatory,
}) => {
  const { register, errors, control } = useFormContext();
  const [enableNextActionDate, setEnableNextAction] = useState(false);
  const isFollowUpTypeEnable = serviceCaseResponseModel?.isFollowUpTypeEnable;
  const isVehicleStandEnable = serviceCaseResponseModel?.isVehicleStandEnable;
  const isVehicleSupportEnable =
    serviceCaseResponseModel?.isVehicleSupportEnable;
  const validate = {
    actionDetails: {
      customerQuery: {
        required: true,
        maxLength: 1500,
      },
      callerReply: {
        required: true,
        maxLength: 1500,
      },
      followUpType: {
        required: true,
      },
      nextActionEventId: {
        required: true,
      },
      nextDate: {
        required: true,
      },
      isCallConnected: {
        required: true,
      },
    },
  };

  const hasError = (inputName) =>
    Boolean(
      errors && errors["actionDetails"] && errors["actionDetails"][inputName]
    );

  const selectListOptions = (selectCode) => {
    let list;
    switch (selectCode) {
      case constants.FOLLOW_UP_TYPE:
        list =
          serviceCaseResponseModel &&
          serviceCaseResponseModel.caseFollowUpTypes &&
          serviceCaseResponseModel.caseFollowUpTypes.map(
            (followUpType, key) => (
              <option value={followUpType.code} key={key}>
                {followUpType.description}
              </option>
            )
          );
        return list;
      case constants.NEXT_ACTION:
        list =
          nextActionList &&
          nextActionList.map((nextAction, key) => (
            <option value={nextAction.nextActionEventId} key={key}>
              {nextAction.description}
            </option>
          ));
        return list;
      case "CALL_CONNECTED":
        list =
          serviceCaseResponseModel &&
          serviceCaseResponseModel.callConnectedFlags &&
          serviceCaseResponseModel.callConnectedFlags.map(
            (callConnectedFlag, key) => (
              <option value={callConnectedFlag.code} key={key}>
                {callConnectedFlag.description}
              </option>
            )
          );
        return list;
      default:
        return null;
    }
  };

  const [limitTextAreaLength, setLimitTextAreaLength] = useState({
    queryTextArea: 0,
    replyTextArea: 0,
  });
  const countNumberOfCharacters = (e) => {
    if (e.target.name === "actionDetails.customerQuery") {
      setLimitTextAreaLength({
        ...limitTextAreaLength,
        queryTextArea: e.target.value.length,
      });
      // setQueryText(e.target.value);
    }
    if (e.target.name === "actionDetails.callerReply") {
      setLimitTextAreaLength({
        ...limitTextAreaLength,
        replyTextArea: e.target.value.length,
      });
      // setReplyText(e.target.value);
    }
  };

  const handleFileUpload = (e) => {
    let { value } = e.target;
    if (value) {
      let nextAction =
        nextActionList &&
        nextActionList.find((x) => x.nextActionEventId === parseInt(value));
      let isFileAttachmentMandatory = nextAction.isFileAttachmentMandatory;
      let isNextActionDateEnable = nextAction.isNextActionDateEnable;
      setIsFileUploadMandatory(isFileAttachmentMandatory);
      setEnableNextAction(isNextActionDateEnable);
    }
  };

  const clearQueryTextOnButtonClick = () => {
    setLimitTextAreaLength({ ...limitTextAreaLength, queryTextArea: 0 });
    // setQueryText("");
  };

  const clearReplyTextOnButtonClick = () => {
    setLimitTextAreaLength({ ...limitTextAreaLength, replyTextArea: 0 });
    // setReplyText("");
  };

  return (
    <div className="col-6">
      <div className="card">
        <div className="card-header">Add Action</div>
        <div className="card-body p-1">
          {serviceCaseResponseModel?.isQueryCommentEnable ? (
            <div className="form-group">
              <label htmlFor="">
                Query<span className="star">*</span>
              </label>
              <span
                onClick={() => clearQueryTextOnButtonClick()}
                className="btn btn-success clear-text"
              >
                <span className="mdi mdi-refresh"></span>
              </span>
              <textarea
                name="actionDetails.customerQuery"
                id="actionDetails.customerQuery"
                cols="30"
                rows="3"
                placeholder="Enter Caller Query "
                ref={register(validate.actionDetails.customerQuery)}
                className={
                  "form-control" +
                  (hasError("customerQuery") ? " is-invalid" : "")
                }
                onChange={countNumberOfCharacters}
                maxLength="1500"
              ></textarea>
              <p className="text-right mb-0">
                <small className="form-text text-muted">
                  {limitTextAreaLength.queryTextArea} /{" "}
                  {serviceCaseResponseModel?.queryMaxCharacters}
                </small>
              </p>
            </div>
          ) : (
            <Select
              label="Call Connected"
              name="actionDetails.isCallConnected"
              id="actionDetails.isCallConnected"
              emptyOption="Select"
              selectClassName={
                "form-control" +
                (hasError("isCallConnected") ? " is-invalid" : "")
              }
              star="star"
              selectList={selectListOptions("CALL_CONNECTED")}
              customRef={register(validate.actionDetails.isCallConnected)}
            />
          )}
          <div className="form-group">
            <label htmlFor="">
              Reply<span className="star">*</span>
            </label>
            <span
              onClick={() => clearReplyTextOnButtonClick()}
              className="btn btn-success clear-text"
            >
              <span className="mdi mdi-refresh"></span>
            </span>
            <textarea
              name="actionDetails.callerReply"
              id="actionDetails.callerReply"
              cols="30"
              rows="3"
              ref={register(validate.actionDetails.callerReply)}
              className={
                "form-control" + (hasError("callerReply") ? " is-invalid" : "")
              }
              placeholder="Enter Caller Reply"
              onChange={countNumberOfCharacters}
              maxLength="1500"
            ></textarea>
            <p className="text-right mb-0">
              <small className="form-text text-muted">
                {limitTextAreaLength.replyTextArea} /{" "}
                {serviceCaseResponseModel?.replyMaxCharacters}
              </small>
            </p>
          </div>
          {isVehicleSupportEnable && (
            <div className="form-group position-relative mt-2">
              <label htmlFor="customSwitch11">
                Support Required
                <div className="custom-control custom-switch d-inline-block ml-2">
                  <input
                    name="actionDetails.flagSupportRequired"
                    ref={register}
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch12"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch12"
                  >
                    <span className="switch-position">Yes</span>
                  </label>
                </div>
              </label>
            </div>
          )}
          {isVehicleStandEnable && (
            <div className="form-group position-relative mt-2">
              <label htmlFor="customSwitch13">
                Vehicle Stand
                <div className="custom-control custom-switch d-inline-block ml-2">
                  <input
                    name="actionDetails.flagVehicleStand"
                    ref={register}
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch13"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch13"
                  >
                    <span className="switch-position-add-action">On Road</span>
                  </label>
                </div>
              </label>
            </div>
          )}
          {isFollowUpTypeEnable && (
            <Select
              label="Follow-Up Type"
              name="actionDetails.followUpType"
              id="actionDetails.followUpType"
              selectClassName={
                "form-control" + (hasError("followUpType") ? " is-invalid" : "")
              }
              star="star"
              emptyOption="Follow-Up Type"
              selectList={selectListOptions(constants.FOLLOW_UP_TYPE)}
              customRef={register(validate.actionDetails.followUpType)}
            />
          )}
          <Select
            label="Next Action"
            name="actionDetails.nextActionEventId"
            id="actionDetails.nextActionEventId"
            selectClassName={
              "form-control" +
              (hasError("nextActionEventId") ? " is-invalid" : "")
            }
            star="star"
            emptyOption="Select Next Action"
            selectList={selectListOptions(constants.NEXT_ACTION)}
            customRef={register(validate.actionDetails.nextActionEventId)}
            onChangeFunction={handleFileUpload}
          />
          {enableNextActionDate && (
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Next Date</label>
              <div className="row">
                <div className="col-10">
                  <Controller
                    control={control}
                    name="actionDetails.nextDate"
                    rules={{ required: true }}
                    render={(props) => (
                      <ReactDatePicker
                        // disabled={!isNextFupDateEnable}
                        className={
                          "form-control" +
                          (hasError("nextDate") ? "  is-invalid" : "")
                        }
                        onChange={(e) => props.onChange(e)}
                        closeOnScroll={true}
                        selected={props.value}
                        onBlur={props.onBlur}
                        dateFormat="dd-MMM-yyyy"
                        minDate={new Date()}
                        // filterDate={(date) => date.getMonth()} //by Mukul
                        ref={register}
                      />
                    )}
                  />
                </div>
                <div className="col-2 p-0 text-left">
                  <span className="mdi mdi-calendar-clock font-20 text-muted"></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceAddAction;
