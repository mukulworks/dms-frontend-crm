import React from 'react'
import * as constant from '../../../../../utils/constant'

const SelectedDateAppointments = ({selectedDateDataPool, calendarDataPools}) => {

    const getCalendarDataPoolDescription = (calendarDataPool,dataPool) =>
    {
        let fulldate = new Date(selectedDateDataPool.date);
        let date = fulldate.getDate();
        let day = constant.days[fulldate.getDay()];
        let month = constant.monthNames[fulldate.getMonth()];
        let year = fulldate.getFullYear()  ;

        return calendarDataPool.description +" due on " + day + " "+ month + " "+ date + " " + year;
    };

    return (
        <div className="col-3">
            <div className="row bg-light">
                <div className="px-2 py-1 col border-bottom"><strong>Service Appointment</strong></div>
            </div>
            {selectedDateDataPool && selectedDateDataPool.dataPools &&
                selectedDateDataPool.dataPools.map((dataPool) => (
                    calendarDataPools.map((calendarDataPool, key) => (
                        calendarDataPool.code === dataPool.dataType ? (
                            <div className="row pt-2" key={key} style={{color: calendarDataPool.colorCode}}>
                                <div className="col-2 px-2 pt-1 text-center"><span className="badge badge-style">{dataPool.count}</span></div>
                                <div className="col-10 pl-0 line-height-normal">{getCalendarDataPoolDescription(calendarDataPool,dataPool)}</div>
                            </div>
                        ) :
                        null
                    ))
                ))
            }
        </div>
    )
}

export default SelectedDateAppointments
