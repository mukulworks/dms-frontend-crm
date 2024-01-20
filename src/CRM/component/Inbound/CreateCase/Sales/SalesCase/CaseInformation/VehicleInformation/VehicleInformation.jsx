import React from 'react'
import { useFormContext } from 'react-hook-form'
import Select from '../../../../../../common/Select/Select';

const VehicleInformation = ({ salesCaseResponseModel }) => {

    const { register, errors } = useFormContext()
    const hasError = inputName => Boolean(errors && errors["vehicleInformation"] && errors["vehicleInformation"][inputName]);

    const selectListOptions = (selectCode) => {
        switch (selectCode) {
            case 'MODEL':
                return salesCaseResponseModel && salesCaseResponseModel.vehicleModels && salesCaseResponseModel.vehicleModels.map((vehicleModel, key) => (
                    <option value={vehicleModel.model} key={key}>{vehicleModel.description}</option>
                ))
            case 'FUEL':
                // return salesCaseResponseModel && salesCaseResponseModel.subCategories && salesCaseResponseModel.subCategories.map((subCategory, key) => (
                //     <option value={subCategory.subCategoryID} key={key}>{subCategory.subCategoryDesc}</option>
                // ))
            default:
                return null;
        }
        
    }

    const validate = {
        vehicleInformation: {
            tagVehicleModel: {
                required: true
            },
            fuel: {
                required: true
            }
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                Vehicle Information
            </div>
            <div className="card-body p-1">
                <Select 
                    label='Model'
                    name='vehicleInformation.tagVehicleModel'
                    id='vehicleInformation.tagVehicleModel'
                    selectClassName={"form-control" + (hasError('tagVehicleModel') ? " is-invalid" : '')} 
                    star='star'
                    emptyOption='Select Model'
                    selectList={selectListOptions('MODEL')}
                    // customRef={register(validate.vehicleInformation.tagVehicleModel)}
                    customRef={register}
                />
                <Select 
                    label='Fuel'
                    name='vehicleInformation.fuel'
                    id='vehicleInformation.fuel'
                    selectClassName={"form-control" + (hasError('fuel') ? " is-invalid" : '')} 
                    star='star'
                    emptyOption='Select Fuel'
                    selectList={selectListOptions('FUEL')}
                    // customRef={register(validate.vehicleInformation.fuel)}
                    customRef={register}
                />
            </div>
        </div>
    )
}

export default VehicleInformation
