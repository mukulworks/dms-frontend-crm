import React from 'react'

const EmptyRecords = ({message, styleObject}) => {
    return (
        <div className="card border rounded-0 bg-light" style={styleObject}>
            <div className="card-body px-0 py-2">
                <div className="px-2 table-section overflow-auto">
                    <div className="card rounded-0 m-3 text-center">
                        <div className="p-5">
                            {/* <span className="mdi mdi-file-search-outline font-24"></span> */}
                            <p className="emptyRecordContent">{message ? message : 'No Records Found'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmptyRecords
