import {
    fetchServiceAppointmentData,
    fetchServiceAppointmentCalendarViewService,
    fetchDataUsingCriteriaService,
    fetchCustomerServiceAppointmentData,
    fetchDayWiseServiceBookingCount,
    fetchFUPModalDataByVinService,
    createServiceAppointmentService
} from '../services/manageFollowUpService';
import { put, call } from 'redux-saga/effects';
import * as types from '../actions/index';

export function* fetchServiceAppointmentSaga(payload) {
    try {
        yield put({ type: types.SHOW_LOADER });
        const serviceAppointmentResponse = yield call(fetchServiceAppointmentData, payload.data);
        if(serviceAppointmentResponse !== null && serviceAppointmentResponse !== undefined && serviceAppointmentResponse !== ""){
            serviceAppointmentResponse.dataPools[0].isSelected = true;
        }
        
        yield put({ type: types.FETCH_SERVICE_APPOINTMENT_DATA_SUCCESS, serviceAppointmentResponse });
        yield put({ type: types.HIDE_LOADER });
    } catch (error) {
        yield put({ type: types.FETCH_SERVICE_APPOINTMENT_DATA_FAILURE, error })
    }
}

export function* fetchServiceAppointmentCalendarViewSaga(payload){
    try{
        yield put({type: types.SHOW_LOADER})
        const calendarViewResponse = yield call(fetchServiceAppointmentCalendarViewService, payload.data)
        yield put({type: types.FETCH_SERVICE_APPOINTMENT_CALENDAR_VIEW_DATA_SUCCESS, calendarViewResponse})
        yield put({type: types.HIDE_LOADER})
    }
    catch(error){
        yield put({type: types.FETCH_SERVICE_APPOINTMENT_CALENDAR_VIEW_DATA_FAILURE, error})
    }
}

export function* fetchServiceAppointmentCriteriaSaga(payload) {
    try {
        const response = yield call(fetchDataUsingCriteriaService, payload);
        yield put({ type: types.FETCH_DATA_USING_CRITERIA_SUCCESS, response });

        yield put({ type: types.SHOW_LOADER });
        let defaultCriteria = {}
        if (localStorage.getItem('selectedCriteria'))
        {
            let selectedCriteria = JSON.parse(localStorage.getItem('selectedCriteria'));
            defaultCriteria = {
                brandCode: selectedCriteria.brandCode,
                countryCode: selectedCriteria.countryCode,
                dealerId: selectedCriteria.dealerId,
                branchCode: selectedCriteria.branchCode,
                callerId: selectedCriteria.callerId,
                eventId: selectedCriteria.eventId,
                month: selectedCriteria.month, year: new Date().getFullYear()
            }
        }
        else {
            defaultCriteria = {
                brandCode: response.brands[0].code,
                countryCode: response.country[0].code,
                dealerId: response.dealers[0].dealerCode,
                branchCode: response.branchs[0].branchCode,
                callerId: response.caller[0].code,
                eventId: response.events[0].code,
                month: new Date().getMonth() + 1, year: new Date().getFullYear()
            }
        }
        
        const serviceAppointmentResponse = yield call(fetchServiceAppointmentData, defaultCriteria);
        if (serviceAppointmentResponse != null && serviceAppointmentResponse != "")
            serviceAppointmentResponse.dataPools[0].isSelected = true;

        yield put({ type: types.FETCH_SERVICE_APPOINTMENT_DATA_SUCCESS, serviceAppointmentResponse });
        yield put({ type: types.HIDE_LOADER });
  } catch(error){
    yield put({type: types.FETCH_DATA_USING_CRITERIA_FAILURE, error});
    yield put({ type: types.HIDE_LOADER });
  }
}

export function* fetchCustomerServiceAppointmentSaga(payload) {
    try {
        yield put({ type: types.SHOW_LOADER });
        const response = yield call(fetchCustomerServiceAppointmentData, payload.data);
        if (response.serviceBookingComplaints === undefined)
            response.serviceBookingComplaints = [];
        if (response.currentFollowup != null) {
            if (response.currentFollowup.contacted === '')
                response.currentFollowup.contacted = 'N';
        }
        yield put({ type: types.FETCH_CUSTOMER_SERVICE_APPOINTMENT_DATA_SUCCESS, response });
        yield put({ type: types.HIDE_LOADER });
    } catch (error) {
        yield put({ type: types.FETCH_CUSTOMER_SERVICE_APPOINTMENT_DATA_FAILURE, error });
    }
}
export function* fetchDayWiseServiceBookingCountSaga(payload) {
    try {
        yield put({ type: types.SHOW_LOADER });
        const response = yield call(fetchDayWiseServiceBookingCount, payload);
        yield put({ type: types.FETCH_DAYWISE_SERVICE_BOOKING_COUNT_SUCCESS, response });
        yield put({ type: types.HIDE_LOADER });
    } catch (error) {
        yield put({ type: types.FETCH_DAYWISE_SERVICE_BOOKING_COUNT_FAILURE, error });
    }
}

export function* fetchFUPModalDataByVinSaga(payload) {
    try{
        const response = yield call(fetchFUPModalDataByVinService, payload);
        yield put({ type: types.FUP_MODAL_DATA_BY_VIN_SUCCESS, response });
    } catch(error){
        yield put({ type: types.FUP_MODAL_DATA_BY_VIN_FAILURE, error});
    }
}

export function* createServiceAppointmentSaga(payload){
    try{
        const response = yield call(createServiceAppointmentService, payload);
        yield put({type: types.CREATE_SERVICE_APPOINTMENT_SUCCESS, response})
    } catch(error){
        yield put({type: types.CREATE_SERVICE_APPOINTMENT_FAILURE, error});
    }
}