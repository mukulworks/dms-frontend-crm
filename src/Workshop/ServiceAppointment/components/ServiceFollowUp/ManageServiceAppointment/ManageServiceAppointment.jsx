import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import useWindowSize from '../../../../../Hooks/useWindowSize';
import { useToasts } from 'react-toast-notifications'

import { fetchCustomerServiceAppointmentData } from '../../../store/actions/serviceAppointmentAction'
import useUserContext from '../../../../../Hooks/useUserContext'
import Controls from '../Controls/RightMenuControls/Controls'
import CustomerInfo from './CustomerInfo/CustomerInfo'
import CustomerServiceAppointment from './CustomerServiceAppointment/CustomerServiceAppointment'
const ManageServiceAppointment = () => {

    let { fupSerial, fupLocation } = useParams();
    const { addToast } = useToasts()
    let history = useHistory();
    const size = useWindowSize();
    const dispatch = useDispatch()
    const userContext = useUserContext();
    useEffect(() => {
        let brand = userContext.userDetail.brandCode;
        let country = userContext.userDetail.countryCode;
        let dealer = userContext.userDetail.userContext.companyCode;
        let data = { brand, country, dealer, fupSerial, fupLocation }
        dispatch(fetchCustomerServiceAppointmentData(data))
    }, []);

    const manageServiceAppointmentModel  = useSelector(state => {
        return state.serviceAppointment.serviceAppointmentModel.manageServiceAppointmentModel;
    });

    const controlRequestData = {
        brandCode: userContext.userDetail.brandCode,
        countryCode: userContext.userDetail.countryCode,
        dealerId: userContext.userDetail.userContext.companyCode,
        chassisNo: manageServiceAppointmentModel?.currentFollowup?.chassisNo,
        custMasterSerial: manageServiceAppointmentModel?.customerInfo?.custMasterSerial
    }

    if (manageServiceAppointmentModel == null)
        return null;

    if (manageServiceAppointmentModel.saveResponse) {
        let saveResponse = manageServiceAppointmentModel.saveResponse;
        if (saveResponse.resultCode !== 'FUP-000') {
            addToast(saveResponse.comment, { appearance: 'error' })
        } else {
            addToast(saveResponse.comment, { appearance: 'success' })
        }
        history.push('/ServiceAppointment');
    }

    return (
        <div>
            <section className="left-space">
                <div className="col-12">
                    <h1 className="page-heading-title"> <span className="mdi mdi-calendar-clock"></span> Manage Service Appointment</h1>

                    <div className="row justify-content-between tab-section-form">
                        <CustomerInfo />
                        <div className="col-12 bg-tab" style={{ height: (size.height - 200) }}>
                            <CustomerServiceAppointment />
                        </div>
                    </div>
                </div>
            </section>
            <Controls requestData={controlRequestData}/>
        </div>
    )
}

export default ManageServiceAppointment
