import React from 'react'

const StatusLabel = ({ color, imgSrc, status }) => {
    return (
        <div className="pos-top-right">
            <div className={"caseData-Status " + color}>
                <img className='status-image' src={imgSrc} alt=''/>
                <p className="text-uppercase font-10"><strong>{status}</strong></p>
            </div>
        </div>
    )
}

export default StatusLabel
