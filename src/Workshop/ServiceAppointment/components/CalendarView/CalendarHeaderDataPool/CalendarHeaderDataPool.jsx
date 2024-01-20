import React from 'react'
import func from '../../../../../utils/common.functions'

const CalendarHeaderDataPool = ({calendarDataPools}) => {
    return (
        <div className="row calendar-header-cell justify-content-between py-2 border-bottom bg-light">
            {calendarDataPools && calendarDataPools.map((calendarDataPool, key) => (
                    <div className="col-2 pr-0" key={key}>
                        <div className="card p-1 shadow-sm">
                            <p className="mb-0">{calendarDataPool.description}</p>
                            <p className="font-20 mb-0">{func.numberFormatter(calendarDataPool.totalCount)}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CalendarHeaderDataPool
