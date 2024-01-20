import React from 'react'

const MonthYear = ({ monthYears }) => {
    return (
        <div>
            <li>MonthYear
                    <select>
                        {monthYears.map((item) => 
                            <option key={item.code} value={item.code}>{item.description}</option>
                        )}
                    </select>  
            </li>
        </div>
    )
}

export default MonthYear
