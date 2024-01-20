import React from 'react'
import excelReport from '../../common/excelReport/excelReport'
import ExcelFileModal from '../../../common/ExcelFileModal/ExcelFileModal'

const CRMExcel = (props) => {
    
    let { reportSummaryData, criteriaValues } = props

    return (
        <ExcelFileModal reportSummaryData={reportSummaryData} criteriaValues={criteriaValues}/>
    )
}

export default excelReport(CRMExcel)
