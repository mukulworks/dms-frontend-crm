import React from 'react'
import excelReport from '../../common/excelReport/excelReport'
import ExcelFileModal from '../../../common/ExcelFileModal/ExcelFileModal'

const CXSurveyReport = (props) => {

    // useEffect(() => {
    //     let criteriaParameters = criteriaValues?.criteriaParameters
    //     let departmentType=null
    //     if(criteriaParameters?.length > 0){
    //         for (const criteriaParameter of criteriaParameters) {
    //             if(criteriaParameter.code === constants.DEPARTMENT_CODE){
    //                 departmentType = criteriaParameter.value
    //             }
    //         }
    //     }

    //     let payload = {
    //         type: departmentType,
    //         data: criteriaValues
    //     }
    //     let apiData = fetchScreenData(payload)
    //     Promise.resolve(apiData)
    //         .then(res => {
    //             if(res){
    //                 console.log('res', res)
    //                 setReportSummaryData(res)
    //             }
    //         })
    //         .catch(error => {
    //             if(error)
    //             setReportSummaryData(error)
    //         })
    // },[criteriaValues])

    let { reportSummaryData } = props

    return (
        <ExcelFileModal reportSummaryData={reportSummaryData}/>
    )
}

export default excelReport(CXSurveyReport)
