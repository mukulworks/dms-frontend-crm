import React ,{useEffect, useState} from 'react'
import * as constants from '../../../../../../utils/constant'
import { fetchProspectDatasheet } from '../../../../../store/services/inboundServices'
import VehicleData from './VehicleData/VehicleData'
import CustomerBasicData from './CustomerBasicData/CustomerBasicData'
import ProspectBasicData from './ProspectBasicData/ProspectBasicData'
import OrderData from './OrderData/OrderData'

const ProspectInformation = ({ controlName, switchControl, prospectControlPayload,prospectMasterSerial }) => {
    const [prospectDataSheetData, setProspectDataSheetData] = useState(null);

    useEffect(() => {
        if (prospectMasterSerial > 0) {
            const apiData = fetchProspectDatasheet(prospectControlPayload)
            Promise.resolve(apiData)
                .then(
                    res => {
                        setProspectDataSheetData(res.data)
                    }
                )
        }
    }, [prospectControlPayload])

    const clickHandler = () => {
        switchControl(controlName ? '' : constants.PROSPECTS)
    }

    if (prospectDataSheetData === null)
        return null

    return (
        <li className={"nav-item customer-info " + (controlName ? ' active' : '')} >
            <div className="sub-content-wrapper">
                <a className="nav-link" href="#" onClick={clickHandler} >
                    <span className="mdi mdi-account-outline"></span> <span className="text-title">Customer Information</span>
                </a>
                <div className={"sub-content pt-0 " + (controlName ? '' : ' d-none')} >
                    <div className="row mx-0 py-1">
                        <nav className="col-12">
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <a className="nav-link active" id="nav-ProspectAddress-tab" data-toggle="tab" href="#nav-ProspectAddress" role="tab" aria-controls="nav-ProspectAddress" aria-selected="true">Prospect Address</a>
                                { 
                                    prospectDataSheetData?.customerProspect &&
                                    <React.Fragment>
                                        <a className="nav-link" id="nav-ProspectInformation-tab" data-toggle="tab" href="#nav-ProspectInformation" role="tab" aria-controls="nav-RetailInformation" aria-selected="false">Prospect Information</a>
                                    </React.Fragment>
                                }
                                {
                                    prospectDataSheetData?.customerOrder &&
                                    <React.Fragment>
                                        <a className="nav-link" id="nav-RetailInformation-tab" data-toggle="tab" href="#nav-RetailInformation" role="tab" aria-controls="nav-RetailInformation" aria-selected="false">Retail Information</a>
                                    </React.Fragment>
                                }
                                <a className="nav-link" id="nav-VehicleInformation-tab" data-toggle="tab" href="#nav-VehicleInformation" role="tab" aria-controls="nav-VehicleInformation" aria-selected="false">Vehicle Information</a>
                            </div>
                        </nav>
                        <div className="col-12 tab-content" id="nav-tabContent" >
                            <CustomerBasicData customerInfo={prospectDataSheetData?.customerInfo} />
                            {
                                prospectDataSheetData?.customerProspect != null &&
                                <ProspectBasicData prospectInfo={prospectDataSheetData.customerProspect} />
                            }
                            {
                                prospectDataSheetData?.customerOrder != null &&
                                <OrderData orderInfo={prospectDataSheetData?.customerOrder} />
                            }
                            <VehicleData vehicleInfo={prospectDataSheetData?.vehicleInfo} />
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default ProspectInformation
