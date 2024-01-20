import React  from 'react'
import NoData from '../../../../../../../images/no-data.jpg'
import func from '../../../../../../../utils/common.functions'

const CustomerBasicData = ({ customerInfo  }) => {

    return (
        <div className="tab-pane fade show active" id="nav-ProspectAddress" role="tabpanel" aria-labelledby="nav-ProspectAddress-tab">
            <div className="card border-0 bg-transparent">
                <div className="card-body py-0 px-3">
                    <div className="row">
                        <div className="col-12 mb-1">
                            <div className="card bg-light rounded-0">
                                <div className="card-body p-1">
                                    <div className="row align-items-center">
                                        <div className="col-auto text-center font-16"><i className="mdi mdi-account"></i></div>
                                        <div className="col-10 pl-0"><strong className="text-uppercase">{`${customerInfo?.customerTitle} ${customerInfo?.customerName} `}</strong><span className="status bg-secondary ml-2">{customerInfo?.customerType}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row card-style">
                        {
                            customerInfo?.customerAddresses.length > 0 ?
                                customerInfo?.customerAddresses.map((customerAddress, key) => (
                                    <div key={key} className="col-sm-4">
                                        <div className="card">
                                            <div className="card-header">
                                                {func.addressDescriptionSelector(customerAddress?.addressType)}
                                                <span className="mdi mdi-content-paste font-16"></span>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-3 px-2">
                                                        <p className="text-muted mb-1">Address</p>
                                                    </div>
                                                    <div className="col-sm-9 px-2">
                                                        <p className="mb-1">{customerAddress?.customer?.add1}</p>
                                                        <p className="mb-1">{customerAddress?.customer?.add2}</p>
                                                        <p className="mb-1">{customerAddress?.customer?.add3}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3 px-2">
                                                        <p className="text-muted mb-1">City</p>
                                                    </div>
                                                    <div className="col-sm-9 px-2">
                                                        <p className="text-uppercase mb-1">{customerAddress?.customer?.cityCode}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3 px-2">
                                                        <p className="text-muted mb-1">State</p>
                                                    </div>
                                                    <div className="col-sm-9 px-2">
                                                        <p className="text-uppercase mb-1">{customerAddress?.customer?.stateCode}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3 px-2">
                                                        <p className="text-muted mb-1">PinCode</p>
                                                    </div>
                                                    <div className="col-sm-9 px-2">
                                                        <p className="mb-1">{func.emptyStringFormatter(customerAddress?.customer?.pinCode)}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3 px-2">
                                                        <p className="text-muted mb-1">Mobile</p>
                                                    </div>
                                                    <div className="col-sm-9 px-2">
                                                        <p className="mb-1">{customerAddress?.customer?.mobile}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3 px-2">
                                                        <p className="text-muted mb-1">Email</p>
                                                    </div>
                                                    <div className="col-sm-9 px-2">
                                                        <p className="mb-1">{customerAddress?.customer?.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                <tr>
                                    <td colSpan="9" style={{ "textAlign": "center", "padding": "30px 0 0 0" }}><img src={NoData} alt="No Records" /></td>
                                </tr>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerBasicData
