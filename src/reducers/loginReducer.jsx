import * as types from '../actions';
const initialLoginState =  {loginRequest : {
    loginType: { mandatory: true, errorMsg: "", value: "CDB_USER", isValid: null },
    brandCode: {mandatory: true,errorMsg: "",value:"",isValid:null},
    dealerCode: {mandatory: true,errorMsg: "",value:"",isValid:null},
    userId: {mandatory: true,errorMsg: "",value:"",isValid:null},
    branchCode: {mandatory: true,errorMsg: "",value:"",isValid:null},
    password: {mandatory: true,errorMsg: "",value:"",isValid:null}
},
ipinRequest:{
    urnCode: {mandatory: true,errorMsg: "",value:"",isValid:null},
    ipinCode: {mandatory: true,errorMsg: "",value:"",isValid:null},
},authenticationResponse:{} ,brands:[],locations:[]};
const login =  (state = initialLoginState, action)  => {
  const response = action.response;

  switch(action.type) {
    case types.LOGIN_CHANGE_FORM_FIELDS:
      let loginEvent = action.data;
      switch (loginEvent.target.name) 
      {
        case "brandCode":
          return {
            ...state,
            loginRequest : { ...state.loginRequest,
              brandCode:{...state.loginRequest.brandCode,
              value: loginEvent.target.value
              }
            }
          };
        case "dealerCode":
          return {
            ...state,
            loginRequest : {...state.loginRequest,
            dealerCode:{...state.loginRequest.dealerCode,
              value: loginEvent.target.value
            }
          }
          };
        case "userId":
          return {
            ...state,
            loginRequest : {...state.loginRequest,
            userId:{...state.loginRequest.userId,
              value: loginEvent.target.value
            }
          }
          };
        case "branchCode":
          return {
            ...state,
            loginRequest : {...state.loginRequest,
            branchCode:{...state.branchCode,
              value: loginEvent.target.value
            }
          }
          };
        case "password":
          return {
            ...state,
            loginRequest : {...state.loginRequest,
            password:{...state.loginRequest.password,
              value: loginEvent.target.value
            }
          }
              };
          case "loginType":
              return {
                  ...state,
                  loginRequest: {
                      ...state.loginRequest,
                      loginType: {
                          ...state.loginRequest.loginType,
                          value: loginEvent.target.value
                      }
                  }
              };
        default:
          return state;
      }
    case types.LOGIN_VALIDATE_FORM_FIELDS:
      const loginFieldName = action.data.field;
      const loginErrorMsg = action.data.errorMsg;
      switch (loginFieldName) 
      {
        case "brandCode":
          return {
            ...state,
            loginRequest : {...state.loginRequest,
            brandCode:{...state.loginRequest.brandCode,
              errorMsg: loginErrorMsg,
              isValid : action.data.isValid
            }
          }
          };
        case "dealerCode":
          return {
            ...state,
            loginRequest : {...state.loginRequest,
            dealerCode:{...state.loginRequest.dealerCode,
              errorMsg: loginErrorMsg,
              isValid : action.data.isValid
            }
          }
          };
        case "userId":
          return {
            ...state,
            loginRequest : {...state.loginRequest,
            userId:{...state.loginRequest.userId,
              errorMsg: loginErrorMsg,
              isValid : action.data.isValid
            }
          }
          };
        case "branchCode":
          return {
            ...state,
            loginRequest : {...state.loginRequest,
            branchCode:{...state.loginRequest.branchCode,
              errorMsg: loginErrorMsg,
              isValid : action.data.isValid
            }
          }
          };
        case "password":
          return {
            ...state,
            loginRequest : {...state.loginRequest,
            password:{...state.loginRequest.password,
              errorMsg: loginErrorMsg,
              isValid : action.data.isValid
            }
          }
              };
          case "loginType":
              return {
                  ...state,
                  loginRequest: {
                      ...state.loginRequest,
                      password: {
                          ...state.loginRequest.loginType,
                          errorMsg: loginErrorMsg,
                          isValid: action.data.isValid
                      }
                  }
              };
        default:
          return state;
      }
    case types.LOGIN_PREFILL_FORM_FIELDS:
        const data = action.data;
        return {
          ...state,
          brandCode: data.brandCode,
          dealerCode: data.dealerCode,
          userId: data.userId,
          branchCode: data.branchCode,
          password: data.password
        };
    
    case types.LOGIN_USER_SUCCESS:
      return { ...state, 
        authenticationResponse :action.response
    };
    case types.LOGIN_USER_ERROR:
      return { ...state, 
        authenticationResponse :{}
      };
    case types.LOGIN_VALIDATE_IPIN_SUCCESS:
      return { ...state, 
          authenticationResponse :{...state.authenticationResponse,
            token:action.response.token,
            refreshToken:action.response.refreshToken,
            validateIpinResponse: action.response.validateIpinResponse
          }
      };
    case types.LOGIN_VALIDATE_IPIN_FAIL:
        return { ...state, 
          authenticationResponse :{...state.authenticationResponse,
            validateIpinResponse: action.response 
          } 
      };
    case types.LOGIN_FETCH_BRANDS_SUCCESS:
        return { ...state, 
          loginRequest : {...state.loginRequest,
          brandCode: {...state.brandCode,
            value: response[0].code
          },
          },
          brands : response 
      };
    case types.LOGIN_FETCH_BRANDS_ERROR:
          return { ...state, response };
    case types.LOGIN_FETCH_LOCATIONS_SUCCESS:
        return { ...state,
          loginRequest : {...state.loginRequest,
          branchCode: 
          {...state.branchCode,
            value: response[0].code
          },
          },
          locations : response 
        };
    case types.LOGIN_FETCH_LOCATIONS_ERROR:
          return { ...state, response };
    case types.LOGIN_CHANGE_IPIN_FORM_FIELDS:
      let event = action.data;
      switch (event.target.name) 
      {
        case "urnCode":
          return {
            ...state,
            ipinRequest : { ...state.ipinRequest,
              urnCode:{...state.ipinRequest.urnCode,
              value: event.target.value
              }
            }
        };
        case "ipinCode":
          return {
            ...state,
            ipinRequest : {...state.ipinRequest,
              ipinCode:{...state.ipinRequest.ipinCode,
              value: event.target.value
            }
          }
        };
        default:
          return state;
      }
    case types.LOGIN_VALIDATE_IPIN_FORM_FIELDS:
      const fieldName = action.data.field;
      const errorMsg = action.data.errorMsg;
      switch (fieldName) 
      {
        case "urnCode":
          return {
            ...state,
            ipinRequest : {...state.ipinRequest,
              urnCode:{...state.ipinRequest.urnCode,
              errorMsg: errorMsg,
              isValid : action.data.isValid
            }
          }
        };
        case "ipinCode":
          return {
            ...state,
            ipinRequest : {...state.ipinRequest,
              ipinCode:{...state.ipinRequest.ipinCode,
              errorMsg: errorMsg,
              isValid : action.data.isValid
            }
          }
        };
        default:
          return state;
      }
    case types.UNAUTHENTICATE_USER_TO_LOG_OUT:
      return{ ...state,
        authenticationResponse: {},
          loginRequest: initialLoginState.loginRequest,
        locations: [],
        brands: []
      }
    default:
      return state;
  }
};

export default login;