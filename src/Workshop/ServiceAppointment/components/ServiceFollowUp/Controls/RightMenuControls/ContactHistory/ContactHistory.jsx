import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AgGridReact, AgGridColumn } from 'ag-grid-react'
import { Rolling } from 'react-loading-io'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { fetchContactHistory } from '../../../../../store/services/manageFollowUpService'
import func from '../../../../../../../utils/common.functions'

const ContactHistory = ({requestData,switchControl, chOpen}) => {

    const { isCircularLoading } = useSelector(state => {        
        return state.serviceAppointment
    })
    
    const totalCalls = (params) => {
        const calls = params.data.inboundCount + params.data.outboundCount
        if(calls === 0)
            return '-'
        else
            return calls
    }

    const [contactHistoryData, setContactHistoryData] = useState([])
    
    const clickHandler = () => {
        switchControl(chOpen ? '' : 'ch')

        if(contactHistoryData.length > 0){
            return ''
        } else{
            const apiData = fetchContactHistory(requestData)
            Promise.resolve(apiData)
                   .then(res => {
                       setContactHistoryData(res.contactHistory)
                   })
                   .catch(error => {
                       setContactHistoryData(error)
                   })
        }
    }

    const styleAgGrid = {
        align : {
            'text-align': 'center'
        },
        defaultColDef : {
            resizable: true,
        }
    }
    
    return (
        <li className={"nav-item" + (chOpen ? ' active' : '')}>
            <div className="sub-content-wrapper">
                <a 
                    className="nav-link" 
                    href="#"
                    onClick={clickHandler}
                >
                    <span className="mdi mdi-notebook"></span>
                    <span className="text-title">
                        Contact History
                    </span>
                </a>
                {
                    isCircularLoading ? 
                        <div className={"sub-content" + (chOpen ? ' ' : ' d-none')}>
                            <Rolling size={30} thickness={5} speed={.8} color='#DA251C'/>
                        </div> : 
                        <div className={"sub-content"  + (chOpen ? ' ' : ' d-none')} style={{ height:'280px', fontSize: '12px', fontWeight: 'normal' }}>
                            <AgGridReact rowData={contactHistoryData} >
                                <AgGridColumn width='50px' field='uniqueFupId' headerName='FUP-ID' valueFormatter={func.agNumberHyphenFormatter} cellStyle={styleAgGrid.align} ></AgGridColumn>
                                <AgGridColumn width='80px' field='createDate' headerName='Opened On' valueFormatter={func.dateFormatter} cellStyle={styleAgGrid.align}></AgGridColumn>
                                <AgGridColumn width='120px' field='eventDesc' headerName='Event'  valueFormatter={func.agStringFormatter}></AgGridColumn>
                                <AgGridColumn width='80px' field='deuDate' headerName='Due Date' valueFormatter={func.dateFormatter} cellStyle={styleAgGrid.align}></AgGridColumn>
                                <AgGridColumn width='40px' field='' headerName='Calls' valueGetter={totalCalls} cellStyle={styleAgGrid.align}></AgGridColumn>
                                <AgGridColumn width='40px' field='mailCount' headerName='Mail' valueFormatter={func.agNumberHyphenFormatter} cellStyle={styleAgGrid.align}></AgGridColumn>
                                <AgGridColumn width='70px' field='lastComment' headerName='Comment' valueFormatter={func.agStringFormatter}></AgGridColumn>
                            </AgGridReact>
                        </div>
                }
            </div>
        </li>
    )
}

export default ContactHistory
