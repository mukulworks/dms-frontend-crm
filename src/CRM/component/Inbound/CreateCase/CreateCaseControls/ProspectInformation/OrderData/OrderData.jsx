import React  from 'react'
import func from '../../../../../../../utils/common.functions'
const OrderData = ({ orderInfo }) => {

    return (
        <div className="tab-pane fade" id="nav-RetailInformation" role="tabpanel" aria-labelledby="nav-RetailInformation-tab">
            <div className="card border-0 bg-transparent">
                <div className="card-body py-0 px-3">
                    <div className="row card-style">
                        <div className="col-sm-8">
                            <div className="card mb-3">
                                <div className="card-header">
                                    Order Information
                                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-sm-4 px-2">
                                                    <p className="text-muted mb-1">Order No</p>
                                                </div>
                                                <div className="col-sm-8 px-2">
                                                    <p className="mb-1">{orderInfo.orderNo}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-sm-4 px-2">
                                                    <p className="text-muted mb-1">Order Date</p>
                                                </div>
                                                <div className="col-sm-8 px-2">
                                                    <p className="mb-1">{func.dateTimeFormatter(orderInfo.orderDate)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    Retail Information
                                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-sm-4 px-2">
                                                    <p className="text-muted mb-1">Dealer</p>
                                                </div>
                                                <div className="col-sm-8 px-2">
                                                    <p className="mb-1">-</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-sm-4 px-2">
                                                    <p className="text-muted mb-1">Invoice Date</p>
                                                </div>
                                                <div className="col-sm-8 px-2">
                                                    <p className="mb-1">-</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-sm-4 px-2">
                                                    <p className="text-muted mb-1">Invoice No</p>
                                                </div>
                                                <div className="col-sm-8 px-2">
                                                    <p className="mb-1">-</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="row">
                                                <div className="col-sm-4 px-2">
                                                    <p className="text-muted mb-1">Sale Date</p>
                                                </div>
                                                <div className="col-sm-8 px-2">
                                                    <p className="mb-1">-</p>
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

export default OrderData
