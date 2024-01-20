import React from 'react'
import { Rolling } from 'react-loading-io'
import useFetchChartData from '../../../Hooks/useFetchChartData'
import func from '../../../utils/common.functions'

const DoughnutChart = ({ sectionControl, data, refresh }) => {

    let { chartData } = useFetchChartData(sectionControl, data, refresh)

    return (
        <div className="card-body px-2 py-3">
            <div className="row">
                {
                    chartData === null ?
                    <div className='card-body p-1'>
                        <div className="row text-center">
                            <div className="col">
                                <Rolling size={30} thickness={5} speed={.8} color='#42bd3b'/> 
                            </div>
                        </div> 
                    </div>
                    :
                    chartData && chartData.dataWithLabels && 
                    chartData.dataWithLabels.map((dataWithLabel, key) => (
                        <div className="col-3" key={key}>
                            <div title={dataWithLabel.toolTip} className={`c100 p${ dataWithLabel.percentage } small`}>
                                <span>{func.numberFormatter(dataWithLabel.value)}</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                            <p className=" font-14 line-height-normal">{dataWithLabel.label}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DoughnutChart
