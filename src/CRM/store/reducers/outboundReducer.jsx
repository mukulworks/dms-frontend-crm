import * as types from "../actions/outboundActions/index";

const initialState = {
  outboundModel: {
    criteriaModel: {},
    outboundCases: [],
    caseById: {},
    engagedCases: [],
    closedCases: [],
    caseUniqueIds: [],
  },
};

const outboundReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OUTBOUND_CRITERIA_SUCCESS:
      return {
        ...state,
        outboundModel: {
          ...state.outboundModel,
          criteriaModel: action.response,
        },
      };
    case types.OUTBOUND_CRITERIA_FAILURE:
      return {
        ...state,
        criteriaModel: action.error,
      };
    case types.OUTBOUND_CASES_BY_CRITERIA_SUCCESS:
      return {
        ...state,
        outboundModel: {
          ...state.outboundModel,
          outboundCases: action.response,
        },
      };
    case types.OUTBOUND_CASES_BY_CRITERIA_FAILURE:
      return {
        ...state,
        outboundModel: { ...state.outboundModel, outboundCases: action.error },
      };
    case types.EMPTY_OUTBOUND_CASES_LIST:
      return {
        ...state,
        outboundModel: { ...state.outboundModel, outboundCases: [] },
      };
    case types.OUTBOUND_CASE_BY_ID_SUCCESS:
      return {
        ...state,
        outboundModel: {
          ...state.outboundModel,
          manageOutboundFollowUp: action.response,
        },
      };
    case types.OUTBOUND_CASE_BY_ID_FAILURE:
      return {
        ...state,
        outboundModel: {
          ...state.outboundModel,
          manageOutboundFollowUp: action.error,
        },
      };
    case types.OUTBOUND_SAVE_CASE_FOLLOW_UP_SUCCESS:
      return {
        ...state,
        saveStatusCode: action.response,
      };
    case types.OUTBOUND_SAVE_CASE_FOLLOW_UP_FAILURE:
      return {
        ...state,
        saveStatusCode: action.error,
      };
    case types.EMPTY_API_RESPONSE_STATUS:
      return {
        ...state,
        saveStatusCode: null,
      };
    case types.SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case types.HIDE_LOADER:
      return {
        ...state,
        isLoading: false,
      };
    case types.OUTBOUND_FETCH_ENGAGED_CASES_SUCCESS:
      return {
        ...state,
        outboundModel: {
          ...state.outboundModel,
          engagedCases: action.response,
        },
      };
    case types.EMPTY_ENGAGED_CASES:
      return {
        ...state,
        outboundModel: { ...state.outboundModel, engagedCases: [] },
      };
    case types.CLOSED_CASES_SUCCESS:
      return {
        ...state,
        outboundModel: { ...state.outboundModel, closedCases: action.response },
      };
    case types.EMPTY_CLOSED_CASES_LIST:
      return {
        ...state,
        outboundModel: { ...state.outboundModel, closedCases: [] },
      };
    case types.REMOVE_REOPENED_CASES_FROM_LIST:
      return {
        ...state,
        outboundModel: {
          ...state.outboundModel,
          caseUniqueIds: action.payload,
        },
      };
    case types.ASSIGN_CASES_TO_USER_OUTBOUND_SUCCESS:
      console.log(
        "ASSIGN_CASES_TO_USER_OUTBOUND_SUCCESS",
        "called",
        "debug shivam",
        action
      );
      return {
        ...state,
        outboundModel: {
          ...state.outboundModel,
          removedCases: {
            status: action.response?.status,
            payload: action.payload,
            message: action.response?.message,
          },
        },
      };
    default:
      return state;
  }
};

export default outboundReducer;
