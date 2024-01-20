import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import { Rolling } from 'react-loading-io'
import { showCircularLoader, hideCircularLoader } from '../../../../../store/actions/serviceAppointmentAction'
import { fetchCustomerFeedback } from '../../../../../store/services/manageFollowUpService'
import func from '../../../../../../../utils/common.functions'
import Star from '../../../../../../../components/Shared/Star/Star'

const CustomerFeedback = ({requestData,switchControl, cfbOpen}) => {

    const dispatch = useDispatch()
    const { isCircularLoading } = useSelector(state => {        
        return state.serviceAppointment
    })

    const [customerFeedbackData, setCustomerFeedbackData] = useState(null)
    const clickHandler = () => {
        switchControl(cfbOpen ? '' : 'cfb')
        
        if(customerFeedbackData !== null){
            return ''
        } else{
            dispatch(showCircularLoader())
            const apiData = fetchCustomerFeedback(requestData)
            Promise.resolve(apiData)
            .then(res => {
                if(res !== null){
                    dispatch(hideCircularLoader())
                    setCustomerFeedbackData(res.feedbackReponses)
                }
            })
            .catch(error => {
                dispatch(hideCircularLoader())
                setCustomerFeedbackData(error)
            })
        }
    }  
    
    const styleAgGrid = {
        alignCenter : {
            'text-align': 'center'
        },
        defaultColDef : {
            resizable: true,
        }
    }
    
    const totalScore = () => {
        let score=0
        if(customerFeedbackData !== null){
            customerFeedbackData.customerResponses.map((custRes, key) => (
                score += custRes.responseNo
            ))
        }
        return score
    }

    const star = (params) => {
        const { responseNo } = params.data
        return <Star ratingValue={responseNo} starCount={5}/>
    }

    return (
        <li className={"nav-item" + (cfbOpen ? ' active' : '')}>
            <div className="sub-content-wrapper">
                <a 
                    className="nav-link" 
                    href="#" 
                    onClick={clickHandler}
                >
                    <span className="mdi mdi-book"></span> <span className="text-title">
                        Customer Feedback
                    </span>
                </a>
                {
                    isCircularLoading ? 
                        <div className={"sub-content customerFeedback" + (cfbOpen ? ' ' : ' d-none')}>
                            <Rolling size={30} thickness={5} speed={.8} color='#DA251C'/>
                        </div> : 
                        <div className={"sub-content customerFeedback"  + (cfbOpen ? ' ' : ' d-none')}>
                            {
                                customerFeedbackData && 
                                <>
                                    <div className="tab-content">
                                        <div className='tab-pane fade p-3 show active'>
                                            <div className="row">
                                                <div className="col-6">
                                                    <ul className="nav customer-feedback f-direction-col">
                                                        <li>
                                                            <p className="mb-0"><span>Customer: </span> <strong className="text-uppercase">{customerFeedbackData.customer}</strong></p>
                                                        </li>
                                                        <li>
                                                            <p className="text-capitalize mb-0"><span>Gate Entery no: </span> <strong>{customerFeedbackData.gateEntry}</strong></p>
                                                        </li>
                                                        <li>
                                                            <p className="text-capitalize mb-0"><span>Customer response: </span> <strong>{customerFeedbackData.comment}</strong></p>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-6">
                                                    <ul className="nav customer-feedback f-direction-col">
                                                        <li>
                                                            <p className="text-capitalize mb-0"><span>Contact Person: </span> <strong>{customerFeedbackData.contactPerson}</strong></p>
                                                        </li>
                                                        <li>
                                                            <p className="mb-1"><span className="mdi mdi-cellphone">Mobile No: </span><strong>{customerFeedbackData.mobile}</strong></p>
                                                        </li>
                                                        <li>
                                                            <p className="mb-1"><span className="mdi mdi-email">Email ID: </span><strong>{customerFeedbackData.email}</strong></p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div 
                                        className={cfbOpen ? "tab-pane fade customer-feedback-padding  show active" : "tab-pane fade customer-feedback-padding "} 
                                        style={{ height: '150px', fontSize: '11px', fontWeight: 'normal' }}
                                    >
                                        <AgGridReact rowData={customerFeedbackData.customerResponses}>
                                            <AgGridColumn width="30px" headerName="Sr." valueGetter={func.agGetSerialNumber} cellStyle={styleAgGrid.alignCenter}></AgGridColumn>
                                            <AgGridColumn width="550px" field="question" headerName="Question"></AgGridColumn>
                                            <AgGridColumn width="40px" field="weight" headerName="Weight" cellStyle={styleAgGrid.alignCenter}></AgGridColumn>
                                            <AgGridColumn width="120px" field="response" headerName="Response"></AgGridColumn>
                                            <AgGridColumn width="70px" field="" headerName={"Score " + totalScore() + "/20"} cellRendererFramework={star} cellStyle={styleAgGrid.alignCenter}></AgGridColumn>  
                                        </AgGridReact>
                                    </div>
                                </>
                            }
                        </div>
                }
            </div>
        </li>
    )
}

export default CustomerFeedback
