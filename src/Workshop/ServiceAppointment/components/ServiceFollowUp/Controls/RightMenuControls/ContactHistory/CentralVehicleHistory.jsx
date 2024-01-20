import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useWindowSize from '../../../../../../../Hooks/useWindowSize';
import { Rolling } from "react-loading-io";
import CustomerInfo from '../../../ManageServiceAppointment/CustomerInfo/CustomerInfo'
import { showLoader, hideLoader, showCircularLoader } from '../../../../../store/actions/serviceAppointmentAction'
import { fetchVehicleRecentHistory } from '../../../../../store/services/manageFollowUpService'
import VehicleHistoryCriteria from './VehicleHistoryCriteria/VehicleHistoryCriteria';
import History from './History/History';
import TechnicalAdvice from './TechnicalAdvice/TechnicalAdvice';
import Watchpoints from './Watchpoints/Watchpoints';
import PartsSummary from './PartsSummary/PartsSummary';
import LaborSummary from './LaborSummary/LaborSummary';
import HistoryCard from './HistoryCard/HistoryCard';
import WarrantyCard from './WarrantyCard/WarrantyCard';
import Communication from './Communication/Communication';
import ContactChange from './ContactChange/ContactChange';
import EmptyRecords from './EmptyRecords/EmptyRecords';
import CustomerServiceAppointment from '../../../ManageServiceAppointment/CustomerServiceAppointment/CustomerServiceAppointment';

