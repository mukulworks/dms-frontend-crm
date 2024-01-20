import ApiCall from "./apiReportsServices";

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
export const fetchReportsCriteria = (criteriaType) => {
  return ApiCall.fetchReportsCriteria(criteriaType)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const fetchScreenData = (payload) => {
  return ApiCall.fetchScreenData(payload)
    .then((res) => {
      // const filename = res.headers
      // .get("content-disposition")
      // .split('"')[1];

      // console.log('filename', filename)

      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};

export const fetchListingByCriteria = (payload) => {
  return ApiCall.fetchListingByCriteria(payload)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      return error;
    });
};
