import serviceAppointmentHttp from "../../../../services/apiCalls/http-common";
import { BASE_CRM_OUTBOUND_MAP } from "../../../../utils/constant";

const fetchOutboundCriteriaService = () => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.get(`${BASE_CRM_OUTBOUND_MAP.getCriteria}`, {
    headers: {
      brandCode: window.brandCode,
      countryCode: window.countryCode,
      Authorization: token,
      "Client-Ip": sessionStorage.getItem("ip"),
    },
  });
};

const fetchOutboundCasesByCriteriaService = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.post(
    `${BASE_CRM_OUTBOUND_MAP.getCasesByCriteria}`,
    payload,
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

const fetchOutboundCaseByIdService = (id) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.get(
    `${BASE_CRM_OUTBOUND_MAP.getCaseById}/${id}`,
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
const fetchOutboundCaseDataSheetService = (id) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.get(
    `${BASE_CRM_OUTBOUND_MAP.getCaseDataSheet}/${id}`,
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

const saveCaseFollowUpService = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.post(
    `${BASE_CRM_OUTBOUND_MAP.saveCaseFollowUp}/${payload.caseMasterSerial}`,
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

const fetchEngagedCases = () => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.get(
    `${BASE_CRM_OUTBOUND_MAP.getEngagedCases}`,
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

const fetchClosedCases = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.get(
    `${BASE_CRM_OUTBOUND_MAP.getClosedCases}/${payload.name}/${payload.value}`,
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

const saveReOpenCases = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.post(
    `${BASE_CRM_OUTBOUND_MAP.saveReOpenCases}`,
    payload,
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

const saveUnlockCases = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.post(
    `${BASE_CRM_OUTBOUND_MAP.saveUnlockCases}`,
    payload,
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
  fetchOutboundCriteriaService,
  fetchOutboundCasesByCriteriaService,
  fetchOutboundCaseByIdService,
  fetchOutboundCaseDataSheetService,
  saveCaseFollowUpService,
  fetchEngagedCases,
  fetchClosedCases,
  saveUnlockCases,
  saveReOpenCases,
};
