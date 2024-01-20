import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { Link } from "react-router-dom";
import useWindowSize from "../../../../Hooks/useWindowSize";
import { fetchFUPModalDataByCaseID } from "../../../store/actions/inboundActions";
import func from "../../../../utils/common.functions";
import CustomLoadingOverlay from "../../../../components/Shared/CustomLoadingOverlay";
import * as constants from "../../../../utils/constant";
import OpenOnToolTipTemp from "./Tooltip/OpenOnToolTipTemp";
import CustomerToolTipTemp from "./Tooltip/CustomerToolTipTemp";
import ModelToolTipTemp from "./Tooltip/ModelToolTipTemp";

const OutboundListing = ({
  setOpenFollowUpModal,
  outboundCases,
  chooseComponent,
  allocateCaseList,
  setGetCaseId,
}) => {
  const dispatch = useDispatch();
  const size = useWindowSize();
  const [frameworkComponents, setFrameworkComponents] = useState({
    customLoadingOverlay: CustomLoadingOverlay,
  });

  const getAllocateCaseIds = (caseUniqueId) => {
    let caseIndex = allocateCaseList.indexOf(caseUniqueId);
    if (caseIndex === -1) {
      allocateCaseList.push(caseUniqueId);
    } else {
      allocateCaseList.splice(caseIndex, 1);
    }
  };

  const redirectToManageFollowUp = (params) => {
    return (
      <>
        {chooseComponent !== constants.ALLOCATE_OUTBOUND_CASE ? (
          <Link
            to={{
              pathname: `/outbound/manageOutboundFollowUp/${params.data.caseUniqueId}`,
            }}
          >
            {params.data.caseUniqueId}
          </Link>
        ) : (
          <div className="row">
            <div className="col-2">
              <input
                type="checkbox"
                id={params.value}
                name={params.value}
                onClick={() => getAllocateCaseIds(params.value)}
              />
            </div>
            <div className="col-6">
              <div>{params.value}</div>
            </div>
          </div>
        )}
      </>
    );
  };
  const fupModalOpen = (caseId) => {
    setOpenFollowUpModal(true);
    setGetCaseId(caseId);
    dispatch(fetchFUPModalDataByCaseID({ caseId: caseId }));
  };

  const openOutboundDetails = (params) => (
    <span
      className="rowbuttons"
      onClick={() => fupModalOpen(params.data.caseUniqueId)}
      style={{ color: "#007bff" }}
    >
      {func.agNumberHyphenFormatter(params)}
    </span>
  );

  const outboundCasesColumnDefs = [
    {
      headerName: "Case ID",
      suppressMenu: true,
      suppressSorting: true,
      tooltipField: "caseUniqueId",
      field: "caseUniqueId",
      width: 80,
      pinned: "left",
      cellRendererFramework: redirectToManageFollowUp,
    },
    {
      headerName: "Opened On",
      field: "openedOn",
      width: 120,
      pinned: "left",
      valueFormatter: func.outboundDateTimeFormatter,
      cellRendererFramework: (params) => {
        return <OpenOnToolTipTemp params={params} />;
      },
    },
    {
      headerName: "Customer",
      // tooltipField: "customer.custName",
      field: "customer.custName",
      width: 120,
      pinned: "left",
      valueFormatter: func.agStringFormatter,
      cellRendererFramework: (params) => {
        return <CustomerToolTipTemp params={params} />;
      },
    },
    {
      headerName: "Dealer",
      tooltipField: "allotedDealer.dealerShortName",
      field: "allotedDealer.dealerShortName",
      width: 120,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "Outlet",
      tooltipField: "allotedOutlet.branchName",
      field: "allotedOutlet.branchShortName",
      width: 100,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "#RPO",
      tooltipField: "rpo",
      field: "rpo",
      width: 70,
      valueFormatter: (data) => func.emptyStringFormatter(data.value),
    },
    {
      headerName: "Category",
      tooltipField: "caseCategory.categoryDescription",
      field: "caseCategory.categoryDescription",
      width: 130,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "Sub Category",
      tooltipField: "caseSubCategory.subCategoryDesc",
      field: "caseSubCategory.subCategoryDesc",
      width: 150,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "Mobile",
      tooltipField: "customer.custMobile",
      field: "customer.custMobile",
      width: 100,
      valueFormatter: func.agMobileNumberHyphenFormatter,
    },
    {
      headerName: "Email",
      tooltipField: "customer.custEmail",
      field: "customer.custEmail",
      width: 180,
      valueFormatter: func.agEmailStringFormatter,
    },
    {
      headerName: "Query Text",
      tooltipField: "caseQuery",
      field: "caseQuery",
      width: 120,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "Model",
      field: "vehModel",
      width: 70,
      valueFormatter: func.agStringFormatter,
      cellRendererFramework: (params) => {
        return <ModelToolTipTemp params={params} />;
      },
    },
    {
      headerName: "Status",
      tooltipField: "caseStatus",
      field: "caseStatus",
      width: 70,
      cellRenderer: func.statusFormatter,
    },
    {
      headerName: "Assigned",
      tooltipField: "handlerAgent.empDescription",
      field: "handlerAgent.empDescription",
      width: 70,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "Next Follow Up",
      tooltipField: "lastFup.fupNextDueDatetime",
      field: "lastFup.fupNextDueDatetime",
      width: 120,
      valueFormatter: func.dateTimeFormatter,
    },
    {
      headerName: "Act",
      tooltipField: "followUpCount",
      field: "followUpCount",
      width: 50,
      cellRendererFramework: openOutboundDetails,
    },
  ];

  return (
    <>
      {outboundCases ? (
        <div className="card">
          <div
            className="card-body grid-section p-0 table-skoda table w-100"
            style={{
              overflow: "auto",
              height: size.height !== undefined ? size.height - 200 : 0,
              width: "100%",
              fontSize: "11px",
              lineHeight: "23px",
            }}
          >
            <AgGridReact
              columnDefs={outboundCasesColumnDefs}
              rowData={outboundCases}
              frameworkComponents={frameworkComponents}
              loadingOverlayComponent="customLoadingOverlay"
              loadingOverlayComponentParams={{ loadingMessage: "" }}
              enableCellTextSelection={true}
              enableBrowserTooltips={true}
            ></AgGridReact>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default OutboundListing;
