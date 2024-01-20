import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Rolling } from 'react-loading-io'
import { fetchAddressDetails } from '../../../../../store/services/manageFollowUpService';
import { showCircularLoader, hideCircularLoader } from '../../../../../store/actions/serviceAppointmentAction'

const CustomerAddressDetail = ({requestData,switchControl, cadOpen}) => {

    const dispatch = useDispatch()

    const {isCircularLoading } = useSelector(state => {
        return {
            isCircularLoading: state.serviceAppointment.isCircularLoading
        }
    })

    const [addressDetails, setAddressDetails] = useState([])

    const clickHandler = () => {
        switchControl(cadOpen ? '' : 'cad')

        if(addressDetails.length > 0){
            return ''
        } else{
            dispatch(showCircularLoader())
            let apiData = fetchAddressDetails(requestData)
            Promise.resolve(apiData)
                .then(res => {
                    dispatch(hideCircularLoader())
                    setAddressDetails(res)
                })
                .catch(error => {
                    dispatch(hideCircularLoader())
                    setAddressDetails(error)
                })
        }
    }

    return (
        <li className={"nav-item" + (cadOpen ? ' active' : '')}>
            <div className="sub-content-wrapper">
                <a className="nav-link" href="#" onClick={clickHandler} ><span className="mdi mdi-map-marker-radius"></span> <span className="text-title">Address Details</span></a>
                {
                    isCircularLoading ? 
                        <div className={"sub-content customerAddress" + (!cadOpen ? ' d-none' : '')}>
                            <Rolling size={30} thickness={5} speed={.8} color='#DA251C'/>
                        </div> : 
                        <div className={"sub-content customerAddress" + (!cadOpen ? ' d-none' : '')}>
                            <ul className="nav nav-tabs nav-fill" id="myTab" role="tablist">
                                {addressDetails && addressDetails.map((addressDetail, key) => (
                                    <li className="nav-item" role="presentation" key={key}>
                                        <a 
                                            className={addressDetail.addressType === 'REGN' ? "nav-link active" : "nav-link"} 
                                            id={addressDetail.addressType + "-tab"}
                                            data-toggle="tab" 
                                            href={"#" + addressDetail.addressType} 
                                            role="tab" 
                                            aria-controls={addressDetail.addressType}
                                            aria-selected={addressDetail.addressType === "REGN" ? false : true}
                                        >
                                            {
                                                addressDetail.addressType === "REGN" ? "Registration" : 
                                                (addressDetail.addressType === "ADMIN" ? "Primary Correspondence Contact" : 
                                                (addressDetail.addressType === "AUSER" ? "Actual User Of the Vehichle" : null))
                                            }
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="tab-content" id="myTabContent">
                                {addressDetails && addressDetails.map((addressDetail, key) => (
                                    addressDetail.customerAddress.map((custAddress, key) => (      
                                        <div 
                                            className={addressDetail.addressType === "REGN" ? "tab-pane fade p-3 show active" : "tab-pane fade p-3"} 
                                            id={addressDetail.addressType} role="tabpanel" 
                                            aria-labelledby={addressDetail.addressType + "-tab"}
                                        >                                  
                                            <div className="row">
                                                <div className="col-6">
                                                    <ul className="nav flex-column most-recent-visit registration-section f-direction-col">
                                                        <li><span>Name</span> <strong>Not Applicable</strong></li>
                                                        <li><span>Designation</span> <strong>Not Applicable</strong></li>
                                                        <li><span>Address</span> <strong className="text-uppercase">{custAddress.address}</strong></li>
                                                        <li><span>City</span> <strong className="text-uppercase">{custAddress.city}</strong></li>
                                                        <li><span>Pin</span> <strong className="text-uppercase">{custAddress.pin ? custAddress.pin : '-'}</strong></li>
                                                        <li><span>Zone</span> <strong className="text-uppercase">{custAddress.zone ? custAddress.zone : '-'}</strong></li>
                                                        <li><span>SubZone</span> <strong className="">{custAddress.subZone ? custAddress.subZone : '-'}</strong></li>
                                                    </ul>
                                                </div>
                                                <div className="col-6">
                                                    <ul className="nav flex-column most-recent-visit registration-section2 f-direction-col">
                                                        <li><span>District</span> <strong className="text-uppercase">{custAddress.district}</strong></li>
                                                        <li><span>Phone</span> <strong className="text-uppercase">{custAddress.phone}</strong></li>
                                                        <li><span>Fax</span> <strong className="">{custAddress.fax}</strong></li>
                                                        <li><span>Primary Mobile</span> <strong>{custAddress.primaryMobile ? custAddress.primaryMobile : '-'}</strong></li>
                                                        <li><span>Alternate Mobile</span> <strong>{custAddress.alternateMobile ? custAddress.alternateMobile : '-'}</strong></li>
                                                        <li><span>Primary email-Id</span> <strong>{custAddress.primaryEmail ? custAddress.primaryEmail : '-'}</strong></li>
                                                        <li><span>Primary email-Id</span> <strong>{custAddress.alternateEmail ? custAddress.alternateEmail : '-'}</strong></li>
                                                    </ul>
                                                </div>
                                            </div>   
                                        </div>                                     
                                    ))
                                ))}
                            </div>
                        </div>
                    }
            </div>
        </li>
    )
}

export default CustomerAddressDetail
