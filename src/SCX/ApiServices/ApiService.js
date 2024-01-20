import serviceAppointmentHttp from "../../services/apiCalls/http-common";
import { BASE_SCX_MAP } from "../../utils/constant";

const fetchDashboardMetadata = async () => {
  let token = localStorage.getItem("token");
  return await serviceAppointmentHttp
    .get(`${BASE_SCX_MAP.dashboardMetadata}`, {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        Authorization: token,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    })
    .then((res) => {
      if (res && res.data) return res.data;
    })
    .catch((error) => {
      return error;
    });
};

const fetchDataByCriteria = async (apiEndpoint, payload) => {
  let token = localStorage.getItem("token");
  return await serviceAppointmentHttp
    .post(`${BASE_SCX_MAP.byCriteria}/${apiEndpoint}`, payload, {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        Authorization: token,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    })
    .then((res) => {
      if (res.status === 204) {
        return "";
      } else if (res.status === 200 && res && res.data) {
        return res.data;
      }
    })
    .catch((error) => {
      return error;
    });
};

export default {
  fetchDashboardMetadata,
  fetchDataByCriteria,
};
