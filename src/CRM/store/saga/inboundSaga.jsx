import { put, call } from "redux-saga/effects";
import * as types from "../actions/index";
import * as outboundtypes from "../actions/outboundActions/index";
import {
  fetchInboundCriteriaService,
  fetchInboundCasesByCriteriaService,
  fetchNewCaseService,
  fetchCustHistoryByIdentificationService,
  getCustHistoryByIdentificationService,
  saveNewCaseService,
  fetchFUPModalDataByCaseIdService,
  fetchManageFollowUpService,
  saveCaseFollowUpService,
  assignCasesToUserService,
  fetchDealerOutletInfoService,
  fetchEngagedCases,
  checkActiveCase,
} from "../services/inboundServices";

export function* fetchInboundCriteriaSaga(request) {
  try {
    yield put({ type: types.SHOW_LOADER });
    const response = yield call(
      fetchInboundCriteriaService,
      request.departmentCode
    );
    yield put({ type: types.FETCH_INBOUND_CRITERIA_SUCCESS, response });
    yield put({ type: types.HIDE_LOADER });
  } catch (error) {
    yield put({ type: types.FETCH_INBOUND_CRITERIA_FAILURE, error });
    yield put({ type: types.HIDE_LOADER });
  }
}

export function* fetchInboundCasesByCriteriaSaga(payload) {
  try {
    yield put({ type: types.SHOW_LOADER });
    let response = yield call(
      fetchInboundCasesByCriteriaService,
      payload.payload
    );
    yield put({
      type: types.FETCH_INBOUND_CASES_BY_CRITERIA_SUCCESS,
      response,
    });
    // yield put({ type: type.``})
    yield put({ type: types.HIDE_LOADER });
  } catch (error) {
    yield put({ type: types.FETCH_INBOUND_CASES_BY_CRITERIA_FAILURE, error });
    yield put({ type: types.HIDE_LOADER });
  }
}

export function* fetchNewCaseSaga(request) {
  try {
    yield put({ type: types.SHOW_LOADER });
    let response = yield call(fetchNewCaseService, request.departmentCode);
    yield put({ type: types.FETCH_CREATE_NEW_CASE_SUCCESS, response });
    yield put({ type: types.HIDE_LOADER });
  } catch (error) {
    yield put({ type: types.FETCH_CREATE_NEW_CASE_FAILURE, error });
    yield put({ type: types.HIDE_LOADER });
  }
}

//data using VIN search
export function* fetchCustHistoryByIdentificationSaga(payload) {
  try {
    yield put({ type: types.SHOW_SALES_CUST_HISTORY_CIRCULAR_LOADER });
    let response = yield call(
      fetchCustHistoryByIdentificationService,
      payload.payload
    );
    yield put({
      type: types.FETCH_CUST_HISTORY_BY_IDENTIFICATION_SUCCESS,
      response,
    });
    yield put({ type: types.HIDE_SALES_CUST_HISTORY_CIRCULAR_LOADER });
  } catch (error) {
    yield put({
      type: types.FETCH_CUST_HISTORY_BY_IDENTIFICATION_FAILURE,
      error,
    });
    yield put({ type: types.HIDE_SALES_CUST_HISTORY_CIRCULAR_LOADER });
  }
}
//data using VIN search
export function* getCustHistoryByIdentificationSaga(payload) {
  try {
    // yield put({ type: types.SHOW_SALES_CUST_HISTORY_CIRCULAR_LOADER})
    let response = yield call(
      getCustHistoryByIdentificationService,
      payload.payload
    );
    yield put({
      type: types.GET_CUST_HISTORY_BY_IDENTIFICATION_SUCCESS,
      response,
    });
    // yield put({ type: types.HIDE_SALES_CUST_HISTORY_CIRCULAR_LOADER})
  } catch (error) {
    yield put({
      type: types.GET_CUST_HISTORY_BY_IDENTIFICATION_FAILURE,
      error,
    });
    // yield put({ type: types.HIDE_SALES_CUST_HISTORY_CIRCULAR_LOADER})
  }
}

export function* saveNewCaseSaga(payload) {
  try {
    yield put({ type: types.SHOW_LOADER });
    let response = yield call(saveNewCaseService, payload.payload);
    yield put({ type: types.SAVE_NEW_CASE_SUCCESS, response });
    yield put({ type: types.HIDE_LOADER });
  } catch (error) {
    yield put({ type: types.SAVE_NEW_CASE_FAILURE, error });
    yield put({ type: types.HIDE_LOADER });
  }
}

