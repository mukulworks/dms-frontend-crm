import React from 'react'
import TimeOut from '../../../../images/timeout.png'

const SessionTimeOut = ({isWarningModalOpen}) => {
    
    const styleObject = {
        'paddingRight': '17px',
        'display': 'block' 
    }

    return (
        <div style={isWarningModalOpen === 'lm' ? styleObject : {'display': 'none'}} className={"modal fade" + (isWarningModalOpen === 'lm' ? ' show' : ' ')} id="session-inactive" tabIndex="-1" aria-labelledby="session-inactive" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="session-inactive">Session Timeout</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body text-center pb-0">
                        <div className="session-content-2">
                            <p className="mb-0">Your online session has expired <br />due to inactivity.</p>
                            <img src={TimeOut} alt="" className="mb-2" />
                            <p>Please click "Login" to start your session now.</p>
                        </div>
                    </div>
                    <div className="modal-footer pb-4">
                        <div className="w-100">
                            <div className="row justify-content-center">
                                <div className="col-7">
                                    <button type="button" className="btn btn-block btn-warning" data-dismiss="modal">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SessionTimeOut
