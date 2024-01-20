import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import UserThumb from "./user.svg";
import moment from "moment";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import useUserContext from "../../../../Hooks/useUserContext";
import {
  settingPageIndex,
  fetchFUPModalDataByVin,
} from "../../store/actions/serviceAppointmentAction";
import Star from "../../../../components/Shared/Star/Star";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import func from "../../../../utils/common.functions";
import EmptyRecords from "../ServiceFollowUp/Controls/RightMenuControls/CentralVehicleHistory/EmptyRecords/EmptyRecords";

const FupListing = ({ callFolloUpHistory }) => {
  const dispatch = useDispatch();
  const userContext = useUserContext();
  const [gotoPageInput, setGotoPageInput] = useState();

  const { followUps } = useSelector((state) => {
    let selectedPageIndex =
      state.serviceAppointment.serviceAppointmentModel.dataPoolModel
        .selectedPageIndex;
    let recordsPerPage =
      state.serviceAppointment.serviceAppointmentModel.dataPoolModel
        .recordsPerPage;
    let dataPools =
      state.serviceAppointment.serviceAppointmentModel.dataPoolModel.dataPools;
    let offset = selectedPageIndex * recordsPerPage;
    if (dataPools != null && dataPools.length > 0) {
      let dataPool = dataPools.find((dataPool) => {
        if (dataPool.isSelected) {
          return dataPool;
        }
      });

      if (!dataPool) dataPool = dataPools[0];

      return {
        followUps: dataPool.followUps.slice(offset, offset + recordsPerPage),
        followPageCount: dataPool.followUps.length / recordsPerPage,
      };
    }

    return { followUps: null, followPageCount: 0 };
  });

  //const handlePageClick = (e) => {
  //    const selectedPage = e.selected;
  //    dispatch(settingPageIndex(selectedPage))
  //}

  //const gotoPage = () => {
  //    dispatch(settingPageIndex(gotoPageInput))
  //}

  var regnGetter = function (params) {
    return (
      params.data.customerBasicInfo.customerVehicleInfo.regn1 +
      "-" +
      params.data.customerBasicInfo.customerVehicleInfo.regn2
    );
  };
  var callCount = function (params) {
    return params.data.callInboundCount + params.data.callOutboundCount;
  };
  var fupStatusGetter = function (params) {
    return params.data.fupStatus === "A"
      ? "Active"
      : params.data.fupStatus === "C"
      ? "Closed"
      : "";
  };

  function numberFormatter(params) {
    if (params.value > 0) return formatNumber(params.value);
    else return "-";
  }

  function dateFormatter(params) {
    return moment(new Date(params.value)).format("DD-MMM-YYYY");
  }

  function formatNumber(number) {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const serialRenderer = function (params) {
    if (params.data.fupStatus === "A")
      return (
        <Link
          to={`/ManageServiceAppointment/${params.data.fupSerial}/${params.data.fupLocation}`}
        >
          {params.node.rowIndex + 1 + "."}
        </Link>
      );
    else return params.node.rowIndex + 1 + ".";
  };

  const customerRenderer = function (params) {
    let customer = params.data.customerBasicInfo;
    let custName =
      customer?.custTitle +
      " " +
      customer?.custFirstName +
      " " +
      customer?.custMiddleName +
      " " +
      customer?.cuslLastName;
    const customerDetailPopOver = (
      <Popover>
        <Popover.Title as="h3">
          <div className="card">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col-auto">
                  <img
                    src={UserThumb}
                    className="rounded-circle border"
                    width="30"
                    alt=""
                  />
                </div>
                <div className="col-auto pl-0">
                  <p className="mb-0 text-uppercase font-15">{custName}</p>
                  <p className="mb-0 text-uppercase text-danger ccid">
                    {" "}
                    ccid : {customer.custMasterSerial}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Popover.Title>
        <Popover.Content>
          <div className="card">
            <div className="card-body p-1 type-address">
              <p>
                <span>Type</span>
                <span>{customer.custType}</span>
              </p>
              <p>
                <span>Address</span>
                <span>S124, GK I, aralias, ggn, Delhi City - Delhi</span>
              </p>
              <p>
                <span className="mdi mdi-phone-in-talk"></span>
                <span>{customer.custMobile}</span>
              </p>
              <p>
                <span className="mdi mdi-email"></span>
                <span>{customer.custEmail}</span>
              </p>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    );

    return (
      <div className="App">
        <OverlayTrigger
          events={["hover", "focus"]}
          placement="right"
          overlay={customerDetailPopOver}
        >
          <div>
            <a href="#">{custName}</a>
          </div>
        </OverlayTrigger>
      </div>
    );
  };

  const fupModalOpen = (params) => {
    let brandCode = userContext.userDetail.brandCode;
    let countryCode = userContext.userDetail.countryCode;
    let dealerId = userContext.userDetail.userContext.companyCode;
    const requestData = {
      brandCode: brandCode,
      countryCode: countryCode,
      dealerId: dealerId,
      chassisNo: params.data.customerBasicInfo.customerVehicleInfo.chassisNo,
    };
    dispatch(fetchFUPModalDataByVin(requestData));
    callFolloUpHistory(
      params.data.customerBasicInfo.customerVehicleInfo.chassisNo
    );
  };

  const vinRenderer = function (params) {
    return (
      <a href="#" className={"rowbuttons"} onClick={() => fupModalOpen(params)}>
        {params.data.customerBasicInfo.customerVehicleInfo.chassisNo}
      </a>
    );
  };

  const star = function (params) {
    const { fupEventMonth } = params.data;
    //fupEventMonth needs to be changed to Service Tracker
    return <Star ratingValue={fupEventMonth} starCount={5} />;
  };
  const loadingRecords = () => {
    return <span>Please wait while your rows are loading</span>;
  };
  const noRecordsFound = () => {
    return <span>No Records Found</span>;
  };
  return (
    <div
      id="myGrid"
      style={{
        height: "360px",
        fontSize: "11px",
        fontWeight: "normal",
        lineHeight: "23px",
      }}
    >
      <AgGridReact
        rowData={followUps}
        overlayLoadingTemplate={loadingRecords}
        overlayNoRowsTemplate={noRecordsFound}
        rowSelection={"single"}
        reactNext={true}
        autoHeight={true}
        defaultColDef={{ resizable: "true" }}
        enableCellTextSelection={true}
        enableCellTextSelection={true}
      >
        <AgGridColumn
          cellStyle={{ "text-align": "center" }}
          width="50px"
          headerName="Sr."
          cellRendererFramework={serialRenderer}
          sortable="true"
          pinned="left"
          headerClass="grid-header-cell-label"
          cellClass="grid-cell-centered"
        ></AgGridColumn>
        <AgGridColumn
          width="200px"
          headerClass="resizable-header"
          headerName="Customer"
          cellRendererFramework={customerRenderer}
          sortable="true"
          pinned="left"
        ></AgGridColumn>
        <AgGridColumn
          width="80px"
          headerClass="resizable-header"
          headerName="Registration"
          valueGetter={regnGetter}
        ></AgGridColumn>
        <AgGridColumn
          cellStyle={{ "text-align": "center" }}
          width="110px"
          headerClass="resizable-header"
          headerName="Vin"
          field="chassisNo"
          cellRendererFramework={vinRenderer}
        ></AgGridColumn>
        <AgGridColumn
          cellStyle={{ "text-align": "center" }}
          width="70px"
          headerName="Caller-Id"
          field=""
          valueFormatter={numberFormatter}
        ></AgGridColumn>
        <AgGridColumn
          cellStyle={{ "text-align": "center" }}
          width="80px"
          headerName="Sale-Date"
          field="customerBasicInfo.customerVehicleInfo.sellingDate"
          valueFormatter={dateFormatter}
        ></AgGridColumn>
        <AgGridColumn
          cellStyle={{ "text-align": "center" }}
          width="50px"
          headerName="Type"
          field="serviceType"
          valueFormatter={func.agStringFormatter}
        ></AgGridColumn>
        <AgGridColumn
          cellStyle={{ "text-align": "center" }}
          width="50px"
          headerName="Kms"
          field="lastVisitKm"
          valueFormatter={numberFormatter}
        ></AgGridColumn>
        <AgGridColumn
          cellStyle={{ "text-align": "center" }}
          width="80px"
          headerName="Date"
          field="lastVisitdate"
          valueFormatter={dateFormatter}
        ></AgGridColumn>
        <AgGridColumn
          cellStyle={{ "text-align": "center" }}
          width="80px"
          headerName="Due By"
          field="nextVisitDateAppicable"
          valueFormatter={dateFormatter}
        ></AgGridColumn>
        <AgGridColumn
          cellStyle={{ "text-align": "center" }}
          width="90px"
          headerName="Service Tracker"
          cellRendererFramework={star}
        ></AgGridColumn>
        <AgGridColumn
          cellStyle={{ "text-align": "center" }}
          width="40px"
          headerName="Call"
          valueGetter={callCount}
          field="totJCCount"
          valueFormatter={numberFormatter}
        ></AgGridColumn>
        <AgGridColumn
          cellStyle={{ "text-align": "center" }}
          width="40px"
          headerName="SMS"
          field="totSMSCount"
          valueFormatter={numberFormatter}
        ></AgGridColumn>
        <AgGridColumn
          cellStyle={{ "text-align": "center" }}
          width="40px"
          headerName="Mail"
          field="totMailCount"
          valueFormatter={numberFormatter}
        ></AgGridColumn>
        <AgGridColumn
          cellStyle={{ "text-align": "center" }}
          width="110px"
          headerName="Latest Service Visit"
          field="lastVisitdate"
          valueFormatter={dateFormatter}
        ></AgGridColumn>
        <AgGridColumn
          cellStyle={{ "text-align": "center" }}
          width="50px"
          headerName="Status"
          valueGetter={fupStatusGetter}
        ></AgGridColumn>
        <AgGridColumn
          cellStyle={{ "text-align": "center" }}
          width="50px"
          headerName="JC#"
          field="totJCCount"
          valueFormatter={numberFormatter}
        ></AgGridColumn>
        <AgGridColumn
          cellStyle={{ "text-align": "center" }}
          width="80px"
          headerName="Date"
          field="lastFupLogDate"
          valueFormatter={dateFormatter}
        ></AgGridColumn>
        <AgGridColumn
          width="90px"
          headerName="Comment"
          field="lastFupComment"
          valueFormatter={func.agStringFormatter}
        ></AgGridColumn>
        <AgGridColumn
          cellStyle={{ "text-align": "center" }}
          width="90px"
          headerName="Next FUP Date"
          field="nextFupDate"
          valueFormatter={dateFormatter}
        ></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default FupListing;
