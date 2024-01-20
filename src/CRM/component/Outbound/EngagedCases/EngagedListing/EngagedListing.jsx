import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { saveUnlockCases } from "../../../../store/services/outboundServices/outboundServices";
import { emptyEngagedCasesList } from "../../../../store/actions/outboundActions/outboundActions";
import * as types from "../../../../store/actions/outboundActions/index";
import useWindowSize from "../../../../../Hooks/useWindowSize";
import func from "../../../../../utils/common.functions";

const Engagedlisting = ({ engagedCases, setRecordSaved, isRecordSaved }) => {
  const size = useWindowSize();
  const dispatch = useDispatch();
  const [caseArray, setCaseArray] = useState([]);

  const engageCaseClick = (data) => {
    let caseIndex = caseArray.indexOf(data.caseUniqueId);
    if (caseIndex === -1) {
      caseArray.push(data.caseUniqueId);
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
      width: 130,
      cellRendererFramework: openEngagedListing,
      pinned: "left",
    },
    { headerName: "Case-ID", field: "caseUniqueId", width: 80, pinned: "left" },
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
      field: "customer.custName",
      width: 110,
      valueFormatter: func.agStringFormatter,
      pinned: "left",
    },
    {
      headerName: "Category",
      field: "classificationDescription",
      width: 130,
      valueFormatter: func.agStringFormatter,
      pinned: "left",
    },
    {
      headerName: "Sub Category",
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
      field: "customer.custPrimaryEmail",
      width: 150,
      valueFormatter: func.agStringFormatter,
      pinned: "left",
    },
    {
      headerName: "Dealer",
      field: "dealerName",
      width: 70,
      valueFormatter: func.agStringFormatter,
      pinned: "left",
    },
    {
      headerName: "Outlet",
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
      pinned: "right",
    },
    { headerName: " ", field: "", width: 4 },
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
    rowData: engagedCases,
    rowSelection: "multiple",
    tooltipShowDelay: 0,
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
            height: size.height !== undefined ? size.height - 155 : 0,
            width: "100%",
            fontSize: "11px",
            lineHeight: "23px",
          }}
        >
          <AgGridReact
            gridOptions={gridOptions}
            animateRows={true}
            //pagination={true}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default Engagedlisting;
