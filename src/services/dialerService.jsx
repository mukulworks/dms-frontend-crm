import { DIALER_API_CONSTANT_MAP } from '../utils/constant'

export const agentLoginService = (request) => {
    const AGENT_API_LOGIN = DIALER_API_CONSTANT_MAP.agentLogin;
    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'VendorId': request.vendorId,
            'BrandCode': request.brandCode,
        },
        body: JSON.stringify({
            "action": "login",
            "acd": "801",
            "AgentId": request.agentId,
            "BrandId": request.brandCode,
            "CountryId": request.countryCode,
            "DealerId": request.dealerId,
            "BranchId": request.branchId,
            "Extension": request.extension,
            "AgentTimeStamp": new Date(),
            "AgentIpAddress": "191.168.30.32"
        })
    };

    return fetch(AGENT_API_LOGIN, parameters)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return {
                agentId: request.agentId,
                extension: request.extension,
                isAgentLoggedIn : true,
                loginResponse: json
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
};

export const agentLogoutService = (request) => {
    const AGENT_API_LOGOUT = DIALER_API_CONSTANT_MAP.agentLogout;
    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'VendorId': request.vendorId,
            'BrandCode': request.brandCode,
        },
        body: JSON.stringify({
            "BrandId": request.brandCode,
            "CountryId": request.countryCode,
            "DealerId": request.dealerId,
            "BranchId": request.branchId,
            "Extension": request.extension,
            "AgentTimeStamp": new Date(),
            "AgentIpAddress": "191.168.30.32"
        })
    }

    return fetch(AGENT_API_LOGOUT, parameters)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};


export const makeCallService = (request) => {
    const AGENT_API_MAKECALL = DIALER_API_CONSTANT_MAP.makeCall;
    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'VendorId': request.vendorId,
            'BrandCode': request.brandCode,
        },
        body: JSON.stringify({
            "BrandId": request.brandCode,
            "CountryId": request.countryCode,
            "DealerId": request.dealerId,
            "BranchId": request.branchId,
            "Extension": request.extension,
            "CallerNumber": request.callerNumber,
            "UniqueId": request.uniqueId,
            "Context": request.context,
            "AgentTimeStamp": new Date(),
            "AgentIpAddress": "191.168.30.32"
        })
    }

    return fetch(AGENT_API_MAKECALL, parameters)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};


export const endCallService = (request) => {
    const AGENT_API_END_CALL = DIALER_API_CONSTANT_MAP.endCall;
    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'VendorId': request.vendorId,
            'BrandCode': request.brandCode,
        },
        body: JSON.stringify({
            "BrandId": request.brandCode,
            "CountryId": request.countryCode,
            "DealerId": request.dealerId,
            "BranchId": request.branchId,
            "Extension": request.extension,
            "AgentTimeStamp": new Date(),
            "AgentIpAddress": "191.168.30.32"
        })
    }

    return fetch(AGENT_API_END_CALL, parameters)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};