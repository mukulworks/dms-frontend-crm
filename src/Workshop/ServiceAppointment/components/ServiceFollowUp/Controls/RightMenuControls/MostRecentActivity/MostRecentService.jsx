import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { Rolling } from "react-loading-io";
import { fetchMostRecentActivity } from '../../../../../store/services/manageFollowUpService'
import { showCircularLoader, hideCircularLoader } from '../../../../../store/actions/serviceAppointmentAction'

const MostRecentService = ({ requestData, switchControl, mrcOpen }) => {

    const dispatch = useDispatch()

    const { chassisNo, isCircularLoading } = useSelector(state => {
        let customerInfo = state.serviceAppointment.serviceAppointmentModel.manageServiceAppointmentModel.customerInfo;
        return { 
            chassisNo: customerInfo.customerVehicleInfo.chassisNo,
            isCircularLoading: state.serviceAppointment.isCircularLoading
        }
    })

    const [mostRecentData, setMostRecentData] = useState([])

    const clickHandler = () => {
        switchControl(mrcOpen ? '' : 'mrc')
        
        if(mostRecentData.length > 0){
            return ''
        } else{
            dispatch(showCircularLoader())
            const apiData = fetchMostRecentActivity(requestData);
            Promise.resolve(apiData)
            .then(res => {
                if(res !== null){
                    dispatch(hideCircularLoader())
                    setMostRecentData(res)
                }
            })
            .catch(error => {
                dispatch(hideCircularLoader())
                setMostRecentData(error)
            })
        }
    }

    function formatNumber(number) {
        return Math.floor(number)
                   .toString()
                   .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    return (
        <li className={"nav-item" + (mrcOpen ? ' active' : '')}>
            <div className="sub-content-wrapper">
                <a className="nav-link" href="#" onClick={clickHandler}><span className="mdi mdi-av-timer"></span> <span className="text-title">Most Recent Activity</span></a>
                {
                    isCircularLoading ? 
                        <div className={"sub-content mostRecentService"  + (mrcOpen ? ' ' : ' d-none')}>
                            <Rolling size={30} thickness={5} speed={.8} color='#DA251C'/>
                        </div> : 
                        <div className={"sub-content mostRecentService"  + (mrcOpen ? ' ' : ' d-none')}>
                            <ul className="nav nav-tabs nav-fill" id="myTab" role="tablist">
                                {mostRecentData && mostRecentData.map((mostRecent, key) => (
                                    <li  key={key} className="nav-item" role="presentation">
                                        <a 
                                            className={mostRecent.activityCode === 'Most Recent Service' ? "nav-link active" : 'nav-link'} 
                                            id={mostRecent.activityCode + "-tab"} 
                                            data-toggle="tab" 
                                            href={"#" +  mostRecent.activityCode} role="tab" 
                                            aria-controls={mostRecent.activityCode} 
                                            aria-selected={mostRecent.activityCode === 'Most Recent Service' ? false : true} 
                                        >
                                            {mostRecent.activtyDescription} 
                                        </a>
                                    </li>
                                ))}
                            </ul>                            
                            <div className="tab-content" id="myTabContent">
                                {mostRecentData && mostRecentData.map((mostRecentD, key) => (

                                    mostRecentD.mostRecentActivity.map((activity, key) => (
                                        <div className={mostRecentD.activityCode === 'Most Recent Service' ? "tab-pane fade p-3 show active" : "tab-pane fade p-3"} id={mostRecentD.activityCode} role="tabpanel" aria-labelledby={mostRecentD.activityCode + "-tab"}  key={key}>
                                        <div className="row">
                                            <div className="col-6">
                                                <ul className="nav most-recent-visit f-direction-col">
                                                    <li><span>Job No</span> <strong className="text-uppercase">{activity.jobNo}</strong></li>
                                                    <li><span>Repair Type</span> <strong className="text-uppercase">{activity.repairType.description}</strong></li>
                                                    <li><span>Inv No</span> <strong className="text-uppercase">{activity.invoiceNo ? activity.invoiceNo : '-'}</strong></li>
                                                    <li><span>Status</span> <strong className="">{activity.status}</strong></li>
                                                </ul>
                                            </div>
                                            <div className="col-6">
                                                <ul className="nav most-recent-service f-direction-col">
                                                    <li><span>KMS</span> <strong className="text-uppercase">{formatNumber(activity.kms)}</strong></li>
                                                    <li><span>Advisor</span> <strong className="text-uppercase">{activity.advisor}</strong></li>
                                                    <li><span>Date</span> <strong className="text-uppercase">{moment(activity.date).format("DD-MMM-YYYY")}</strong></li>
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

export default MostRecentService
