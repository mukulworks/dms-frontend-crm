import React from 'react'
import { useDispatch } from 'react-redux'
import { agentSignIn, agentSignOut } from '../../../../actions/dialerAction'; 
export const AgentLogin = ({ isOpen, minimiseAgentLoginForm }) => {
    const dispatch = useDispatch();
    const signInAgent = (event) => {
        let agentId = event.target.form["agentId"].value;
        let extension = event.target.form["extension"].value;
        const agent = {
            agentId: agentId,
            extension: extension,
            brandCode: "AUDI",
            countryCode: "IN",
            dealerId: "KRISTAN",
            branchId: "GGN01",
            vendorId: 101
        }
        dispatch(agentSignIn(agent))
    }
    return (
        <form>
            <div className={"login-agent " + (isOpen ? ' ' : ' d-none')} id="login-agent">
                <div className="card text-center">
                    <h2 className="card-header"> <span className="mdi mdi-arrow-top-left-bold-outline open-account" onClick={() => minimiseAgentLoginForm(!isOpen)} id="goto-small"></span><span className="mdi mdi-account-circle user-icon"></span>
                        <div className="font-20 user-login-text"><strong>User login</strong></div>
                    </h2>
                    <div className="card-body text-left">
                        <div className="form-group">
                            <label htmlFor="Agent-ID">Agent ID</label>
                            <input type="text" name="agentId" className="form-control" id="Agent-ID"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Extension">Extension</label>
                            <input type="text" name="extension" className="form-control" id="Extension"/>
                        </div>
                        <button type="button" className="btn btn-block btn-danger" id="login" onClick={signInAgent}>Login</button>
                    </div>
                </div>
            </div>
        </form>
    )
}
