import React, { useEffect, useState } from 'react'
import Criteria from './Criteria/Criteria'
import Main from './Main/Main'
import ApiCall from '../ApiServices/ApiService'
import CustomLoader from '../../components/Shared/Loader/CustomLoader'
import useWindowSize from '../../Hooks/useWindowSize'

const Dashboard = () => {

    const [dashboardMetadata, setDashboardMetadata] = useState({})
    const [criteriaValues, setCriteriaValues] = useState([])
    const [showHideLoader, setShowHideLoader] = useState(true)
    const size = useWindowSize()

    useEffect(() => {
        setShowHideLoader(true)
        const apiData = ApiCall.fetchDashboardMetadata()
        Promise.resolve(apiData)
        .then(res => {
            let array=[];
            for (let i = 0; i < res.screenFilter.filterObjects.length; i++) {
                let code = res.screenFilter.filterObjects[i].code;
                let value = res.screenFilter.filterObjects[i].items[0].code;
                array.push({"code":code,"value":value});
            }
            let month = { code: 'MONTH', value: (new Date().getMonth() + 1).toString() }
            array.push(month)
            let year = { code: 'YEAR', value: (new Date().getFullYear()).toString() }
            array.push(year)
            setCriteriaValues(array)
            setDashboardMetadata(res)
            setShowHideLoader(false)
        })
        .catch(error => {
            setShowHideLoader(false)
            return error
        })
    },[])

    const captureChartPostData = (data) => {
        setCriteriaValues(data)
    }    


    return(
        <div className="grid-section px-2 py-3" style={{overflow: "auto", height: size.height !== undefined ? (size.height - 100) : 0 }}>
            <section className="mx-2 dashboard">
                {
                    showHideLoader === true ? <CustomLoader showHide={showHideLoader}/> 
                    :
                    <>
                        <Criteria dashboardMetadata={dashboardMetadata} captureChartPostData={captureChartPostData} criteriaValues={criteriaValues}/>
                        <Main main={dashboardMetadata?.main} data={criteriaValues}/>
                    </>
                }
            </section>
        </div>
    )
}

export default Dashboard