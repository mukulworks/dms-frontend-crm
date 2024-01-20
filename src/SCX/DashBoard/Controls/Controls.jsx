import React from 'react'
import DoughnutChart from './DoughnutChart'
import Chart from './Chart'
import Country from './Country'
import Doughnut3DChart from './Doughnut3DChart'

const Controls = ({ sectionControl, data, refresh,Expand }) => {

    return (
        <div className={"card-body p-1 " +(!Expand && sectionControl.showControlHeader ? ' collapse':' expand')}>
            <div className="row text-center">
                <div className="col">
                    {
                        sectionControl.control.description === 'MULTIPLE_DOUGHNUT' ? <DoughnutChart sectionControl={sectionControl} data={data}/> :
                        sectionControl.control.description === 'WORLD_COUNTRY_MAP' ? <Country sectionControl={sectionControl} data={data} refresh={refresh} Expand={Expand}/> :
                        sectionControl.control.description === 'DOUGHNUT_3D' ? <Doughnut3DChart sectionControl={sectionControl} data={data} refresh={refresh} Expand={Expand}/> :
                        <Chart sectionControl={sectionControl} data={data} refresh={refresh} Expand={Expand}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Controls
