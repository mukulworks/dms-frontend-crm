import serviceAppointmentHttp from "./apiCalls/http-common";
import { API_CONSTANT_MAP } from "../utils/constant";

export const fetchUserDetailService = (request) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp
    .get(`${API_CONSTANT_MAP.fetchLoggedInUserDetail}`, {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        Authorization: token,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    })
    .then((res) => {
      window.countryCode = res?.data?.userDetail?.countryCode;
      window.brandCode = res?.data?.userDetail?.brandCode;
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const fetchUserMenuRightsService = (request) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp
    .get(
      `${API_CONSTANT_MAP.fetchLoggedInUserMenuRight}/${request.data.userId}/${request.data.moduleCode}`,
      {
        headers: {
          brandCode: window.brandCode,
          countryCode: window.countryCode,
          Authorization: token,
          "Client-Ip": sessionStorage.getItem("ip"),
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
