import { fork } from 'redux-saga/effects';
import { watchServiceAppointment, watchCriteriaData, watchManageServiceAppointment} from './watchers';

export default function* startServiceAppointmentForman() {
    yield fork(watchServiceAppointment);
}