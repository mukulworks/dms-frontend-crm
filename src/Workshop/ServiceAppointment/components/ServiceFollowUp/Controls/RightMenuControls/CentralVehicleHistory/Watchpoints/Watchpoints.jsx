import React from 'react'
import { AgGridReact, AgGridColumn } from 'ag-grid-react'
import func from '../../../../../../../../utils/common.functions'

const Watchpoints = ({control, styleObject}) => {

    return (
            <div className="card border-0 bg-transparent">
                <div className="card-body px-0 py-2">
                    <h6 className="card-title mb-0 px-2 font-weight-bold">Watchpoints List <span className="mdi mdi-chat ml-2"></span> </h6>
                    <hr className="mt-1 mb-1"/>
                    <div className="px-2 table-section overflow-auto" style={styleObject.tableStyle}>
                        <AgGridReact rowData={control.watchPointList} defaultColDef={styleObject.defaultColDef}>
                            <AgGridColumn width='50px' valueGetter={func.agGetSerialNumber} headerName='Sr.' ></AgGridColumn>
                            <AgGridColumn width='100px' field='date' headerName='Date' valueFormatter={func.dateFormatter} ></AgGridColumn>
                            <AgGridColumn width='100px' field='' headerName='RO' valueFormatter={func.agNumberHyphenFormatter} ></AgGridColumn>
                            <AgGridColumn width='400px' field='text' headerName='Text' valueFormatter={func.agStringFormatter}></AgGridColumn>
                            <AgGridColumn width='100px' field='status' headerName='Status' valueFormatter={func.agStringFormatter} ></AgGridColumn>
                        </AgGridReact>
                    </div>
                </div>
            </div>
    )
}

export default Watchpoints
