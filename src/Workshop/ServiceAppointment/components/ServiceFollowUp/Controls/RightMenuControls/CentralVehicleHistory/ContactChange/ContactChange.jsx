import React from 'react'
import { AgGridReact, AgGridColumn } from 'ag-grid-react'
import func from '../../../../../../../../utils/common.functions'
import moment from 'moment'

const ContactChange = ({control, styleObject}) => {

    const datetimeFormatter = (params) => {
        return moment(params.value).format('DD-MMM-YYYY hh:mm A')
    }

    return (
            <div className="card border-0 bg-transparent">
                <div className="card-body px-0 py-2">
                    <h6 className="card-title mb-0 px-2 font-weight-bold">Contact Change History <span className="mdi mdi-chat ml-2"></span> </h6>
                    <hr className="mt-1 mb-1"/>
                    <div className="px-2 table-section overflow-auto" style={styleObject.tableStyle}>
                        <AgGridReact rowData={control.contactChangeList} defaultColDef={styleObject.defaultColDef}>
                            <AgGridColumn width='50px' valueGetter={func.agGetSerialNumber} headerName='Sr.' ></AgGridColumn>
                            <AgGridColumn width='120px' field='created' headerName='Created' valueFormatter={datetimeFormatter}></AgGridColumn>
                            <AgGridColumn width='150px' field='source' headerName='Source' valueFormatter={func.agStringFormatter}></AgGridColumn>
                            <AgGridColumn width='120px' field='dealer' headerName='Dealer' valueFormatter={func.agStringFormatter}></AgGridColumn>
                            <AgGridColumn width='50px' field='status' headerName='Status' valueFormatter={func.agStringFormatter} ></AgGridColumn>
                            <AgGridColumn width='70px' field='cms' headerName='CMS' valueFormatter={func.agNumberHyphenFormatter} ></AgGridColumn>
                            <AgGridColumn width='150px' field='type' headerName='Type' valueFormatter={func.agStringFormatter}></AgGridColumn>
                            <AgGridColumn width='200px' field='oldValue' headerName='Old Value' valueFormatter={func.agStringFormatter}></AgGridColumn>
                            <AgGridColumn width='200px' field='newValue' headerName='New Value' valueFormatter={func.agStringFormatter}></AgGridColumn>
                        </AgGridReact>
                    </div>
                </div>
            </div>
    )
}

export default ContactChange
