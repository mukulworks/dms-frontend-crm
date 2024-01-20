import { API_CONSTANT_MAP } from "../utils/constant";

export const loginUserService = (request) => {
  const LOGIN_API_ENDPOINT = API_CONSTANT_MAP.login;

  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
      brandCode: window.brandCode,
      countryCode: window.countryCode,
      "Client-Ip": sessionStorage.getItem("ip"),
    },
    body: JSON.stringify(request.user),
    credentials: "include",
  };

  return fetch(LOGIN_API_ENDPOINT, parameters)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
};

export const validateIpinService = (request) => {
  const VALIDATE_IPIN_API_ENDPOINT = API_CONSTANT_MAP.validateIpin;

  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      brandCode: window.brandCode,
      countryCode: window.countryCode,
      "Client-Ip": sessionStorage.getItem("ip"),
    },
    body: JSON.stringify(request.validateIpinRequest),
  };

  return fetch(VALIDATE_IPIN_API_ENDPOINT, parameters)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
};
export const brandService = (request) => {
  const BRAND_API_ENDPOINT = API_CONSTANT_MAP.fetchLoginBrands;

  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      brandCode: window.brandCode,
      countryCode: window.countryCode,
      "Client-Ip": sessionStorage.getItem("ip"),
    },
  };

  return fetch(
    BRAND_API_ENDPOINT + "/" + request.brandRequest.companyId,
    parameters
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
};

export const locationService = (request) => {
  const LOCATION_API_ENDPOINT = API_CONSTANT_MAP.fetchLoginLocations;

  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      brandCode: window.brandCode,
      countryCode: window.countryCode,
      "Client-Ip": sessionStorage.getItem("ip"),
    },
  };

  return fetch(
    LOCATION_API_ENDPOINT +
      "?brandCode=" +
      request.userLocation.brandId +
      "&loginType=" +
      request.userLocation.loginAccessProfile +
      "&companyId=" +
      request.userLocation.companyId +
      "&userId=" +
      request.userLocation.userId,
    parameters
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
};

export const fetchClientIpAddress = (request) => {
  return "192.168.30.32";
  //return fetch('https://ipinfo.io')
  //    .then(response => {
  //        return response.json()
  //    })
  //    .then(json => {
  //        return json.ip;
  //    })
};
