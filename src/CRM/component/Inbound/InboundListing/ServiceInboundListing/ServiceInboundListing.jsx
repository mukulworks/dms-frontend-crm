import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AgGridReact, GridOptions } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { fetchFUPModalDataByCaseID } from "../../../../store/actions/inboundActions";
import useWindowSize from "../../../../../Hooks/useWindowSize";
import func from "../../../../../utils/common.functions";
import CustomLoadingOverlay from "../../../../../components/Shared/CustomLoadingOverlay";
import * as constants from "../../../../../utils/constant";
import VehicleOffRoad from "../../../../../images/Off_Road.png";
import HelpDesk from "../../../../../images/HelpDesk.png";
import Warranty from "../../../../../images/Warranty.png";
import Alert from "../../../../../images/alert.jpeg";
import ActiveStatus from "../../../../../images/s-active.png";
import CancelStatus from "../../../../../images/s-cancel.png";
import CloseStatus from "../../../../../images/s-close.png";
import CustomToolTipTemp from "./CustomToolTipTemp";
import { EscalationPopup } from "../../../common/EscalationPopup";

const ServiceInboundListing = ({
  chooseComponent,
  setOpenInboundDetails,
  inboundCases,
  setGetCaseId,
  handleCheckBoxClick,
  openCaseDataSheet,
  disabledHeaderItems,
  escalationHoldType,
  setIsReFetchListing,
}) => {
  const dispatch = useDispatch();
  const size = useWindowSize();

  const [frameworkComponents, setFrameworkComponents] = useState({
    customLoadingOverlay: CustomLoadingOverlay,
  });
  const handleClick = (e, val) => {
    handleCheckBoxClick(e, val);
  };
  const [showEscalationPopup, setShowEscalationPopup] = useState({
    status: false,
    id: "",
  });
  const redirectToUpdateCase = (params) => {
    return (
      <>
        {chooseComponent === constants.ACTIVECASES ||
        chooseComponent === constants.ACTIVESERVICECASES ? (
          <div>
            <Link
              to={{
                pathname: `/inbound/manageFollowUp/${params.data.caseUniqueId}`,
              }}
            >
              {params.value}
            </Link>
          </div>
        ) : chooseComponent === constants.ALLOCATECASES ? (
          <div className="row">
            <div className="col-4">
              <input
                type="checkbox"
                onClick={(e) => handleClick(e, params.value)}
              />
            </div>
            <div className="col-8">
              <div>{params.value}</div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              openCaseDataSheet(params.value);
            }}
          >
            {params.value}
          </div>
        )}
      </>
    );
  };

  const warrantyTypeTemplate = (params) => {
    return (
      <>
        {params.value == "OUT_WARR" && (
          <div className="grid-tooltip">
            <img
              src={Warranty}
              height="20px"
              width="20px"
              className="homescreenImg img-responsive"
              title="Warranty Expired"
            />
          </div>
        )}
      </>
    );
  };
  const vehOnRoadTemplate = (params) => {
    return (
      <>
        {(params.value === "N" || params.value === "no") && (
          <div className="grid-tooltip">
            <img
              src={VehicleOffRoad}
              height="20px"
              width="20px"
              className="homescreenImg img-responsive"
              title="Vehicle Off Road Required"
            />
          </div>
        )}
      </>
    );
  };
  const alertTemplate = (params) => {
    const title = params.data?.serviceCase?.alertDesc;
    return (
      <>
        {params.value == "Y" && (
          <div className="grid-tooltip">
            <img
              src={Alert}
              height="20px"
              width="20px"
              className="homescreenImg img-responsive"
              title={title}
            />
          </div>
        )}
      </>
    );
  };
  const oemSupportTemplate = (params) => {
    return (
      <>
        {params.value == "Y" && (
          <div className="grid-tooltip">
            <img
              src={HelpDesk}
              height="20px"
              width="20px"
              className="homescreenImg img-responsive"
              title="OEM Support Required"
            />
          </div>
        )}
      </>
    );
  };

  const statusTemplate = (params) => {
    return (
      <>
        {params.value == "Active" && (
          <div className="grid-tooltip">
            <img
              src={ActiveStatus}
              height="15px"
              width="15px"
              className="homescreenImg img-responsive"
            />
          </div>
        )}
        {params.value?.indexOf("Soft Closed") > -1 && (
          <div className="grid-tooltip" uib-tooltip="Soft Closed">
            <img
              src={CloseStatus}
              height="15px"
              width="15px"
              className="homescreenImg img-responsive"
            />
          </div>
        )}

        {params.value == "Closed" && (
          <div className="grid-tooltip" uib-tooltip="Closed">
            <img
              src={CloseStatus}
              height="15px"
              width="15px"
              className="homescreenImg img-responsive"
            />
          </div>
        )}
        {params.value == "Cancelled" && (
          <div className="grid-tooltip" uib-tooltip="Cancelled">
            <img
              src={CancelStatus}
              height="15px"
              width="15px"
              className="homescreenImg img-responsive"
            />
          </div>
        )}
      </>
    );
  };

  const fupModalOpen = (caseId) => {
    setOpenInboundDetails(true);
    setGetCaseId(caseId);
    dispatch(fetchFUPModalDataByCaseID({ caseId: caseId }));
  };

  const openInboundDetails = (params) => {
    return (
      <span
        className="rowbuttons"
        onClick={() => fupModalOpen(params.data.caseUniqueId)}
        style={{ color: "#007bff" }}
      >
        {func.agNumberHyphenFormatter(params)}
      </span>
    );
  };

  function checkboxSelection(params) {
    return params.node.group === true;
  }
  const holdEscalationFormatter = (params) => {
    if (params.value === null || params.value === "P" || params.value === "A")
      return "Started";
    else if (params.value === "I") return "Pending";
    else if (params.value === "C") return "Approved";
    else if (params.value === "X") return "Dis-Approved";
  };
  const handleEscalationPopup = (caseId) => {
    setShowEscalationPopup({ status: true, id: caseId });
  };
  const renderEscalation = (params) => {
    const status = holdEscalationFormatter({
      value: params?.data?.caseEscalationHoldStatus ?? null,
    });
    const showEscalationHold = params?.data?.showEscalationHold;
    return (
      <a
        title="click to update"
        style={showEscalationHold ? { color: "#007bff" } : {}}
        onClick={
          showEscalationHold
            ? () => handleEscalationPopup(params?.data?.caseUniqueId)
            : () => {}
        }
      >
        {status}
      </a>
    );
  };
  const servicesColumnDefsRaw = [
    { headerName: "  ", field: "", width: 4, pinned: "left" },
    {
      headerName: "Case ID",
      suppressMenu: true,
      suppressSorting: true,
      tooltipField: "caseUniqueId",
      field: "caseUniqueId",
      width: 70,
      pinned: "left",
      cellRendererFramework: redirectToUpdateCase,
      checkboxSelection: checkboxSelection,
    },
    {
      headerName: "Date",
      headerCheckboxSelection: false,
      field: "openedOn",
      width: 125,
      valueFormatter: func.agDateTimeFormatter,
      pinned: "left",
    },
    {
      headerName: "OEM",
      field: "serviceCase.oemSupport",
      width: 70,
      cellRendererFramework: oemSupportTemplate,
    }, //check
    {
      headerName: "Warranty Status",
      field: "serviceCase.warrantyType",
      width: 100,
      cellRendererFramework: warrantyTypeTemplate,
    }, //check
    {
      headerName: "Vehicle Off Road",
      field: "serviceCase.vehOnRoad",
      width: 100,
      cellRendererFramework: vehOnRoadTemplate,
    },
    {
      headerName: "Alert",
      tooltipField: "serviceCase.alertDesc",
      field: "serviceCase.alertImage",
      width: 50,
      cellRendererFramework: alertTemplate,
    },
    {
      headerName: "Category",
      tooltipField: "caseCategory.categoryDescription",
      field: "caseCategory.categoryDescription",
      width: 120,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "Sub Category",
      tooltipField: "caseSubCategory.subCategoryDesc",
      field: "caseSubCategory.subCategoryDesc",
      width: 120,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "Type",
      tooltipField: "serviceCase.caseType.description",
      field: "serviceCase.caseType.description",
      width: 80,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "Source",
      tooltipField: "lastFup.fupSourceGroup",
      field: "lastFup.fupSourceGroup",
      width: 90,
      valueFormatter: func.agStringFormatter,
    }, //check
    {
      headerName: "Created By",
      field: "caseActivityLog.logDealerId",
      width: 70,
      valueFormatter: func.agStringFormatter,
      tooltipField: "caseActivityLog.logDealerId",
    },
    {
      headerName: "Dealer",
      tooltipField: "allotedDealer.dealerShortName",
      field: "allotedDealer.dealerShortName",
      width: 90,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "Outlet",
      tooltipField: "allotedOutlet.branchName",
      field: "allotedOutlet.branchShortName",
      width: 100,
      valueFormatter: func.agStringFormatter,
    }, //left
    {
      headerName: "Status",
      tooltipField: "caseStatus",
      field: "caseStatus",
      width: 60,
      cellRendererFramework: statusTemplate,
    },
    {
      headerName: "Customer",
      // tooltipField: "customer.custName",
      field: "customer.custName",
      width: 120,
      valueFormatter: func.agStringFormatter,
      cellRendererFramework: (params) => {
        return <CustomToolTipTemp params={params} />;
      },
    },
    {
      headerName: "Model",
      tooltipField: "serviceCase.model",
      field: "serviceCase.model",
      width: 50,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "VIN",
      tooltipField: "serviceCase.chassisNo",
      field: "serviceCase.chassisNo",
      width: 120,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "KMS",
      tooltipField: "serviceCase.kms",
      field: "serviceCase.kms",
      width: 50,
      valueFormatter: func.numberFormatter,
    },
    {
      headerName: "Service Dealer",
      tooltipField: "serviceCase.serviceDealer",
      field: "serviceCase.serviceDealer",
      width: 100,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "KVPS",
      tooltipField: "allotedOutlet.kvps",
      field: "allotedOutlet.kvps",
      width: 50,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "City",
      tooltipField: "customer.custCity.description",
      field: "customer.custCity.description",
      width: 90,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "FUP Due",
      tooltipField: "",
      field: "",
      width: 70,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "Scheduled",

      field: "lastFup.fupDueDatetime",
      width: 70,
      cellRendererFramework: (params) => {
        return (
          <span title={func.agDateFormatter(params)}>
            {func.agDateFormatter(params)}
          </span>
        );
      },
    }, //left
    {
      headerName: "Esclation",
      tooltipField: "lastFup.fupTimeRuleShortDesc",
      field: "lastFup.fupTimeRuleShortDesc",
      width: 70,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "Escalation Hold State",
      suppressMenu: true,
      suppressSorting: true,
      width: 100,
      cellRendererFramework: renderEscalation,
    },
    {
      headerName: "Closure Date",
      tooltipField: "closedOn",
      field: "closedOn",
      width: 70,
      valueFormatter: func.agDateFormatter,
    },
    {
      headerName: "Act",
      tooltipField: "followUpCount",
      field: "followUpCount",
      width: 50,
      valueFormatter: func.agNumberHyphenFormatter,

      cellRendererFramework: openInboundDetails,
    },
  ];
  const servicesColumnDefs = servicesColumnDefsRaw.filter((x) => {
    let isValid = false;
    disabledHeaderItems.findIndex((y) => {
      if (y == x.headerName) isValid = true;
    });

    return !isValid;
  });

  const inboundCasesMapped = inboundCases?.map((cases) => {
    return {
      ...cases,
      caseActivityLog: cases?.caseActivityLog[0],
    };
  });
  return (
    <>
      {inboundCasesMapped ? (
        <div className="card">
          <div
            className="card-body grid-section p-0 "
            style={{ overflow: "auto" }}
          >
            <div
              id="myGrid"
              style={{
                height: size.height !== undefined ? size.height - 173 : 0,
                width: "100%",
                fontSize: "11px",
                lineHeight: "23px",
              }}
            >
              <AgGridReact
                columnDefs={servicesColumnDefs}
                rowData={inboundCasesMapped}
                tooltipShowDelay={0}
                enableBrowserTooltips={true}
                frameworkComponents={frameworkComponents}
                loadingOverlayComponent="customLoadingOverlay"
                loadingOverlayComponentParams={{ loadingMessage: "" }}
                enableCellTextSelection={true}
              />
              {showEscalationPopup.status ? (
                <>
                  <EscalationPopup
                    type={escalationHoldType}
                    handlePopupCancel={() =>
                      setShowEscalationPopup({ status: false, id: "" })
                    }
                    caseID={showEscalationPopup.id}
                    setIsReFetchListing={setIsReFetchListing}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ServiceInboundListing;
