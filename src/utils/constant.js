const apiDomain = location.origin.includes("dms.orbitsys.com")
  ? "mobile.orbitsys.com"
  : "g2.orbitsys.com";
const BASE_API = `https://${apiDomain}/OrbitsysIdentityApi/Api`;
const BASE_USER_MANAGEMENT_API = `https://${apiDomain}/OrbitsysUserManagementApi/Api`;
const BASE_TELEPHONY_API = `https://${apiDomain}/TelephonyService/api/telephony`;
const BASE_SERVICE_APPOINTMENT_API = `https://${apiDomain}/ServiceAppointmentApi/Api`;
const BASE_CRM_API = `https://${apiDomain}/OrbitsysCrmApi/api`;

export const API_CONSTANT_MAP = {
  login: `${BASE_API}/Identity/Authenticate`,
  validateIpin: `${BASE_API}/Identity/ValidateIpin`,
  fetchLoginBrands: `${BASE_API}/Identity/FetchBrands`,
  fetchLoginLocations: `${BASE_API}/Identity/FetchLocations`,
  fetchLoggedInUserDetail: `${BASE_USER_MANAGEMENT_API}/UserManagement/FetchUserDetail`,
  fetchLoggedInUserMenuRight: `${BASE_USER_MANAGEMENT_API}/UserManagement/FetchUserRights`,
  register: `${BASE_API}'/register/`,
  users: `${BASE_API}/users/`,
  user: `${BASE_API}/user/{}`,
};

export const DIALER_API_CONSTANT_MAP = {
  agentLogin: `${BASE_TELEPHONY_API}/login`,
  agentLogout: `${BASE_TELEPHONY_API}/logout`,
  makeCall: `${BASE_TELEPHONY_API}/DialCall`,
  endCall: `${BASE_TELEPHONY_API}/HangupCall`,
  changeExtensionState: `${BASE_TELEPHONY_API}/ChangeExtensionState`,
};

export const SERVICE_APPOINTMENT_API_CONSTANT_MAP = {
  serviceAppointmentHttpCommon: `${BASE_SERVICE_APPOINTMENT_API}`,
  criteria: `${BASE_SERVICE_APPOINTMENT_API}/ServiceAppointment/FetchServiceAppointmentCriteria`,
  dataPoolFupList: `${BASE_SERVICE_APPOINTMENT_API}/ServiceAppointment/FetchDataPoolFollowUpList`,
  dataPoolFupCalendarList: `${BASE_SERVICE_APPOINTMENT_API}/ServiceAppointment/FetchServiceAppointmentsCalendar`,
  custServiceAppointment: `${BASE_SERVICE_APPOINTMENT_API}/ServiceAppointment/ManageCustomerServiceAppointment`,
  dayWise: `${BASE_SERVICE_APPOINTMENT_API}/ServiceAppointment/FetchDayWiseServiceBookingCount`,
  followUpByVin: `${BASE_SERVICE_APPOINTMENT_API}/ServiceAppointment/FetchFollowUpsByVin`,
  createServiceAppointment: `${BASE_SERVICE_APPOINTMENT_API}/ServiceAppointment/CreateServiceAppointment`,
  recentActivity: `${BASE_SERVICE_APPOINTMENT_API}/VehicleHistory/FetchVehicleRecentActivity`,
  custAddress: `${BASE_SERVICE_APPOINTMENT_API}/CustomerMaster/FetchAddressList`,
  servicePlanList: `${BASE_SERVICE_APPOINTMENT_API}/VehicleHistory/FetchServicePlanList`,
  vehicleCentralHistory: `${BASE_SERVICE_APPOINTMENT_API}/VehicleHistory/GetByType`,
  contactHistory: `${BASE_SERVICE_APPOINTMENT_API}/VehicleHistory/FetchContactHistory`,
  maintenanceSchedule: `${BASE_SERVICE_APPOINTMENT_API}/CustomerMaster/FetchMaintenanceSchedule`,
  feedback: `${BASE_SERVICE_APPOINTMENT_API}/CustomerMaster/FetchFeedback`,
};

