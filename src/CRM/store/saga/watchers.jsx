import { takeLatest } from "redux-saga/effects";
import * as types from "../actions/index";
import * as outBoundTypes from "../actions/outboundActions/index";
import { fetchEngagedCases } from "../actions/outboundActions/outboundActions";
import {
  fetchInboundCriteriaSaga,
  fetchInboundCasesByCriteriaSaga,
  fetchNewCaseSaga,
  fetchCustHistoryByIdentificationSaga,
  getCustHistoryByIdentificationSaga,
  saveNewCaseSaga,
  fetchFUPModalDataByCaseIdSaga,
  fetchManageFollowUpSaga,
  saveCaseFollowUpSaga,
  assignCasesToUserSaga,
  fetchDealerOutletInfoSaga,
  fetchEngagedCasesSaga,
  fetchSalesActiveCasesSaga,
  fetchServiceActiveCasesSaga,
  assignSelectedVinNumberSaga,
} from "./inboundSaga";
import {
  fetchOutboundCriteriaSaga,
  fetchOutboundCasesByCriteriaSaga,
  fetchOutboundCaseByIdSaga,
  saveOutboundCaseFollowUpSaga,
  fetchOutboundEngagedCasesSaga,
  fetchClosedCasesSaga,
} from "./outboundSaga";

export function* watchInbound() {
  yield takeLatest(types.FETCH_INBOUND_CRITERIA, fetchInboundCriteriaSaga);
  yield takeLatest(
    types.FETCH_INBOUND_CASES_BY_CRITERIA,
    fetchInboundCasesByCriteriaSaga
  );
  yield takeLatest(types.FETCH_CREATE_NEW_CASE, fetchNewCaseSaga);
  yield takeLatest(
    types.FETCH_CUST_HISTORY_BY_IDENTIFICATION,
    fetchCustHistoryByIdentificationSaga
  );
  yield takeLatest(
    types.GET_CUST_HISTORY_BY_IDENTIFICATION,
    getCustHistoryByIdentificationSaga
  );
  yield takeLatest(types.SAVE_NEW_CASE, saveNewCaseSaga);
  yield takeLatest(
    types.FETCH_FUP_MODAL_DATA_BY_CASE_ID,
    fetchFUPModalDataByCaseIdSaga
  );
  yield takeLatest(types.FETCH_MANAGE_FOLLOW_UPS, fetchManageFollowUpSaga);
  yield takeLatest(types.SAVE_CASE_FOLLOW_UP, saveCaseFollowUpSaga);
  yield takeLatest(types.ASSIGN_CASES_TO_USER, assignCasesToUserSaga);
  yield takeLatest(types.FETCH_DEALER_OUTLET_INFO, fetchDealerOutletInfoSaga);
  yield takeLatest(types.INBOUND_FETCH_ENGAGED_CASES, fetchEngagedCasesSaga);
  yield takeLatest(types.SALES_CHECK_ACTIVE_CASES, fetchSalesActiveCasesSaga);
  yield takeLatest(
    types.SERVICE_CHECK_ACTIVE_CASES,
    fetchServiceActiveCasesSaga
  );
  //edit  by mukul
  yield takeLatest(types.SELECTED_VIN_NUMBER, assignSelectedVinNumberSaga);
}

export function* watchOutbound() {
  yield takeLatest(outBoundTypes.OUTBOUND_CRITERIA, fetchOutboundCriteriaSaga);
  yield takeLatest(
    outBoundTypes.OUTBOUND_CASES_BY_CRITERIA,
    fetchOutboundCasesByCriteriaSaga
  );
  yield takeLatest(
    outBoundTypes.OUTBOUND_CASE_BY_ID,
    fetchOutboundCaseByIdSaga
  );
  // yield takeLatest(outBoundTypes.SAVE_CASE_FOLLOW_UP, saveOutboundCaseFollowUpSaga)
  yield takeLatest(
    outBoundTypes.OUTBOUND_FETCH_ENGAGED_CASES,
    fetchOutboundEngagedCasesSaga
  );
  yield takeLatest(outBoundTypes.CLOSED_CASES, fetchClosedCasesSaga);
  yield takeLatest(
    outBoundTypes.OUTBOUND_SAVE_CASE_FOLLOW_UP,
    saveOutboundCaseFollowUpSaga
  );
}
