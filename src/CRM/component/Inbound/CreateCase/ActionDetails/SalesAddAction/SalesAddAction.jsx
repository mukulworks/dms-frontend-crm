import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import * as constants from "../../../../../../utils/constant";
import Select from "../../../../common/Select/Select";

const SalesAddAction = ({
  nextActionList,
  salesCaseResponseModel,
  setIsFileUploadMandatory,
}) => {
  const [queryExpand, setQueryExpand] = useState(false);
  const [replyExpand, setReplyExpand] = useState(false);
  const { register, errors } = useFormContext();
  const [showHideEscalation, setShowHideEscalation] = useState(false);
  const [limitTextAreaLength, setLimitTextAreaLength] = useState({
    queryTextArea: 0,
    replyTextArea: 0,
  });
  const isEscalationEnable = salesCaseResponseModel?.isEscalationEnable;
  const hasError = (inputName) =>
    Boolean(
      errors && errors["actionDetails"] && errors["actionDetails"][inputName]
    );
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
      nextActionEventId: {
        required: true,
      },
      escalateCase: {
        required: true,
      },
      isCallConnected: {
        required: true,
      },
    },
  };

  const selectListOptions = (selectCode) => {
    let list;
    switch (selectCode) {
      case constants.NEXT_ACTION:
        list =
          nextActionList &&
          nextActionList.map((nextAction, key) => (
            <option value={nextAction.nextActionEventId} key={key}>
              {nextAction.description}
            </option>
          ));
        return list;
      case constants.ESCALATE_CASE:
        list =
          salesCaseResponseModel &&
          salesCaseResponseModel.caseEscalationReasons &&
          salesCaseResponseModel.caseEscalationReasons.map(
            (caseEscalationReason, key) => (
              <option value={caseEscalationReason.code} key={key}>
                {caseEscalationReason.description}
              </option>
            )
          );
        return list;
      case "CALL_CONNECTED":
        list =
          salesCaseResponseModel &&
          salesCaseResponseModel.callConnectedFlags &&
          salesCaseResponseModel.callConnectedFlags.map(
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
      let boolValue =
        nextActionList &&
        nextActionList.find((x) => x.nextActionEventId === parseInt(value))
          .isFileAttachmentMandatory;
      setIsFileUploadMandatory(boolValue);
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

  const clickQueryExpend = () => {
    setQueryExpand(!queryExpand);
  };
  const clickReplyExpend = () => {
    setReplyExpand(!replyExpand);
  };
  return (
    <div className="col-6">
      <div className="card">
        <div className="card-header">Add Action</div>
        <div className="card-body p-1">
          {salesCaseResponseModel?.isQueryCommentEnable ? (
            <div
              className={`form-group expand ${
                queryExpand ? "hover-text-area" : ""
              }`}
            >
              <label htmlFor="">
                Query<span className="star">*</span>
              </label>
              <span
                onClick={() => clearQueryTextOnButtonClick()}
                className="btn btn-success clear-text"
              >
                <span className="mdi mdi-refresh"></span>
              </span>
              <span
                onClick={() => {
                  clickQueryExpend();
                }}
                className="btn expand"
              >
                <span
                  className={`mdi mdi-arrow-${
                    !queryExpand ? "expand" : "collapse"
                  }`}
                ></span>
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
                  {salesCaseResponseModel?.queryMaxCharacters}
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
          <div
            className={`form-group expand ${
              replyExpand ? "hover-text-area" : ""
            }`}
          >
            <label htmlFor="">
              Reply<span className="star">*</span>
            </label>
            <span
              onClick={() => clearReplyTextOnButtonClick()}
              className="btn btn-success clear-text"
            >
              <span className="mdi mdi-refresh"></span>
            </span>
            <span
              onClick={() => {
                clickReplyExpend();
              }}
              className="btn expand"
            >
              <span
                className={`mdi mdi-arrow-${
                  !replyExpand ? "expand" : "collapse"
                }`}
              ></span>
            </span>
            <textarea
              name="actionDetails.callerReply"
              id="actionDetails.callerReply"
              cols="30"
              rows="3"
              placeholder="Enter Caller Reply"
              ref={register(validate.actionDetails.callerReply)}
              className={
                "form-control" + (hasError("callerReply") ? " is-invalid" : "")
              }
              onChange={countNumberOfCharacters}
              maxLength="1500"
            ></textarea>
            <p className="text-right mb-0">
              <small className="form-text text-muted">
                {limitTextAreaLength.replyTextArea} /{" "}
                {salesCaseResponseModel?.replyMaxCharacters}
              </small>
            </p>
          </div>
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
          <div className="form-group position-relative mt-2">
            {isEscalationEnable && (
              <label htmlFor="customSwitch11">
                Escalate Case<span className="star">*</span>
                <div className="custom-control custom-switch d-inline-block ml-2">
                  <input
                    name="actionDetails.flagCaseEscalated"
                    ref={register}
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch11"
                    onClick={() => setShowHideEscalation(!showHideEscalation)}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch11"
                  >
                    <span className="switch-position">Yes</span>
                  </label>
                </div>
              </label>
            )}
            {showHideEscalation ? (
              <Select
                name="actionDetails.escalateCase"
                id="actionDetails.escalateCase"
                selectClassName={
                  "form-control" +
                  (hasError("escalateCase") ? " is-invalid" : "")
                }
                emptyOption="Select Escalate Case"
                selectList={selectListOptions(constants.ESCALATE_CASE)}
                customRef={register(validate.actionDetails.escalateCase)}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAddAction;
