import ApiCall from "../outboundServices/outboundApiServices";
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
export const fetchOutboundCriteriaService = () => {
  return ApiCall.fetchOutboundCriteriaService()
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const fetchOutboundCasesByCriteriaService = (payload) => {
  return ApiCall.fetchOutboundCasesByCriteriaService(payload)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const fetchOutboundCaseByIdService = (id) => {
  return ApiCall.fetchOutboundCaseByIdService(id)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};
export const fetchOutboundCaseDataSheetService = (id) => {
  return ApiCall.fetchOutboundCaseDataSheetService(id)
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

export const fetchClosedCases = (payload) => {
  return ApiCall.fetchClosedCases(payload)
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

export const saveReOpenCases = (payload) => {
  return ApiCall.saveReOpenCases(payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};
