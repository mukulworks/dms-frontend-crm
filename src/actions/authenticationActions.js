import * as types from './index';
export const loginUserAction = (user) => {
  return {
    type: types.LOGIN_USER,
    user
  }
};

export const validateIpin = (validateIpinRequest) => {
  return {
    type: types.LOGIN_VALIDATE_IPIN,
    validateIpinRequest
  }
};

export const fetchBrandAction = (brandRequest) => {
  return {
    type: types.LOGIN_FETCH_BRANDS,
    brandRequest
  }
};

export const fetchUserLocationAction = (userLocation) => {
  return {
    type: types.LOGIN_FETCH_LOCATIONS,
    userLocation
  }
};

export const updateLoginFormFields = data => ({
  type: types.LOGIN_CHANGE_FORM_FIELDS,
  data
});
export const validateLoginFormFields = data => ({
  type: types.LOGIN_VALIDATE_FORM_FIELDS,
  data
});

export const updateIpinFormFields = data => ({
  type: types.LOGIN_CHANGE_IPIN_FORM_FIELDS,
  data
});
export const validateIpinFormFields = data => ({
  type: types.LOGIN_VALIDATE_IPIN_FORM_FIELDS,
  data
});
export const prefillFormFields = data => ({
  type: types.LOGIN_PREFILL_FORM_FIELDS,
  data
});

export const unathenticateToLogOut = () => ({
  type: types.UNAUTHENTICATE_USER_TO_LOG_OUT
})