import React, { useState } from 'react'
import Controls from '../../../Controls/Controls'
import SectionHeader from './SectionHeader/SectionHeader'

const SectionControl = ({ sectionControl, data, classWidth }) => {

    const [refresh, setRefresh] = useState(false)
    const [Expand, setExpand] = useState(false)

    return (
        <div className={classWidth}>
            <div className="card shadow-sm alert" role="alert">
                {
                    sectionControl.showControlHeader && <SectionHeader sectionControl={sectionControl} data={data} setRefresh={setRefresh} refresh={refresh}
                    setExpand={setExpand} Expand={Expand}
                    />
                }                                    
                <Controls sectionControl={sectionControl} data={data} refresh={refresh} Expand={Expand}/>
            </div>
        </div>
    )
}

export default SectionControl
