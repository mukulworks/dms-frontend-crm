import React, { useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux';
import ReactDatePicker from "react-datepicker";
import { useFormContext, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

const AddCallRecord = ({ validate, activeClass, enableBooking }) => {
    const { register, errors, watch, getValues, setValue, control } = useFormContext(); 

    const [isNextFupDateEnable, setNextFupDateEnable] = useState(true);
    const [isNotInterestedEnable, setNotInterestedEnable] = useState(false);

    const watchContacted = watch("followUpModel.contacted", false);  
    const { contactedTypes, contactedResponses, notContactedResponses, notInterestedReasons } = useSelector(state => {
        let manageServiceAppointmentModel = state.serviceAppointment.serviceAppointmentModel.manageServiceAppointmentModel;

        return {
            contactedTypes: manageServiceAppointmentModel.contactedTypes,
            contactedResponses: manageServiceAppointmentModel.contactedResponses,
            notContactedResponses: manageServiceAppointmentModel.notContactedResponses,
            notInterestedReasons: manageServiceAppointmentModel.notInterestedReasons
        }
    }, shallowEqual)

    const handleChange = (e) => {
        switch (e.target.name) {
            case "followUpModel.contacted":
                setValue("followUpModel.notContactedReason", (e.target.value && ""));
                setValue("followUpModel.contactedType", (!e.target.value && ""));
                setValue("followUpModel.contactedResponse", (!e.target.value && ""));
                setValue("followUpModel.notInterestedReason", (!e.target.value && ""));
                setValue("followUpModel.fupStatus", (!e.target.checked ? "N" : "Y"));
                break;
            case "followUpModel.contactedResponse":
                if (e.target.value === "NI") {
                    setValue("followUpModel.fupStatus", "Y");
                    setNotInterestedEnable(true);
                    setNextFupDateEnable(true);
                }
                else
                {
                    setValue("followUpModel.notInterestedReason", "");
                    setNotInterestedEnable(false);
                    if (e.target.value === "CALBCK" || e.target.value === "CLBKRQ" || e.target.value === "NOTDUE") {
                        setValue("followUpModel.fupStatus", "N");
                        setNextFupDateEnable(true);
                    }
                    else if (e.target.value === "VHSOLD" || e.target.value === "MIGRAT" || e.target.value === "VHIWK" || e.target.value === "SRDUS") {
                        setValue("followUpModel.fupStatus", "Y");
                        setValue("followUpModel.nextFollowupDateTime", "");
                        setNextFupDateEnable(false);

                    }
                    else if (e.target.value === "CONF") {
                        setValue("followUpModel.fupStatus", "N");
                        setValue("followUpModel.nextFollowupDateTime", "");
                        setNextFupDateEnable(false);
                    }
                    else {
                        setValue("followUpModel.fupStatus", "N");
                        setValue("followUpModel.nextFollowupDateTime", "");
                        setNextFupDateEnable(true);
                    }
                }
                enableBooking(e.target.value);
                break;
            default:
                break;
        }
    }
    const validateNotContacted = (data) => {
        if (!getValues('followUpModel.contacted')) {
            if (data === "")
                return false;
        }
        return true;
    };
    const validateContacted = (data) => {
        if (getValues('followUpModel.contacted')) {
            if (data === "")
                return false;
        }
        return true;
    };

    const validateNotInterested = (data) => {
        if (getValues('followUpModel.contacted') && getValues('followUpModel.contactedResponse') === "NI") {
            if (data === "")
                return false;
        }
        return true;
    };

    const addDays = (theDate, days) => {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    const hasError = inputName => Boolean(errors && errors["followUpModel"] && errors["followUpModel"][inputName]);
    const getError = inputName => Boolean(hasError(inputName) ? errors["followUpModel"][inputName].message : '');

    return (
            <div className={"row call-details" + activeClass}>
                <div className="col-4 px-4 pl-0">
                    <div className="form-group">
                    <label htmlFor="followUpModel.callType">Call Type<span className="star">*</span></label>
                        <div className="row">
                            <div className="col-7 mt-2">
                            <div className="form-check form-check-inline">
                                <input className={"form-check-input" + (hasError("callType") ? "  is-invalid" : "")} type="radio" name="followUpModel.callType" id="callType1" value="CALL_IN" ref={register(validate.followUpModel.callType)}  />
                                <label className="form-check-label" htmlFor="callType1">InBound</label>
                                </div>
                                <div className="form-check form-check-inline">
                                <input className={"form-check-input" + (hasError("callType") ? "  is-invalid" : "")} type="radio" name="followUpModel.callType" id="callType2" value="CALL_OUT" ref={register(validate.followUpModel.callType)} />
                                <label className="form-check-label" htmlFor="callType2">OutBound</label>
                            </div>
                            <div className="invalid-feedback">
                                {getError("callType")}
                            </div>
                            </div>
                            <div className="col-5 pl-0">
                                <div className="form-group">
                                    <select name="" id="" className="form-control">
                                        <option value="">Customer</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="followUpModel.followUpDateTime">Call Date<span className="star">*</span></label>
                        <div className="row">
                            <div className="col-10">
                                <Controller
                                control={control} name="followUpModel.followUpDateTime"
                                rules={validate.followUpModel.followUpDateTime}
                                        render={(props) => (
                                            <ReactDatePicker popperClassName="calendarClassName"
                                                dateFormat="dd-MMM-yyyy HH:mm"
                                                showTimeSelect
                                                minDate={addDays(new Date(),-5)}
                                                maxDate={new Date()}
                                            className={"form-control" + (hasError("followUpDateTime") ? "  is-invalid" : "")}
                                            onChange={(e) => props.onChange(e)} closeOnScroll={true}
                                            selected={props.value}
                                            onBlur={props.onBlur}
                                        />
                                    )}

                                />
                            </div>
                            <div className="col-2 p-0 text-left">
                                <span className="mdi mdi-calendar-clock font-20 text-muted"></span>
                            </div>
                        </div>
                        <div className="invalid-feedback">
                            {getError("followUpDateTime")}
                        </div>
                    </div>
                    <div className="form-group">
                    <label htmlFor="followUpModel.fupMode">Mode<span className="star">*</span></label>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <select name="followUpModel.fupMode" className={"form-control" + (hasError("fupMode") ? "  is-invalid" : "")} ref={register(validate.followUpModel.fupMode)} >
                                            <option value="PHONE">Phone</option>
                                            <option value="MOBILE">Mobile</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        {getError("fupMode")}
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                <input type="text" maxLength={10} name="followUpModel.contactPhoneNo" className="form-control" ref={register}  />                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                    <div className="row mb-2">
                        <div className="col-7 pr-0">
                            <label htmlFor="followUpModel.contacted">Contacted<span className="star">*</span></label>
                            <input type="checkbox" name="followUpModel.contacted" className="" id="customSwitch10" ref={register(validate.followUpModel.contacted)} onChange={handleChange} />
                            {/* <input type="checkbox" name="followUpModel.contacted" className="" ref={register(validate.followUpModel.contacted)} onChange={handleChange } /> */}
                        </div >
                    </div>
                        
                    <select className={"form-control" + (hasError("notContactedReason") ? "  is-invalid" : "")} disabled={watchContacted} name="followUpModel.notContactedReason" ref={register({ validate: validateNotContacted })}>
                    {
                        notContactedResponses && notContactedResponses.map((notContactedResponse, key) => (
                            <option key={key} value={notContactedResponse.code}>{notContactedResponse.description}</option>
                        ))
                    }
                    </select>

                    {
                        hasError("notContactedReason") && errors.followUpModel.notContactedReason.type === "validate" && (
                            <div className="invalid-feedback">Required</div>
                        )
                    }
                    </div>
                </div>
                <div className="col-4 px-4">
                    <div className="form-group">
                    <label htmlFor="followUpModel.contactType">Contact Type<span className="star">*</span></label>
                    <select className={"form-control" + (hasError("contactType") ? "  is-invalid" : "")} disabled={!watchContacted} name="followUpModel.contactType" ref={register({ validate: validateContacted })}>
                            {
                                contactedTypes && contactedTypes.map((contactedType, key) => (
                                    <option key={key} value={contactedType.code}>{contactedType.description}</option>
                                ))
                            }
                    </select>
                    <div className="invalid-feedback">
                        {getError("contactType")}
                    </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="followUpModel.contactedResponse">Response<span className="star">*</span></label>
                    <select className={"form-control" + (hasError("contactedResponse") ? "  is-invalid" : "")} disabled={!watchContacted} name="followUpModel.contactedResponse" ref={register({ validate: validateContacted })} onChange={handleChange}  >
                        {
                                contactedResponses && contactedResponses.map((contactedResponse, key) => (
                                    <option key={key} value={contactedResponse.code}>{contactedResponse.description}</option>
                            ))
                        }
                        </select>
                        <div className="invalid-feedback">
                            {getError("contactedResponse")}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="followUpModel.notInterestedReason">Reason for NI<span className="star">*</span></label>
                        <select className={"form-control" + (hasError("notInterestedReason") ? "  is-invalid" : "")} disabled={!watchContacted} name="followUpModel.notInterestedReason"
                        disabled={!isNotInterestedEnable} onChange={handleChange}
                        ref={register({ validate: validateNotInterested })}>
                        {
                            notInterestedReasons && notInterestedReasons.map((notInterestedReason, key) => (
                                <option key={key} value={notInterestedReason.code}>{notInterestedReason.description}</option>
                            ))
                        }
                        </select>
                        <div className="invalid-feedback">
                            {getError("notInterestedReason")}
                        </div>
                        
                    </div>
                    <div className="form-group">
                        <label>Status<span className="star">*</span></label>
                        <select className="form-control"  name="followUpModel.fupStatus" ref={register}>
                            <option  value="N">Active</option>
                            <option  value="Y">Closed</option>
                        </select>
                    </div>
                </div>
                <div className="col-4 px-4 pr-0">
                    <div className="form-group">
                        <label htmlFor="followUpModel.nextFollowupDateTime">Next Follow-Up On<span className="star">*</span></label>
                        <div className="row">
                            <div className="col-10">
                                <Controller
                                    control={control} name="followUpModel.nextFollowupDateTime"
                                    render={(props) => (
                                        <ReactDatePicker disabled={!isNextFupDateEnable}
                                            className={"form-control" + (hasError("nextFollowupDateTime") ? "  is-invalid" : "")}
                                            onChange={(e) => props.onChange(e)} closeOnScroll={true}
                                            selected={props.value} 
                                            onBlur={props.onBlur}
                                            showTimeSelect
                                            dateFormat="dd-MMM-yyyy HH:mm"
                                            minDate={new Date()}
                                            maxDate={addDays(new Date(),30)}
                                            ref={register(validate.followUpModel.nextFollowupDateTime)}
                                        />
                                    )}
                                />
                            </div>
                            <div className="col-2 p-0 text-left">
                                <span className="mdi mdi-calendar-clock font-20 text-muted"></span>
                            </div>
                        </div>
                        <div className="invalid-feedback">
                            {getError("nextFollowupDateTime")}
                        </div>
                    </div>
                    <div className="form-group">
                    <label htmlFor="followUpModel.followUpComment">Remarks</label>
                    <textarea id="" cols="30" rows="7" maxLength="200" className={"form-control" + (hasError("followUpComment") ? "  is-invalid" : "")} name="followUpModel.followUpComment" ref={register(validate.followUpModel.followUpComment)} ></textarea>
                        <div className="invalid-feedback">
                            <div className="invalid-feedback">
                                {getError("followUpComment")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default AddCallRecord