export function* fetchFUPModalDataByCaseIdSaga(payload) {
  try {
    yield put({ type: types.SHOW_CIRCULAR_LOADER });
    let response = yield call(
      fetchFUPModalDataByCaseIdService,
      payload.payload
    );
    yield put({
      type: types.FETCH_FUP_MODAL_DATA_BY_CASE_ID_SUCCESS,
      response,
    });
    yield put({ type: types.HIDE_CIRCULAR_LOADER });
  } catch (error) {
    put({ type: types.FETCH_FUP_MODAL_DATA_BY_CASE_ID_FAILURE, error });
    yield put({ type: types.HIDE_CIRCULAR_LOADER });
  }
}

export function* fetchManageFollowUpSaga(caseUniqueId) {
  try {
    yield put({ type: types.SHOW_LOADER });
    let response = yield call(
      fetchManageFollowUpService,
      caseUniqueId.caseUniqueId
    );
    yield put({ type: types.FETCH_MANAGE_FOLLOW_UPS_SUCCESS, response });
    yield put({ type: types.HIDE_LOADER });
  } catch (error) {
    yield put({ type: types.FETCH_MANAGE_FOLLOW_UPS_FAILURE, error });
    yield put({ type: types.HIDE_LOADER });
  }
}

export function* saveCaseFollowUpSaga(payload) {
  try {
    yield put({ type: types.SHOW_LOADER });
    let response = yield call(saveCaseFollowUpService, payload.payload);
    yield put({ type: types.SAVE_CASE_FOLLOW_UP_SUCCESS, response });
    yield put({ type: types.HIDE_LOADER });
  } catch (error) {
    yield put({ type: types.SAVE_CASE_FOLLOW_UP_FAILURE, error });
    yield put({ type: types.HIDE_LOADER });
  }
}

export function* assignCasesToUserSaga(payload) {
  console.log("debug shivam", payload.payload.outbound);
  try {
    yield put({ type: types.SHOW_LOADER });
    let response = yield call(assignCasesToUserService, payload.payload);
    yield put({
      type: payload.payload.outbound
        ? outboundtypes.ASSIGN_CASES_TO_USER_OUTBOUND_SUCCESS
        : types.ASSIGN_CASES_TO_USER_SUCCESS,
      response,
      payload,
    });
    yield put({ type: types.HIDE_LOADER });
  } catch (error) {
    yield put({ type: types.ASSIGN_CASES_TO_USER_FAILURE, error });
    yield put({ type: types.HIDE_LOADER });
  }
}

export function* fetchDealerOutletInfoSaga(payload) {
  try {
    yield put({ type: types.SHOW_CIRCULAR_LOADER });
    let response = yield call(fetchDealerOutletInfoService, payload.payload);
    yield put({ type: types.FETCH_DEALER_OUTLET_INFO_SUCCESS, response });
    yield put({ type: types.HIDE_CIRCULAR_LOADER });
  } catch (error) {
    yield put({ type: types.HIDE_CIRCULAR_LOADER });
    yield put({ type: types.FETCH_DEALER_OUTLET_INFO_FAILURE, error });
  }
}

export function* fetchEngagedCasesSaga() {
  try {
    yield put({ type: types.SHOW_LOADER });
    let response = yield call(fetchEngagedCases);
    yield put({ type: types.INBOUND_FETCH_ENGAGED_CASES_SUCCESS, response });
    yield put({ type: types.HIDE_LOADER });
  } catch (error) {
    yield put({ type: types.INBOUND_FETCH_ENGAGED_CASES_FAILURE, error });
    yield put({ type: types.HIDE_LOADER });
  }
}

export function* fetchSalesActiveCasesSaga(payload) {
  try {
    yield put({ type: types.SHOW_CIRCULAR_LOADER });
    let response = yield call(checkActiveCase, payload.payload);
    yield put({ type: types.SALES_CHECK_ACTIVE_CASES_SUCCESS, response });
    yield put({ type: types.HIDE_CIRCULAR_LOADER });
  } catch (error) {
    yield put({ type: types.SALES_CHECK_ACTIVE_CASES_FAILURE, error });
    yield put({ type: types.HIDE_CIRCULAR_LOADER });
  }
}

export function* fetchServiceActiveCasesSaga(payload) {
  try {
    yield put({ type: types.SHOW_CIRCULAR_LOADER });
    let response = yield call(checkActiveCase, payload.payload);
    yield put({ type: types.SERVICE_CHECK_ACTIVE_CASES_SUCCESS, response });
    yield put({ type: types.HIDE_CIRCULAR_LOADER });
  } catch (error) {
    yield put({ type: types.SERVICE_CHECK_ACTIVE_CASES_FAILURE, error });
    yield put({ type: types.HIDE_CIRCULAR_LOADER });
  }
}
