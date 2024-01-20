import serviceAppointmentHttp from "../../../services/apiCalls/http-common";
import { BASE_CRM_MAP } from "../../../utils/constant";

const fetchInboundCriteriaService = async (departmentCode) => {
  let token = localStorage.getItem("token");
  return await serviceAppointmentHttp.get(
    `${BASE_CRM_MAP.getCriteria}/${departmentCode}`,
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

const fetchInboundCasesByCriteriaService = async (payload) => {
  let token = localStorage.getItem("token");
  return await serviceAppointmentHttp.post(
    `${BASE_CRM_MAP.getCasesByCriteria}`,
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

const fetchNewCaseService = (departmentCode) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.get(
    `${BASE_CRM_MAP.createnewcase}/${departmentCode}`,
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

const fetchCustHistoryByIdentificationService = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.get(
    `${BASE_CRM_MAP.GetCustHistoryByIdentification}/${payload.name}/${payload.value}?departmentCode=${payload.departmentCode}`,
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

const getCustHistoryByIdentificationService = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.get(
    `${BASE_CRM_MAP.GetCustHistoryByIdentification}/${payload.name}/${payload.value}?departmentCode=${payload.departmentCode}`,
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

const fetchJobCardHistory = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.get(
    `${BASE_CRM_MAP.fetchJobCardHistory}/${payload}`,
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

const saveNewCaseService = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.post(`${BASE_CRM_MAP.saveCase}`, payload, {
    headers: {
      brandCode: window.brandCode,
      countryCode: window.countryCode,
      Authorization: token,
      "Client-Ip": sessionStorage.getItem("ip"),
    },
  });
};

const fetchFUPModalDataByCaseIdService = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.get(
    `${BASE_CRM_MAP.fetchCaseFollowUps}/${payload.caseId}`,
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

const fetchInboundCaseById = (caseId) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.get(
    `${BASE_CRM_MAP.getInboundCaseById}/${caseId}`,
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

const fetchManageFollowUpService = (caseUniqueId) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.get(
    `${BASE_CRM_MAP.addCaseFollowUp}/${caseUniqueId}`,
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
    `${BASE_CRM_MAP.saveCaseFollowUp}/${payload.caseUniqueId}`,
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

const assignCasesToUserService = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.post(
    `${BASE_CRM_MAP.assignCasesToUser}`,
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

const fetchDealerOutletInfoService = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.get(
    `${BASE_CRM_MAP.fetchDealerOutletInfo}/${payload.dealer}/${payload.outlet}`,
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
  return serviceAppointmentHttp.get(`${BASE_CRM_MAP.getEngagedCases}`, {
    headers: {
      brandCode: window.brandCode,
      countryCode: window.countryCode,
      Authorization: token,
      "Client-Ip": sessionStorage.getItem("ip"),
    },
  });
};
const saveUnlockCases = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.post(
    `${BASE_CRM_MAP.saveUnlockCases}`,
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

const fetchProspectDatasheet = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.get(
    `${BASE_CRM_MAP.fetchProspectDatasheet}/${payload.dataType}?searchValue=${payload.prospectMasterSerial}`,
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

// const fetchOrderDatasheet = (prospectMasterSerial) =>{
//     let token =localStorage.getItem('token')
//     return serviceAppointmentHttp.get(`${BASE_CRM_MAP.fetchOrderDatasheet}/?searchValue=${prospectMasterSerial}`, {
//         headers :{
//             'brandCode': window.brandCode,
//             'countryCode': window.countryCode,
//             'Authorization': token
//         }
//     })
// }

const checkActiveCase = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.get(
    `${BASE_CRM_MAP.checkActiveCase}/${payload.name}/${payload.value}?departmentCode=${payload.departmentCode}`,
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

const reassignCaseToDealer = (payload) => {
  let token = localStorage.getItem("token");
  return serviceAppointmentHttp.post(
    `${BASE_CRM_MAP.updateInboundCase}/${payload.caseUniqueId}`,
    payload.requestModel,
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
const escalationSagaService = async (request) => {
  let token = localStorage.getItem("token");
  return await serviceAppointmentHttp.post(
    `${BASE_CRM_MAP.escalatedCases}`,
    request,
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
  fetchInboundCriteriaService,
  fetchInboundCasesByCriteriaService,
  fetchNewCaseService,
  fetchCustHistoryByIdentificationService,
  getCustHistoryByIdentificationService,
  saveNewCaseService,
  fetchFUPModalDataByCaseIdService,
  fetchInboundCaseById,
  fetchManageFollowUpService,
  saveCaseFollowUpService,
  fetchJobCardHistory,
  assignCasesToUserService,
  fetchDealerOutletInfoService,
  fetchEngagedCases,
  fetchProspectDatasheet,
  saveUnlockCases,
  checkActiveCase,
  reassignCaseToDealer,
  escalationSagaService,
};
