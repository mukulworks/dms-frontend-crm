import { put, call } from 'redux-saga/effects';
import { loginUserService, brandService, locationService, validateIpinService, fetchClientIpAddress } from '../services/authenticationService';
import {updateLoginFormFields} from '../actions/authenticationActions';
import * as types from '../actions'

export function* updateLoginFormFieldSaga(action) {
  yield put(updateLoginFormFields(action.data));
}

export function* loginSaga(payload) {
    try {
        const response = yield call(loginUserService, payload);
        const ipAddress = yield call(fetchClientIpAddress, payload);
        if (ipAddress != null) {
            response.userContext.ipAddress = ipAddress;
        }
        yield put({ type: types.LOGIN_USER_SUCCESS, response });
       
      
    } catch(error) {
      yield put({ type: types.LOGIN_USER_ERROR, error })
    }
}

export function* validateIpinSage(payload) {
  try {
    const response = yield call(validateIpinService, payload);
    yield put({ type: types.LOGIN_VALIDATE_IPIN_SUCCESS, response });
  } catch(error) {
    yield put({ type: types.LOGIN_VALIDATE_IPIN_FAIL, error })
  }
}

export function* fetchBrandsSaga(payload) {
  try {
    const response = yield call(brandService, payload);
    yield put({ type: types.LOGIN_FETCH_BRANDS_SUCCESS, response })
  } catch(error) {
    yield put({ type: types.LOGIN_FETCH_BRANDS_ERROR, error })
  }
}

export function* fetchUserLocationsSaga(payload) {
  try {
  const response = yield call(locationService, payload);
    yield put({ type: types.LOGIN_FETCH_LOCATIONS_SUCCESS, response })
  } catch(error) {
    yield put({ type: types.LOGIN_FETCH_LOCATIONS_ERROR, error })
  }
}