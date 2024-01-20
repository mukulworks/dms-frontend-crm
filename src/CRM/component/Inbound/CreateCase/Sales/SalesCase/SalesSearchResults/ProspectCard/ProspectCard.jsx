import React from 'react'
import { useDispatch } from 'react-redux'
import func from '../../../../../../../../utils/common.functions'
import { fillCallerInformation, prospectDataSheetByIdentification } from '../../../../../../../store/actions/inboundActions'

const ProspectCard = ({id,listData,isActive}) => {
    const dispatch = useDispatch()
    const consolidateRegistrationNum = (reg1, reg2) => {
        if (reg1 === '' || reg1 === null)
            return '-';

        return reg1 + '-' + reg2;
    }

    const handleClick = (searchValue) => {
        let payload = {
            searchType: id,
            searchValue: searchValue
        }
        dispatch(fillCallerInformation(payload))
    }

  
    
    const handleDotClick = (prospectMasterSerial) => {
        let dataType='PROSPECT_NO'
        dispatch(prospectDataSheetByIdentification({
            prospectMasterSerial:prospectMasterSerial,
            isControlActive:true,
            dataType:dataType
        }))
    }

    return (
        <div className={"tab-pane fade " +  (isActive? 'active show': '') } id={id} role="tabpanel" aria-labelledby={id + "-tab"}>
            <div className="px-2">
                {
                    listData && listData.length > 0 ? listData.map((item, key) => {
                        return (
                            <React.Fragment key={key}>
                                <div className="card shadow-sm mb-2">
                                    <div className="card-header">
                                        <div className="custom-radio-btn">
                                            <div 
                                                className={"custom-control custom-radio form-check-inline" + (key === 0 ? ' collapsed' : '')}
                                                data-toggle="collapse" 
                                                data-target={"#collapse" + key} 
                                                aria-expanded={true}
                                                aria-controls={"collapse" + key}
                                            >
                                                <input 
                                                    type="radio" className="custom-control-input"
                                                    id={id + "-" + key}
                                                    name="cust_identification"
                                                />
                                                <label className="custom-control-label text-primary" htmlFor={id + "-" + key} onClick={() => handleClick(item.custMasterSerial)}>
                                                    {item.displayId}
                                                </label>
                                            </div>
                                            <a 
                                                href="" 
                                                className="dots" 
                                                data-toggle="tab" 
                                                data-target="#rightcontrol"
                                                onClick={() => handleDotClick(item.custMasterSerial)}
                                            >
                                                <span className="mdi mdi-dots-horizontal"></span>
                                            </a>
                                        </div>
                                    </div>
                                   
                                </div>
                                <div className="card-body border border-top-0 px-2 py-1">
                                    <p className="font-14 font-weight-bold mb-0"><span className="mdi mdi-account"></span> Mr. <span className="text-uppercase">{item.customerFirstName}</span></p>
                                    <ul className="nav">
                                        <li>
                                            <span className="mdi mdi-cellphone-iphone"></span> {item.customerMobile}
                                        </li>
                                        <li className="ml-3">
                                            <span className="mdi mdi-email"></span> {item.customerEmail}
                                        </li>
                                    </ul>
                                    <div className={"row mb-2 result-list collapse"} id={"collapse" + key} data-parent="#accordionExample">
                                        <div className="col-12">
                                            <hr className="my-2"/>
                                        </div>
                                        <div className="col-6">
                                            <ul className="nav flex-column">
                                                <li><span>Type</span><strong>{func.emptyStringFormatter(item.caseType)}</strong></li>
                                                <li><span>Modal</span><strong className="text-uppercase">{func.emptyStringFormatter(item.vehicelModel)}</strong></li>
                                                <li><span>VIN#</span><strong>{func.emptyStringFormatter(item.chassisNo)}</strong></li>
                                                <li><span>Variant</span><strong className="text-uppercase">{func.emptyStringFormatter(item.vehicleModelVariant)}</strong></li>
                                            </ul>
                                        </div>
                                        <div className="col-6">
                                            <ul className="nav flex-column">
                                                <li><span>Delivered Date</span><strong>{func.dateFormatter(item.actualDanDate)}</strong></li>
                                                <li><span>Selling Dealer</span><strong>{func.emptyStringFormatter(item.sellingDealer)}</strong></li>
                                                <li><span>Registration</span><strong>{func.emptyStringFormatter(consolidateRegistrationNum(item.vehicleRegn1, item.vehicleRegn2))}</strong></li>
                                                <li><span>Status</span><strong>{func.statusDescriptionFormatter(item.caseStatus)}</strong></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }) : null
                }
            </div>
        </div>
    )
}

export default ProspectCard