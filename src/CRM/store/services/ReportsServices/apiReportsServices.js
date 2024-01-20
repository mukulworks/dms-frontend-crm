import serviceAppointmentHttp from "../../../../services/apiCalls/http-common";
import { BASE_CRM_REPORT_MAP } from "../../../../utils/constant";

const fetchReportsCriteria = (endPoint) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.get(
    `${BASE_CRM_REPORT_MAP.getCriteria}/${endPoint}`,
    {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        Authorization: token,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    }
  );
};

const fetchScreenData = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.post(
    `${BASE_CRM_REPORT_MAP.getReportSumary}/${payload.type}`,
    payload.data,
    {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        Authorization: token,
        "Client-Ip": sessionStorage.getItem("ip"),
        // 'Access-Control-Expose-Headers': 'Access-Token'//, Uid
      },
    }
  );
};

const fetchListingByCriteria = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.post(
    `${BASE_CRM_REPORT_MAP.getCasesByCriteria}`,
    payload.data,
    {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        Authorization: token,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    }
  );
};

export default {
  fetchReportsCriteria,
  fetchScreenData,
  fetchListingByCriteria,
};
