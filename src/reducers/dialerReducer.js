import * as types from '../actions';
const agentLoginResponse = {
    agentId: null,
    extension: null,
    isAgentLoggedIn: false
}
const dialer = (state = { agentLoginResponse}, action) => {
  let response = action.response;

    switch (action.type) {
        case types.AGENT_LOGIN_SUCCESS:
            return {
                ...state, agentLoginResponse: {
                    agentId: response.agentId,
                    extension: response.extension,
                    isAgentLoggedIn: response.isAgentLoggedIn,
                    Status: response.status,
                    StatusCode:response.statusCode
            }
    };
    case types.AGENT_LOGIN_ERROR:
        return {
        ...state, agentLoginResponse: null
    };
    case types.AGENT_LOGOUT_SUCCESS:
        return { ...state, agentLoginResponse: null };
    case types.AGENT_LOGOUT_ERROR:
        return { ...state, agentLoginResponse: null };
    case types.AGENT_SET_MODE_CHANGE_SUCCESS:
        return { ...state, response };
    case types.AGENT_SET_MODE_CHANGE_ERROR:
        return { ...state, response };
    case types.AGENT_CALL_DIAL_SUCCESS:
        return {
            ...state,
            isCallDialed: true
        }
    case types.AGENT_CALL_DIAL_ERROR:
        return {
            ...state,
            isCallDialed: false
        }
    case types.AGENT_CALL_END_SUCCESS:
        return {
            ...state,
            isCallEnd: false,
            isCallDialed: false,
        }
    case types.AGENT_CALL_END_ERROR:
        return {
            ...state,
            isCallEnd: false,
            isCallDialed: false,
        }
    default:
      return state;
  }
}

export default dialer;