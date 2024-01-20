import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { fetchFUPModalDataByCaseID, assignCaseToUser } from '../../../store/actions/inboundActions'
import useWindowSize from '../../../../Hooks/useWindowSize' 
import CustomLoadingOverlay from '../../../../components/Shared/CustomLoadingOverlay'
import * as constants from '../../../../utils/constant'

const InboundListing = ({ selectedDept,chooseComponent, setOpenInboundDetails, assignSelectedCases, setAssignSelectedCases }) => {

    const dispatch = useDispatch()
    const size = useWindowSize()
    
    const [frameworkComponents, setFrameworkComponents] = useState({
        customLoadingOverlay: CustomLoadingOverlay
    })

    const redirectToUpdateCase = (params) => {
        return(
          <>
                {
                    chooseComponent === constants.ACTIVECASES || chooseComponent === constants.ACTIVESERVICECASES ? 
                    <div>
                        <Link to={{ pathname: `/inbound/manageFollowUp/${params.data.caseUniqueId}`}}>{params.value}</Link>
                    </div>
                :
                chooseComponent === constants.ALLOCATECASES ? 
                    <div className='row'>
                        <div className='col-4'>
                            <input type='checkbox' />
                        </div>
                        <div className='col-8'>
                            <div>{params.value}</div>
                        </div>
                    </div> : null
            }
          </>  
        ) 
    }

    const fupModalOpen = (caseId) => {
        setOpenInboundDetails(true)
        dispatch(fetchFUPModalDataByCaseID({ caseId: caseId}))
    }
    
    const [gridApi, setGridApi] = useState()
    const [gridColumnApi, setGridColumnApi] = useState()

    const assignSelectedCasesToUser = (e) => {
        // let selectedNodes = gridApi.getSelectedNodes();
        // let selectedData = selectedNodes.map(node => node.data);
        // let allotedUserId = e.target.form['allocateTo'].value
        let selectedRow = gridApi.getSelectedRows();
        let caseIdArray=[]
        selectedRow.forEach(row => {
            caseIdArray.push(row.caseId)
        })

        let payload = {
            allotedUserId: 'SULTAN',
            caseUniqueSerials: [...caseIdArray],
            ipAddress: '1:1:1:1'
        }
        dispatch(assignCaseToUser(payload))
        onRemoveSelected()
    };
    
    const onGridReady = params => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    const clearData = () => {
        gridApi.setRowData([]);
    };

    const onRemoveSelected = () => {
        var selectedData = gridApi.getSelectedRows();
        var res = gridApi.applyTransaction({ remove: selectedData });
    };

    useEffect(() => {
        if(assignSelectedCases === constants.ASSIGN){
            assignSelectedCasesToUser()
            setAssignSelectedCases('')
        }
    }, [assignSelectedCases])
 
    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body grid-section p-0 " style={{overflow: 'auto'}}>
                    <div id="myGrid" style={{ height: (size.height !== undefined ? (size.height - 173) : 0) , width: '100%', fontSize: '11px', lineHeight: '23px'}}  >
                        {
                            selectedDept === constants.SERVICE ?
                            <AgGridReact
                                // columnDefs={servicesColumnDefs}
                                // rowData={inboundCases}
                                tooltipShowDelay={0}
                                enableBrowserTooltips={true}
                                frameworkComponents={frameworkComponents}
                                loadingOverlayComponent='customLoadingOverlay'
                                loadingOverlayComponentParams={{loadingMessage: 'No record(s) found'}}
                                rowSelection="multiple"
                                onGridReady={onGridReady}
                                rowMultiSelectWithClick={true}
                                animateRows={true}
                            />
                            :
                            <AgGridReact
                                // columnDefs={salesPreSalesColumnDefs}
                                // rowData={inboundCases}
                                tooltipShowDelay={0}
                                enableBrowserTooltips={true}
                                frameworkComponents={frameworkComponents}
                                loadingOverlayComponent='customLoadingOverlay'
                                loadingOverlayComponentParams={{loadingMessage: 'No record(s) found'}}
                                rowSelection="multiple"
                                onGridReady={onGridReady}
                                rowMultiSelectWithClick={true}
                                animateRows={true}
                            >
                            </AgGridReact>
                            
                        }
                            {/* <AgGridColumn type='checkbox'></AgGridColumn> */}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default InboundListing
