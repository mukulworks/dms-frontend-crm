import React from 'react'
import {useDispatch } from 'react-redux'
import { setSelectDataPoolCode } from '../../../../store/actions/serviceAppointmentAction'
const DataPoolItem = ({ dataPool }) => {
    const dispatch = useDispatch();
    const fetchdataPoolList = (code) => {
        dispatch(setSelectDataPoolCode(code))
    };
    return (
        <div
            className={"item d-flex align-items-center text-right justify-content-between" + (dataPool.isSelected ? ' active' : ' ')}
            onClick={() => fetchdataPoolList(dataPool.code)}>
            <div className="text-number"><span className="text-danger">{dataPool.count}</span></div>
            <div className="title-width">{dataPool.description}</div>
        </div>
    )
}

export default DataPoolItem
