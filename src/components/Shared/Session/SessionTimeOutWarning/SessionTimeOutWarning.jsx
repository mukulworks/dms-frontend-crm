import React, {useState, useEffect} from 'react'

const SessionTimeOutPrompt = ({seconds, value, showModal, handleClose, handleLogout}) => {    

    const styleObject = {
        'paddingRight': '17px',
        'display': 'block' 
    }    

    return (
        <div style={showModal ? styleObject : {'display': 'none'}} className={"modal fade" + (showModal ? ' show' : '')} id="session-timeout" tabIndex="-1" aria-labelledby="session-timeout" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="session-timeout">Session Timeout</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => handleClose()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body text-center pb-0">
                        <div className="session-content-1">
                            <p><span className="mdi mdi-alert-circle"></span> Your online session will expire in</p>
                            <h1>{value} min {seconds} secs</h1>
                            <p>Please click "Continue" to keep working; <br /> or click "Logout" to end your session now.</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="w-100">
                            <div className="row">
                                <div className="col-6">
                                    <button onClick={() => handleLogout()} type="button" className="btn btn-block btn-outline-warning" data-dismiss="modal">Logout</button>
                                </div>
                                <div className="col-6">
                                    <button onClick={() => handleClose()} type="button" className="btn btn-block btn-warning">Continue</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SessionTimeOutPrompt
