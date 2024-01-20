import React from 'react'

const Bucket = ({followUpEventBuckets, changeFollowUpEventBuckets, selectedBucket}) => {
    return (
        <div>
            {/* <li>States
                <select value={selectedBucket} onChange={(e) => changeFollowUpEventBuckets(e)}>
                <option>--Choose Description--</option>
                    {followUpEventBuckets.map((item, key) => 
                        <option key={key}>{item.name}</option>
                    )}
                </select>   
            </li> */}

            <li>Bucket
                <div className="filter-content">
                    <ul className="nav flex-column">
                        {followUpEventBuckets.map((item, key) => 
                            <li key={key}>{item.name}</li>
                        )}
                    </ul>
                </div>
            </li>
        </div>
    )
}

export default Bucket
