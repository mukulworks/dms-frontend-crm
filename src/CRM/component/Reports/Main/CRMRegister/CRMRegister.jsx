import React from 'react'
import excelReport from '../../common/excelReport/excelReport'
import ExcelFileModal from '../../../common/ExcelFileModal/ExcelFileModal'

const CRMRegister = (props) => {

    let { reportSummaryData } = props
    
    // useEffect(() => {
    //     let criteriaParameters = criteriaValues?.criteriaParameters
    //     // let departmentType=null
    //     // if(criteriaParameters?.length > 0){
    //     //     for (const criteriaParameter of criteriaParameters) {
    //     //         if(criteriaParameter.code === constants.DEPARTMENT_CODE){
    //     //             departmentType = criteriaParameter.value
    //     //         }
    //     //     }
    //     // }
    //     if(criteriaValues !==null)
    //     {
    //         let payload = {
    //             type: 'SERVICE',
    //             data: criteriaValues
    //         }
    //         if(payload.type && payload.data){
    //             let apiData = fetchScreenData(payload)
    //             Promise.resolve(apiData)
    //                 .then(res => {
    //                     if(res){
    //                         setReportSummaryData(res)
    //                     }
    //                 })
    //                 .catch(error => {
    //                     if(error)
    //                     setReportSummaryData(error)
    //                 })
    //         }
    //     }
    // },[criteriaValues])

    return (
        <ExcelFileModal reportSummaryData={reportSummaryData}/>
    )
}

export default excelReport(CRMRegister)
