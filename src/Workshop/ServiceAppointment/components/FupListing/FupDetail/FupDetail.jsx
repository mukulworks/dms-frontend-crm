import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';



const FupDetail = ({ isFupModalOpen, setFupModalOpen, vin }) => {

    const {fupModalDataByVin} = useSelector(state => {
        let fupModalDataByVin =  state.serviceAppointment.serviceAppointmentModel
        return {
            fupModalDataByVin: fupModalDataByVin.fupModalDataByVin
        }
    })

    return (
        <div className={"popup-followup " + (isFupModalOpen ? " " : "d-none")} >
            <div className="card">
                <div className="card-header">
                    <ul className="nav justify-content-between bg-light popup-followup-heading">
                        <li className="nav-item">
                            <span>Follow Up</span>
                        </li>
                        <li className="nav-item">
                            <span>Audi</span>
                        </li>
                        <li className="nav-item">
                            <span>IN</span>
                        </li>
                        <li className="nav-item">
                            <span className="text-uppercase">{vin}</span>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setFupModalOpen(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card-body p-0">
                <table className="table text-center mb-0">
                    <thead>
                        <tr>
                            <th>FUP ID</th>
                            <th>Create Date</th>
                            <th>Due Date</th>
                            <th>Caller-ID</th>
                            <th>Next FUP Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fupModalDataByVin && fupModalDataByVin.map((fupModalData, key) => (
                            <>
                                <tr key={key}><td colSpan='5' align='left' className='tr-followUp-Event-Header'>{fupModalData.eventDesc}</td></tr>
                            {
                                fupModalData.followUps.map((followUp, key) => (
                                    <FollowUpGrid key={key} followUp={followUp} isFupModalOpen={isFupModalOpen}/>
                                ))
                            }
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const FollowUpGrid = ({ followUp, isFupModalOpen }) => {

    const callHistoryPopUp = (<Popover>
        <Popover.Title>
            <ul className="nav justify-content-between bg-light popup-followup-heading">
                <li className="nav-item">
                    <div className="text-uppercase">follow-up type: [fup-serial:<span>ggn01-42649</span>]</div>
                </li>
            </ul>
        </Popover.Title>
        <Popover.Content>
            <div className="card">
                <div className="card-header">
                    <div className="row align-items-center">
                        <div className="col-auto"><img src="images/user.svg" className="rounded-circle border" width="30" alt="" /></div>
                        <div className="col-auto pl-0">
                            <p className="mb-0 text-uppercase font-15">m/s astral travels pvt. ltd. <span className="mdi mdi-crown text-success"></span></p>
                            <p className="mb-0"> <span className="mdi mdi-phone-in-talk"></span> +91 9999999999</p>
                        </div>
                    </div>
                    <div className="card-body py-2">
                        <div className="row">
                            <div className="col-7">
                                <ul className="nav flex-column van-details">
                                    <li className="nav-item text-left">
                                        <span>Model</span><span className="text-uppercase">Q5-Q5_20tdi-ibswht</span>
                                    </li>
                                    <li className="nav-item text-left">
                                        <span>Selling Dealer</span><span>30108</span>
                                    </li>
                                    <li className="nav-item text-left">
                                        <span>CRM Text</span><span>-</span>
                                    </li>
                                    <li className="nav-item text-left">
                                        <span>Regn</span><span className="text-uppercase">hr26bu-6485</span>
                                    </li>
                                    <li className="nav-item text-left">
                                        <span>Event</span><span className="text-danger">Paid [20-Jun-2020]</span>
                                    </li>
                                    <li className="nav-item text-left">
                                        <span>VIN</span><span className="text-uppercase">Wauzfc8r5cy701145</span>
                                    </li>
                                    <li className="nav-item text-left">
                                        <span>Sales Invoice</span><span>Not Availble</span>
                                    </li>
                                    <li className="nav-item text-left">
                                        <span>Sale Date</span><span>31-Aug-2012</span>
                                    </li>
                                    <li className="nav-item text-left">
                                        <span>Engine No</span><span>CMG 007472</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-5 border-left">
                                <img src="images/isuzu-img.jpg" className="w-100" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="card history">
                        <div className="card-header">
                            Contact History
                                    </div>
                        <div className="card-body p-0">
                            <table className="table text-center mb-0">
                                <thead>
                                    <tr>
                                        <th>Sr.</th>
                                        <th>Call Date</th>
                                        <th>Mode</th>
                                        <th>Contact</th>
                                        <th>Response</th>
                                        <th>Comment</th>
                                        <th>Log</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1.</td>
                                        <td>14-Dec-09</td>
                                        <td>Phone</td>
                                        <td>+91-9999999999</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>1.</td>
                                        <td>14-Dec-09</td>
                                        <td>Phone</td>
                                        <td>+91-9999999999</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="card history">
                        <div className="card-header">
                            SMS List
                                    </div>
                        <div className="card-body p-0">
                            <table className="table mb-0">
                                <tbody>
                                    <tr>
                                        <td><img src="images/no-data.jpg" alt="" /> <span className="ml-3">No Record Exit</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="card history">
                        <div className="card-header">
                            Notification List
                                </div>
                        <div className="card-body p-0">
                            <table className="table mb-0">
                                <tbody>
                                    <tr>
                                        <td><img src="images/no-data.jpg" alt="" /> <span className="ml-3">No Record Exit</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Popover.Content>
        </Popover>
    )
    return (
        <tr>
            <td>
                <OverlayTrigger trigger="click" placement="left" overlay={callHistoryPopUp} rootClose={isFupModalOpen}>
                    <div>
                        <a href="#">{followUp.fupSerial}</a>
                    </div>
                </OverlayTrigger>
                
                
            </td>
            <td>
                <span>{followUp.createDate === null ? '-' : (moment(new Date(followUp.createDate)).format("DD-MMM-YYYY"))}</span>
            </td>
            <td>
                <span>{followUp.dueDate === null ? '-' : (moment(new Date(followUp.dueDate)).format("DD-MMM-YYYY"))}</span>
            </td>
            <td>
                <span>{followUp.callerId}</span>
            </td>
            <td>
                <span>{followUp.nextFupDate === null ? '-' : (moment(new Date(followUp.nextFupDate)).format("DD-MMM-YYYY"))}</span>
            </td>
        </tr>
    )
}

export default FupDetail