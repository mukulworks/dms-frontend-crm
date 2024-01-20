import * as types from './index'

export const fetchOutboundCriteria = () => {
    return{
        type: types.OUTBOUND_CRITERIA
    }
}

export const fetchOutboundCasesByCriteria = (payload) => {
    return{
        type: types.OUTBOUND_CASES_BY_CRITERIA,
        payload
    }
}

export const emptyOutboundCasesList = () => {
    return{
        type: types.EMPTY_OUTBOUND_CASES_LIST
    }
}

export const OutboundCaseByIdAction = (id) => {
    return{
        type: types.OUTBOUND_CASE_BY_ID,
        id
    }
}
 
export const GetCaseDatasheetAction=(id) => {
    return{
        type: types.CASE_DATASHEET,
        id
    }
}

export const saveCaseFollowUp = (payload) => {
    return{
        type: types.OUTBOUND_SAVE_CASE_FOLLOW_UP,
        payload
    }
}

export const emptySaveOutboundResponse = () => {
    return{
        type: types.EMPTY_API_RESPONSE_STATUS
    }
}

export const fetchEngagedCases = () => {
    return{
        type: types.OUTBOUND_FETCH_ENGAGED_CASES
    }
}

export const emptyEngagedCasesList = () => {
    return{
        type: types.EMPTY_ENGAGED_CASES
    }
}

export const getClosedCases = (payload) => {
    return{
        type: types.CLOSED_CASES,
        payload
        
    }
}

export const emptyClosedCasesList = (payload) => {
    return{
        type: types.EMPTY_CLOSED_CASES_LIST,
        payload
        
    }
}

export const removeReOpendCasesFromList = (payload) => {
    return{
        type: types.SAVE_REOPENED_CASES,
        payload
    }
}
