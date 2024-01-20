import React from 'react'
import { useSelector } from 'react-redux'
import DataPool from './DataPool/DataPool'
import DataPoolHeader from './DataPoolHeader/DataPoolHeader'

const DataPoolMain = () => {
    const { dataPools, totalCount } = useSelector(state => {
        let dataPoolModel = state.serviceAppointment.serviceAppointmentModel.dataPoolModel;
        let totalCount = 0;
        if(dataPoolModel.dataPools !== null){
            dataPoolModel.dataPools.map(dataPool => (
                totalCount = dataPool.count + totalCount
            ))
        }        
        return {
            dataPools: dataPoolModel.dataPools,
            totalCount: totalCount
        }
    });

    return (
        <div className="bg-light mx-1 border mb-1">
            <div className="row">
                <DataPoolHeader totalFupCount={totalCount} />
                <DataPool dataPools={dataPools} />
            </div>
        </div>
    )
}

export default DataPoolMain
