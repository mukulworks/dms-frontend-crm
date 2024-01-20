import * as types from '../actions/index';
const initialLoginState =  {
    serviceAppointmentModel: {
        filterModel:{
            followUpCategories:[],
            followUpEvents:[],
            followUpEventBuckets:[],
            callers:[],
            monthYears:[]
        },
        dataPoolModel: {
            selectedPageIndex: 0,
            recordsPerPage: 0,
            selectedDataPool:'',
            dataPools:[]
        },
        dataPoolCalendarViewModel:{},
        selectedFilterItem:[],
        criteriaModel: {},
        manageServiceAppointmentModel: null,
        dayWiseAdvisorServiceBookingModel: {
            dateWiseServiceBookingDataPools:null
        },
        fupModalDataByVin:[]
    }
};

const serviceAppointment = (state = initialLoginState, action) => {
    let res = action.response;
    switch(action.type) 
    {
        case types.SET_DATAPOOL_CODE:
            return { ...state,
                serviceAppointmentModel : {...state.serviceAppointmentModel,
                    dataPoolModel: { ...state.serviceAppointmentModel.dataPoolModel,
                        selectedPageIndex : 0,
                        dataPools: state.serviceAppointmentModel.dataPoolModel.dataPools.map((dataPool, i) =>
                            (dataPool.code === action.data 
                            ? { ...dataPool, isSelected : true} 
                                : { ...dataPool, isSelected: false })
                        )
                    }
                }
            };

        case types.SELECTED_FILTER_ITEM:
            return {
                ...state,
                selectedFollowUpCategory: action.data,
                selectedFollowUpEventBucket: '',
                selectedCaller: ''
            }

        case types.SELECTED_FOLLOWUP_EVENT_BUCKET:
            return {
                ...state,
                selectedFollowUpEventBucket: action.data,
                selectedCaller: ''
            }

        case types.SELECTED_CALLER:
            return {
                ...state,
                selectedCaller: action.data
            }

        case types.SET_PAGE_INDEX:
            return {
                ...state,
                serviceAppointmentModel: {...state.serviceAppointmentModel,
                    dataPoolModel: {...state.serviceAppointmentModel.dataPoolModel,
                        selectedPageIndex : action.data         
                }
            }
        }

        case types.FETCH_DATA_USING_CRITERIA_SUCCESS:
            return {
                ...state,
                serviceAppointmentModel: {...state.serviceAppointmentModel,
                    criteriaModel: res
                }
            }
        case types.FETCH_DATA_USING_CRITERIA_FAILURE:
            return {
                ...state,
                serviceAppointmentModel: {
                    ...state.serviceAppointmentModel,
                    criteriaModel: res
                }
            }
        case types.FETCH_SERVICE_APPOINTMENT_DATA_SUCCESS:
            return {
                ...state,
                serviceAppointmentModel: {...state.serviceAppointmentModel,
                    dataPoolModel: { ...state.serviceAppointmentModel.dataPoolModel,
                        dataPools: action.serviceAppointmentResponse === "" ? [] : action.serviceAppointmentResponse.dataPools,
                        recordsPerPage: 50
                    },
                    manageServiceAppointmentModel: null,
                    dayWiseAdvisorServiceBookingModel: {
                        dateWiseServiceBookingDataPools: null
                    },
                    fupModalDataByVin: []

                }
            }
        case types.RESET_SERVICE_APPOINTMENT_VIEW_DATA:
            return{
                ...state,
                serviceAppointmentModel: { ...state.serviceAppointmentModel,
                    dataPoolCalendarViewModel: {},
                    dataPoolModel:{
                        selectedPageIndex: 0,
                        recordsPerPage: 0,
                        selectedDataPool:'',
                        dataPools:[]
                    },
                    manageServiceAppointmentModel:null
                }
            }    
        case types.FETCH_SERVICE_APPOINTMENT_CALENDAR_VIEW_DATA_SUCCESS:
            return{
                ...state,
                serviceAppointmentModel: { ...state.serviceAppointmentModel,
                    dataPoolCalendarViewModel: action.calendarViewResponse
                }
            }
        case types.FETCH_SERVICE_APPOINTMENT_CALENDAR_VIEW_DATA_FAILURE:
            return{
                ...state,
                serviceAppointmentModel:{...state.serviceAppointmentModel,
                    dataPoolCalendarViewModel: null
                }
            }

        case types.FETCH_SERVICE_APPOINTMENT_DATA_FAILURE:
            return {
                ...state,
                serviceAppointmentModel: {
                    ...state.serviceAppointmentModel,
                    dataPoolModel: {},
                    manageServiceAppointmentModel: null,
                    dayWiseAdvisorServiceBookingModel: {
                        dateWiseServiceBookingDataPools: null
                    },
                    fupModalDataByVin: []
                }
            }
        
        case types.FETCH_CUSTOMER_SERVICE_APPOINTMENT_DATA_FAILURE:
            return {
                ...state,
                serviceAppointmentModel: {
                    ...state.serviceAppointmentModel,
                    manageServiceAppointmentModel: {}
                }
            }
        case types.FETCH_CUSTOMER_SERVICE_APPOINTMENT_DATA_SUCCESS:
            return {
                ...state,
                serviceAppointmentModel: {
                    ...state.serviceAppointmentModel,
                    manageServiceAppointmentModel: action.response, 
                }
            }
        case types.CREATE_SERVICE_APPOINTMENT_SUCCESS:
            return {
                ...state,
                serviceAppointmentModel: {
                    ...state.serviceAppointmentModel,
                    manageServiceAppointmentModel: {
                        ...state.serviceAppointmentModel.manageServiceAppointmentModel,
                        saveResponse: action.response.results
                    }
                }
            }
        case types.CREATE_SERVICE_APPOINTMENT_FAILURE:
            return {
                ...state,
                serviceAppointmentModel: {
                    ...state.serviceAppointmentModel,
                    manageServiceAppointmentModel: {
                        ...state.serviceAppointmentModel.manageServiceAppointmentModel,
                        saveResponse: action.response.results
                    }
                }
            }
        case types.FETCH_DAYWISE_SERVICE_BOOKING_COUNT_SUCCESS:
            return {
                ...state,
                serviceAppointmentModel: {
                    ...state.serviceAppointmentModel,
                    dayWiseAdvisorServiceBookingModel: action.response
                }
            }
        case types.FETCH_DAYWISE_SERVICE_BOOKING_COUNT_FAILURE:
            return {
                ...state,
                serviceAppointmentModel: {
                    ...state.serviceAppointmentModel,
                    dayWiseAdvisorServiceBookingModel: {}
                }
            }
        case types.ADD_CUSTOMER_VOICE:
            return {
                ...state,
                serviceAppointmentModel: {
                    ...state.serviceAppointmentModel,
                    manageServiceAppointmentModel: {
                        ...state.serviceAppointmentModel.manageServiceAppointmentModel,
                        serviceBookingComplaints: [...state.serviceAppointmentModel.manageServiceAppointmentModel.serviceBookingComplaints, action.data]
                    }
                }
            }
        case types.DELETE_CUSTOMER_VOICE:
            return {
                ...state,
                serviceAppointmentModel: { 
                    ...state.serviceAppointmentModel,
                    manageServiceAppointmentModel: { 
                        ...state.serviceAppointmentModel.manageServiceAppointmentModel,
                        serviceBookingComplaints: [ 
                            ...state.serviceAppointmentModel.manageServiceAppointmentModel.serviceBookingComplaints.filter(customerVoice => action.data != customerVoice)
                        ]
                    }
                }
            }
        case types.FUP_MODAL_DATA_BY_VIN_SUCCESS:
            return{
                ...state,
                serviceAppointmentModel: {
                    ...state.serviceAppointmentModel,
                    fupModalDataByVin: action.response
                }                
            }

        case types.FUP_MODAL_DATA_BY_VIN_FAILURE:
            return{
                ...state,
                serviceAppointmentModel: {
                    ...state.serviceAppointmentModel,
                    fupModalDataByVin: []
                }                
            }
        
        case types.SHOW_LOADER:
            return {
                ...state,
                isLoading:true
            }
        case types.HIDE_LOADER:
            return {
                ...state,
                isLoading: false
            }
        case types.SHOW_CIRCULAR_LOADER:
            return {
                ...state,
                servicePlanCircularLoader: true
            }
        case types.HIDE_CIRCULAR_LOADER:
            return {
                ...state,
                servicePlanCircularLoader: false
            }
        default:
            return state;
    }
}

export default serviceAppointment;