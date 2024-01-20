import { takeLatest } from 'redux-saga/effects';
import { loginSaga,fetchBrandsSaga,fetchUserLocationsSaga,validateIpinSage } from './authenticationSaga';
import { fetchUserDetailSaga, fetchUserMenuRightSaga } from './userSaga'
import { makeCallSaga,endCallSaga,agentLoginSaga,agentLogoutSaga } from './dialerSaga'
import * as types from '../actions/index';
import * as serviceAppointmentTypes from '../Workshop/ServiceAppointment/store/actions/index'


export function* watchUserAuthentication() {
  yield takeLatest(types.LOGIN_USER, loginSaga);
  yield takeLatest(types.LOGIN_FETCH_BRANDS, fetchBrandsSaga);
  yield takeLatest(types.LOGIN_FETCH_LOCATIONS, fetchUserLocationsSaga);
  yield takeLatest(types.LOGIN_VALIDATE_IPIN, validateIpinSage);
  //yield takeEvery(types.LOGIN_CHANGE_FORM_FIELDS, updateLoginFormFieldSaga);
}

export function* watchUser() {
  yield takeLatest(types.FETCH_USER_DETAIL, fetchUserDetailSaga);
  yield takeLatest(types.FETCH_USER_MENU_RIGHTS, fetchUserMenuRightSaga);
}

export function* watchDialer() {
    yield takeLatest(types.AGENT_LOGIN, agentLoginSaga);
    yield takeLatest(types.AGENT_LOGOUT, agentLogoutSaga);
    yield takeLatest(types.AGENT_CALL_DIAL, makeCallSaga);
    yield takeLatest(types.AGENT_CALL_END, endCallSaga);
}