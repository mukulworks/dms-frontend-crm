import React, { useState, useEffect } from 'react'
import func from '../../../../../utils/common.functions'

const CalendarViewDataPoolList = ({criteriaSelectedMonth, weekWiseDataPools, calendarDataPools, showSelectedDateDataPool}) => {
    const [selectedDate, setSelectedDate] = useState()
    const [selectedMonth, setSelectedMonth] = useState()

    useEffect(() => {
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth() + 1;

        let date;
        if(criteriaSelectedMonth === currentMonth)
            date = currentDate.getDate();
        else
            date = 1;

        if(weekWiseDataPools){
            weekWiseDataPools.map((weekWiseDataPool, key) => (
                weekWiseDataPool.dayWiseDataPools.map((dayWiseDataPool, key) => {
                    let dataPoolFullDate = new Date(dayWiseDataPool.date);
                    let dataPoolMonth = dataPoolFullDate.getMonth() + 1
                    let dataPoolDate = dataPoolFullDate.getDate()

                    if(date === dataPoolDate && criteriaSelectedMonth === dataPoolMonth){
                        showSelectedDateDataPool(dayWiseDataPool);
                    }
                })
            ))
        }

        setSelectedDate(date)
        setSelectedMonth(criteriaSelectedMonth)
    }, [criteriaSelectedMonth])
    
    const dateClickHandling = (dayWiseDataPool) => {
        showSelectedDateDataPool(dayWiseDataPool) 
        let dataPoolDate = new Date(dayWiseDataPool.date);
        let dataPoolMonth = dataPoolDate.getMonth() + 1

        setSelectedDate(dataPoolDate.getDate())
        setSelectedMonth(dataPoolMonth)
    }

    return (
        <div className="col-9">
        <div className="row bg-light">
            <div className="px-2 py-1 col border border-top-0 border-left-0">Sun</div>
            <div className="px-2 py-1 col border border-top-0 border-left-0">Mon</div>
            <div className="px-2 py-1 col border border-top-0 border-left-0">Tue</div>
            <div className="px-2 py-1 col border border-top-0 border-left-0">Wed</div>
            <div className="px-2 py-1 col border border-top-0 border-left-0">Thu</div>
            <div className="px-2 py-1 col border border-top-0 border-left-0">Fri</div>
            <div className="px-2 py-1 col border border-top-0 border-left-0">Sat</div>
        </div>
        {
            weekWiseDataPools && weekWiseDataPools.map((weekWiseDataPool, key) => (
                <div className="row" key={key}>

                    {
                        weekWiseDataPool.dayWiseDataPools.map((dayWiseDataPool, key) => {
                            let dataPoolDate = new Date(dayWiseDataPool.date);
                            let dataPoolMonth = dataPoolDate.getMonth() + 1
                            let isSelectedMonth = dataPoolMonth === criteriaSelectedMonth ? 1 : 0;
                            
                            return (
                                <div 
                                    className={"px-2 py-1 col border border-top-0 border-left-0 date-cell " + (isSelectedMonth ? '' : 'bg-light ') + 
                                        (dataPoolDate.getDate() === selectedDate ? (dataPoolMonth === selectedMonth ? 'active' : '') : '')
                                    } 
                                    key={key}
                                    onClick={() => dateClickHandling(dayWiseDataPool)}    
                                    title={func.dateFormatter(dataPoolDate)}
                                >
                                    <div className="row">
                                        <div className="col-4"><span className="font-18">{dataPoolDate.getDate() }</span></div>
                                        <div className="col-8 pr-0 pl-1 pt-2">
                                            {
                                                dayWiseDataPool.dataPools.map((dataPool, key) => (

                                                    calendarDataPools.map((calendarDataPool) => (
                                                        calendarDataPool.code === dataPool.dataType ? 
                                                        (
                                                            key <= 2 ? 
                                                            <React.Fragment key={key}>
                                                                <span className="badge badge-style" style={{color: calendarDataPool.colorCode}}>{dataPool.count}</span>
                                                            </React.Fragment> : 
                                                            key === 3 ?
                                                            <React.Fragment key={key}>
                                                                <div className="w-100"></div>
                                                                <span className="badge text-success badge-style" style={{color: calendarDataPool.colorCode}}>{dataPool.count}</span>
                                                            </React.Fragment> :
                                                            key > 3 ?
                                                            <React.Fragment key={key}>
                                                                <span className="badge text-success badge-style" style={{color: calendarDataPool.colorCode}}>{dataPool.count}</span>
                                                            </React.Fragment> : 
                                                            null
                                                        )
                                                            :
                                                            null
                                                    ))
                                                    
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                        )})
                    }
                    
                </div>
            ))
        }
        </div>
    )
}

export default CalendarViewDataPoolList
