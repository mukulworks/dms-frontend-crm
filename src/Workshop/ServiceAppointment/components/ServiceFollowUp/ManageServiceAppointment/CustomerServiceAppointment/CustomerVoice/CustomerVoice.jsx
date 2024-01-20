import React from 'react'
import { useSelector } from 'react-redux'

import CustomerVoiceItem from './CustomerVoiceItem/CustomerVoiceItem';
const CustomerVoice = ({ activeClass, isServiceBookingEnable }) => {
    const serviceBookingComplaints = useSelector(state => {
        let serviceBookingComplaints =  state.serviceAppointment.serviceAppointmentModel.manageServiceAppointmentModel.serviceBookingComplaints;
        if (serviceBookingComplaints.length === 0) {
            serviceBookingComplaints.push({
                id: 0,
                source: '',
                custText: '',
                classification: '',
                isRepeat: false,
                isCustomerOk: false
            })
        }
        return serviceBookingComplaints;
    })
    return (
        <div className={"row customer-voice" + activeClass}>
            {serviceBookingComplaints && serviceBookingComplaints.map((serviceBookingComplaint, index) => (
                <CustomerVoiceItem key={index} customerVoice={serviceBookingComplaint} custVoiceCount={serviceBookingComplaints.length} isServiceBookingEnable={isServiceBookingEnable} />
            ))}
        </div>
    )
}

export default CustomerVoice