export const BASE_CRM_MAP = {
  crmHttpCommon: `${BASE_CRM_API}`,
  getCriteria: `${BASE_CRM_API}/Inbound/GetCriteria`,
  getCasesByCriteria: `${BASE_CRM_API}/Inbound/GetCasesByCriteria`,
  createnewcase: `${BASE_CRM_API}/Inbound/createnewcase`,
  GetCustHistoryByIdentification: `${BASE_CRM_API}/Inbound/GetCustHistoryByIdentification`,
  fetchJobCardHistory: `${BASE_CRM_API}/Inbound/FetchJobCardHistory`,
  saveCase: `${BASE_CRM_API}/Inbound/SaveCase`,
  fetchCaseFollowUps: `${BASE_CRM_API}/Inbound/FetchCaseFollowUps`,
  getInboundCaseById: `${BASE_CRM_API}/Inbound/GetInboundCaseById`,
  addCaseFollowUp: `${BASE_CRM_API}/Inbound/AddCaseFollowUp`,
  updateInboundCase: `${BASE_CRM_API}/Inbound/updateCase`,
  saveCaseFollowUp: `${BASE_CRM_API}/Inbound/SaveCaseFollowUp`,
  assignCasesToUser: `${BASE_CRM_API}/Inbound/AssignCasesToUser`,
  getEngagedCases: `${BASE_CRM_API}/Inbound/GetEngagedCases`,
  saveUnlockCases: `${BASE_CRM_API}/Inbound/UnlockCase`,
  fetchProspectDatasheet: `${BASE_CRM_API}/Datasheet/FetchProspectDatasheet`,
  fetchOrderDatasheet: `${BASE_CRM_API}/Datasheet/FetchProspectDatasheet/CUST_MASTER_SERIAL`,
  fetchDealerOutletInfo: `${BASE_CRM_API}/master/FetchDealerOutletInfo`,
  checkActiveCase: `${BASE_CRM_API}/Inbound/CheckActiveCase`,
  uploadFile: `${BASE_CRM_API}/document/UploadFile`,
  removeFile: `${BASE_CRM_API}/document/RemoveFile`,
  escalatedCases: `${BASE_CRM_API}/Inbound/SetEscalationHoldStatus`,
};

export const BASE_CRM_OUTBOUND_MAP = {
  getCriteria: `${BASE_CRM_API}/Outbound/GetCriteria`,
  getCasesByCriteria: `${BASE_CRM_API}/Outbound/GetCasesByCriteria`,
  getCaseById: `${BASE_CRM_API}/Outbound/GetOutboundCaseById`,
  saveCaseFollowUp: `${BASE_CRM_API}/Outbound/SaveCaseFollowUp`,
  getCaseDataSheet: `${BASE_CRM_API}/Outbound/GetCaseDatasheet`,
  assignCasesToUser: `${BASE_CRM_API}/Outbound/AssignCasesToUser`,
  getEngagedCases: `${BASE_CRM_API}/Outbound/GetEngagedCases`,
  saveUnlockCases: `${BASE_CRM_API}/Outbound/UnlockCase`,
  getClosedCases: `${BASE_CRM_API}/Outbound/GetCloseCases`,
  saveReOpenCases: `${BASE_CRM_API}/Outbound/ReOpenCase`,
};

export const BASE_CRM_REPORT_MAP = {
  getCriteria: `${BASE_CRM_API}/Report/GetCriteria`,
  getReportSumary: `${BASE_CRM_API}/Report/GetReportSumary`,
  getCasesByCriteria: `${BASE_CRM_API}/Inbound/GetCasesByCriteria`,
};

export const BASE_SCX_MAP = {
  dashboardMetadata: `${BASE_CRM_API}/Dashboard/FetchScreenMetaData`,
  byCriteria: `${BASE_CRM_API}/Dashboard`,
};

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthShortNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const CDN_BASE_URL =
  "https://orbitsysstorage.blob.core.windows.net/images";

