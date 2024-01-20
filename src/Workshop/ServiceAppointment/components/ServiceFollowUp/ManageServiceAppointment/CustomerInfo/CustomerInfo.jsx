import React from "react";
import { useSelector } from "react-redux";
import CustomerAlert from "./CustomerAlert/CustomerAlert";
import CustomerBasicInfo from "./CustomerBasicInfo/CustomerBasicInfo";
import CustomerVehicleInfo from "./CustomerVehicleInfo/CustomerVehicleInfo";

const CustomerInfo = ({ centralCustomerMasterInfo = null }) => {
  const {
    customerInfo,
    customerVehicleInfo,
    customerContacts,
    customerAlerts,
  } = useSelector((state) => {
    let manageServiceAppointmentModel =
      state.serviceAppointment?.serviceAppointmentModel
        ?.manageServiceAppointmentModel;
    if (manageServiceAppointmentModel != null) {
      let customerInfo = manageServiceAppointmentModel.customerInfo;

      return {
        customerInfo: customerInfo,
        customerVehicleInfo: customerInfo?.customerVehicleInfo,
        customerContacts: customerInfo?.customerContacts,
        customerAlerts: null,
      };
    } else {
      let customerInfo = centralCustomerMasterInfo;
      return {
        customerInfo: customerInfo,
        customerVehicleInfo: customerInfo?.customerVehicleInfo,
        customerContacts: customerInfo?.customerContacts,
        customerAlerts: null,
      };
    }
  });

  return (
    <div className="col-12">
      <div className="row border-top border-bottom shadow-sm my-1 py-1">
        <CustomerBasicInfo
          customerInfo={customerInfo}
          customerContacts={customerContacts}
        />
        <CustomerVehicleInfo customerVehicleInfo={customerVehicleInfo} />
        <CustomerAlert
          customerVehicleInfo={customerVehicleInfo}
          customerAlerts={customerAlerts}
        />
      </div>
    </div>
  );
};

export default CustomerInfo;