const CentralVehicleHistory = ({switchControl, cvhOpen}) => {

    const dispatch = useDispatch()
    const [isCriteriaOpen, setIsCriteriaOpen] = useState(true)
    const { customerInfo, customerVehicleInfo, isCircularLoading } = useSelector(state => {
        let manageServiceAppointmentModel = state.serviceAppointment?.serviceAppointmentModel?.manageServiceAppointmentModel;
        let customerInfo = manageServiceAppointmentModel?.customerInfo; 
        let isCircularLoading = state.serviceAppointment.isCircularLoading      
            return {
                customerInfo: customerInfo,
                customerVehicleInfo: customerInfo?.customerVehicleInfo,
                isCircularLoading: isCircularLoading
            }
    })
    const size = useWindowSize();
    const [centralVehicalHistory, setCentralVehicalHistory] = useState()
    const [isRequired, setIsRequired] = useState(false)

    useEffect(() => {
        
        // if(customerVehicleInfo && customerVehicleInfo.chassisNo !== undefined){
            // dispatch(showLoader())
            let searchType ='C'
            let searchValue1 = 'WAUZHE8R7FY700055' //customerVehicleInfo.chassisNo
            let searchValue2 = 0
            var data = { searchType, searchValue1, searchValue2 }
            const apiData = fetchVehicleRecentHistory(data)
            Promise.resolve(apiData)
            .then(res => {
                if(res !== null){
                    // dispatch(hideLoader())
                    setCentralVehicalHistory(res)
                }
            })
            .catch(error => {
                // dispatch(hideLoader())
                setCentralVehicalHistory(error)
            })
        // }
    }, [])

    const [errorMessage, setErrorMessage] = useState('')
    const submitCriteria = (e) => {
        let searchType = e.target.form['identification'].value
        let searchValue1 = e.target.form['criteriaType'].value
        setIsRequired(false)

        switch (searchType){
            case 'C':
                if(searchValue1 === '' || searchValue1.trim().length !== 17){
                    let errorMsg = 'Chassis Number should be of length 17'
                    setIsRequired(true)
                    setErrorMessage(errorMsg)
                } else{
                    fetchCentralVehicleHistoryData(e)
                }
                break;
            case 'E':
                if(searchValue1 === '' || searchValue1.trim().length < 10 || searchValue1.trim().length > 12){
                    let errorMsg = 'Engine Number should be between 10 and 12'
                    setIsRequired(true)
                    setErrorMessage(errorMsg)
                }  else{
                    fetchCentralVehicleHistoryData(e)
                }
                break;
            case 'R':
                if(searchValue1 === '' || searchValue1.trim().length < 0){
                    setIsRequired(true)
                    setErrorMessage('Required')
                } else if(!searchValue1.includes('-')){
                    setIsRequired(true)
                    setErrorMessage('Please enter valid Registration number')
                } else{
                    fetchCentralVehicleHistoryData(e)
                }
                break;
            default:
                setIsRequired(false)
                break;
        }
    }

    const fetchCentralVehicleHistoryData = (e) => {
        dispatch(showLoader())
        let searchType = e.target.form['identification'].value
        let searchValue1 = e.target.form['criteriaType'].value
        let searchValue2
        let data

        switch (searchType){
            case 'C':
            case 'E':
                searchValue1 = searchValue1.toString().trim().toUpperCase()
                data = { searchType, searchValue1, searchValue2:0 }
                break;
            case 'R':
                if(searchValue1.includes('-')){
                    searchValue1 = searchValue1.toString().trim().toUpperCase()
                    let splittedReg = searchValue1.split('-')
                    searchValue1 = splittedReg[0]
                    searchValue2 = splittedReg[1]
                    data = { searchType, searchValue1, searchValue2 }
                }
                break;
            default:
                break;
        }

        const apiData = fetchVehicleRecentHistory(data)
        Promise.resolve(apiData)
            .then(res => {
                if(res !== null){
                    dispatch(hideLoader())
                    setCentralVehicalHistory(res)
                }
            })
            .catch(error => {
                dispatch(hideLoader())
                setCentralVehicalHistory(error)
            })
    }

    const closeCriteria = () => {
        setIsCriteriaOpen(!isCriteriaOpen)
    }

    const styleObject = {
        tableStyle: { height: (size.height - 380), fontSize: '11px', fontWeight: 'normal', background: 'white'},
        alignCenter : { 'text-align': 'center'},
        fontColor : { color: 'blue' },
        fontColorAlign : { color: 'blue', 'text-align': 'center' },
        defaultColDef : {
            resizable: true
        }
    }

    if(centralVehicalHistory === undefined)
        return null;


    return (
        <div>
            <VehicleHistoryCriteria 
                submitCriteria={submitCriteria} 
                isOpen={isCriteriaOpen ? true : false} 
                closeCriteria={closeCriteria}
                errorMessage={errorMessage}
                isRequired={isRequired}
            />
            <section className={"section" + (isCriteriaOpen ? '' : ' criteria-width-without-menu')}>
                <div className="">
                    <h1 className="page-heading-title"> <span className="mdi mdi-calendar-clock"></span>Central Vehicle History</h1>
                    <CustomerInfo centralCustomerMasterInfo={centralVehicalHistory.customerInfo}/>
                    <div className="col-12" >
                    {/* <div className="col-12" style={{ height: (size.height - 242) }}> */}
                        <div className="row text-uppercase justify-content-between font-10 font-weight-normal h-100">
                            <div className="col-12 central-history px-0">
                                <ul className="nav nav-tabs m-0" id="myTab" role="tablist">
                                    {
                                        centralVehicalHistory.controls && centralVehicalHistory.controls.map((control, key) => (
                                            <li className="nav-item" role="presentation" key={key}>
                                                <a 
                                                    className={"nav-link" + (control.code === 'HISTORY' ? ' active show' : '')} 
                                                    id={ control.code +"-tab"} 
                                                    data-toggle="tab" 
                                                    href={"#" + control.code} 
                                                    role="tab" 
                                                    aria-controls={control.code} 
                                                    aria-selected={control.code === "HISTORY" ? "true" : "false"}
                                                >
                                                    {control.description}
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>
                                {centralVehicalHistory.controls && centralVehicalHistory.controls.length < 0 ? <EmptyRecords /> :                            
                                    <div className="tab-content border border-top-0 bg-light p-0" id="myTabContent">
                                        {
                                            centralVehicalHistory.controls && centralVehicalHistory.controls.map((control, key) => (
                                                <React.Fragment key={key}>
                                                    {
                                                        control.code === 'HISTORY' ? (
                                                            <div className="tab-pane fade p-0 show active" id={control.code} role="tabpanel" aria-labelledby={control.code + "-tab"}>
                                                                {control.ownerDetails.length > 0 ? <History control={control} styleObject={styleObject}/> : <EmptyRecords />}
                                                            </div>
                                                            ) :
                                                        control.code === 'TECHNICAL_ADVICE_SUMMARY' ? (
                                                            <div className="tab-pane fade" id={control.code} role="tabpanel" aria-labelledby={control.code + "-tab"}>
                                                                {control.technicalAdviceResponseList.length > 0 ? <TechnicalAdvice control={control} styleObject={styleObject} /> : <EmptyRecords />}
                                                            </div>
                                                            ) :
                                                        control.code === 'WATCH_POINT' ? (
                                                            <div className="tab-pane fade" id={control.code} role="tabpanel" aria-labelledby={control.code + "-tab"}>
                                                                {control.watchPointList.length > 0 ? <Watchpoints control={control} styleObject={styleObject}/> : <EmptyRecords />}
                                                            </div>
                                                            ) :
                                                        control.code === 'CONTACT_CHANGE' ? (
                                                            <div className="tab-pane fade" id={control.code} role="tabpanel" aria-labelledby={control.code + "-tab"}>    
                                                                {control.contactChangeList.length > 0 ? <ContactChange control={control} styleObject={styleObject}/> : <EmptyRecords />}
                                                            </div>
                                                            ) :
                                                        control.code === 'PART_SUMMARY' ? (
                                                            <div className="tab-pane fade" id={control.code} role="tabpanel" aria-labelledby={control.code + "-tab"}>
                                                                {control.partList.length > 0 ? <PartsSummary partList={control.partList} /> : <EmptyRecords />}
                                                            </div>
                                                        ) :
                                                        control.code === 'LABOR_SUMMARY' ? (
                                                            <div className="tab-pane fade" id={control.code} role="tabpanel" aria-labelledby={control.code + "-tab"}>
                                                                {control.laborList.length > 0 ? <LaborSummary control={control} styleObject={styleObject}/> : <EmptyRecords />}
                                                            </div>    
                                                            ) :
                                                        control.code === 'VEHICLE_CARD' ? (
                                                            <div className="tab-pane fade" id={control.code} role="tabpanel" aria-labelledby={control.code + "-tab"}>
                                                                {control.vehicleHistoryCardList.length > 0 ? <HistoryCard control={control} styleObject={styleObject}/> : <EmptyRecords />}
                                                            </div>    
                                                            ) :
                                                        control.code === 'WARRANTY_CARD' ? (
                                                            <div className="tab-pane fade" id={control.code} role="tabpanel" aria-labelledby={control.code + "-tab"}>
                                                                {control.vehicleWarrantyCardList.length > 0 ? <WarrantyCard control={control} styleObject={styleObject}/> : <EmptyRecords />}
                                                            </div>    
                                                            ) :
                                                        control.code === 'COMMUNICATION' ? (
                                                            <div className="tab-pane fade" id={control.code} role="tabpanel" aria-labelledby={control.code + "-tab"}>
                                                                {control.vehicleCommunicationList.length > 0 ? <Communication control={control} styleObject={styleObject}/> : <EmptyRecords />}
                                                            </div>
                                                            ) : <EmptyRecords />
                                                    }
                                                </React.Fragment>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CentralVehicleHistory
