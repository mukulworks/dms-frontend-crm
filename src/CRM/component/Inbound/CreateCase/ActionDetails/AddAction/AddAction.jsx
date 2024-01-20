import React from "react";
import { useFormContext } from "react-hook-form";

const AddAction = () => {
  const { register, errors } = useFormContext();

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
    },
  };

  const hasError = (inputName) =>
    Boolean(errors && errors["callerInfo"] && errors["callerInfo"][inputName]);
  const getError = (inputName) =>
    Boolean(hasError(inputName) ? errors["callerInfo"][inputName].message : "");

  return (
    <div className="col-6">
      <div className="card">
        <div className="card-header">
          Add Action
          <a href="" className="text-dark float-right btn btn-link p-0">
            <i className="mdi mdi-refresh"></i> Reset Details
          </a>
        </div>
        <div className="card-body p-1">
          <div className="form-group">
            <label htmlFor="">
              Query<span className="star">*</span>
            </label>
            <textarea
              name="actionDetails.customerQuery"
              ref={register(validate.actionDetails.customerQuery)}
              id="actionDetails.customerQuery"
              cols="30"
              rows="3"
              className={"form-control"}
              placeholder="Enter Caller Query "
            ></textarea>
            <p className="text-right mb-0">
              <small className="form-text text-muted">1 / 1,500</small>
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="">
              Reply<span className="star">*</span>
            </label>
            <textarea
              name="actionDetails.callerReply"
              ref={register(validate.actionDetails.callerReply)}
              id="actionDetails.callerReply"
              cols="30"
              rows="3"
              className={
                "form-control" + (hasError("custName") ? " is-invalid" : "")
              }
              placeholder="Enter Caller Reply"
            ></textarea>
            <p className="text-right mb-0">
              <small className="form-text text-muted">1 / 2,000</small>
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="">Next Action</label>
            <select
              name="actionDetails.nextActionEventId"
              ref={register}
              id="actionDetails.nextActionEventId"
              className="form-control"
            >
              <option value="">Enter Next Action</option>
            </select>
          </div>
          <div className="form-group position-relative mt-2">
            <label htmlFor="customSwitch11">
              Escalate Case
              <div className="custom-control custom-switch d-inline-block ml-2">
                <input
                  name="actionDetails.flagCaseEscalated"
                  ref={register}
                  type="checkbox"
                  className="custom-control-input"
                  id="customSwitch11"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customSwitch11"
                >
                  <span className="switch-position">Yes</span>
                </label>
              </div>
            </label>
            <select
              name="actionDetails.escalateCase"
              ref={register}
              id="actionDetails.escalateCase"
              className="form-control mt-1"
            >
              <option value="">Enter Escalate Case</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAction;