export const INBOUND = "INBOUND";
export const NO_ROWS_TO_SHOW = "No Record(s) found";
export const HISTORY = "HISTORY";
export const TECHNICAL_ADVICE_SUMMARY = "TECHNICAL_ADVICE_SUMMARY";
export const CASE_ID = "CASE_ID";
export const ADVISOR_OBSERVATION = "ADVISOR_OBSERVATION";
export const WATCH_POINT = "WATCH_POINT";
export const CONTACT_CHANGE = "CONTACT_CHANGE";
export const PART_SUMMARY = "PART_SUMMARY";
export const LABOR_SUMMARY = "LABOR_SUMMARY";
export const VEHICLE_CARD = "VEHICLE_CARD";
export const WARRANTY_CARD = "WARRANTY_CARD";
export const COMMUNICATION = "COMMUNICATION";
export const PRE_SALES = "PRE-SALES";
export const PRESALES = "PRESALES";
export const SALES = "SALES";
export const SERVICE = "SERVICE";
export const BOOKING = "BOOKING";
export const RESET = "RESET";
export const CASE_DATASHEET = "CASE_DATASHEET";
export const CASE_DETAILS = "CASE_DETAILS";
export const FUP_LIST = "FUP_LIST";
export const CONTACTINFO = "CONTACTINFO";
export const ACTIVITY_LOG = "ACTIVITY_LOG";
export const CONVERSATION = "CONVERSATION";
export const ESCALATIONS = "ESCALATIONS";
export const COMMUNICATION_LOG = "COMMUNICATION_LOG";
export const ALL = "ALL";
export const A = "A";
export const C = "C";
export const R = "R";
export const M = "M";
export const S = "S";
export const V = "V";
export const Expand_All = "Expand All";
export const Collapse_All = "Collapse All";
export const REGISTRATION = "REGISTRATION";
export const VIN = "VIN";
export const MOBILE = "MOBILE";
export const EMAIL = "EMAIL";
export const JOB_CARD_DETAILS = "JOB_CARD_DETAILS";
export const CUSTOMER_INFORMATION = "CUSTOMER_INFORMATION";
export const VEHICLE_INFORMATION = "VEHICLE_INFORMATION";
export const ALLOTED_DEALER_DETAILS = "ALLOTED_DEALER_DETAILS";
export const PROSPECTS = "PROSPECTS";
export const ORDERS = "ORDERS";
export const CASES = "CASES";
export const CALLER_NAME = "CALLER_NAME";
export const CALLER_MOBILE = "CALLER_MOBILE";
export const CALLER_EMAIL = "CALLER_EMAIL";
export const CALLER_ADDRESS1 = "CALLER_ADDRESS1";
export const CALLER_ADDRESS2 = "CALLER_ADDRESS2";
export const CALLER_ADDRESS3 = "CALLER_ADDRESS3";
export const STATE = "STATE";
export const CITY = "CITY";
export const PINCODE = "PINCODE";
export const CATEGORY = "CATEGORY";
export const SUBCATEGORY = "SUBCATEGORY";
export const MODEL = "MODEL";
export const VEHICLE = "VEHICLE";
export const DEALER = "DEALER";
export const OUTLET = "OUTLET";
export const SOURCE = "SOURCE";
export const COMPLAINT_TYPE = "COMPLAINT_TYPE";
export const CASE_TYPE = "CASE_TYPE";
export const IMAGE = "IMAGE";
export const DOCUMENT = "DOCUMENT";
export const VIDEO = "VIDEO";
export const TECHNICAL = "TECHNICAL";
export const ALLOWED_COUNTS = "ALLOWED_COUNTS";
export const ALLOWED_SIZE = "ALLOWED_SIZE";
export const UPLOADED_COUNTS = "UPLOADED_COUNTS";
export const UPLOADED_SIZE = "UPLOADED_SIZE";
export const BALANCE_COUNTS = "BALANCE_COUNTS";
export const BALANCE_SIZE = "BALANCE_SIZE";
export const NEXT_ACTION = "NEXT_ACTION";
export const ESCALATE_CASE = "ESCALATE_CASE";
export const FOLLOW_UP_TYPE = "FOLLOW_UP_TYPE";
export const ASSIGN = "ASSIGN";
export const NATION = "NATION";
export const ZONE_WISE = "ZONE_WISE";
export const DEALERSHIP_WISE = "DEALERSHIP_WISE";
export const BRAND = "BRAND";
export const COUNTRY = "COUNTRY";
export const BRANCH = "BRANCH";
export const DEPARTMENT = "DEPARTMENT";
export const ALLOCATED_TO = "ALLOCATED_TO";
export const CASE_STATUS = "CASE_STATUS";
export const SEARCH_BY = "SEARCH_BY";
export const MANAGE_FOLLOW_UP = "MANAGE_FOLLOW_UP";
export const ADD_ATTACHED_DOCUMENT = "ADD_ATTACHED_DOCUMENT";
export const REMOVE_ATTACHED_DOCUMENT = "REMOVE_ATTACHED_DOCUMENT";
export const CREATE_NEW_CASE = "CREATE_NEW_CASE";

//Inbound screen constants
export const ALLOCATECASES = "ALLOCATECASE";
export const ACTIVECASES = "ACTIVECASES";
export const INDEX = "INDEX";
export const ACTIVESERVICECASES = "ACTIVESERVICECASES";
export const GETENGAGEDCASELIST = "GETENGAGEDCASELIST";

//outbound screen constants
export const OUTBOUND = "OUTBOUND";
export const PENDING_FOLLOW_UPS = "PENDINGFOLLOWUPS";
export const ALLOCATE_OUTBOUND_CASE = "ALLOCATECASE";
export const ENGAGED_OUTBOUND_CASE = "ENGAGEDOUTBOUNDCASES";
export const CLOSED_CASE = "GETSEARCHCRITERIA";
export const CALL_CONNECTED = "Call Connected";
export const CALL_NOT_CONNECTED = "Call Not Connected";
export const ZONE = "ZONE";
//report screen constants
// export const BRANDCODES = 'BRAND_CODE'
// export const COUNTRY_CODE = 'COUNTRY_CODE'
export const REPORT_FORMAT = "REPORT_FORMAT";
export const DEPARTMENT_CODE = "DEPARTMENT_CODE";
export const MONTH = "MONTH";
export const YEAR = "YEAR";
export const CASE_SUMMARY = "CASE_SUMMARY";
export const CASE_REGISTER = "CASE_REGISTER";
export const SCX_CASE_SUMMARY = "SCX_CASE_SUMMARY";
export const SCX_SURVEY_SUMMARY = "SCX_SURVEY_SUMMARY";
export const CASE_INBOUND_EXCEL = "CASE_INBOUND_EXCEL";

export const CASE_SALES_SUMMARY = "CASE_SALES_SUMMARY";

export const CASE_SERVICE_SUMMARY = "CASE_SERVICE_SUMMARY";

export const CASE_OUTBOUND_EXCEL = "CASE_OUTBOUND_EXCEL";

export const QFB_SUMMARY = "QFB_SUMMARY";
