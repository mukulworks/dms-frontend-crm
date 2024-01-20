import React from 'react'
import { useSelector } from 'react-redux'
import ReactDatePicker from "react-datepicker";
import { useFormContext, Controller } from "react-hook-form";
import DayWiseAdvisorBookingMain from './DayWiseAdvisorBooking/DayWiseAdvisorBookingMain'
import "react-datepicker/dist/react-datepicker.css";

const AddServiceBookingRecord = ({validate, activeClass, isServiceBookingEnable}) => {

    const { register, errors, watch, control } = useFormContext();

    const watchDriverDetails = watch("serviceBookingModel.driverDetails", true); 
    const watchRevisitDetails = watch("serviceBookingModel.revisit", true); 
    const watchPickUpDetails = watch("serviceBookingModel.pickUpFlag", true);

    const { insuranceCompanyList, advisorList, repairTypes, nonPeriodicReasons, revisitReasons } = useSelector(state => {
        let insuranceCompanyList = state.serviceAppointment.serviceAppointmentModel.manageServiceAppointmentModel.insuranceCompany;
        let advisorList = state.serviceAppointment.serviceAppointmentModel.manageServiceAppointmentModel.advisorList;
        let repairTypes = state.serviceAppointment.serviceAppointmentModel.manageServiceAppointmentModel.repairTypes;
        let nonPeriodicReasons = state.serviceAppointment.serviceAppointmentModel.manageServiceAppointmentModel.reasonsNonPeriodic;
        let revisitReasons = state.serviceAppointment.serviceAppointmentModel.manageServiceAppointmentModel.revisitReasons;
        
        return {
            insuranceCompanyList: insuranceCompanyList,
            advisorList: advisorList,
            repairTypes: repairTypes,
            nonPeriodicReasons: nonPeriodicReasons,
            revisitReasons: revisitReasons
        }
    })

    const hasError = inputName => Boolean(errors && errors["serviceBookingModel"] && errors["serviceBookingModel"][inputName]);
    const getError = inputName => Boolean(hasError(inputName) ? errors["serviceBookingModel"][inputName].message : '');

    const serviceBookDateCondition = (data) => {
        if(isServiceBookingEnable){
            if(data===""){
                return false
            }                
        }
        return true
    }
    const addDays = (theDate, days) => {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }
    return (
        <div className={"row booking-details" + activeClass}>
            <div className="col-12">
                <div className="row">
                    <div className="col-7">
                        <div className="row">
                            <div className="col-6">
                                <div className="card">
                                    <div className="card-header">
                                        Basic Details
                                    </div>
                                    <div className="card-body p-1">
                                        <div className="form-group">
                                            <label htmlFor="serviceBookingModel.repairType">Service Type<span className="star">*</span></label>
                                            <select 
                                                className={"form-control" + (hasError('repairType') ? ' is-invalid' : '')} name="serviceBookingModel.repairType" 
                                                id="repairType" 
                                                ref={register({validate: serviceBookDateCondition})} 
                                            >                                                
                                                {
                                                    repairTypes && repairTypes.map((repairType, key) => (
                                                        <option key={key} value={repairType.code}>{repairType.description}</option>
                                                    ))
                                                }
                                            </select>
                                            <div className="invalid-feedback">
                                                {getError("repairType")}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="serviceBookingModel.kms">KMS<span className="star">*</span></label>
                                            <input 
                                                type="text" maxLength={6} 
                                                name="serviceBookingModel.kms" 
                                                className={"form-control" + (hasError("kms") ? " is-invalid" : "")}
                                                ref={register({validate: serviceBookDateCondition})} 
                                            />
                                            <div id="validationServer03Feedback" className="invalid-feedback">
                                                {getError("kms")}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6"><label htmlFor="">Repeat Visit</label>
                                                <div className="custom-control custom-switch p-right" >
                                                    <input type="checkbox" className="custom-control-input" id="customSwitch8" name="serviceBookingModel.repeatVisit" ref={register}/>
                                                    <label className="custom-control-label" htmlFor="customSwitch8">
                                                        <span className="switch-position">Yes</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-6"><label htmlFor="">DNC List</label>
                                                <div className="custom-control custom-switch p-right" >
                                                    <input type="checkbox" className="custom-control-input" id="customSwitch9" name="serviceBookingModel.dncList" ref={register}/>
                                                    <label className="custom-control-label" htmlFor="customSwitch9">
                                                        <span className="switch-position">Yes</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="serviceBookingModel.crmText">CRM Text<span className="star">*</span></label>
                                            <textarea name="serviceBookingModel.crmText" cols="30" rows="3" 
                                                className={"form-control" + (hasError("crmText") ? " is-invalid" : "")} 
                                                ref={register({validate: serviceBookDateCondition})}
                                            >
                                            </textarea>
                                            <div className="invalid-feedback">
                                                {getError("crmText")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        Insurance Details
                                    </div>
                                    <div className="card-body p-1">
                                        <div className="form-group">
                                            <label htmlFor="serviceBookingModel.insuCompany">Insurance Company</label>
                                            <select name="serviceBookingModel.insuCompany" className="form-control" ref={register}>
                                                {
                                                    insuranceCompanyList && insuranceCompanyList.map((insuranceCompany, key) => (
                                                        <option key={key} value={insuranceCompany.code}>{insuranceCompany.description}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="serviceBookingModel.insuValidUpto">Valid Upto</label>
                                            <div className="row">
                                                <div className="col-10">
                                                    <Controller
                                                        control={control} name="serviceBookingModel.insuValidUpto"
                                                        render={(props) => (
                                                            <ReactDatePicker popperClassName="calendarClassName"
                                                                dateFormat="dd-MMM-yyyy"
                                                                className={"form-control" + (hasError("insuValidUpto") ? "  is-invalid" : "")}
                                                                onChange={(e) => props.onChange(e)} closeOnScroll={true}
                                                                selected={props.value}
                                                                onBlur={props.onBlur}
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
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        Driver Details
                                        <div className="custom-control custom-switch p-right" >
                                            <input type="checkbox" className="custom-control-input" id="customSwitch3" name="serviceBookingModel.driverDetails" ref={register}/>
                                            <label className="custom-control-label" htmlFor="customSwitch3">
                                                <span className="switch-position">Yes</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="card-body p-1">
                                        <div className="form-group">
                                            <label htmlFor="serviceBookingModel.driverName">Driver Name</label>
                                            <input name="serviceBookingModel.driverName" type="text" className="form-control" ref={register} disabled={!watchDriverDetails}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="serviceBookingModel.driverMobile">Driver Mobile</label>
                                            <div className="row">
                                                <div className="col-3 text-center">
                                                    <input type="text" className="form-control" value="+91" readOnly  />
                                                </div>
                                                <div className="col-9 pl-0">
                                                    <input name="serviceBookingModel.driverMobile" type="text" className="form-control" ref={register} disabled={!watchDriverDetails}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card">
                                    <div className="card-header">
                                        Appointment Details
                                    </div>
                                    <div className="card-body p-1">
                                        <div className="form-group">
                                            <label htmlFor="serviceBookingModel.visitDateTime">Date and Time<span className="star">*</span></label>
                                            <div className="row">
                                                <div className="col-10">
                                                    <Controller
                                                        control={control} name="serviceBookingModel.visitDateTime"
                                                        render={(props) => (
                                                            <ReactDatePicker popperClassName="calendarClassName"
                                                                className={"form-control" + (hasError("visitDateTime") ? "  is-invalid" : "")}
                                                                onChange={(e) => props.onChange(e)} closeOnScroll={true}
                                                                dateFormat="dd-MMM-yyyy HH:mm"
                                                                minDate={new Date()}
                                                                maxDate={addDays(new Date(), 30)}
                                                                selected={props.value}
                                                                onBlur={props.onBlur}
                                                                ref={register({ validate: serviceBookDateCondition })} 
                                                            />
                                                        )}
                                                    />
                                                </div>
                                                <div className="col-2 p-0 text-left">
                                                    <span className="mdi mdi-calendar-clock font-20 text-muted"></span>
                                                </div>
                                                <div className="invalid-feedback">
                                                    {getError("visitDateTime")}
                                                </div>
                                                <div className="col-12 mt-2">
                                                    <select name=""  className="form-control">
                                                        <option value="GGN01">Gurgaon WK</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="serviceBookingModel.advisor">Advisor<span className="star">*</span></label>
                                            <select 
                                                name="serviceBookingModel.advisor" 
                                                className={"form-control" + (hasError("advisor") ? " is-invalid" : "")} 
                                                ref={register({validate: serviceBookDateCondition})}
                                            >
                                                <option></option>
                                                {
                                                    advisorList && advisorList.map((advisor, key) => (
                                                        <option key={key} value={advisor.code}>{advisor.name}</option>
                                                    ))
                                                }
                                            </select>
                                            <div className="invalid-feedback">
                                                {getError("advisor")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        Revisit Details
                                        <div className="custom-control custom-switch p-right" >
                                            <input type="checkbox" className="custom-control-input" id="customSwitch4" name="serviceBookingModel.revisit" ref={register}/>
                                            <label className="custom-control-label" htmlFor="customSwitch4">
                                                <span className="switch-position">Yes</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="card-body p-1">
                                        <div className="form-group">
                                            <label htmlFor="serviceBookingModel.revisitReason">Revisit</label>
                                            <select name="serviceBookingModel.revisitReason" disabled="disabled" className="form-control" ref={register} disabled={!watchRevisitDetails}>
                                                <option value=""></option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="serviceBookingModel.bookingExceptionCode">Reason to Visit Within 3 Days</label>
                                            <select name="serviceBookingModel.bookingExceptionCode"  className="form-control" ref={register} disabled={!watchRevisitDetails}>
                                                {
                                                    nonPeriodicReasons && nonPeriodicReasons.map((nonPeriodicReason, key) => (
                                                        <option key={key} value={nonPeriodicReason.code}>{nonPeriodicReason.description}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        Pick-Up Details
                                        <div className="custom-control custom-switch p-right" >
                                            <input type="checkbox" className="custom-control-input" id="customSwitch5" name="serviceBookingModel.pickUpFlag" ref={register}/>
                                            <label className="custom-control-label" htmlFor="customSwitch5">
                                                <span className="switch-position">Yes</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="card-body p-1">
                                        <div className="form-group">
                                            <label htmlFor="serviceBookingModel.pickUpLocationCode">Vehicle Pick-Up?</label>
                                            <select name="serviceBookingModel.pickUpLocationCode"  className="form-control" ref={register} disabled={!watchPickUpDetails}>
                                                <option value="HOME_ADDR">Home Address</option>
                                            </select>
                                            <small id="emailHelp" className="form-text text-muted text-right">PickUp Details Not Available</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="serviceBookingModel.address">Address</label>
                                            <textarea name="serviceBookingModel.address"  cols="30" rows="3" className="form-control" ref={register} disabled={!watchPickUpDetails}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="card">
                            <div className="card-header">
                                Time-Slot Booking Status for : <span className="text-uppercase">Gurgaon wk</span>
                            </div>
                            <DayWiseAdvisorBookingMain/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddServiceBookingRecord
