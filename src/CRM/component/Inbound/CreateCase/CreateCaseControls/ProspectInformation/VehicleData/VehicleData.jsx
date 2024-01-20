import React  from 'react'
import func from '../../../../../../../utils/common.functions'
import ImageRenderer from '../../../../../common/ImageRenderer/ImageRenderer'

const VehicleData = ({ vehicleInfo}) => {

    return (
        <div className="tab-pane fade" id="nav-VehicleInformation" role="tabpanel" aria-labelledby="nav-VehicleInformation-tab">
            <div className="card border-0 bg-transparent">
                <div className="card-body py-0 px-3">
                    <div className="row card-style">
                        <div className="col-sm-8">
                            <div className="row mt-3">
                                <div className="col-sm-6">
                                    <div className="row">
                                        <div className="col-sm-4 px-2">
                                            <p className="text-muted mb-1">VIN</p>
                                        </div>
                                        <div className="col-sm-8 px-2">
                                            <p className="mb-1 text-uppercase">{func.emptyStringFormatter(vehicleInfo?.chassisNo)}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4 px-2">
                                            <p className="text-muted mb-1">Model</p>
                                        </div>
                                        <div className="col-sm-8 px-2">
                                            <p className="mb-1 text-uppercase">{vehicleInfo?.vehicleModel}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4 px-2">
                                            <p className="text-muted mb-1">Variant</p>
                                        </div>
                                        <div className="col-sm-8 px-2">
                                            <p className="mb-1">{vehicleInfo?.vehicleVariant}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4 px-2">
                                            <p className="text-muted mb-1">Delivered</p>
                                        </div>
                                        <div className="col-sm-8 px-2">
                                            <p className="mb-1">{func.dateFormatter(vehicleInfo?.sellingDate)}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4 px-2">
                                            <p className="text-muted mb-1">Registration</p>
                                        </div>
                                        <div className="col-sm-8 px-2">
                                            {vehicleInfo?.vehicleRegn1 != null && vehicleInfo?.vehicleRegn1 !='' ?
                                                <p className="mb-1 text-uppercase">{vehicleInfo?.vehicleRegn1}-{vehicleInfo?.vehicleRegn2}</p>
                                                : '-'
                                            }
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-sm-4 px-2">
                                            <p className="text-muted mb-1">Selling Dealer</p>
                                        </div>
                                        <div className="col-sm-8 px-2">
                                            <p className="mb-1">{func.emptyStringFormatter(vehicleInfo?.sellingDealer)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <ImageRenderer imageCode={vehicleInfo?.vehicleModel} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VehicleData
