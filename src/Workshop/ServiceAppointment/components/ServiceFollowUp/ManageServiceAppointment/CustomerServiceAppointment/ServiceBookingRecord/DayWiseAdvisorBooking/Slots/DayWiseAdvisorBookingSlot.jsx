import React from 'react'
import { useSelector } from 'react-redux'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const DayWiseBookingDataPool = ({ selectedDate }) => {
    const  advisorWiseBookings = useSelector(state => {
        let dataPools = state.serviceAppointment.serviceAppointmentModel.dayWiseAdvisorServiceBookingModel.dateWiseServiceBookingDataPools;
        if (dataPools != null && dataPools.length > 0) {
            let dataPool = dataPools.find(dataPool => {
                if (dataPool.date === selectedDate) {
                    return dataPool;
                }
            });

            if (!dataPool)
                dataPool = dataPools[0];

            return dataPool.advisorWiseServiceBookings;
        } 
    });

    if (advisorWiseBookings == null || advisorWiseBookings == undefined)
        return null;

    const slotRange = [8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const columnDefs = [
        { headerName: "Advisor", field: "advisorName", width: "80px", sortable: true, pinned: 'left', cellClass:"grid-cell-centered", className: 'ag-row-hover', cellStyle: { 'font-weight': 'bold' }  },
        { headerName: "Booking Count", field: "noOfBookings", width: "80px", sortable: true, pinned: 'left', cellClass: "grid-cell-centered", className: 'ag-row-hover' },
    ]

    slotRange.map((slot,index) => {
        columnDefs.push({
            headerName: slot + ":00", valueGetter: function (params) {
                return params.data.slot[index].count > 0 ? params.data.slot[index].count : '-';
            }, width: "40px", cellClass: "grid-cell-centered"
        })
    })

    return (
        <AgGridReact
            rowData={advisorWiseBookings} rowSelection={'single'} reactNext={true}
            columnDefs={columnDefs}>
        </AgGridReact>
    )
}


export default DayWiseBookingDataPool