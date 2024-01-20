import React from 'react'
import * as types from './index';

export const fetchDataPoolData = () => {
  return {
    type: types.FETCH_DATA
  }
}

export const setSelectDataPoolCode = (data) => {
  return {
    type: types.SET_DATAPOOL_CODE, 
    data
  }
}

export const selectedFollowUpCategory = (data) => {
  return {
    type: types.SELECTED_FILTER_ITEM, 
    data
  }
}

export const selectedFollowUpEventBuckets = (data) => {
  return {
    type: types.SELECTED_FOLLOWUP_EVENT_BUCKET,
    data
  }
}

export const selectedCaller = (data) => {
  return {
    type: types.SELECTED_CALLER,
    data
  }
}

export const settingPageIndex = (data) => {
  return{
    type: types.SET_PAGE_INDEX,
    data
  }
}

//calling API service using default Criteria
export const fetchServiceAppointmentCriteria = (data) => {
  return{
    type: types.FETCH_DATA_USING_CRITERIA,
    data
  }
}

export const fetchServiceAppointmentData = (data) => {
    return {
        type: types.FETCH_SERVICE_APPOINTMENT_DATA,
        data
    }
}

export const fetchServiceAppointmentCalendarViewData = (data) => {
  return {
    type: types.FETCH_SERVICE_APPOINTMENT_CALENDAR_VIEW_DATA,
    data
  }
}

export const resetServiceAppointmentViewData = (data) => {
  return {
    type: types.RESET_SERVICE_APPOINTMENT_VIEW_DATA,
    data
  }
}


export const fetchCustomerServiceAppointmentData = (data) => {
    return {
        type: types.FETCH_CUSTOMER_SERVICE_APPOINTMENT_DATA,
        data
    }
}

export const addCustomerVoice = (data) => {
    return {
        type: types.ADD_CUSTOMER_VOICE,
        data
    }
}

export const deleteCustomerVoice = (data) => {
    return {
        type: types.DELETE_CUSTOMER_VOICE,
        data
    }
}

export const fetchDayWiseServiceBookingCount = (data) => {
    return {
        type: types.FETCH_DAYWISE_SERVICE_BOOKING_COUNT,
        data
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

export const showCircularLoader = () => {
  return {
    type: types.SHOW_CIRCULAR_LOADER
  }
}

export const hideCircularLoader = () => {
  return {
    type: types.HIDE_CIRCULAR_LOADER
  }
}

//Fetch FUP details on click of VIN
export const fetchFUPModalDataByVin = (data) => {
  return{
    type: types.FUP_MODAL_DATA_BY_VIN,
    data
  }
}

//Create Service Appointment
export const createServiceAppointment = (data) => {
  return{
    type: types.CREATE_SERVICE_APPOINTMENT,
    data
  }
}