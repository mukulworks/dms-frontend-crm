import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import FupListingHeader from '../FupListing/FupListingHeader'
import CalendarHeaderDataPool from './CalendarHeaderDataPool/CalendarHeaderDataPool'
import CalendarViewDataPoolList from './CalendarViewDataPoolList/CalendarViewDataPoolList'
import { calendarState } from './calendarViewJson'
import SelectedDateAppointments from './SelectedDateAppointments/SelectedDateAppointments'

const CalendarView = ({month, headerData, isCriteriaOpen}) => {
    const [selectedDateDataPool, setSelectedDateDataPool] = useState()

    const { calendarDataPools, weekWiseDataPools } = useSelector(state => {
        let { dataPoolCalendarViewModel } = state.serviceAppointment.serviceAppointmentModel
        return {
            calendarDataPools: dataPoolCalendarViewModel.calendarDataPools,
            weekWiseDataPools: dataPoolCalendarViewModel.weekWiseDataPools
        }
    })

    
    const showSelectedDateDataPool = (dayDataPool) => {
        setSelectedDateDataPool(dayDataPool)
    }

    if(calendarDataPools === undefined)
        return null;
    return (
        <div className={'section ' + (isCriteriaOpen ? ' criteria-width' : '' )}>
            <section className="border mx-3">
                <div className="col-12">
                    <FupListingHeader headerData={headerData}/>
                    <CalendarHeaderDataPool calendarDataPools={calendarDataPools}/>
                    <div className="row">
                        <CalendarViewDataPoolList 
                            criteriaSelectedMonth={parseInt(headerData.selectedMonthCode)}
                            weekWiseDataPools={weekWiseDataPools} 
                            calendarDataPools={calendarDataPools} 
                            showSelectedDateDataPool={showSelectedDateDataPool}
                        />
                        <SelectedDateAppointments 
                            selectedDateDataPool={selectedDateDataPool} 
                            calendarDataPools={calendarDataPools}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CalendarView
