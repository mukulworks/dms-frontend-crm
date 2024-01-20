import React from 'react'
import func from '../../../../../../../utils/common.functions'

const ProspectBasicData = ({ prospectInfo}) => {

    return (
        <div className="tab-pane fade" id="nav-ProspectInformation" role="tabpanel" aria-labelledby="nav-ProspectInformation-tab">
            <div className="card border-0 bg-transparent">
                <div className="card-body py-0 px-3">
                    <div className="row card-style">
                        <div className="col-sm-8">
                            <div className="card mb-3">
                                <div className="card-header">
                                    Prospect Information
                                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-sm-4 px-2">
                                                    <p className="text-muted mb-1">Prospect No</p>
                                                </div>
                                                <div className="col-sm-8 px-2">
                                                    <p className="mb-1">{prospectInfo.prospectNo }</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-sm-4 px-2">
                                                    <p className="text-muted mb-1">Opened On</p>
                                                </div>
                                                <div className="col-sm-8 px-2">
                                                    <p className="mb-1">{func.dateFormatter(prospectInfo.openedOn)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-sm-4 px-2">
                                                    <p className="text-muted mb-1">Enquiry-Type</p>
                                                </div>
                                                <div className="col-sm-8 px-2">
                                                    <p className="mb-1">{func.emptyStringFormatter(prospectInfo.enquiryCode)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-sm-4 px-2">
                                                    <p className="text-muted mb-1">Enquiry-Type</p>
                                                </div>
                                                <div className="col-sm-8 px-2">
                                                    <p className="mb-1">{func.emptyStringFormatter(prospectInfo.enquiryCode)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-sm-4 px-2">
                                                    <p className="text-muted mb-1">Closed-On</p>
                                                </div>
                                                <div className="col-sm-8 px-2">
                                                    <p className="mb-1">{func.dateFormatter(prospectInfo.closedOn)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-sm-4 px-2">
                                                    <p className="text-muted mb-1">Closed Type</p>
                                                </div>
                                                <div className="col-sm-8 px-2">
                                                    <p className="mb-1">{func.emptyStringFormatter(prospectInfo.closedType)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProspectBasicData
