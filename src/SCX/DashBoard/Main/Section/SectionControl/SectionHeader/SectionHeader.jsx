import React from 'react'
import * as constants from '../../../../../../utils/constant'

const SectionHeader = ({ sectionControl, data, setRefresh, refresh,setExpand,Expand}) => {

    
    const createSubHeading = (heading) => {
        let month
        let year
        let calendarType
        if(data && data != undefined){
            month = data.find(month => month.code === 'MONTH')
            year = data.find(month => month.code === 'YEAR')
            calendarType = data.find(month => month.code === 'CALNEDAR_TYPE')

            if(month !== undefined && month.value !== undefined && month.code === 'MONTH' && calendarType.value === 'MONTH_WISE'){
                let monthCount = parseInt(month.value)
                return heading.replace('&&xMonthDesc&&', constants.monthShortNames[monthCount - 1] + ' ' + year.value)
            } 
            if(year !== undefined && year.value !== undefined && year.code === 'YEAR' && calendarType.value === 'YEAR_WISE'){
                return heading.replace('&&xMonthDesc&&', year.value)
            }
        }
    }

    const refreshChart = () => {
        setRefresh(!refresh)
    }
     
       const handleExpand = () => {
        setExpand(!Expand)
    }

   
    
    return (
        <div className="card-header px-2 py-1">
            <div className="row">
                <div className="col-8">
                    <div>{sectionControl.controlHeader.mainHeading}</div>
                    <div className="font-10 font-weight-normal text-muted">{createSubHeading(sectionControl.controlHeader.subHeading)}</div>
                </div>
                <div className="col-4 py-1 btn-align">
                    <ul className="nav align-items-center justify-content-end">
                        {
                            sectionControl.controlHeader.showRefreshIcon &&
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={refreshChart}><span className="mdi mdi-refresh"></span></a>
                            </li>
                        }
                        {
                            sectionControl.controlHeader.showExpandIcon && 
                            <li className="nav-item">
                                <a className="nav-link" href="#"  onClick={handleExpand}><span  className={"mdi mdi-arrow-" + (Expand?'collapse':'expand')}></span></a>
                            </li>
                        }
                        {
                            sectionControl.controlHeader.showCloseIcon &&
                            <li className="nav-item">
                                <a href="#" type="button" className="close nav-link" data-dismiss="alert" aria-label="Close">
                                    <span className="mdi mdi-close"></span>
                                </a>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SectionHeader
