import React, { useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import Select from '../../../../../../common/Select/Select'
import ReactDatePicker, { setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CourtesyCar = ({ courtesyCarAllotments }) => {

    const [isChecked, setIsChecked] = useState(true)   
    const [allotedTypeLists, setAllotedTypeLists] = useState([])
    const { register, errors, control } = useFormContext()
    const [showDate, setShowDate] = useState(false)
    const [courtesyCarType, setCourtesyCarType] = useState()
    const hasError = inputName => Boolean(errors && errors["courtesyCar"] && errors["courtesyCar"][inputName])

    const handleChange = () => {
        let carTypes
        if(isChecked){
            carTypes = courtesyCarAllotments.find(x => x.code === 'Y').courtesyCarTypes
        } else{
            carTypes = courtesyCarAllotments.find(x => x.code === 'N').courtesyCarTypes
        }
        setAllotedTypeLists(carTypes)
        setIsChecked(!isChecked)
    }

    const handleAllotedType = (e) => {
        let { value } = e.target
        setCourtesyCarType(value)

        //Show/Hide date range
        if(value){
            let showDateRange = allotedTypeLists && allotedTypeLists.find(x => x.code === value).showDateRange
            setShowDate(showDateRange)
        } else{
            setShowDate(false)
        }
    }

    return (
        <div className={"card "}>
            <div className="card-header">
                Courtesy Car
            </div>
            <div className="card-body p-1">
                <div className="form-group position-relative mt-2">
                    <label htmlFor="">Is Courtesy Car Alloted
                        <div className="custom-control custom-switch d-inline-block ml-2">
                            <input name="courtesyCar.isCourtesyCarAlloted" ref={register} type="checkbox" className="custom-control-input" id="customSwitch5" onChange={handleChange}/>
                            <label className="custom-control-label" htmlFor="customSwitch5"><span className="switch-position">Yes</span></label>
                        </div>
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Alloted Type<span className="star">*</span></label>
                    <div >
                        <select 
                            ref={register({required: !isChecked})} 
                            name='courtesyCar.courtesyCarType'  id="courtesyCar.courtesyCarType" 
                            className={"form-control" + (hasError('courtesyCarType') ? " is-invalid" : '')} 
                            onChange={handleAllotedType}
                            value={courtesyCarType}
                        >
                            {
                                allotedTypeLists && allotedTypeLists.map((allotedTypeList, key) => (
                                    <option key={key} value={allotedTypeList.code}>{allotedTypeList.description}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                {
                    !isChecked && showDate &&
                    <>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">From<span className="star">*</span></label>
                            <div className="row">
                                <div className="col-12">
                                    <Controller
                                        control={control} 
                                        name="courtesyCar.courtesyCarFrom"
                                        rules={{ required: !isChecked }}
                                        render={(props) => (
                                            <ReactDatePicker 
                                                // disabled={!isNextFupDateEnable}
                                                className={"form-control" + (hasError("courtesyCarFrom") ? "  is-invalid" : "")}
                                                onChange={(e) => props.onChange(e)} 
                                                closeOnScroll={true}
                                                selected={props.value} 
                                                onBlur={props.onBlur}
                                                dateFormat="dd-MMM-yyyy"
                                                minDate={new Date()}
                                                filterDate={date => date.getMonth()}
                                                ref={register}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">To<span className="star">*</span></label>
                            <div className="row">
                                <div className="col-12">
                                    <Controller
                                        control={control} 
                                        name="courtesyCar.courtesyCarTo"
                                        rules={{ required: !isChecked }}
                                        render={(props) => (
                                            <ReactDatePicker 
                                                // disabled={!isNextFupDateEnable}
                                                className={"form-control" + (hasError("courtesyCarTo") ? "  is-invalid" : "")}
                                                onChange={(e) => props.onChange(e)} 
                                                closeOnScroll={true}
                                                selected={props.value} 
                                                onBlur={props.onBlur}
                                                dateFormat="dd-MMM-yyyy"
                                                minDate={new Date()}
                                                filterDate={date => date.getMonth()}
                                                ref={register}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                }
                </div>
        </div>
    )
}

export default CourtesyCar
