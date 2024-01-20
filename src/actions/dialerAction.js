import * as types from './index';

export const agentSignIn = (data) => {
    return {
        type: types.AGENT_LOGIN,
        data
    }
};

export const agentSignOut = (data) => {
    return {
        type: types.AGENT_LOGOUT,
        data
    }
};

export const dialCall = (data) => {
    return {
        type: types.AGENT_CALL_DIAL,
        data
    }
};

export const endCall = (data) => {
    return {
        type: types.AGENT_CALL_END,
        data
    }
};

export const setModeChange = (data) => {
    return {
        type: types.AGENT_SET_MODE_CHANGE,
        data
    }
};