import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useForm, FormProvider } from "react-hook-form";
import Button from 'react-bootstrap-button-loader';
import { Link } from "react-router-dom";
import useUserContext from '../../../../../../Hooks/useUserContext';
import AddCallRecord from './CallRecord/AddCallRecord'
import UpdateContactRecord from './ContactRecord/UpdateContactRecord'
import CustomerVoice from './CustomerVoice/CustomerVoice'
import AddServiceBookingRecord from './ServiceBookingRecord/AddServiceBookingRecord'
import { createServiceAppointment } from '../../../../store/actions/serviceAppointmentAction'

let CustomerServiceAppointment = () => {
    const dispatch = useDispatch();
    const userContext = useUserContext();
    const [activeTab, setActiveTab] = useState('CALL_RECORD');
    const [isServiceBookingEnable, setServiceBookingEnable] = useState(false);
    const { currentFollowup, bookingInfo } = useSelector(state => {
        let manageServiceAppointmentModel = state.serviceAppointment.serviceAppointmentModel.manageServiceAppointmentModel;
        return {
            currentFollowup: manageServiceAppointmentModel.currentFollowup,
            bookingInfo: manageServiceAppointmentModel.bookingInfo,
        }
    });

    const defaultServiceAppointmentModel = {
        brandCode: currentFollowup.brandCode,
        countryCode: currentFollowup.countryCode,
        chassisNo: currentFollowup.chassisNo,
        followUpModel: {
            callType: currentFollowup.callType,
            chassisNo: currentFollowup.chassisNo,
            followUpDateTime: currentFollowup.fupDate == null ? new Date() : new Date(currentFollowup.fupDate),
            contacted: currentFollowup.contacted === "Y" ? true : false,
            notContactedReason: currentFollowup.notContactedType,
            contactType: currentFollowup.contactedType,
            contactedResponse: currentFollowup.contactedResponse,
            notInterestedReason: currentFollowup.notInterestedReasons,
            followUpComment: currentFollowup.fupComment,
            nextFollowupDateTime: currentFollowup.nextFupDate == null ? null : new Date(currentFollowup.nextFupDate),
            fupStatus : "A",
            fupLocation: currentFollowup.fupLocation,
            fupSerial: currentFollowup.fupSerial
        }
    }

    if (bookingInfo != null)
    {
        defaultServiceAppointmentModel.serviceBookingModel =
        {
            bkgSerial: bookingInfo.bkgSerial,
            bkgLocation: bookingInfo.bkgSerial,
            visitDate: bookingInfo.visitDate,
            visitTime: bookingInfo.visitTime,
            checkinDate: bookingInfo.checkinDate,
            advisor: bookingInfo.advisor,
            serviceType: bookingInfo.serviceType,
            kms: bookingInfo.kms,
            isRevisit: bookingInfo.isRevisit,
            isPickup: bookingInfo.isPickup,
            revisitReason: bookingInfo.revisitReason,
            reasonNonPeriodic: bookingInfo.reasonNonPeriodic,
            insuCompany: bookingInfo.insuCompany,
            insuValidUpto: bookingInfo.insuValidUpto,
            driverCode: bookingInfo.driverCode,
            driverMobile: bookingInfo.driverMobile,
            pickupAddressType: bookingInfo.pickupAddressType,
            pickupAddress: bookingInfo.pickupAddress
        }
    }
    const methods = useForm({
        defaultValues: defaultServiceAppointmentModel
    });

    const validate = {
        followUpModel: {
            callType: {
                required: "Required"
            },
            mode: {
                required: "Required",
            },
            fupMode: {
                required: "Required"
            },
            followUpDateTime: {
                required: "Required"
            },
            followUpComment: {
                minLength: {
                    value: 5, message: "Remarks are too short"
                },
                maxLength: { value: 200, message: "Remarks can not be more than 200 characters." }
            },
        },
        customerServiceBooking:{
            repairType: {
                required: "Required"
            },
            kms: {
                required: "Required"
            },
            crmText: {
                required: "Required"
            },
            dateAndTime: {
                required: "Required"
            },
            advisor: {
                required: "Required"
            }
        },
        customerServiceBooking: {
            serviceBookingComplaints:[]
        }
    }
    
    const enableBooking = (contactResponse) => {
        if (contactResponse === "CONF") {
            setServiceBookingEnable(true);
        }
        else {
            setServiceBookingEnable(false);
        }
    } 
    const submitForm = (serviceAppointmentModel) => {
        serviceAppointmentModel.brandCode = userContext.userDetail.brandCode; //defaultServiceAppointmentModel.brandCode
        serviceAppointmentModel.countryCode = userContext.userDetail.countryCode; //defaultServiceAppointmentModel.countryCode
        serviceAppointmentModel.chassisNo = defaultServiceAppointmentModel.chassisNo;
        serviceAppointmentModel.dealerId = userContext.userDetail.userContext.companyCode;
        serviceAppointmentModel.logUserId = userContext.userDetail.userContext.userId; 
        serviceAppointmentModel.logIPAddress = "192.168.30.32"

        if(serviceAppointmentModel.followUpModel != null)
        {
            serviceAppointmentModel.followUpModel.fupLocation = defaultServiceAppointmentModel.followUpModel.fupLocation
            serviceAppointmentModel.followUpModel.fupSerial = parseInt(defaultServiceAppointmentModel.followUpModel.fupSerial)

            if(serviceAppointmentModel.followUpModel.contacted){
                serviceAppointmentModel.followUpModel.contacted = 'Y'
            } else{
                serviceAppointmentModel.followUpModel.contacted = 'N'
            }

            if (serviceAppointmentModel.followUpModel.fupStatus === undefined) {
                serviceAppointmentModel.followUpModel.fupStatus = 'N'
            }

            if (serviceAppointmentModel.followUpModel.followUpDateTime === undefined) {
                serviceAppointmentModel.followUpModel.followUpDateTime = null;
            }
            else{
                serviceAppointmentModel.followUpModel.followUpDateTime = new Date(serviceAppointmentModel.followUpModel.followUpDateTime);
            }

            if (serviceAppointmentModel.followUpModel.nextFollowupDateTime === undefined) {
                serviceAppointmentModel.followUpModel.nextFollowupDateTime = null;
            }
            else {
                serviceAppointmentModel.followUpModel.nextFollowupDateTime = new Date(serviceAppointmentModel.followUpModel.nextFollowupDateTime);
            }

            if (serviceAppointmentModel.followUpModel.notContactedReason === undefined){
                serviceAppointmentModel.followUpModel.notContactedReason = ""
            }
            if(serviceAppointmentModel.followUpModel.notInterestedReason === undefined){
                serviceAppointmentModel.followUpModel.notInterestedReason = ""
            }
        }

        if (serviceAppointmentModel.serviceBookingModel !== null)
        {
            if (defaultServiceAppointmentModel.serviceBookingModel === null || defaultServiceAppointmentModel.serviceBookingModel === undefined) {
                serviceAppointmentModel.serviceBookingModel.bkgLocation = '';
                serviceAppointmentModel.serviceBookingModel.bkgSerial = 0;
                serviceAppointmentModel.serviceBookingModel.kms = 0;
            }
            else {
                serviceAppointmentModel.serviceBookingModel.bkgLocation = (defaultServiceAppointmentModel.serviceBookingModel.bkgLocation).toString()
                serviceAppointmentModel.serviceBookingModel.bkgSerial = defaultServiceAppointmentModel.serviceBookingModel.bkgSerial
                serviceAppointmentModel.serviceBookingModel.kms = parseInt(serviceAppointmentModel.serviceBookingModel.kms);
            }
            

            if(serviceAppointmentModel.serviceBookingModel.insuValidUpto === undefined || serviceAppointmentModel.serviceBookingModel.insuValidUpto === ""){
                serviceAppointmentModel.serviceBookingModel.insuValidUpto = null
            }
        
            if(serviceAppointmentModel.serviceBookingModel.dncList){
                serviceAppointmentModel.serviceBookingModel.dncList = 'Y'
            } else{
                serviceAppointmentModel.serviceBookingModel.dncList = 'N'
            }
            if(serviceAppointmentModel.serviceBookingModel.driverDetails){
                serviceAppointmentModel.serviceBookingModel.driverDetails = 'Y'
            } else{
                serviceAppointmentModel.serviceBookingModel.driverDetails = 'N'
            }
            if(serviceAppointmentModel.serviceBookingModel.driverName === undefined){
                serviceAppointmentModel.serviceBookingModel.driverName = null
            }
            if(serviceAppointmentModel.serviceBookingModel.driverMobile === undefined){
                serviceAppointmentModel.serviceBookingModel.driverMobile = null
            }
            if(serviceAppointmentModel.serviceBookingModel.visitDateTime === undefined || serviceAppointmentModel.serviceBookingModel.visitDateTime === ""){
                serviceAppointmentModel.serviceBookingModel.visitDateTime = null
            }
            if(serviceAppointmentModel.serviceBookingModel.repeatVisit){
                serviceAppointmentModel.serviceBookingModel.repeatVisit = 'Y'
            } else{
                serviceAppointmentModel.serviceBookingModel.repeatVisit = 'N'
            }
            if(serviceAppointmentModel.serviceBookingModel.revisit){
                serviceAppointmentModel.serviceBookingModel.revisit = 'Y'
            } else{
                serviceAppointmentModel.serviceBookingModel.revisit = 'N'
            }
            if(serviceAppointmentModel.serviceBookingModel.pickUpFlag){
                serviceAppointmentModel.serviceBookingModel.pickUpFlag = 'Y'
            } else{
                serviceAppointmentModel.serviceBookingModel.pickUpFlag = 'N'
            }

            //Revisit Details
            if(serviceAppointmentModel.serviceBookingModel.revisitReason === undefined){
                serviceAppointmentModel.serviceBookingModel.revisitReason = ''
            } 
            if(serviceAppointmentModel.serviceBookingModel.bookingExceptionCode === undefined){
                serviceAppointmentModel.serviceBookingModel.bookingExceptionCode = ''
            } 
            //Pick-up Details
            if(serviceAppointmentModel.serviceBookingModel.pickUpLocationCode === undefined){
                serviceAppointmentModel.serviceBookingModel.pickUpLocationCode = ''
            } 
            if(serviceAppointmentModel.serviceBookingModel.address === undefined){
                serviceAppointmentModel.serviceBookingModel.address = ''
            } 
        }

        if(serviceAppointmentModel.customerVoiceList !== null){
            serviceAppointmentModel.customerVoiceList.map((custVoiceList, key) => (
                custVoiceList.isCustomerApproval ? (custVoiceList.isCustomerApproval = 'Y') : (custVoiceList.isCustomerApproval = 'N')
            ))
            serviceAppointmentModel.customerVoiceList.map((custVoiceList, key) => (
                custVoiceList.isCustomerApproval ? (custVoiceList.isCustomerApproval = 'Y') : (custVoiceList.isCustomerApproval = 'N'),
                custVoiceList.isRepeat ? (custVoiceList.isRepeat = 'Y') : (custVoiceList.isRepeat = 'N')
            ))
        }

        
        dispatch(createServiceAppointment(serviceAppointmentModel))
        
    };

    return (        
        <FormProvider  {...methods}>
                <form onSubmit={methods.handleSubmit(submitForm)}>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a className="nav-item nav-link active" id="call-record-tab" data-toggle="tab" href="#call-record" role="tab" aria-controls="call-record" aria-selected="false"><span className="mdi mdi-cog-outline d-none"></span> <span className="tab-text">call record</span></a>
                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"> <span className="mdi mdi-account-multiple-check-outline"></span> <span className="d-none">Profile</span></a>
                    </div>
                    <Link to='/serviceAppointment' className="btn btn-danger float-right update-btn-back">Back</Link>
                    <Button className="btn btn-danger float-right update-btn" disabled={methods.formState.isSubmitting} loading={methods.formState.isSubmitting} type='submit'>Update</Button>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="call-record" role="tabpanel" aria-labelledby="call-record-tab">
                        <div className="row justify-content-between">
                            <div className="col-12 process-flow">
                                <nav className="nav process-flow-section">
                                    <a className={"nav-link" + (activeTab === 'CALL_RECORD' ? ' active' : '')} href="#" id="call-details" onClick={() => setActiveTab('CALL_RECORD')}>
                                        <div className="process-section">
                                            <span className="mdi mdi-phone-log"></span>
                                            <p>Please record your call deatils</p>
                                        </div>
                                    </a>
                                    <a className={"nav-link " +
                                        (activeTab === 'BOOKING_RECORD' ? ' active' : '') +
                                        (isServiceBookingEnable ? '' : ' disabled') } href="#" id="booking-details" onClick={() => setActiveTab('BOOKING_RECORD')}>
                                        <div className="process-section">
                                            <span className="mdi mdi-phone-log"></span>
                                            <p>Please record your booking deatils</p>
                                        </div>
                                    </a>
                                    <a className={"nav-link " + (activeTab === 'CUSTVOICE_RECORD' ? ' active' : '') + (isServiceBookingEnable ? '' : ' disabled')} href="#" id="customer-voice" onClick={() => setActiveTab('CUSTVOICE_RECORD')}> 
                                        <div className="process-section">
                                            <span className="mdi mdi-microphone"></span>
                                            <p>Please record customer voice here</p>
                                        </div>
                                    </a>
                                </nav>
                                <hr className="my-2" />

                                    <AddCallRecord validate={validate} activeClass={activeTab === 'CALL_RECORD' ? '' : ' d-none'} enableBooking={enableBooking} />
                                    <AddServiceBookingRecord 
                                        validate={validate} 
                                        activeClass={activeTab === 'BOOKING_RECORD' ? '' : ' d-none'} 
                                        isServiceBookingEnable={isServiceBookingEnable}
                                    />
                                    <CustomerVoice activeClass={activeTab === 'CUSTVOICE_RECORD' ? '' : ' d-none'} isServiceBookingEnable={isServiceBookingEnable}/>
                            
                            </div>
                        </div>
                    </div>
                    <UpdateContactRecord />
                    </div>
                </form>
            </FormProvider >
       
    )
}
export default CustomerServiceAppointment

