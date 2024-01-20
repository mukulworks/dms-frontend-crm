import ServiceAppointment from "../../src/Workshop/ServiceAppointment/components/ServiceAppointment";
import ManageServiceAppointment from "../../src/Workshop/ServiceAppointment/components/ServiceFollowUp/ManageServiceAppointment/ManageServiceAppointment";
import CreateCase from "../CRM/component/Inbound/CreateCase/CreateCase";
import Inbound from "../CRM/component/Inbound/Inbound";
import ManageFollowUp from "../CRM/component/Inbound/ManageFollowUp/ManageFollowUp";
import UpdateCase from "../CRM/component/Inbound/UpdateCase/UpdateCase";
import Outbound from "../CRM/component/Outbound/Outbound";
import ManageOutboundFollowUp from "../CRM/component/Outbound/PendingFollowUps/ManageOutboundFollowUp/ManageOutboundFollowUp";
import Reports from "../CRM/component/Reports/Reports";
import Dashboard from "../SCX/DashBoard/Dashboard";
import CentralVehicleHistory from "../Workshop/ServiceAppointment/components/ServiceFollowUp/Controls/RightMenuControls/CentralVehicleHistory/CentralVehicleHistory";
import InternalServer from "../components/Error/InternalServer/InternalServer";

const routes = [
  {
    routeId: 5,
    path: "/serviceAppointment",
    component: ServiceAppointment,
  },
  {
    routeId: 6,
    path: "/manageServiceAppointment/:fupSerial/:fupLocation",
    component: ManageServiceAppointment,
  },
  {
    routeId: 9999,
    path: "/500",
    component: InternalServer,
  },
  {
    routeId: 7,
    path: "/Inbound/AllocateCase",
    component: Inbound,
  },
  {
    routeId: 8,
    path: "/Inbound/ActiveCases",
    component: Inbound,
  },
  {
    routeId: 8,
    path: "/Inbound/ActiveServiceCases",
    component: Inbound,
  },
  {
    routeId: 8,
    path: "/Inbound/Index",
    component: Inbound,
  },
  {
    routeId: 9,
    path: "/inbound/createCase/:departmentCode",
    component: CreateCase,
  },
  {
    routeId: 10,
    path: "/inbound/manageFollowUp/:caseUniqueId",
    component: ManageFollowUp,
  },
  {
    routeId: 11,
    path: "/Inbound/GetEngagedCaseList",
    component: Inbound,
  },
  {
    routeId: 12,
    path: "/Outbound/Index",
    component: Outbound,
  },
  {
    routeId: 13,
    path: "/outbound/ALLOCATECASE",
    component: Outbound,
  },
  {
    routeId: 14,
    path: "/outbound/GetEngagedCaseList",
    component: Outbound,
  },
  {
    routeid: 15,
    path: "/outbound/GetSearchCriteria",
    component: Outbound,
  },
  {
    routeId: 16,
    path: "/outbound/manageOutboundFollowUp/:caseUniqueId",
    component: ManageOutboundFollowUp,
  },
  {
    routeId: 17,
    path: "/scx/dashboard",
    component: Dashboard,
  },
  {
    routeId: 15,
    path: "/CRMREPORTS/INDEX",
    component: Reports,
  },
  {
    routeId: 16,
    path: "/CRMREPORTS/ExcelReportCriteria",
    component: Reports,
  },
  {
    routeId: 17,
    path: "/CRMREPORTS/ServiceExcel",
    component: Reports,
  },
  {
    routeId: 23,
    path: "/CRMREPORTS/Service",
    component: Reports,
  },
  {
    routeId: 18,
    path: "/CRMREPORTS/QFBData",
    component: Reports,
  },
  {
    routeId: 19,
    path: "/CRMREPORTS/SurveyExcelReport",
    component: Reports,
  },
  {
    routeId: 20,
    path: "/CRMREPORTS/CxSurveyExcelReport",
    component: Reports,
  },
  {
    routeId: 21,
    path: "/inbound/ReAssignDealer/:caseUniqueId",
    component: UpdateCase,
  },
  {
    routeId: 22,
    path: "/CentralVehicleHistory",
    component: CentralVehicleHistory,
  },
];

export default routes;
