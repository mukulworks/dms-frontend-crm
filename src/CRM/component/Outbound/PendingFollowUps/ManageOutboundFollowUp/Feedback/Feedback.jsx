import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useFormContext, Controller } from "react-hook-form";
import addDays from "date-fns/addDays";
import MultiSelect from "react-multi-select-component";
import "react-datepicker/dist/react-datepicker.css";

const Feedback = ({
  setIsCallConnected,
  callConnectFlags,
  nextActions,
  isTrueCallerVisible,
  caseConcern,
  followUpValidation,
  show,
  isCallConnected,
  goToFeedBack,
  reason,
  setReason,
  showFeedback,
}) => {
  const [reasons, setReasons] = useState([]);

  const { register, errors, control } = useFormContext();
  const hasError = (inputName) =>
    Boolean(errors && errors["followUp"] && errors["followUp"][inputName]);
  const [isReschedule, setIsReschedule] = useState(true);
  const modify = () => {
    let arr = [];
    arr = caseConcern?.concerns.map((d) => {
      return { value: d.code, label: d.description };
    });
    return arr;
  };

  const handleStatusChange = (e) => {
    let { value } = e.target;
    setIsCallConnected(value);

    let reasons = [];
    let flag = value;
    if (callConnectFlags && callConnectFlags !== "") {
      reasons = callConnectFlags.find((callConnectFlag) => {
        return callConnectFlag.code == flag;
      });
      reasons = reasons !== undefined ? reasons["reasons"] : [];
      setReasons(reasons);
    }
  };
  const handleReasonChange = (e) => {
    let { value } = e.target;
    setReason(value);
  };

  const [textAreaLength, setTextAreaLength] = useState(0);
  const countNumberOfCharacters = (e) => {
    setTextAreaLength(e.target.value.length);
  };

  const [caseInboundConcerns, setCaseInboundConcerns] = useState();
  const modifyC = () => {
    let arr = [];
    arr = caseInboundConcerns?.map((d) => {
      return { value: d.code, label: d.description };
    });
    return arr;
  };
  const handleSelect = (e) => {
    let { name, value } = e.target;
    let inboundConcerns = [];
    switch (name) {
      case "followUp.nextActionEventId":
        {
          nextActions &&
            nextActions.map((nextAction, key) => {
              if (nextAction.code == value) {
                setIsReschedule(nextAction.isEnableReSchedule);
              }
            });
        }

        inboundConcerns =
          nextActions &&
          nextActions.find((nextAction) => {
            return nextAction.code === value;
          });
        setCaseInboundConcerns(inboundConcerns.caseInboundConcerns);
        break;
      default:
        break;
    }
  };
  return (
    <div className={`${show ? "col-8" : "d-none"}`}>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">Take Feedback</div>
            <div className="card-body p-1">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label>Status</label>
                    <span className="star">*</span>
                    <select
                      name="followUp.flagCallConnected"
                      id="followUp.flagCallConnected"
                      className={
                        `form-control w-75` +
                        (hasError("flagCallConnected") ? " is-invalid" : "")
                      }
                      ref={register(followUpValidation.flagCallConnected)}
                      onChange={(e) => handleStatusChange(e)}
                    >
                      <option value="">Select Status</option>
                      {callConnectFlags &&
                        callConnectFlags.map((callConnectFlag, key) => (
                          <option value={callConnectFlag.code} key={key}>
                            {callConnectFlag.description}
                          </option>
                        ))}
                    </select>
                    {isCallConnected == "Y" &&
                    (!showFeedback ? reason == "EC" : true) ? (
                      <a
                        className="btn btn-link position-absolute"
                        onClick={goToFeedBack && goToFeedBack}
                        style={{ right: 0, top: 18 }}
                      >
                        Go To Feedback
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label>Call Outcome</label>
                    <span className="star">*</span>
                    <select
                      name="followUp.reasons"
                      id="followUp.reasons"
                      className="form-control"
                      ref={register(
                        isCallConnected == "Y"
                          ? {
                              required: false,
                            }
                          : followUpValidation.reasons
                      )}
                      onChange={(e) => handleReasonChange(e)}
                      disabled={!reasons || reasons?.length == 0}
                    >
                      <option value="">Select Reason</option>
                      {reasons &&
                        reasons.map((reason, key) => (
                          <option value={reason.code} key={key}>
                            {reason.description}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Mobile</label>
                    <span className="star">*</span>
                    <input
                      type="text"
                      name="followUp.callContactNumber"
                      id="followUp.callContactNumber"
                      className={
                        "form-control" +
                        (hasError("callContactNumber") ? " is-invalid" : "")
                      }
                      ref={register(followUpValidation.callContactNumber)}
                      placeholder="Enter Caller Mobile No."
                      autoComplete="off"
                      maxLength={10}
                    />
                  </div>
                  {isTrueCallerVisible && (
                    <div className="form-group position-relative mt-2">
                      <label htmlFor="switch3">
                        Telecaller
                        <div className="custom-control custom-switch d-inline-block ml-2">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="switch3"
                            name="followUp.trueCallerVerified"
                            ref={register}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="switch3"
                          >
                            <span className="switch-position">No</span>
                          </label>
                        </div>
                      </label>
                    </div>
                  )}
                  <div className="form-group">
                    <label>Telecaller Text</label>
                    <span className="star">*</span>
                    <textarea
                      placeholder="Enter Caller Reply"
                      name="followUp.telecallerText"
                      id="followUp.telecallerText"
                      cols="15"
                      rows="5"
                      onChange={countNumberOfCharacters}
                      maxLength="1500"
                      className={
                        "form-control" +
                        (hasError("telecallerText") ? " is-invalid" : "")
                      }
                      ref={register(followUpValidation.telecallerText)}
                    ></textarea>
                    <p className="text-right mb-0">
                      <small className="form-text text-muted">
                        {textAreaLength} / 500
                      </small>
                    </p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>Action</label>
                    <span className="star">*</span>
                    <select
                      name="followUp.nextActionEventId"
                      id="followUp.nextActionEventId"
                      className={
                        "form-control" +
                        (hasError("nextActionEventId") ? " is-invalid" : "")
                      }
                      ref={register(followUpValidation.nextActionEventId)}
                      onChange={handleSelect}
                    >
                       {nextActions &&
                        nextActions.map((nextAction, key) => (
                          <option value={nextAction.code} key={key}>
                            {nextAction.description}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    {caseInboundConcerns && (
                      <>
                        <div className="form-group">
                          <label>Concern Categories</label>
                          <Controller
                            control={control}
                            name="followUp.selectedInboundCategories"
                            rules={{
                              required:
                                followUpValidation.selectedInboundCategories
                                  .required,
                            }}
                            render={(props) => (
                              <MultiSelect
                                options={modifyC()}
                                ref={register}
                                onChange={(e) => props.onChange(e)}
                                value={props.value || []}
                                placeholderText="Select Concern Categories"
                                className={
                                  "form-control" +
                                  (hasError("selectedInboundCategories")
                                    ? "  is-invalid"
                                    : "")
                                }
                              />
                            )}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  {caseConcern &&
                    caseConcern.isVisible &&
                    caseConcern.label &&
                    caseConcern?.concerns?.length > 0 && (
                      <div className="form-group">
                        <label>{caseConcern.label}</label>
                        <Controller
                          control={control}
                          name="followUp.caseConcerns"
                          rules={{ required: false }}
                          render={(props) => (
                            <MultiSelect
                              options={modify()}
                              ref={register}
                              onChange={(e) => props.onChange(e)}
                              value={props.value || []}
                              placeholderText="Select Concerns"
                              className={
                                "form-control" +
                                (hasError("caseConcerns") ? "  is-invalid" : "")
                              }
                            />
                          )}
                        />
                      </div>
                    )}
                  {isReschedule && (
                    <div className="form-group">
                      <label>Re-schedule Date</label>
                      <span className="star">*</span>
                      <Controller
                        control={control}
                        name="followUp.nextAppointmentOn"
                        defaultValue=""
                        rules={{ required: true }}
                        render={(props) => (
                          <ReactDatePicker
                            className={
                              "form-control" +
                              (hasError("nextAppointmentOn")
                                ? "  is-invalid"
                                : "")
                            }
                            ref={register}
                            onChange={(e) => props.onChange(e)}
                            selected={props.value || ""}
                            closeOnScroll={true}
                            onBlur={props.onBlur}
                            dateFormat="dd-MMM-yyyy"
                            minDate={new Date()}
                            // maxDate={addDays(new Date(), 90)}  //by mukul
                            placeholderText="Select date"
                          />
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
