import serviceAppointmentHttp from "../../../../services/apiCalls/http-common";
import { SERVICE_APPOINTMENT_API_CONSTANT_MAP } from "../../../../utils/constant";

const fetchServiceAppointmentCriteria = (data) => {
  // return serviceAppointmentHttp.get(`/FetchServiceAppointmentCriteria + ?brandCode=${data.brand}&countryCode=${data.country}&dealerId=${data?.dealer}`);
  return serviceAppointmentHttp.get(
    SERVICE_APPOINTMENT_API_CONSTANT_MAP.criteria +
      `?brandCode=${data?.brand}&countryCode=${data?.country}&dealerId=${data?.dealer}`,
    {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    }
  );
};

const fetchServiceAppointmentData = (data) => {
  return serviceAppointmentHttp.get(
    SERVICE_APPOINTMENT_API_CONSTANT_MAP.dataPoolFupList +
      `?brandCode=${data?.brandCode}&countryCode=${
        data?.countryCode
      }&dealerId=${data?.dealerId}&branchCode=${data?.branchCode}&callerId=${
        data?.callerId
      }&callerType=${data?.brandCode === "AUDI" ? "CRE" : "WSA"}&eventId=${
        data?.eventId
      }&month=${data?.month}&year=${data?.year}`,
    {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    }
  );
};

const fetchServiceAppointmentCalendarViewData = (data) => {
  return serviceAppointmentHttp.get(
    SERVICE_APPOINTMENT_API_CONSTANT_MAP.dataPoolFupCalendarList +
      `?brandCode=${data?.brandCode}&countryCode=${data?.countryCode}&dealerId=${data?.dealerId}&branchCode=${data?.branchCode}&callerId=${data?.callerId}&callerType=CRE&eventId=${data?.eventId}&month=${data?.month}&year=${data?.year}`,
    {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    }
  );
};

const fetchCustomerServiceAppointmentData = (data) => {
  return serviceAppointmentHttp.get(
    SERVICE_APPOINTMENT_API_CONSTANT_MAP.custServiceAppointment +
      `?dealerId=${data?.dealer}&fupLocation=${data?.fupLocation}&fupSerial=${data?.fupSerial}`,
    {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    }
  );
};

const fetchDayWiseServiceBookingCount = (data) => {
  return serviceAppointmentHttp.get(
    SERVICE_APPOINTMENT_API_CONSTANT_MAP.dayWise +
      `?dealerId=KRISTAN&branchCode=GGN01`,
    {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    }
  );
};

const fetchFUPModalDataByVinApi = (data) => {
  return serviceAppointmentHttp.get(
    SERVICE_APPOINTMENT_API_CONSTANT_MAP.followUpByVin +
      `?dealerId=${data?.dealerId}&chassisNo=${data?.chassisNo}`,
    {
      headers: {
        brandCode: window.brandCode,
        "Client-Ip": sessionStorage.getItem("ip"),
        countryCode: window.countryCode,
      },
    }
  );
};

const createServiceAppointmentService = (data) => {
  return serviceAppointmentHttp.post(
    SERVICE_APPOINTMENT_API_CONSTANT_MAP.createServiceAppointment,
    data,
    {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    }
  );
};

// Start - Manage Service Appointment controls API
const fetchMostRecentActivity = (data) => {
  return serviceAppointmentHttp.get(
    SERVICE_APPOINTMENT_API_CONSTANT_MAP.recentActivity + `/${data?.chassisNo}`,
    {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    }
  );
};

const fetchAddressDetails = (data) => {
  return serviceAppointmentHttp.get(
    SERVICE_APPOINTMENT_API_CONSTANT_MAP.custAddress +
      `/${data?.custMasterSerial}`,
    {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    }
  );
};

const fetchServicePlans = (data) => {
  return serviceAppointmentHttp.get(
    SERVICE_APPOINTMENT_API_CONSTANT_MAP.servicePlanList +
      `/${data?.chassisNo}`,
    {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    }
  );
};

const fetchVehicleRecentHistory = (criteriaData) => {
  return serviceAppointmentHttp.get(
    SERVICE_APPOINTMENT_API_CONSTANT_MAP.vehicleCentralHistory +
      `?searchType=${criteriaData.searchType}&searchValue=${criteriaData.searchValue}`,
    {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    }
  );
};

const fetchContactHistory = (data) => {
  return serviceAppointmentHttp.get(
    SERVICE_APPOINTMENT_API_CONSTANT_MAP.contactHistory +
      `?dealerId=${data?.dealerId}&chassisNo=${data?.chassisNo}`,
    {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    }
  );
};

const fetchCustomerFeedback = (data) => {
  return serviceAppointmentHttp.get(
    SERVICE_APPOINTMENT_API_CONSTANT_MAP.feedback +
      `?dealerId=${data?.dealerId}&ChassisNo=${data?.chassisNo}`,
    {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    }
  );
};

const fetchMaintenanceSchedule = (data) => {
  return serviceAppointmentHttp.get(
    SERVICE_APPOINTMENT_API_CONSTANT_MAP.maintenanceSchedule +
      `?dealerId=${data?.dealerId}&ChassisNo=${data?.chassisNo}`,
    {
      headers: {
        brandCode: window.brandCode,
        countryCode: window.countryCode,
        "Client-Ip": sessionStorage.getItem("ip"),
      },
    }
  );
};
// End - Manage Service Appointment controls API

export default {
  fetchServiceAppointmentCriteria,
  fetchServiceAppointmentData,
  fetchServiceAppointmentCalendarViewData,
  fetchCustomerServiceAppointmentData,
  fetchDayWiseServiceBookingCount,
  fetchFUPModalDataByVinApi,
  createServiceAppointmentService,
  fetchMostRecentActivity,
  fetchAddressDetails,
  fetchServicePlans,
  fetchVehicleRecentHistory,
  fetchContactHistory,
  fetchCustomerFeedback,
  fetchMaintenanceSchedule,
};
