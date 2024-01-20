import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useFormContext } from "react-hook-form";
import { addCustomerVoice,deleteCustomerVoice } from '../../../../../../store/actions/serviceAppointmentAction';

const CustomerVoiceItem = ({ customerVoice, custVoiceCount, isServiceBookingEnable }) => {

    const { register, errors } = useFormContext(); 
    const dispatch = useDispatch();
    const { complaintClassifications, complaintSources } = useSelector(state => {
        let complaintClassifications = state.serviceAppointment.serviceAppointmentModel.manageServiceAppointmentModel.complaintClassifications;
        let complaintSources = state.serviceAppointment.serviceAppointmentModel.manageServiceAppointmentModel.sources;
        return {
            complaintClassifications: complaintClassifications,
            complaintSources: complaintSources
        }
    })
    const deleteCustomerVoiceItem = (customerVoice) => {
        dispatch(deleteCustomerVoice(customerVoice))
    }
    const addCustomerVoiceItem = () => {
        dispatch(addCustomerVoice({
            id: custVoiceCount,
            source: '',
            description: '',
            code: '',
            isRepeat: false,
            isCustomerApproval: false
        }))
    }
    const hasError = (index,inputName) => {
        return Boolean(errors && errors.customerVoiceList && errors.customerVoiceList[index][inputName])
    };

    const serviceBookDateCondition = (data) => {
        if(isServiceBookingEnable){
            if(data===""){
                return false
            }                
        }
        return true
    }

    return (
            <div className="col-12">
                <div className="row px-2">
                    <div className="col-2">
                        <div className="form-group">
                        <label htmlFor={`customerVoiceList[${customerVoice.id}].source`}>Source<span className="star">*</span></label>
                        <select name={`customerVoiceList[${customerVoice.id}].source`} className={"form-control" + (hasError(customerVoice.id,"source") ? "  is-invalid" : "")}  ref={register({validate: serviceBookDateCondition})}>
                            {
                                complaintSources && complaintSources.map((complaintSource, key) => (
                                    <option key={key} value={complaintSource.code}>{complaintSource.description}</option>
                                ))
                            }
                        </select>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                        <label htmlFor={`customerVoiceList[${customerVoice.id}].description`}>Text</label>
                        <input type="text" name={`customerVoiceList[${customerVoice.id}].description`} className={"form-control" + (hasError(customerVoice.id,"description")  ? " is-invalid" : "")} ref={register({ validate: serviceBookDateCondition })} />
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                        <label htmlFor={`customerVoiceList[${customerVoice.id}].code`}>Classification<span className="star">*</span></label>
                        <select name={`customerVoiceList[${customerVoice.id}].code`} className={"form-control" + (hasError(customerVoice.id,"code") ? "  is-invalid" : "")} ref={register({ validate: serviceBookDateCondition })} >
                        <option code=""></option>
                        {
                            complaintClassifications && complaintClassifications.map((complaintClassification, key) => (
                                <option key={key} value={complaintClassification.code}>{complaintClassification.description}</option>
                            ))
                        }
                        </select>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="form-group">
                        <label htmlFor={`customerVoiceList[${customerVoice.id}].isCustomerApproval`}>Customer Ok<span className="star">*</span></label>
                        <div className="custom-control custom-switch">
                            <input type="checkbox" name={`customerVoiceList[${customerVoice.id}].isCustomerApproval`} id={"customSwitch6" + customerVoice.id} className={"custom-control-input"}  ref={register} />
                            <label className="custom-control-label" htmlFor={"customSwitch6" + customerVoice.id}>
                                <span className="switch-position">Yes</span>
                            </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="form-group">
                        <label htmlFor={`customerVoiceList[${customerVoice.id}].isRepeat`}>Repeat<span className="star">*</span></label>
                        <div className="custom-control custom-switch">
                            <input type="checkbox" name={`customerVoiceList[${customerVoice.id}].isRepeat`} id={"customSwitch7" + customerVoice.id} className={"custom-control-input"} ref={register} />
                            <label className="custom-control-label" htmlFor={"customSwitch7" + customerVoice.id}>
                                <span className="switch-position">Yes</span>
                            </label>
                        </div>
                        </div>
                    </div>
                    <div className="col-2 delete-add-btn">
                        <div className="form-group">
                        <div><label htmlFor="">Delete</label></div>
                            <button type="button" className=" form-control btn-sm btn-danger" onClick={() => deleteCustomerVoiceItem(customerVoice)}><span className="mdi mdi-delete"></span></button>
                        {(custVoiceCount === customerVoice.id + 1 || custVoiceCount === 1) && <button type="button" className=" form-control btn-sm btn-danger" disabled={custVoiceCount > 10} onClick={() => addCustomerVoiceItem()}><span className="mdi mdi-plus"></span></button>}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default CustomerVoiceItem
