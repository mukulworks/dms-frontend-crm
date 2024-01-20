import React from 'react';
import './NotFound.css';
const NotFound = () => {
    return (
        <div className="container-fluid h-100 bg-img-login">
            <header className="row fixed-top p-3">
                <div className="col-12">
                    <a href="" className="ab-t-l"><img src="images/logo.png" alt=""/></a>
            </div>
        </header>
                <section className="row flex-shrink-0">
                    <div className="col-10 h-v-center">
                        <div className="card border-0 p-3 shadow login-screen">
                            <div className="card-body py-0">
                                <div className="row">
                                <div className="col-6 px-5" >
                                        <div className="p-5 text-center">
                                            <img src="images/404.png" alt="" width="250" className="img-fluid"/>
                                </div>
                                        </div>
                                        <div className="col-6 border-left">
                                            <div className="row align-items-center justify-content-center h-100">
                                                <div className="col-8 page-notfound">
                                                    <small>Error code : 404</small>
                                                    <h1 className="font-weight-bold">Oops!!</h1>
                                                    <div className="font-weight-bold font-24">
                                                        <p className="mb-0">This is not page</p>
                                                        <p className="">you are looking for</p>
                                                    </div>
                                                    <a href="" className="btn btn-primary">Go Back</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        </section>
                    <div className="row mt-auto fixed-bottom px-3 py-1">
                        <div className="col-4">
                            <ul className="nav">
                                <li>
                                    <a href=""><span className="footer-icon"><img src="images/support.svg" alt=""/></span> +91 124 4283156</a>
                    </li>
                                    <li>
                                        <a href=""><span className="footer-icon"><img src="images/mail.svg" alt=""/></span> Skoda.dms.support@orbitsys.co.in</a>
                    </li>
                </ul>
            </div>
                                <div className="col-4">
                                    <ul className="nav justify-content-center social-icon">
                                        <li className="nav-item">
                                            <a className="nav-link p-1" href="#"><i className="mdi mdi-facebook" aria-hidden="true"></i></a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link p-1" href="#"><i className="mdi mdi-linkedin" aria-hidden="true"></i></a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link p-1" href="#"><i className="mdi mdi-youtube" aria-hidden="true"></i></a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-4 text-right">
                                    <p className="mb-0">All Rights Reserved © Orbitsys CRM-DMS 2020</p>
                                </div>
        </div>
                        </div>
    )
}
export default NotFound;