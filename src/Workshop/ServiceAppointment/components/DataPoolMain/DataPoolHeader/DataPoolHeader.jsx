import React from 'react'
import { useSelector } from 'react-redux'
import GraphImage from '../../../../../images/graph.svg'
import ReportImage from '../../../../../images/report.svg'
import ExcelImage from '../../../../../images/excel.svg'

const DataPoolHeader = ({ totalFupCount }) => {
    return (
        <div className="col-sm-auto font-btn text-center pr-0">
            <div className="spaceing">
                <div className="text-warning font-18 font-weight-400 total-number">{totalFupCount}</div>
                <ul className="nav d-inline-flex">
                    <li>
                        <a href="" className="mr-2"><img src={GraphImage} alt="" /></a>
                    </li>
                    <li>
                        <a href="" className="mr-2"><img src={ReportImage} alt="" /></a>
                    </li>
                    <li>
                        <a href=""><img src={ExcelImage} alt="" /></a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DataPoolHeader
