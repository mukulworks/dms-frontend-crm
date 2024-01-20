import React from 'react'
import RegImage from '../../../../images/Register Incoming@2x.png'

const PageHeading = ({ heading, assignedTo }) => {
    return (
        <div className="col-6">
            <h1 className="page-heading-title"> <img className='page-heading-image' src={RegImage} alt=""/> 
                {heading}
                {
                    assignedTo && 
                    <div className="d-inline-flex px-3 mx-3 py-1 border-left font-weight-normal"><span className="font-12">Assigned To :</span> 
                        <strong className="text-uppercase font-12">{assignedTo}</strong>
                    </div>
                }
            </h1>
        </div>
    )
}

export default PageHeading
