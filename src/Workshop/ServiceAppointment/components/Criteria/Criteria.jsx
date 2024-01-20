import React, {  useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetServiceAppointmentViewData, fetchServiceAppointmentData, fetchServiceAppointmentCalendarViewData } from '../../store/actions/serviceAppointmentAction'
import useUserContext from '../../../../Hooks/useUserContext'
import CriteriaArrow from '../../../../../src/styles/images/criteria-arrow.png'

const Criteria = ({ criteriaModel, bindCriteria, isCriteriaOpen, setCriteriaOpen}) => {
    const dispatch = useDispatch()
    const context = useUserContext()
    const { userContext } = context.userDetail
    
    const submitCriteria = (event) => {        
        let brandCode = event.target.form["brandCode"].value;
        let countryCode = event.target.form["countryCode"].value;
        let dealerId = event.target.form["dealerId"].value;
        let branchCode = event.target.form["branchCode"].value;
        let eventId = event.target.form["eventId"].value;
        let callerId = event.target.form["callerId"].value;
        let month = event.target.form["month"].value;
        let viewType = event.target.form["viewType"].value;
        let year= new Date().getFullYear();
        let headerDesc
        switch (viewType) {
            case 'PRIORITIZED':
                headerDesc = 'Follow Ups Due' 
                break;
            case 'CALENDAR':
                headerDesc = 'SERVICE APPOINTMENT CALENDAR'
            default:
                break;
        }
        var criteriaData = {
            brandCode, countryCode, dealerId, branchCode, eventId, callerId, month, viewType, year, headerDesc
        };
        localStorage.setItem('selectedCriteria', JSON.stringify(criteriaData))
        bindCriteria(criteriaData);
        dispatch(resetServiceAppointmentViewData());
        
        viewType === 'CALENDAR' 
        ? dispatch(fetchServiceAppointmentCalendarViewData(criteriaData)) 
        : dispatch(fetchServiceAppointmentData(criteriaData));
    }
    
    useEffect(() => {
        let selectedCriteria = localStorage.getItem('selectedCriteria')
        if(selectedCriteria){
            selectedCriteria = JSON.parse(selectedCriteria)
            bindCriteria({
                brandCode: selectedCriteria.brandCode,
                countryCode: selectedCriteria.countryCode,
                dealerId: selectedCriteria.dealerId,
                branchCode: selectedCriteria.branchCode,
                callerId: selectedCriteria.callerId,
                eventId: selectedCriteria.eventId,
                month: selectedCriteria.month, year: new Date().getFullYear(), // response.months[0].code
                headerDesc: selectedCriteria.headerDesc
            })
        } else{
            if (criteriaModel != null) {
                bindCriteria({
                    brandCode: criteriaModel.brands[0].code,
                    countryCode: criteriaModel.country[0].code,
                    dealerId: criteriaModel.dealers[0].dealerCode,
                    branchCode: userContext.branchCode ? userContext.branchCode : criteriaModel.branchs[0].branchCode,
                    callerId: criteriaModel.callers[0].code,
                    eventId: criteriaModel.events[0].code,
                    month: new Date().getMonth() + 1, year: new Date().getFullYear(), // response.months[0].code
                    headerDesc: 'Follow Ups Due'
                });
            }
        }        
    }, []);

    const brandCriteria = () => {
        var selectedCriteria = localStorage.getItem('selectedCriteria')
        if(selectedCriteria){
            selectedCriteria = JSON.parse(selectedCriteria)

            return(
                criteriaModel && criteriaModel.brands && criteriaModel.brands.map((brand, key) => (
                    selectedCriteria.brandCode === brand.code 
                    ? <option key={key} selected value={brand.code}>{brand.description}</option>
                    : <option key={key}          value={brand.code}>{brand.description}</option>
                ))
            )
        } else{
            return(
                criteriaModel && criteriaModel.brands && criteriaModel.brands.map((brand, key) => (
                    <option key={key} value={brand.code}>{brand.description}</option>
                ))
            )
        }
    }

    const countryCriteria = () => {
        var selectedCriteria = localStorage.getItem('selectedCriteria')
        if(selectedCriteria){
            selectedCriteria = JSON.parse(selectedCriteria)

            return(
                criteriaModel && criteriaModel.country && criteriaModel.country.map((county, key) => (
                    selectedCriteria.countryCode === county.code
                    ? <option key={key} selected value={county.code}>{county.description}</option>
                    : <option key={key}          value={county.code}>{county.description}</option>
                ))
            )
        } else{
            return(
                criteriaModel && criteriaModel.country && criteriaModel.country.map((county, key) => (
                    <option key={key} value={county.code}>{county.description}</option>
                ))
            )
        }
    }

    const dealerIdCriteria = () => {
        var selectedCriteria = localStorage.getItem('selectedCriteria')
        if(selectedCriteria){
            selectedCriteria = JSON.parse(selectedCriteria)

            return(
                criteriaModel && criteriaModel.dealers && criteriaModel.dealers.map((dealer, key) => (
                    selectedCriteria.dealerId === dealer.code 
                        ? <option key={key} selected value={dealer.dealerCode}>{dealer.dealerName}</option>
                        : <option key={key} value={dealer.dealerCode}>{dealer.dealerName}</option>
                ))
            )
        } else{
            return(
                criteriaModel && criteriaModel.dealers && criteriaModel.dealers.map((dealer, key) => (
                    <option key={key} value={dealer.dealerCode}>{dealer.dealerName}</option>
                ))
            )
        }
    }

    const branchCriteria = () => {
        var selectedCriteria = localStorage.getItem('selectedCriteria')
        if(selectedCriteria){
            selectedCriteria = JSON.parse(selectedCriteria)

            return(
                criteriaModel && criteriaModel.branchs && criteriaModel.branchs.map((branch, key) => (
                    selectedCriteria.branchCode === branch.branchCode 
                    ? <option key={key} selected value={branch.branchCode}>{branch.branchName}</option>
                    : <option key={key}          value={branch.branchCode}>{branch.branchName}</option>
                ))
            )
        } else{
            return(
                criteriaModel && criteriaModel.branchs && criteriaModel.branchs.map((branch, key) => (
                    branch.branchCode === userContext.branchCode 
                    ? <option key={key} selected value={branch.branchCode}>{branch.branchName}</option>
                    : <option key={key}          value={branch.branchCode}>{branch.branchName}</option>
                    
                ))
            )
        }
    }

    const eventIdCriteria = () => {
        var selectedCriteria = localStorage.getItem('selectedCriteria')
        if(selectedCriteria){
            selectedCriteria = JSON.parse(selectedCriteria)

            return(
                criteriaModel && criteriaModel.events && criteriaModel.events.map((event, key) => (
                    selectedCriteria.eventId === event.code 
                    ? <option key={key} selected value={event.code}>{event.description}</option>
                    : <option key={key}          value={event.code}>{event.description}</option>
                ))
            )
        } else{
            return(
                criteriaModel && criteriaModel.events && criteriaModel.events.map((event, key) => (
                    <option key={key} value={event.code}>{event.description}</option>
                ))
            )
        }
    }

    const viewTypeCriteria = () => {
        var selectedCriteria = localStorage.getItem('selectedCriteria')
        if(selectedCriteria){
            selectedCriteria = JSON.parse(selectedCriteria)

            return(
                criteriaModel && criteriaModel.viewTypes && criteriaModel.viewTypes.map((viewType, key) => (
                    selectedCriteria.viewType === viewType.code 
                    ? <option key={key} selected value={viewType.code}>{viewType.description}</option>
                    : <option key={key}          value={viewType.code}>{viewType.description}</option>
                ))
            )
        } else{
            return(
                criteriaModel && criteriaModel.viewTypes && criteriaModel.viewTypes.map((viewType, key) => (
                    <option key={key} value={viewType.code}>{viewType.description}</option>
                ))
            )
        }
    }

    const monthCriteria = () => {
        var selectedCriteria = localStorage.getItem('selectedCriteria')
        if(selectedCriteria){
            selectedCriteria = JSON.parse(selectedCriteria)

            return(
                criteriaModel && criteriaModel.months && criteriaModel.months.map((month, key) => (
                    parseInt(selectedCriteria.month) === month.code 
                    ? <option key={key} selected value={month.code}>{month.description}</option>
                    : <option key={key}          value={month.code}>{month.description}</option>
                ))
            )
        } else{
            return(
                criteriaModel && criteriaModel.months && criteriaModel.months.map((month, key) => (
                    new Date().getMonth() + 1 == month.code ?
                        <option key={key} value={month.code} selected={month.code}>{month.description}</option>
                        :
                        <option key={key} value={month.code}>{month.description}</option>
                ))
            )
        }
    }

    const callerIdCriteria = () => {
        var selectedCriteria = localStorage.getItem('selectedCriteria')
        if(selectedCriteria){
            selectedCriteria = JSON.parse(selectedCriteria)

            return(
                criteriaModel && criteriaModel.callers && criteriaModel.callers.map((calr, key) => (
                    selectedCriteria.callerId === calr.code 
                    ? <option key={key} selected value={calr.code}>{calr.name}</option>
                    : <option key={key}          value={calr.code}>{calr.name}</option>
                ))
            )
        } else{
            return(
                criteriaModel && criteriaModel.callers && criteriaModel.callers.map((calr, key) => (
                    <option key={key} value={calr.code}>{calr.name}</option>
                ))
            )
        }
    }

    const criteriaBinding = (criteriaType) => {
        switch(criteriaType){
            case 'BRAND':
                return brandCriteria()
            case 'COUNTRY':
                return countryCriteria()
            case 'DEALER':
                return dealerIdCriteria()
            case 'BRANCH':
                return branchCriteria()
            case 'EVENT':
                return eventIdCriteria()
            case 'VIEWTYPE':
                return viewTypeCriteria()
            case 'MONTH':
                return monthCriteria()
            case 'CALLER':
                return callerIdCriteria()
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <aside className={isCriteriaOpen ? 'small' : ''}>
                <div className={"card" + (isCriteriaOpen ? ' d-none' : '')}>
                    <div className="card-body px-0 pt-2 pb-0">
                        <p className="card-title font-13 px-3 text-capitalize mb-1 font-weight-bold criteria-right-arrow">
                            please select your criteria <span className="mdi mdi-chevron-double-left font-20 float-right" onClick={() => setCriteriaOpen(!isCriteriaOpen)}></span>
                        </p>
                        <hr className="mt-2" />
                        <form>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <div className="row form-group">
                                        <div className="col-3 pt-1 pr-0"><label htmlFor="">Brand</label></div>
                                        <div className="col-9">
                                            <select name="brandCode" id="brand" className="form-control" >
                                                {
                                                    criteriaBinding('BRAND')
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row form-group">
                                        <div className="col-3 pt-1 pr-0"><label htmlFor="">Country</label></div>
                                        <div className="col-9">
                                            <select name="countryCode"  className="form-control" >
                                                {
                                                    criteriaBinding('COUNTRY')
                                                }                                            
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row form-group">
                                        <div className="col-3 pt-1 pr-0"><label htmlFor="">Company</label></div>
                                        <div className="col-9">
                                            <select name="dealerId" className="form-control" >
                                                {
                                                    criteriaBinding('DEALER')
                                                }                                            
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row form-group">
                                        <div className="col-3 pt-1 pr-0"><label htmlFor="">Workshop</label></div>
                                        <div className="col-9">
                                            <select name="branchCode" className="form-control" >
                                                {
                                                    criteriaBinding('BRANCH')                                                    
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row form-group">
                                        <div className="col-3 pt-1 pr-0"><label htmlFor="">Reminder</label></div>
                                        <div className="col-9">
                                            <select name="eventId"  className="form-control" >
                                                {
                                                    criteriaBinding('EVENT')
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row form-group">
                                        <div className="col-3 pt-1 pr-0"><label htmlFor="">View</label></div>
                                        <div className="col-9">
                                            <select name="viewType"  className="form-control" >
                                                {
                                                    criteriaBinding('VIEWTYPE')
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row form-group">
                                        <div className="col-3 pt-1 pr-0"><label htmlFor="">Month</label></div>
                                        <div className="col-9">
                                            <select name="month"  className="form-control" >
                                                {
                                                    criteriaBinding('MONTH')
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                {/* <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label" htmlFor="exampleCheck1">Include Previous</label>
                                            </div>
                                        </div>
                                    </div>
                                </li> */}
                                <li className="list-group-item">
                                    <div className="row form-group">
                                        <div className="col-3 pt-1 pr-0"><label htmlFor="">Caller</label></div>
                                        <div className="col-9">
                                            <select name="callerId"  className="form-control" >
                                                {
                                                    criteriaBinding('CALLER')
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className="p-3">
                                <button onClick={submitCriteria} type="button" name=""  className="btn btn-danger btn-lg btn-block rounded-0">Proceed</button>
                                </div>
                        </form>
                    </div>
                </div>
                <div className={(isCriteriaOpen ? ' ' : 'd-none') + " criteria-button"}>
                    <a href="#" onClick={() => setCriteriaOpen(!isCriteriaOpen)}><img src={CriteriaArrow} alt="" /></a>
                </div>
            </aside>
        </React.Fragment>
    )
}

export default Criteria
