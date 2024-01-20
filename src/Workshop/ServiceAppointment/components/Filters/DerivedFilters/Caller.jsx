import React from 'react'
import { useDispatch } from 'react-redux'
import { selectedCaller } from '../../../store/actions/serviceAppointmentAction'

const Caller = ({callers}) => {
    const dispatch = useDispatch()

    const onChangeCaller = (e) => {
        dispatch(selectedCaller(e.target.value))
    }
    return (
        <div>
            {/* <li>Callers
                <select onChange={(e) => onChangeCaller(e)}>
                <option>--Choose Description--</option>
                    {callers.map((category, key)=>
                        <option key={key}>{category}</option>
                    )}
                </select>  
            </li> */}

            <li>Caller
                <div className="filter-content">
                    <ul className="nav flex-column">
                        {callers.map((category, key)=>
                            <li key={key}>{category}</li>
                        )}
                    </ul>
                </div>
            </li>
        </div>
    )
}

export default Caller
