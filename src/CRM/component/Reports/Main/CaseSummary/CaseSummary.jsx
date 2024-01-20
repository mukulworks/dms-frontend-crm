import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import StackedColumn2dLine from "./StackedColumn2dLine/StackedColumn2dLine";
import PieChart from "./PieChart/PieChart";
import { fetchScreenData } from "../../../../store/services/ReportsServices/reportsServices";
import ColumnChart from "./ColumnChart/ColumnChart";
import func from "../../../../../utils/common.functions";
import CasesListByType from "./CasesListByType/CasesListByType";
import * as constants from "../../../../../utils/constant";
import * as types from "../../../../store/actions/index";

const CaseSummary = ({ criteriaValues, header, calledFrom }) => {
  const dispatch = useDispatch();
  const [reportSummaryData, setReportSummaryData] = useState([]);
  const [collapse, setCollapse] = useState("");
  const [openListModal, setOpenListModal] = useState(false);
  const [apiParameters, setApiParameters] = useState({});

  useEffect(() => {
    let criteriaParameters = criteriaValues?.criteriaParameters;
    let departmentType = null;
    if (criteriaParameters?.length > 0) {
      for (const criteriaParameter of criteriaParameters) {
        if (criteriaParameter.code === constants.DEPARTMENT_CODE) {
          departmentType = criteriaParameter.value;
        }
      }
    }

    let payload = {
      type: departmentType,
      data: criteriaValues,
    };
    dispatch({ type: types.SHOW_LOADER });
    let apiData = fetchScreenData(payload);
    Promise.resolve(apiData)
      .then((res) => {
        dispatch({ type: types.HIDE_LOADER });
        setReportSummaryData(res);
      })
      .catch((error) => {
        dispatch({ type: types.HIDE_LOADER });
        // setReportSummaryData(error)
      });
  }, [criteriaValues]);

  let classificationWiseDataCounts =
    reportSummaryData?.classificationWiseDataCounts;
  let ageWiseDataCounts = reportSummaryData?.ageWiseDataCounts;

  let caseAnalysisHeader =
    reportSummaryData?.caseClassificationAnalysis?.caseAnalysisHeader;
  let mainColumn = caseAnalysisHeader?.mainColumn;
  let caseStatusWiseColumns = caseAnalysisHeader?.caseStatusWiseColumns;
  let ageWiseColumns = caseAnalysisHeader?.ageWiseColumns;

  let caseClassificationWiseDataCounts =
    reportSummaryData?.caseClassificationAnalysis
      ?.caseClassificationWiseDataCounts;

  const [clickPlusIcon, setClickPlusIcon] = useState(false);

  const handleClick = (code) => {
    if (code === collapse) {
      setCollapse("");
      setClickPlusIcon("");
    } else {
      setCollapse(code);
      setClickPlusIcon(code);
    }
  };

  const openModal = (category, subCategory, dataType) => {
    let data = {
      category: category,
      subCategory: subCategory,
      dataType: dataType,
    };
    setApiParameters(data);
    setOpenListModal(true);
  };

  const classificationWiseData = () => {
    let dataArray = [];
    if (caseClassificationWiseDataCounts) {
      for (const classificationWiseDataCount of classificationWiseDataCounts) {
        let data = {
          value: classificationWiseDataCount["dataCount"],
          label: classificationWiseDataCount["classification"]["description"],
        };
        dataArray.push(data);
      }
      return dataArray;
    }
    return dataArray;
  };

  const ageWiseData = () => {
    let dataArray = [];
    if (ageWiseDataCounts) {
      for (const ageWiseDataCount of ageWiseDataCounts) {
        let data = {
          value: ageWiseDataCount["dataCount"],
          label: ageWiseDataCount["ageAnalysis"]["shortDescription"],
        };
        dataArray.push(data);
      }
      return dataArray;
    }
    return dataArray;
  };

  return (
    <React.Fragment>
      <div className={"col-12 collapse show"}>
        <div className="row mb-3">
          {/* <section className="mx-3"> */}
          <div className="col-12 grid-section">
            <div className="row text-uppercase bg-light justify-content-between font-12">
              <div className="col-12 px-0">
                <div className="card border rounded-0 table-heading pb-3">
                  <div className="card-body p-0">
                    <table className="table mb-0 table-borderless">
                      <thead>
                        <tr>
                          <th></th>
                          {<th>{mainColumn}</th>}
                          {caseStatusWiseColumns &&
                            caseStatusWiseColumns
                              .sort(func.sortByProperty("displaySerial"))
                              .map((caseStatusWiseColumn, key) => (
                                <th key={key}>
                                  {caseStatusWiseColumn.description}
                                </th>
                              ))}
                          <th colSpan="6">Age Analysis</th>
                        </tr>
                        <tr>
                          <th colSpan="8"></th>
                          {ageWiseColumns &&
                            ageWiseColumns
                              .sort(func.sortByProperty("displaySerial"))
                              .map((ageWiseColumn, key) => (
                                <th key={key}>
                                  {ageWiseColumn.shortDescription}
                                </th>
                              ))}
                        </tr>
                      </thead>
                      <tbody>
                        {caseClassificationWiseDataCounts &&
                          caseClassificationWiseDataCounts.map(
                            (caseClassificationWiseDataCount, key) => (
                              <React.Fragment key={key}>
                                <tr>
                                  <td width="30">
                                    <span
                                      className={
                                        "icon-box mdi " +
                                        (clickPlusIcon &&
                                          caseClassificationWiseDataCount
                                            .classification.code == clickPlusIcon
                                          ? "mdi-minus"
                                          : "mdi-plus")
                                      }
                                      onClick={() =>
                                        handleClick(
                                          caseClassificationWiseDataCount
                                            .classification.code
                                        )
                                      }
                                    ></span>
                                  </td>
                                  {/* First Row always visible */}
                                  {
                                    <td key={key}>
                                      {" "}
                                      <strong>
                                        {
                                          caseClassificationWiseDataCount
                                            .classification.description
                                        }
                                      </strong>
                                    </td>
                                  }
                                  {caseClassificationWiseDataCount &&
                                    caseClassificationWiseDataCount.caseStatusWiseDataCounts &&
                                    caseClassificationWiseDataCount.caseStatusWiseDataCounts.map(
                                      (caseStatusWiseDataCount, key) => (
                                        <td
                                          className={
                                            caseStatusWiseDataCount.dataCount ===
                                              0
                                              ? ""
                                              : "underline-text"
                                          }
                                          key={key}
                                          onClick={() =>
                                            caseStatusWiseDataCount.dataCount ===
                                              0
                                              ? null
                                              : openModal(
                                                caseClassificationWiseDataCount
                                                  .classification.code,
                                                null,
                                                caseStatusWiseDataCount
                                                  .caseStatus.code
                                              )
                                          }
                                        >
                                          {func.numberWithCommas(
                                            caseStatusWiseDataCount.dataCount
                                          )}
                                        </td>
                                      )
                                    )}
                                  {caseClassificationWiseDataCount &&
                                    caseClassificationWiseDataCount.ageWiseDataCounts &&
                                    caseClassificationWiseDataCount.ageWiseDataCounts.map(
                                      (ageWiseDataCount, key) => (
                                        <td
                                          key={key}
                                          className={
                                            ageWiseDataCount.dataCount === 0
                                              ? ""
                                              : "underline-text"
                                          }
                                          onClick={() =>
                                            ageWiseDataCount.dataCount === 0
                                              ? null
                                              : openModal(
                                                caseClassificationWiseDataCount
                                                  .classification.code,
                                                null,
                                                ageWiseDataCount.ageAnalysis
                                                  .code
                                              )
                                          }
                                        >
                                          {func.numberWithCommas(
                                            ageWiseDataCount.dataCount
                                          )}
                                        </td>
                                      )
                                    )}
                                </tr>
                                {/* further rows which can be hidden */}
                                {collapse ===
                                  caseClassificationWiseDataCount.classification
                                    .code &&
                                  caseClassificationWiseDataCount &&
                                  caseClassificationWiseDataCount.caseSubClassificationWiseDataCounts &&
                                  caseClassificationWiseDataCount.caseSubClassificationWiseDataCounts.map(
                                    (
                                      caseSubClassificationWiseDataCount,
                                      key
                                    ) => (
                                      <tr key={key}>
                                        <td></td>
                                        <td
                                          onClick={() =>
                                            caseSubClassificationWiseDataCount.dataCount ===
                                              0
                                              ? null
                                              : openModal(
                                                caseClassificationWiseDataCount
                                                  .classification.code,
                                                caseSubClassificationWiseDataCount
                                                  .subClassification.code
                                              )
                                          }
                                        >
                                          {
                                            caseSubClassificationWiseDataCount
                                              .subClassification.description
                                          }
                                        </td>
                                        {caseSubClassificationWiseDataCount.caseStatusWiseDataCounts.map(
                                          (caseStatusWiseDataCount, key) => (
                                            <td
                                              className={
                                                caseStatusWiseDataCount.dataCount ===
                                                  0
                                                  ? ""
                                                  : "underline-text"
                                              }
                                              key={key}
                                              onClick={() =>
                                                caseStatusWiseDataCount.dataCount ===
                                                  0
                                                  ? null
                                                  : openModal(
                                                    caseClassificationWiseDataCount
                                                      .classification.code,
                                                    caseSubClassificationWiseDataCount
                                                      .subClassification.code,
                                                    caseStatusWiseDataCount
                                                      .caseStatus.code
                                                  )
                                              }
                                            >
                                              {func.numberWithCommas(
                                                caseStatusWiseDataCount.dataCount
                                              )}
                                            </td>
                                          )
                                        )}
                                        {caseSubClassificationWiseDataCount.ageWiseDataCounts.map(
                                          (ageWiseDataCount, key) => (
                                            <td
                                              className={
                                                ageWiseDataCount.dataCount === 0
                                                  ? ""
                                                  : "underline-text"
                                              }
                                              key={key}
                                              onClick={() =>
                                                ageWiseDataCount.dataCount === 0
                                                  ? null
                                                  : openModal(
                                                    caseClassificationWiseDataCount
                                                      .classification.code,
                                                    caseSubClassificationWiseDataCount
                                                      .subClassification.code,
                                                    ageWiseDataCount
                                                      .ageAnalysis.code
                                                  )
                                              }
                                            >
                                              {func.numberWithCommas(
                                                ageWiseDataCount.dataCount
                                              )}
                                            </td>
                                          )
                                        )}
                                      </tr>
                                    )
                                  )}
                              </React.Fragment>
                            )
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </section> */}
        </div>
        <div className="row">
          <div className={"col-6 pl-0 pr-2"}>
            <div className="card shadow-sm alert border rounded-0" role="alert">
              <div className={"card-body p-1 "}>
                <div className="row text-center">
                  <div className="col">
                    <ColumnChart chartData={classificationWiseData()} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"col-6 pr-0 pl-2"}>
            <div className="card shadow-sm alert border rounded-0" role="alert">
              <div className={"card-body p-1 "}>
                <div className="row text-center">
                  <div className="col">
                    <PieChart chartData={ageWiseData()} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CasesListByType
        openListModal={openListModal}
        setOpenListModal={setOpenListModal}
        criteriaValues={criteriaValues}
        apiParameters={apiParameters}
        header={header}
        calledFrom={calledFrom}
      />
    </React.Fragment>
  );
};

export default CaseSummary;
