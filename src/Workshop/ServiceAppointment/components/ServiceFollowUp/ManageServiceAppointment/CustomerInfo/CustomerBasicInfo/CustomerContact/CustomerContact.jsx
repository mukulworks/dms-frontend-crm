import React from 'react';
import func from '../../../../../../../../utils/common.functions' 
const CustomerContact = ({ customerContacts }) => {

    const addressWiseCustomerContacts = func.groupBy(customerContacts, "addressType");
    
    return (
        <div className="row call-mail">
            <div className="col-12 call-mail-tab bg-light">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a className="flex-fill nav-link active" id="nav-admin-tab" data-toggle="tab" href="#nav-admin" role="tab" aria-controls="nav-admin" aria-selected="true">Administration contact</a>
                        <a className="flex-fill nav-link" id="nav-actual-tab" data-toggle="tab" href="#nav-actual" role="tab" aria-controls="nav-actual" aria-selected="false">Actual User</a>
                    </div>
                </nav>
                <div className="tab-content mt-3" id="nav-tabContent">
                    {addressWiseCustomerContacts["ADMIN"] &&
                        <div className="tab-pane fade show active" id={"nav-admin"} role="tabpanel" aria-labelledby={`nav-admin-tab`}>
                            {addressWiseCustomerContacts["ADMIN"] && addressWiseCustomerContacts["ADMIN"].map((customerContact, index) => (
                                <div key={index} className="row">
                                    <div className="col-5 pr-1">
                                        <p className="mb-1"><span className="mdi mdi-phone-in-talk mr-1"></span> +91-{customerContact.mobile}</p>
                                    </div>
                                    <div className="col-7 pl-1">
                                        <p className="mb-1"><a href={`mailto:${customerContact.email}`}><span className="mdi mdi-email mr-2"></span>{customerContact.email}</a></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    {addressWiseCustomerContacts["ACTUAL"] &&
                        <div className="tab-pane fade show active" id={"nav-actual"} role="tabpanel" aria-labelledby={`nav-actual-tab`}>
                            {addressWiseCustomerContacts["ACTUAL"].map((customerContact, index) => (
                                <div key={index} className="row">
                                    <div className="col-5 pr-1">
                                        <p className="mb-1"><span className="mdi mdi-phone-in-talk mr-1"></span> +91-{customerContact.mobile}</p>
                                    </div>
                                    <div className="col-7 pl-1">
                                        <p className="mb-1"><a href={`mailto:${customerContact.email}`}><span className="mdi mdi-email mr-2"></span>{customerContact.email}</a></p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    }
                    {addressWiseCustomerContacts["OWNER"] &&
                        <div className="tab-pane fade show active" id={"nav-admin"} role="tabpanel" aria-labelledby={`nav-admin-tab`}>
                            {addressWiseCustomerContacts["OWNER"] && addressWiseCustomerContacts["OWNER"].map((customerContact, index) => (
                                <div key={index} className="row">
                                    <div className="col-5 pr-1">
                                        <p className="mb-1"><span className="mdi mdi-phone-in-talk mr-1"></span> +91-{customerContact.mobile}</p>
                                    </div>
                                    <div className="col-7 pl-1">
                                        <p className="mb-1"><a href={`mailto:${customerContact.email}`}><span className="mdi mdi-email mr-2"></span>{customerContact.email}</a></p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default CustomerContact