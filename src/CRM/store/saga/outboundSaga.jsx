import { put, call } from 'redux-saga/effects'
import * as outboundTypes from '../actions/outboundActions/index'
import { 
    fetchOutboundCriteriaService,
    fetchOutboundCasesByCriteriaService,
    fetchOutboundCaseByIdService,
    saveCaseFollowUpService,
    fetchEngagedCases,
    fetchClosedCases
} from '../services/outboundServices/outboundServices'

export function* fetchOutboundCriteriaSaga(){
    try {
        yield put({type: outboundTypes.SHOW_LOADER})
        let response = yield call(fetchOutboundCriteriaService)
        yield put({ type: outboundTypes.OUTBOUND_CRITERIA_SUCCESS, response })
        yield put({ type: outboundTypes.HIDE_LOADER})
    } catch (error) {
        yield put({ type: outboundTypes.OUTBOUND_CRITERIA_FAILURE, error })
        yield put({type: outboundTypes.HIDE_LOADER})
    }
}

export function* fetchOutboundCasesByCriteriaSaga(payload){
    try {
        yield put({type: outboundTypes.SHOW_LOADER})
        let response = yield call(fetchOutboundCasesByCriteriaService, payload.payload)
        yield put({ type: outboundTypes.OUTBOUND_CASES_BY_CRITERIA_SUCCESS, response })
        yield put({type: outboundTypes.HIDE_LOADER})
    } catch (error) {
        yield put({ type: outboundTypes.OUTBOUND_CASES_BY_CRITERIA_FAILURE, error })
        yield put({type: outboundTypes.HIDE_LOADER})
    }
}

export function* fetchOutboundCaseByIdSaga(payload){
    try{
        yield put({type: outboundTypes.SHOW_LOADER})
        let response = yield call(fetchOutboundCaseByIdService, payload.id)
        yield put({type: outboundTypes.OUTBOUND_CASE_BY_ID_SUCCESS, response})
        yield put({type: outboundTypes.HIDE_LOADER})
    } catch(error){
        yield put({type: outboundTypes.OUTBOUND_CASE_BY_ID_FAILURE, error})
        yield put({type: outboundTypes.HIDE_LOADER})
    }
}

export function* saveOutboundCaseFollowUpSaga(payload){
    try {
        yield put({ type: outboundTypes.SHOW_LOADER })
        let response = yield call(saveCaseFollowUpService, payload.payload)
        yield put({ type: outboundTypes.OUTBOUND_SAVE_CASE_FOLLOW_UP_SUCCESS, response })
        yield put({ type: outboundTypes.HIDE_LOADER })
    } catch (error) {
        yield put({ type: outboundTypes.OUTBOUND_SAVE_CASE_FOLLOW_UP_FAILURE, error })
        yield put({ type: outboundTypes.HIDE_LOADER })
    }
}

export function* fetchOutboundEngagedCasesSaga(){
    try {
        yield put({ type: outboundTypes.SHOW_LOADER})
        let response = yield call(fetchEngagedCases)
        yield put({ type: outboundTypes.OUTBOUND_FETCH_ENGAGED_CASES_SUCCESS, response})
        yield put({ type: outboundTypes.HIDE_LOADER})
    } catch (error) {
        yield put({ type: outboundTypes.HIDE_LOADER})
        yield put({ type: outboundTypes.OUTBOUND_FETCH_ENGAGED_CASES_FAILURE, error})
    }
}

export function* fetchClosedCasesSaga(payload){
    try {
        yield put({ type: outboundTypes.SHOW_LOADER})
        let response = yield call(fetchClosedCases,payload.payload)
        yield put({ type: outboundTypes.CLOSED_CASES_SUCCESS, response})
        yield put({ type: outboundTypes.HIDE_LOADER})
    } catch (error) {
        yield put({ type: outboundTypes.HIDE_LOADER})
        yield put({ type: outboundTypes.CLOSED_CASES_FAILURE, error})
    }
}