import React from 'react';
import { agentLoginService, agentLogoutService, makeCallService, endCallService } from '../services/dialerService';
import { put, call } from 'redux-saga/effects';
import * as types from '../actions';

export function* agentLoginSaga(payload) {
    try {
        const response = yield call(agentLoginService, payload.data);
        yield put({ type: types.AGENT_LOGIN_SUCCESS, response });
    } catch (error) {
        yield put({ type: types.AGENT_LOGIN_ERROR, error })
    }
}
export function* agentLogoutSaga(payload) {
    try {
        const response = yield call(agentLogoutService, payload.data);
        yield put({ type: types.AGENT_LOGOUT_SUCCESS, response });
    } catch (error) {
        yield put({ type: types.AGENT_LOGOUT_ERROR, error })
    }
}
export function* makeCallSaga(payload) {
    try {
        const response = yield call(makeCallService, payload.data);
        yield put({ type: types.AGENT_CALL_DIAL_SUCCESS, response });
    } catch (error) {
        yield put({ type: types.AGENT_CALL_DIAL_ERROR, error });
    }
}

export function* endCallSaga(payload) {
    try {
        const response = yield call(endCallService, payload.data);
        yield put({ type: types.AGENT_CALL_END_SUCCESS, response });
    } catch (error) {
        yield put({ type: types.AGENT_CALL_END_ERROR, error });
    }
}