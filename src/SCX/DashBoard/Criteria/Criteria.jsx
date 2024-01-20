import React, { useEffect, useState } from 'react'
import ReactDatePicker from "react-datepicker"

const Criteria = ({ dashboardMetadata, captureChartPostData, criteriaValues }) => {

    const [startDate, setStartDate] = useState(new Date());
    const [toggleCalendarType, setToggleCalendarType] = useState('MMM yyyy')
    const [disableList, setDisableList] = useState('ALL')
     
    
    const handleSelect = (e) => {
        let { name, value, form } = e.target
        switch (name) {
            case 'CALNEDAR_TYPE':
                if(value === 'MONTH_WISE')
                    setToggleCalendarType('MMM yyyy')
                else if(value === 'YEAR_WISE')
                    setToggleCalendarType('yyyy')
                break;
            case 'REPORT_FORMAT':
                switch (value) {
                    case 'NATION':
                        setDisableList('ALL')                   
                        form['ZONE_CODE'].value = ''
                        form['COMPANY_ID'].value = ''
                        setDisableList('ALL')
                        break;
                    case 'ZONE_WISE':
                        form['COMPANY_ID'].value = ''
                        setDisableList('ZONE')
                        break;                    
                    case 'DEALERSHIP_WISE':
                        form['ZONE_CODE'].value = ''
                        setDisableList('DEALERSHIP')
                        break;
                    default:
                        break;
                }
            default:
                break;
        }
    }    
    
    const disableDropdownList = (dropdownListName) => {
        switch (dropdownListName) {
            case 'ZONE_CODE':    
                return disableList === 'ALL' ? true : disableList === 'ZONE' ? false : true
            case 'COMPANY_ID':
                return disableList === 'ALL' ? true : disableList === 'DEALERSHIP' ? false : true
            default:
                return false
        }
    }
   
    const [collapseAll, setCollapseAll] = useState(true)
       const handleCollapseAll = () => {
        setCollapseAll(!collapseAll)
    }
    const handleClick = (e) => {
        let dataArray=[]
        for (let i = 0; i < e.target.form.length; i++) {
            let data = { code: e.target.form[i].name, value: e.target.form[i].value }
            dataArray.push(data)
        }
        let data = { code: 'month', value: startDate }
        dataArray.push(data)
        let month = { code: 'MONTH', value: (startDate.getMonth() + 1).toString() }
        dataArray.push(month)
        let year = { code: 'YEAR', value: (startDate.getFullYear()).toString() }
        dataArray.push(year)

        var a = JSON.stringify(criteriaValues)
        var b = JSON.stringify(dataArray)
        
        if(dataArray.length > 0 && a !== b)
            captureChartPostData(dataArray)
    }
    
    const setDefaultValue = (code) => {
        let defaultValue
        switch (code) {
            case 'ZONE_CODE':
                return defaultValue=null
            default:
                break
        }
    }
    
    return(
        <div className="row">
            <div className="col-12">
                <div className="card alert">
                    <form>
                        <div className="card-header px-2 py-2 font-16 font-weight-normal">Survey For Customer Experience - Dashboard
                            <div className="float-right icon-font">
                                <a href="#"><span className="mdi mdi-filter-outline" style={{background: '#42bd3b', padding: "0 5px"}}></span></a>
                                <a href="#" className="float-right icon-font-size">
                                    <span data-toggle="collapse" data-target="#criteria" aria-expanded="false" aria-controls="#criteria" className={"mdi mdi-menu-" +(collapseAll? 'down':'up')}></span>
                                </a>
                            </div>
                        </div>
                        
                        <div className={"card-body p-1 position-relative " + (dashboardMetadata?.screenFilter?.isCollapsibleByDefault?" collapse":" ")} id="criteria">
                            <div className="form-inline">
                                {
                                    dashboardMetadata && dashboardMetadata.screenFilter &&
                                    dashboardMetadata.screenFilter.filterObjects.map((filterObject, key) => {
                                        return(
                                        <select 
                                            name={filterObject.code} className="form-control mb-2 mr-sm-2" 
                                            id={filterObject.code} key={key} 
                                            onChange={handleSelect} 
                                            disabled={disableDropdownList(filterObject.code)} 
                                            defaultValue={setDefaultValue(filterObject.code)}
                                        >
                                            {
                                                filterObject.items.map((item, key) => (
                                                    <option  key={key} value={item.code}>{item.description}</option>
                                                ))
                                            }
                                        </select>
                                    )})
                                }
                                <div className="form-group mb-2 mr-sm-2">
                                    {
                                        toggleCalendarType === 'MMM yyyy' ?
                                        <ReactDatePicker 
                                            dateFormat={toggleCalendarType}
                                            showMonthYearPicker
                                            selected={startDate} 
                                            onChange={date => setStartDate(date)}
                                        /> :
                                        <ReactDatePicker 
                                            dateFormat={toggleCalendarType}
                                            showYearPicker
                                            selected={startDate} 
                                            onChange={date => setStartDate(date)}
                                        />
                                    }
                                </div>
                                <div className=" mb-2 mr-sm-3">
                                    <span className="mdi mdi-calendar-clock"></span>
                                </div>
                                <div className="pos-top-right" style={{top: "6px"}}>
                                    <button type='button' className="btn btn-success" onClick={handleClick}>Apply</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Criteria;