import ApiCall from "./apiServices";

const handleError = (error) => {
  if (error?.response?.status == 401) {
    window.selectedBusinessOwnerCode = sessionStorage.getItem(
      "selectedBusinessOwnerCode"
    );
    window.location.href =
      window.location.origin +
      `/OrbitDmsIdentity/${window.selectedBusinessOwnerCode || ""}`;
  }
};
export const fetchInboundCriteriaService = async (departmentCode) => {
  return await ApiCall.fetchInboundCriteriaService(departmentCode)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const fetchInboundCasesByCriteriaService = async (payload) => {
  return await ApiCall.fetchInboundCasesByCriteriaService(payload)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const fetchNewCaseService = (departmentCode) => {
  return ApiCall.fetchNewCaseService(departmentCode)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const fetchCustHistoryByIdentificationService = (payload) => {
  return ApiCall.fetchCustHistoryByIdentificationService(payload)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const getCustHistoryByIdentificationService = (payload) => {
  return ApiCall.getCustHistoryByIdentificationService(payload)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const saveNewCaseService = (payload) => {
  return ApiCall.saveNewCaseService(payload)
    .then((res) => {
      return res.status;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const fetchFUPModalDataByCaseIdService = (payload) => {
  return ApiCall.fetchFUPModalDataByCaseIdService(payload)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const fetchInboundCaseById = (caseId) => {
  return ApiCall.fetchInboundCaseById(caseId)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const fetchManageFollowUpService = (caseUniqueId) => {
  return ApiCall.fetchManageFollowUpService(caseUniqueId)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const saveCaseFollowUpService = (payload) => {
  return ApiCall.saveCaseFollowUpService(payload)
    .then((res) => {
      return res.status;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const fetchJobCardHistoryService = (payload) => {
  return ApiCall.fetchJobCardHistory(payload)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const assignCasesToUserService = (payload) => {
  return ApiCall.assignCasesToUserService(payload)
    .then((res) => {
      if (res && res.status) {
        return { status: res.status, message: res?.data?.response };
      }
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const fetchDealerOutletInfoService = (payload) => {
  return ApiCall.fetchDealerOutletInfoService(payload)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const fetchEngagedCases = () => {
  return ApiCall.fetchEngagedCases()
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const saveUnlockCases = (payload) => {
  return ApiCall.saveUnlockCases(payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};
export const fetchProspectDatasheet = (payload) => {
  return ApiCall.fetchProspectDatasheet(payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const checkActiveCase = (payload) => {
  return ApiCall.checkActiveCase(payload)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const fetchOrderDatasheet = (prospectMasterSerial) => {
  return ApiCall.fetchOrderDatasheet(prospectMasterSerial)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const reassignCaseToDealer = (payload) => {
  return ApiCall.reassignCaseToDealer(payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};
export const escalationSagaService = (payload) => {
  console.log(payload);
  return ApiCall.escalationSagaService(payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      handleError(error);
      console.log(error.message);
      return error;
    });
};
