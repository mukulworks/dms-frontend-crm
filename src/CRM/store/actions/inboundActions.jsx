import * as types from '../actions/index'

export const fetchInboundCriteria = (departmentCode) => {
    return {
        type: types.FETCH_INBOUND_CRITERIA,
        departmentCode
    }
}

export const fetchInboundCasesByCriteria = (payload) => {
    return {
        type: types.FETCH_INBOUND_CASES_BY_CRITERIA,
        payload
    }
}

export const createNewCaseAction = (departmentCode) => {
    return {
        type: types.FETCH_CREATE_NEW_CASE,
        departmentCode
    }
}

export const custHistoryByIdentification = (payload) => {
    return {
        type: types.FETCH_CUST_HISTORY_BY_IDENTIFICATION,
        payload
    }
}

export const getCustHistoryByIdentification = (payload) => {
    return {
        type: types.GET_CUST_HISTORY_BY_IDENTIFICATION,
        payload
    }
}


export const prospectDataSheetByIdentification = (payload) => {
    return {
        type: types.FETCH_PROSPECT_HISTORY_BY_IDENTIFICATION,
        payload
    }
}

export const fillCallerInformation = (payload) => {
    return {
        type: types.CARD_DETAILS_TO_CALLER_INFORMATION,
        payload
    }
}
export const fillJobCardInformation = (payload) => {
    return {
        type: types.CARD_DETAILS_TO_JOBCARD,
        payload
    }
}
export const saveNewCase = (payload) => {
    return {
        type: types.SAVE_NEW_CASE,
        payload
    }
}

export const emptySaveResponse = () => {
    return {
        type: types.EMPTY_API_RESPONSE
    }
}

export const fetchFUPModalDataByCaseID = (payload) => {
    return {
        type: types.FETCH_FUP_MODAL_DATA_BY_CASE_ID,
        payload
    }
}

export const showLoader = () => {
    return {
        type: types.SHOW_LOADER
    }
}

export const hideLoader = () => {
    return {
        type: types.HIDE_LOADER
    }
}

export const showCaseDataSheetCircularLoader = () => {
    return {
        type: types.SHOW_CASE_DATASHEET_CIRCULAR_LOADER
    }
}

export const hideCaseDataSheetCircularLoader = () => {
    return {
        type: types.HIDE_CASE_DATASHEET_CIRCULAR_LOADER
    }
}

export const fetchManageFollowUpAction = (caseUniqueId) => {
    return {
        type: types.FETCH_MANAGE_FOLLOW_UPS,
        caseUniqueId
    }
}

export const saveCaseFollowUpAction = (payload) => {
    return {
        type: types.SAVE_CASE_FOLLOW_UP,
        payload
    }
}

export const handleNextAction = (payload) => {
    return {
        type: types.HANDLE_NEXT_ACTION_DROPDOWN_LIST,
        payload
    }
}

export const updateCreateNewCaseUploadedDocumentBalanceCountSize = (payload) => {
    return {
        type: types.UPDATE_UPLOADED_DOCUMENT_BALANCE_COUNT_SIZE,
        payload
    }
}

export const updateManageFollowUpUploadedDocumentBalanceCountSize = (payload) => {
    return {
        type: types.UPDATE_MANAGE_FOLLOW_UP_UPLOADED_DOCUMENT_BALANCE_COUNT_SIZE,
        payload
    }
}

export const toggleAddActionForm = (formType) => {
    return {
        type: types.TOGGLE_FORM_TYPE,
        formType
    }
}

export const assignCaseToUser = (payload) => {
    return {
        type: types.ASSIGN_CASES_TO_USER,
        payload
    }
}

export const emptyInboundCasesList = () => {
    return {
        type: types.EMPTY_INBOUND_CASES_LIST
    }
}

export const emptyCreateCaseScreen = () => {
    return {
        type: types.EMPTY_CREATE_CASE_SCREEN
    }
}

export const fetchDealerOutletInfo = (payload) => {
    return {
        type: types.FETCH_DEALER_OUTLET_INFO,
        payload
    }
}

export const openCloseCreateCaseControl = (name) => {
    return {
        type: types.OPEN_CLOSE_CREATE_CASE_CONTROL,
        name
    }
}

export const fetchEngagedCases = () => {
    return {
        type: types.INBOUND_FETCH_ENGAGED_CASES
    }
}

export const emptyEngagedCasesList = () => {
    return {
        type: types.EMPTY_ENGAGED_CASES
    }
}

export const checkSalesActiveCases = (payload) => {
    return {
        type: types.SALES_CHECK_ACTIVE_CASES,
        payload
    }
}

export const checkServiceActiveCases = (payload) => {
    return {
        type: types.SERVICE_CHECK_ACTIVE_CASES,
        payload
    }
}

