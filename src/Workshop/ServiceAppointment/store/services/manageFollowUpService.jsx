import ApiCall from './apiServices';

export const fetchServiceAppointmentData = (payload) => {
    return ApiCall.fetchServiceAppointmentData(payload)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error;
        })
};

export const fetchServiceAppointmentCalendarViewService = (payload) => {
    return ApiCall.fetchServiceAppointmentCalendarViewData(payload)
        .then(res => {
            return res.data
        })
        .catch(error => {
            return error
        })
}

export const fetchDataUsingCriteriaService = (payload) => {
  // Rest API will be called using axios
    return ApiCall.fetchServiceAppointmentCriteria(payload.data)
    .then(res => {
        return res.data.result;
    })
    .catch(error => {
        return error;
    })
};

export const fetchCustomerServiceAppointmentData = (payload) => {
    return ApiCall.fetchCustomerServiceAppointmentData(payload)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error;
        })
};

export const fetchDayWiseServiceBookingCount = (payload) => {
    return ApiCall.fetchDayWiseServiceBookingCount(payload)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error;
        })
};

export const fetchFUPModalDataByVinService = (payload) => {
    return ApiCall.fetchFUPModalDataByVinApi(payload.data)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error;
        })
}

export const createServiceAppointmentService = (payload) => {
    return ApiCall.createServiceAppointmentService(payload.data)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error;
        })
}

//Start - Mange Service Appointment Controls services 
export const fetchMostRecentActivity = (requestData) => {
    return ApiCall.fetchMostRecentActivity(requestData)
        .then(res => {
            return res.data
        })
        .catch(error => {
            return error
        })
}

export const fetchAddressDetails = (requestData) => {
    return ApiCall.fetchAddressDetails(requestData)
                .then(res => {
                    return res.data
                })
                .catch(error => {
                    return error
                })
}

export const fetchServicePlans = (requestData) => {
    return ApiCall.fetchServicePlans(requestData)
            .then(res => {
                return res.data
            })
            .catch(error => {
                return error
            })
}

export const fetchCentralVehicleHistoryService = (payload) => {
    return ApiCall.fetchVehicleRecentHistory(payload)
            .then(res => {
                return res.data
            })
            .catch(error => {
                return error
            })
}

export const fetchContactHistory = (requestData) => {
    return ApiCall.fetchContactHistory(requestData)
            .then(res => {
                return res.data
            })
            .catch(error => {
                return error
            })
}

export const fetchCustomerFeedback = (requestData) => {
    return ApiCall.fetchCustomerFeedback(requestData)
            .then(res => {
                return res.data
            })
            .catch(error => {
                return error
            })
}

export const fetchMaintenanceSchedule = (requestData) => {
    return ApiCall.fetchMaintenanceSchedule(requestData)
            .then(res => {
                return res.data
            })
            .catch(error => {
                return error
            })
}
//End - Mange Service Appointment Controls services