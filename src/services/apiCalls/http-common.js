import axios from "axios";
import { SERVICE_APPOINTMENT_API_CONSTANT_MAP } from "../../utils/constant";
const serviceAppointmentHttp = axios.create({
  baseURL: SERVICE_APPOINTMENT_API_CONSTANT_MAP.serviceAppointmentHttpCommon,
  headers: {
    "Content-type": "application/json",
  },
});

export default serviceAppointmentHttp;
