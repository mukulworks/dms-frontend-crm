import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AgentLogin } from './AgentLogin/AgentLogin'

const Dialer = () => {
    const [isOpen, setIsOpen] = useState(false)

    const minimiseAgentLoginForm = (boolValue) => {
        setIsOpen(boolValue)
    }

    const { isAgentLoggedIn, agentId, extension } = useSelector(state => {
        return {
            isAgentLoggedIn: state.dialer.agentLoginResponse.isAgentLoggedIn,
            extension: state.dialer.agentLoginResponse.extension,
            agentId: state.dialer.agentLoginResponse.agentId
        }
    })

    return (
        <React.Fragment>
            {!isAgentLoggedIn &&
                <>
                <div className={"user-login" + (isOpen ? ' d-none' : '')} id="user-login">
                    <span className="mdi mdi-arrow-top-right-thick open-account" onClick={() => setIsOpen(!isOpen)}></span>
                    <div className="d-flex align-items-center">
                        <span className="mdi mdi-account-circle icon"></span>
                        <span className="user-name ml-2 font-16">User Login</span>
                    </div>
                </div>
                <AgentLogin isOpen={isOpen} minimiseAgentLoginForm={minimiseAgentLoginForm} />
                </>
            }
            {isAgentLoggedIn &&
                <>
                    <div className={"user-login" + (isOpen ? " d-none" : '')} id="small-details">
                        <span className="mdi mdi-arrow-top-right-thick open-account" id="goto-agent" onClick={() => minimiseAgentLoginForm(!isOpen)}></span>
                        <div className="d-flex align-items-center">
                            <span className="mdi mdi-account-circle icon"></span>
                            <div className="ml-2">
                                <span className="user-name font-weight-bold">User Login</span>
                                <p className="extention-no">Extention No - <span>{extension}</span></p>
                            </div>
                            <div className="border-left p-1 ml-5">
                                <span className="mdi mdi-logout font-16"></span>
                                <span className="font-16">Logout</span>
                            </div>
                        </div>
                    </div>
                    <div className={"login-agent " + (isOpen ? "" : " d-none")} id="agent-dialer">
                        <div className="card text-center">
                        <div className="card-header px-3 py-2"> <span className="mdi mdi-arrow-top-left-bold-outline open-account" onClick={() => minimiseAgentLoginForm(!isOpen)} id="goto-small-details"></span>
                                <div className="d-flex align-items-center">
                                    <span className="mdi mdi-account-circle icon"></span>
                                    <div className="ml-2 text-left" style={{ width: "200px" }}>
                                        <span className="font-16">{agentId}</span>
                                        <p className="extention-no font-14">Extention No - <span>{extension}</span></p>
                                    </div>
                                    <div className="border-left p-1 ml-2 col-auto">
                                        <span className="mdi mdi-logout font-14"></span>
                                        <span className="font-14">Logout</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body text-left">
                                <div className="px-5 pb-2">
                                    <div className="form-group">
                                        <label htmlFor="Agent-ID">Customer Name</label>
                                        <input type="text" className="form-control-plaintext font-weight-bold" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Extension">Mobile No</label>
                                        <input type="text" className="form-control-plaintext font-weight-bold" />
                                    </div>
                                </div>
                                <div className="px-5 py-4 text-center border-top font-14">
                                    <p className="text-primary mb-0">Call Connected</p>
                                    <p className="my-2"><strong>+91-9999999999</strong></p>
                                    <span className="timer">00:05</span>
                                </div>
                                <div className="d-flex justify-content-between px-4">
                                    <button className="btn border"><span className="mdi mdi-microphone"></span></button>
                                    <button className="btn border"><span className="mdi mdi-volume-vibrate"></span></button>
                                    <button className="btn text-light btn-danger"><span className="mdi mdi-phone"></span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </React.Fragment>
    )
}

export default Dialer
