import React,{useState} from 'react'
import {useSelector, useDispatch } from "react-redux";
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import useWindowSize from '../../../../Hooks/useWindowSize' 
import OutboundHeader from '../OutboundHeader/OutboundHeader'
import { getClosedCases, emptyClosedCasesList } from '../../../store/actions/outboundActions/outboundActions'
import CustomLoadingOverlay from '../../../../components/Shared/CustomLoadingOverlay'
import { saveReOpenCases } from '../../../store/services/outboundServices/outboundServices';
import func from '../../../../utils/common.functions'
import * as constants from '../../../../utils/constant';

const CaseReOpen = ({chooseComponent}) => {
    const size = useWindowSize()
    const dispatch = useDispatch()
    const header = ''
    const [toggleSearchBy, setToggleSearchBy] = useState(constants.MOBILE)
    const [searchByValue, setSearchByValue] = useState('') 
    const [isValidated, setIsValidated] = useState(false)
    const [errorComment, setErrorComment] = useState('')

    const handleClick = (type) => {
        setSearchByValue('')
        setToggleSearchBy(type)
    }
    
    const type="ReOpen"
    const { closedCases } = useSelector(state => {
        let closedCases = state.outboundReducer.outboundModel.closedCases;
        //let caseUniqueIds = state.outboundReducer.outboundModel?.caseUniqueIds;
        return {
            closedCases: closedCases
        }
    })
    const checkValidations = (name, value) => {
        switch (name) {
            case 'mobile':
                name = 'mobile'
                if(value.length < 10 || value.length > 10){
                    setIsValidated(false)
                    setErrorComment('Mobile No. should be of length 10.')
                    return false
                } else{
                    setIsValidated(true)
                    return true
                }
            case constants.EMAIL:
                name = constants.EMAIL
                var pattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
                if(pattern.test(value)){
                    setIsValidated(true)
                    return true
                } else{
                    setIsValidated(false)
                    setErrorComment('Please enter valid email.')
                    return false
                }
            case constants.VIN:
                name = constants.VIN
                if(value.length !== 17){
                    setIsValidated(false)
                    setErrorComment('VIN should be of length 17.')
                    return false
                } else{
                    setIsValidated(true)
                    return true
                }
            default:
                return false
        }
    }

    const fetchClosedCaseDetails = () => {
        let value = searchByValue
        let name = toggleSearchBy === constants.MOBILE ? 'mobile' : toggleSearchBy
        let valid = checkValidations(name, value)
        let data = {
            name: name, value: value
        }
        if(valid){
            dispatch(getClosedCases(data))
        }
        
    }

    const reOpenCase = (caseUniqueId) => {
        const payload = {
            caseUniqueIds: [caseUniqueId]
        }
        const apiData = saveReOpenCases(payload)
        Promise.resolve(apiData)
            .then(res => {
                if (res.status === 200) {
                    dispatch(emptyClosedCasesList())
                    fetchClosedCaseDetails()
                }
            })
            .catch(error => {
            })
    }

    const reOpenCaseClick = (caseUniqueId)=> {     
        confirmAlert({
            title: 'Confirm to Re-Open cases',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => reOpenCase(caseUniqueId)
              },
              {
                label: 'No'
              }
            ]
          });
        
    }
    
    const checkedCaseReOpenListing = (params) => {    
        return (
            <button name="ReOpenCase" className="btn btn-warning btn-sm font-10" type="button" onClick={() => reOpenCaseClick(params.data.caseUniqueId)}>ReOpen Case</button>
        )
    }
       
    const columnDefs = [
        { headerName: ' ', field: '', width: 4, pinned: 'left' },
        { headerName: 'Case ID', field: 'caseUniqueId', width: 130, valueFormatter: func.agStringFormatter, pinned: 'left'},
        { headerName: 'Customer', field: 'custName', width: 130, valueFormatter: func.agStringFormatter ,pinned: 'left'},
        { headerName: 'Category', field: 'classificationDesc', width: 130, valueFormatter: func.agStringFormatter,pinned: 'left'},
        { headerName: 'Sub Category', field: 'subclassificationDesc', width: 130, valueFormatter: func.agStringFormatter,pinned: 'left' },
        { headerName: 'Mobile', field: 'custMobile', width: 130, valueFormatter: func.agMobileNumberHyphenFormatter,pinned: 'left'},
        { headerName: 'Email', field: 'custEmail', width: 130, valueFormatter: func.agStringFormatter,pinned: 'left' },   
        { headerName: 'Status', field: 'caseStatus', width: 130, cellRenderer: func.statusFormatter ,pinned:'left'},
        { headerName: 'Query', field: 'queryText', width: 130, cellRenderer: func.agStringFormatter ,pinned:'left'},
        { headerName:'Re-Open Case' , field: '', width: 110, valueFormatter: func.agStringFormatter,cellRendererFramework:checkedCaseReOpenListing ,pinned: 'left'},
        { headerName: ' ', field: '', width: 4},
    ]

    
    return(
        <React.Fragment>
            <div className='section without-criteria'>
                <OutboundHeader 
                    header={header} 
                    chooseComponent={chooseComponent}
                    listType="Close Case List"
                />
                <div className="mt-1">
                    <div className="form-group">
                        <div className="custom-radio-btn is-invalid">
                            <div className="custom-control custom-radio form-check-inline">
                                <input type="radio"
                                    name={"searchBy"}
                                    className="custom-control-input" 
                                    id={'mobile'} 
                                    defaultChecked  
                                    onClick={()=>handleClick(constants.MOBILE)}
                                />
                                <label className="custom-control-label" htmlFor={'mobile'}>Mobile</label>
                            </div>
                            <div className="custom-control custom-radio form-check-inline">
                                <input type="radio" 
                                    name={"searchBy"} 
                                    className="custom-control-input" 
                                    id={'email'} 
                                    onClick={()=>handleClick(constants.EMAIL)}
                                />
                                <label className="custom-control-label" htmlFor={'email'}>Email</label>
                            </div>
                            <div className="custom-control custom-radio form-check-inline">
                                <input type="radio" 
                                    name={"searchBy"} 
                                    className="custom-control-input" 
                                    id={'vin'}
                                    onClick={()=>handleClick(constants.VIN)}
                                />
                                <label className="custom-control-label" htmlFor={'vin'}>VIN</label>
                            </div>
                        
                            {
                                toggleSearchBy === constants.MOBILE ? 
                                <>
                                    
                                    <div className="col-7 pl-0 form-check-inline input-div">
                                        <input  
                                            value={searchByValue}
                                            onChange={e => setSearchByValue(e.target.value)}
                                            name={type + "_" + ".mobile"}
                                            type="number" 
                                            className="form-control " placeholder="Enter Caller Mobile No."
                                            id={type + "_" + "searchArea"}
                                        />
                                    </div>
                                </>
                                :
                                    toggleSearchBy === constants.EMAIL ?
                                    <div className="col-10 pl-3 form-check-inline input-div ">
                                        <input  value={searchByValue}
                                            name={type + "_" +".email"}
                                            onChange={e => setSearchByValue(e.target.value)}
                                            type="text" className="form-control" placeholder="Enter Caller Email" 
                                            id={type + "_" + "searchArea"}
                                        />
                                    </div>
                                :
                                    toggleSearchBy === constants.VIN ?
                                    <div className="col-10 pl-3 form-check-inline input-div">
                                        <input  value={searchByValue} 
                                            name={type + "_" +".vin"}
                                            onChange={e => setSearchByValue(e.target.value)} 
                                            type="text" className="form-control" placeholder="Enter Caller VIN" 
                                            id={type + "_" + "searchArea"}
                                        />
                                    </div>
                                : null
                            }
                            <div className="col-2 pl-0 form-check-inline input-div">
                                <button 
                                    name={type + "_" + "button"}
                                    type="button"
                                    id={type + "_" + "searchbutton"}
                                    className="btn btn-success btn-lg btn-block p-1 search-button"
                                    onClick={fetchClosedCaseDetails} 
                                >
                                    &#128269;
                                </button>
                            </div>
                        </div>
                        {
                            isValidated ? null :
                            <div id={"validationServer03Feedback"} className="invalid-feedback">
                                {errorComment}
                            </div>
                        }
                    </div>
                    
                    <div className="row mx-1">
                        <div className="col-12 p-0">
                            <div className="card">
                                <div className="card-body grid-section p-0 " style={{overflow: 'auto'}}>
                                    <div id="myGrid" style={{ height: (size.height !== undefined ? (size.height - 155) : 0), width: '100%', fontSize: '11px', lineHeight: '23px' }}>
                                        {closedCases?.length > 0 && < AgGridReact
                                            columnDefs={columnDefs}
                                            rowData={closedCases}
                                            tooltipShowDelay='0'
                                            loadingOverlayComponent={CustomLoadingOverlay}
                                            loadingOverlayComponentParams={{ loadingMessage: '' }}
                                            rowSelection="multiple"
                                            // onGridReady={onGridReady}
                                            // rowMultiSelectWithClick={true}
                                            // suppressRowClickSelection={true}
                                            headerCheckboxSelection={true}
                                            animateRows={true}
                                            headerCheckboxSelectionFilteredOnly={false}
                                            // pagination={true}
                                        >
                                        </AgGridReact>}
                                        {/* {closedCases.length > 0 && <GridPagination
                                            activePage={1}
                                            itemsCountPerPage={5}
                                            recordCount={closedCases.length}
                                            pageRangeDisplayed={10}
                                        />} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default CaseReOpen