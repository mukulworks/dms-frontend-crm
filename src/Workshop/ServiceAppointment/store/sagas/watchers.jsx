import { takeLatest } from 'redux-saga/effects';
import {
    fetchServiceAppointmentSaga, fetchServiceAppointmentCalendarViewSaga, fetchServiceAppointmentCriteriaSaga,
    fetchCustomerServiceAppointmentSaga, fetchDayWiseServiceBookingCountSaga,
    fetchFUPModalDataByVinSaga, createServiceAppointmentSaga
} from './serviceAppointmentSaga'
import * as types from '../actions/index';
import { fetchServiceAppointmentData } from '../actions/serviceAppointmentAction';


export function* watchServiceAppointment() {
    yield takeLatest(types.FETCH_SERVICE_APPOINTMENT_DATA, fetchServiceAppointmentSaga);
    yield takeLatest(types.FETCH_SERVICE_APPOINTMENT_CALENDAR_VIEW_DATA, fetchServiceAppointmentCalendarViewSaga)
    yield takeLatest(types.FETCH_DATA_USING_CRITERIA, fetchServiceAppointmentCriteriaSaga);
    yield takeLatest(types.FETCH_CUSTOMER_SERVICE_APPOINTMENT_DATA, fetchCustomerServiceAppointmentSaga);
    yield takeLatest(types.FUP_MODAL_DATA_BY_VIN, fetchFUPModalDataByVinSaga)
    yield takeLatest(types.FETCH_DAYWISE_SERVICE_BOOKING_COUNT, fetchDayWiseServiceBookingCountSaga);
    yield takeLatest(types.CREATE_SERVICE_APPOINTMENT, createServiceAppointmentSaga)
}

