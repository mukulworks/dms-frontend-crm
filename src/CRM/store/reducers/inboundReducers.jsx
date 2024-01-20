import * as types from "../actions/index";

const initialState = {
  inboundModel: {
    criteriaModel: null,
    caseListModel: null,
    createNewCase: {},
    customerHistory: [],
    caseFollowUps: [],
    openModal: {},
    saveResponse: null,
    manageFollowUp: {},
    dealerOutletInfo: {},
    engagedCases: [],
    caseUniqueIds: [],
    salesLast30DayCase: {},
    serviceLast30DayCase: {},
  },
  control: {
    prospectControlPayload: { prospectMasterSerial: 0, isControlActive: false },
  },
};

const updateBalanceCountSize = (apiData, payload) => {
  switch (payload.actionType) {
    case "ADD_ATTACHED_DOCUMENT":
      apiData
        .filter((item) => {
          return item.documentType === payload.fileType;
        })
        .map((item) => {
          if (item.balanceCount > 0) {
            item.balanceCount = item.balanceCount - 1;
            item.uploadCount = item.uploadCount + 1;
          }
        });
      apiData
        .filter((item) => {
          return item.documentType === payload.fileType;
        })
        .map((item) => {
          if (item.balanceSize - payload.fileSize > 0) {
            item.balanceSize = item.balanceSize - payload.fileSize;
            item.uploadSize = item.uploadSize + payload.fileSize;
          }
        });
      return [...apiData];

    case "REMOVE_ATTACHED_DOCUMENT":
      apiData
        .filter((item) => {
          return item.documentType === payload.fileType;
        })
        .map((item) => {
          if (item.uploadCount > 0) {
            item.balanceCount = item.balanceCount + 1;
            item.uploadCount = item.uploadCount - 1;
          }
        });
      apiData
        .filter((item) => {
          return item.documentType === payload.fileType;
        })
        .map((item) => {
          item.balanceSize = item.balanceSize + payload.fileSize;
          item.uploadSize = item.uploadSize - payload.fileSize;
        });
      return [...apiData];
    case "RESET":
      apiData.map((item) => {
        item.uploadSize = 0;
        item.uploadCount = 0;
        item.balanceCount = item.allowedCount;
        item.balanceSize = item.allowedSize;
      });
      return [...apiData];
    default:
      break;
  }
};

const inboundReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_INBOUND_CRITERIA_SUCCESS:
      return {
        ...state,
        inboundModel: {
          ...state.inboundModel,
          criteriaModel: action.response.result,
        },
      };
    case types.FETCH_INBOUND_CASES_BY_CRITERIA_SUCCESS:
      return {
        ...state,
        inboundModel: {
          ...state.inboundModel,
          caseListModel: action.response.result,
        },
      };
    case types.FETCH_INBOUND_CASES_BY_CRITERIA_FAILURE:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, caseListModel: action.response },
      };
    case types.EMPTY_INBOUND_CASES_LIST:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, caseListModel: null },
      };
    case types.FETCH_CREATE_NEW_CASE_SUCCESS:
      return {
        ...state,
        inboundModel: {
          ...state.inboundModel,
          createNewCase: action.response.result,
        },
      };
    case types.FETCH_CREATE_NEW_CASE_FAILURE:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, createNewCase: action.error },
      };
    case types.FETCH_CUST_HISTORY_BY_IDENTIFICATION_SUCCESS:
      return {
        ...state,
        inboundModel: {
          ...state.inboundModel,
          customerHistory: action.response,
        },
      };
    case types.FETCH_CUST_HISTORY_BY_IDENTIFICATION_FAILURE:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, customerHistory: action.error },
      };
    case types.GET_CUST_HISTORY_BY_IDENTIFICATION_SUCCESS:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, customerHist: action.response },
      };
    case types.GET_CUST_HISTORY_BY_IDENTIFICATION_FAILURE:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, customerHist: action.error },
      };
    case types.EMPTY_CREATE_CASE_SCREEN:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, customerHistory: {} },
      };
    case types.FETCH_PROSPECT_HISTORY_BY_IDENTIFICATION:
      return {
        ...state,
        control: {
          ...state.control,
          prospectControlPayload: action.payload,
        },
      };

    case types.CARD_DETAILS_TO_CALLER_INFORMATION:
      return {
        ...state,
        searchRecord: action.payload,
      };
    case types.CARD_DETAILS_TO_JOBCARD:
      return {
        ...state,
        selectedJobCard: action.payload,
      };
    case types.SAVE_NEW_CASE_SUCCESS:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, saveResponse: action.response },
      };
    case types.SAVE_NEW_CASE_FAILURE:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, saveResponse: action.response },
      };
    case types.EMPTY_API_RESPONSE:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, saveResponse: null },
      };
    case types.FETCH_FUP_MODAL_DATA_BY_CASE_ID_SUCCESS:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, caseFollowUps: action.response },
      };
    case types.FETCH_FUP_MODAL_DATA_BY_CASE_ID_FAILURE:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, caseFollowUps: action.error },
      };
    case types.FETCH_MANAGE_FOLLOW_UPS_SUCCESS:
      return {
        ...state,
        inboundModel: {
          ...state.inboundModel,
          manageFollowUp: action.response,
        },
      };
    case types.FETCH_MANAGE_FOLLOW_UPS_FAILURE:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, manageFollowUp: action.error },
      };
    case types.SAVE_CASE_FOLLOW_UP_SUCCESS:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, saveResponse: action.response },
      };
    case types.SAVE_CASE_FOLLOW_UP_FAILURE:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, saveResponse: action.error },
      };
    case types.HANDLE_NEXT_ACTION_DROPDOWN_LIST:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, payload: action.payload },
      };
    case types.UPDATE_UPLOADED_DOCUMENT_BALANCE_COUNT_SIZE:
      return {
        ...state,
        inboundModel: {
          ...state.inboundModel,
          createNewCase: {
            ...state.inboundModel.createNewCase,
            uploadDocuments: updateBalanceCountSize(
              state.inboundModel.createNewCase.uploadDocuments,
              action.payload
            ),
          },
        },
      };
    case types.UPDATE_MANAGE_FOLLOW_UP_UPLOADED_DOCUMENT_BALANCE_COUNT_SIZE:
      return {
        ...state,
        inboundModel: {
          ...state.inboundModel,
          manageFollowUp: {
            ...state.inboundModel.manageFollowUp,
            uploadDocuments: updateBalanceCountSize(
              state.inboundModel.manageFollowUp.uploadDocuments,
              action.payload
            ),
          },
        },
      };
    case types.FETCH_DEALER_OUTLET_INFO_SUCCESS:
      return {
        ...state,
        inboundModel: {
          ...state.inboundModel,
          dealerOutletInfo: action.response,
        },
      };
    case types.TOGGLE_FORM_TYPE:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, formType: action.formType },
      };
    case types.ASSIGN_CASES_TO_USER_SUCCESS:
      return {
        ...state,
        inboundModel: {
          ...state.inboundModel,
          removedCases: {
            status: action.response.status,
            payload: action.payload,
            message: action.response?.message,
          },
        },
      };

    case types.ASSIGN_CASES_TO_USER_FAILURE:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, saveResponse: action.response },
      };
    case types.OPEN_CLOSE_CREATE_CASE_CONTROL:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, name: action.name },
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
    case types.SHOW_CIRCULAR_LOADER:
      return {
        ...state,
        isCircularLoading: true,
      };
    case types.HIDE_CIRCULAR_LOADER:
      return {
        ...state,
        isCircularLoading: false,
      };
    case types.SHOW_CASE_DATASHEET_CIRCULAR_LOADER:
      return {
        ...state,
        caseDatasheetLoader: true,
      };
    case types.HIDE_CASE_DATASHEET_CIRCULAR_LOADER:
      return {
        ...state,
        caseDatasheetLoader: false,
      };
    case types.SHOW_SALES_CUST_HISTORY_CIRCULAR_LOADER:
      return {
        ...state,
        jobCardsCircularLoader: true,
      };
    case types.HIDE_SALES_CUST_HISTORY_CIRCULAR_LOADER:
      return {
        ...state,
        jobCardsCircularLoader: false,
      };
    case types.INBOUND_FETCH_ENGAGED_CASES_SUCCESS:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, engagedCases: action.response },
      };
    case types.EMPTY_ENGAGED_CASES:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, engagedCases: [] },
      };
    case types.REMOVE_UNLOCKED_CASES_FROM_LIST:
      return {
        ...state,
        inboundModel: { ...state.inboundModel, caseUniqueIds: action.payload },
      };

    case types.SALES_CHECK_ACTIVE_CASES_SUCCESS:
      return {
        ...state,
        inboundModel: {
          ...state.inboundModel,
          salesLast30DayCase: action.response,
        },
      };
    case types.SALES_CHECK_ACTIVE_CASES_FAILURE:
      return {
        ...state,
        inboundModel: {
          ...state.inboundModel,
          salesLast30DayCase: action.error,
        },
      };

    case types.SERVICE_CHECK_ACTIVE_CASES_SUCCESS:
      return {
        ...state,
        inboundModel: {
          ...state.inboundModel,
          serviceLast30DayCase: action.response,
        },
      };
    case types.SERVICE_CHECK_ACTIVE_CASES_FAILURE:
      return {
        ...state,
        inboundModel: {
          ...state.inboundModel,
          serviceLast30DayCase: action.error,
        },
      };

    default:
      return state;
  }
};

export default inboundReducer;
