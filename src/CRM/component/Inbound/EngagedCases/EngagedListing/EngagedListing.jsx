import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { saveUnlockCases } from "../../../../store/services/inboundServices";
import { emptyEngagedCasesList } from "../../../../store/actions/inboundActions";
import useWindowSize from "../../../../../Hooks/useWindowSize";
import func from "../../../../../utils/common.functions";
import * as types from "../../../../store/actions/index";

const Engagedlisting = ({ engagedCases, setRecordSaved, isRecordSaved }) => {
  let engageCases = engagedCases.map((engagecase) => {
    return {
      ...engagecase,
      lockedBy:
        engagecase.actionBy +
        (engagecase.actionBy ? "-" : "") +
        engagecase.actionByCompanyCode,
    };
  });

  const [caseArray, setCaseArray] = useState([]);
  const size = useWindowSize();
  const dispatch = useDispatch();

  const engageCaseClick = (data) => {
    let caseIndex = caseArray.indexOf(data.caseUniqueId);
    if (caseIndex === -1) {
      caseArray.push(data.caseUniqueId);
      // setCaseArray([...caseArray, data.caseUniqueId]);
      let rowNode = gridOptions.api.getRowNode(data.caseUniqueId);
      rowNode.setDataValue("isLock", false);
    } else {
      setCaseArray(
        caseArray.filter((caseUniqueId) => caseUniqueId !== data.caseUniqueId)
      );
      let rowNode = gridOptions.api.getRowNode(data.caseUniqueId);
      rowNode.setDataValue("isLock", true);
    }
  };

  const saveEngageCases = () => {
    dispatch({ type: types.SHOW_LOADER });
    if (caseArray.length > 0) {
      const payload = {
        caseUniqueIds: caseArray,
      };

      const apiData = saveUnlockCases(payload);
      Promise.resolve(apiData)
        .then((res) => {
          if (res.status === 200) {
            dispatch(emptyEngagedCasesList());
            setRecordSaved(!isRecordSaved);
            // dispatch(fetchEngagedCases())
            dispatch({ type: types.HIDE_LOADER });
          }
        })
        .catch((error) => {
          dispatch({ type: types.HIDE_LOADER });
        });
    }
    dispatch({ type: types.HIDE_LOADER });
  };

  const openEngagedListing = (params) => {
    return (
      <button
        className={
          "btn btn-sm  font-10 mdi medium " +
          (params.data.isLock
            ? "btn-success mdi-lock"
            : "btn-warning mdi-lock-open-outline")
        }
        onClick={() => engageCaseClick(params.data)}
      >
        Unlock Case
      </button>
    );
  };

  const columnDefs = [
    //{ header: ' ', field: '', width:80,cellRendererFramework: unlockAll, pinned: 'left' },
    {
      headerName: "Unlock Case",
      field: "isLock",
      width: 120,
      cellRendererFramework: openEngagedListing,
      pinned: "left",
    },
    { headerName: "Case-ID", field: "caseUniqueId", width: 70, pinned: "left" },
    {
      headerName: "Opened On",
      field: "caseDateTime",
      width: 130,
      valueFormatter: func.agDateTimeFormatter,
      pinned: "left",
    },
    {
      headerName: "Event Date",
      field: "createDateTime",
      width: 130,
      valueFormatter: func.agDateTimeFormatter,
      pinned: "left",
    },
    //{ headerName: 'Case Id', field: 'caseUniqueId', width: 80, valueFormatter: func.agStringFormatter, pinned: 'left'},
    {
      headerName: "Customer",
      tooltipField: "customer.custName",
      field: "customer.custName",
      width: 110,
      valueFormatter: func.agStringFormatter,
      pinned: "left",
    },
    {
      headerName: "Category",
      tooltipField: "classificationDescription",
      field: "classificationDescription",
      width: 130,
      valueFormatter: func.agStringFormatter,
      pinned: "left",
    },
    {
      headerName: "Sub Category",
      tooltipField: "subClassificationDescription",
      field: "subClassificationDescription",
      width: 110,
      valueFormatter: func.agStringFormatter,
      pinned: "left",
    },
    {
      headerName: "Mobile",
      field: "customer.custPrimaryMobile",
      width: 90,
      valueFormatter: func.agMobileNumberHyphenFormatter,
      pinned: "left",
    },
    {
      headerName: "Email",
      tooltipField: "customer.custPrimaryEmail",
      field: "customer.custPrimaryEmail",
      width: 120,
      valueFormatter: func.agStringFormatter,
      pinned: "left",
    },
    {
      headerName: "Dealer",
      tooltipField: "dealerName",
      field: "dealerName",
      width: 110,
      valueFormatter: func.agStringFormatter,
      pinned: "left",
    },
    {
      headerName: "Outlet",
      tooltipField: "branchName",
      field: "branchName",
      width: 80,
      valueFormatter: func.agStringFormatter,
      pinned: "left",
    },
    {
      headerName: "Status",
      field: "caseStatus",
      width: 70,
      cellRenderer: func.statusFormatter,
      pinned: "left",
    },
    {
      headerName: "Locked By",
      field: "lockedBy",
      width: 110,
      tooltipField: "lockedBy",
      pinned: "left",
    },
  ];
  var gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
      flex: 1,
      sortable: true,
      filter: true,
    },
    animateRows: true,
    getRowNodeId: function (data) {
      return data.caseUniqueId;
    },
    rowData: engageCases,
    rowSelection: "multiple",
  };
  return (
    <div className="card">
      <div className="card-header float-right " style={{ textAlign: "end" }}>
        <button
          className="btn btn-sm btn-success"
          onClick={() => saveEngageCases()}
        >
          Save
        </button>
      </div>
      <div className="card-body grid-section p-0 " style={{ overflow: "auto" }}>
        <div
          id="myGrid"
          style={{
            height: size.height !== undefined ? size.height - 195 : 0,
            width: "100%",
            fontSize: "11px",
            lineHeight: "23px",
            overflow: "auto"
          }}
        >
          <AgGridReact
            gridOptions={gridOptions}
            animateRows={true}
            tooltipShowDelay={0}
            enableBrowserTooltips={true}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default Engagedlisting;
