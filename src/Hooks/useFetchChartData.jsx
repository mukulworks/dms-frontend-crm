import { useEffect, useState } from 'react'
import ApiCall from '../SCX/ApiServices/ApiService'
import func from '../utils/common.functions'

const useFetchChartData = (sectionControl, data, refresh) => {
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        setChartData(null)
        if(data && data !== undefined && data.length > 0){
            let payload = {
                dataPoint: sectionControl.dataPoint,
                filters: data
            }
  
            const apiData = ApiCall.fetchDataByCriteria(sectionControl.apiUrl, payload)
            Promise.resolve(apiData)
            .then(res => {
                setChartData(res)
            })
            .catch(error => {
                setChartData(error)
            })
        }
      }, [data, refresh])

    return {
        chartData: chartData
    }
}

export default useFetchChartData
