import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  fetchFUPModalDataByCaseID,
  assignCaseToUser,
} from "../../../../store/actions/inboundActions";
import useWindowSize from "../../../../../Hooks/useWindowSize";
import func from "../../../../../utils/common.functions";
import CustomLoadingOverlay from "../../../../../components/Shared/CustomLoadingOverlay";
import * as constants from "../../../../../utils/constant";
import CustomerToolTipTemp from "./CustomerToolTipTemp";
import { EscalationPopup } from "../../../common/EscalationPopup";

const SalesInboundListing = ({
  chooseComponent,
  setOpenInboundDetails,
  inboundCases,
  openCaseDataSheet,
  setGetCaseId,
  handleCheckBoxClick,
  disabledHeaderItems,
  escalationHoldType,
  setIsReFetchListing,
}) => {
  const dispatch = useDispatch();
  const size = useWindowSize();
  const [gridApi, setGridApi] = useState();
  const [gridColumnApi, setGridColumnApi] = useState();
  const [showEscalationPopup, setShowEscalationPopup] = useState({
    status: false,
    id: "",
  });
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const clearData = () => {
    gridApi.setRowData([]);
  };

  const onRemoveSelected = () => {
    var selectedData = gridApi.getSelectedRows();
    var res = gridApi.applyTransaction({ remove: selectedData });
  };

  // useEffect(() => {
  //     if(assignSelectedCases === constants.ASSIGN){
  //         assignSelectedCasesToUser()
  //         setAssignSelectedCases('')
  //     }
  // }, [assignSelectedCases])

  /* remove cases end */

  const [frameworkComponents, setFrameworkComponents] = useState({
    customLoadingOverlay: CustomLoadingOverlay,
  });

  const handleClick = (e, val) => {
    handleCheckBoxClick(e, val);
  };

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
                id={params.value}
                name={params.value}
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
              openCaseDataSheet && openCaseDataSheet(params.value);
            }}
          >
            {params.value}
          </div>
        )}
      </>
    );
  };

  function checkboxSelection(params) {
    return params.node.group === true;
  }

  const fupModalOpen = (caseId) => {
    setOpenInboundDetails(true);
    setGetCaseId && setGetCaseId(caseId);
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

  const tooltipGetter = (params) => {
    return <span title={params.value}>{params.value}</span>;
  };

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
  const salesPreSalesColumnDefsRaw = [
    {
      headerName: "Case ID",
      suppressMenu: true,
      suppressSorting: true,
      tooltipField: "caseUniqueId",
      field: "caseUniqueId",
      width: 100,
      pinned: "left",
      cellRendererFramework: redirectToUpdateCase,
      // headerCheckboxSelection: true,
      // checkboxSelection: checkboxSelection
    },
    {
      headerName: "Date",
      field: "openedOn",
      width: 125,
      valueFormatter: func.agDateTimeFormatter,
      pinned: "left",
    },
    {
      headerName: "Category",
      tooltipField: "caseCategory.categoryDescription",
      field: "caseCategory.categoryDescription",
      width: 130,
      valueFormatter: func.agStringFormatter,
      pinned: "left",
      tooltipField: "caseCategory.categoryDescription",
    },
    {
      headerName: "Sub Category",
      tooltipField: "caseSubCategory.subCategoryDesc",
      field: "caseSubCategory.subCategoryDesc",
      width: 110,
      valueFormatter: func.agStringFormatter,
      tooltipField: "caseSubCategory.subCategoryDesc",
    },
    {
      headerName: "Dealer",
      tooltipField: "allotedDealer.dealerShortName",
      field: "allotedDealer.dealerShortName",
      width: 90,
      valueFormatter: func.agStringFormatter,
      tooltipField: "allotedDealer.dealerShortName",
    },
    {
      headerName: "Outlet",
      tooltipField: "allotedOutlet.branchName",
      field: "allotedOutlet.branchShortName",
      width: 80,
      valueFormatter: func.agStringFormatter,
    },
    {
      headerName: "Customer",
      field: "customer.custName",
      width: 150,
      valueFormatter: func.agStringFormatter,
      cellRendererFramework: (params) => {
        return <CustomerToolTipTemp params={params} />;
      },
    },
    {
      headerName: "Mobile",
      tooltipField: "customer.custMobile",
      field: "customer.custMobile",
      width: 90,
      valueFormatter: func.agMobileNumberHyphenFormatter,
    },
    {
      headerName: "Email",
      tooltipField: "customer.custEmail",
      field: "customer.custEmail",
      width: 150,
      valueFormatter: func.agEmailStringFormatter,
      tooltipField: "customer.custEmail",
    },
    {
      headerName: "Model",
      tooltipField: "salesCase.vehModel",
      field: "salesCase.vehModel",
      width: 100,
      valueFormatter: func.agStringFormatter,
    }, //left
    {
      headerName: "Query",
      tooltipField: "caseQuery",
      field: "caseQuery",
      width: 90,
      valueFormatter: func.agStringFormatter,
      cellRendererFramework: tooltipGetter,
      tooltipField: "caseQuery",
    },
    {
      headerName: "Status",
      tooltipField: "caseStatus",
      field: "caseStatus",
      width: 70,
      cellRenderer: func.statusFormatter,
    },
    { headerName: " ", field: "", width: 4 },
    {
      headerName: "Assigned",
      tooltipField: "allotedDealerAgent.empDescription",
      field: "allotedDealerAgent.empDescription",
      width: 70,
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
    },
    {
      headerName: "Escalation",
      tooltipField: "lastFup.fupTimeRuleShortDesc",
      field: "lastFup.fupTimeRuleShortDesc",
      width: 70,
      valueFormatter: func.agStringFormatter,
    }, //left

    {
      headerName: "Escalation Hold State",
      suppressMenu: true,
      suppressSorting: true,
      width: 100,

      cellRendererFramework: renderEscalation,
    },

    {
      headerName: "Act",
      tooltipField: "followUpCount",
      field: "followUpCount",
      width: 80,
      valueFormatter: func.agNumberHyphenFormatter,
      cellRendererFramework: openInboundDetails,
    },
  ];

  const salesPreSalesColumnDefs = salesPreSalesColumnDefsRaw.filter((x) => {
    let isValid = false;
    disabledHeaderItems.findIndex((y) => {
      if (y == x.headerName) isValid = true;
    });

    return !isValid;
  });
  var checkboxSelection = function (params) {
    return params.columnApi.getRowGroupColumns().length === 0;
  };
  var headerCheckboxSelection = function (params) {
    return params.columnApi.getRowGroupColumns().length === 0;
  };

  return (
    <>
      {inboundCases ? (
        <div className="card">
          {" "}
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
                columnDefs={salesPreSalesColumnDefs}
                rowData={inboundCases}
                tooltipShowDelay="0"
                enableBrowserTooltips={true}
                frameworkComponents={frameworkComponents}
                loadingOverlayComponent="customLoadingOverlay"
                loadingOverlayComponentParams={{ loadingMessage: "" }}
                // rowSelection="multiple"
                onGridReady={onGridReady}
                // rowMultiSelectWithClick={true}
                // suppressRowClickSelection={true}
                // headerCheckboxSelection={true}
                // animateRows={true}
                enableCellTextSelection={true}
              ></AgGridReact>
              {/* <AgGridColumn type='checkbox'></AgGridColumn> */}
            </div>
          </div>
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
      ) : (
        ""
      )}
    </>
  );
};

export default SalesInboundListing;
