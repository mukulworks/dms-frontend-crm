import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as types from "../../../../store/actions/index";
import * as constants from "../../../../../utils/constant";
import { fetchScreenData } from "../../../../store/services/ReportsServices/reportsServices";

const excelReport = (WrappedComponent) => {
  const ExcelReport = (props) => {
    let { criteriaValues } = props;

    const dispatch = useDispatch();
    const [reportSummaryData, setReportSummaryData] = useState();

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

      if (criteriaValues?.reportType) {
        let payload = {
          type: departmentType === null ? "SALES" : departmentType,
          data: criteriaValues,
        };
        dispatch({ type: types.SHOW_LOADER });
        let apiData = fetchScreenData(payload);
        apiData
          .then((res) => {
            dispatch({ type: types.HIDE_LOADER });

            setReportSummaryData(res);

            dispatch({ type: types.HIDE_LOADER });
          })
          .catch(() => {
            if (error) dispatch({ type: types.HIDE_LOADER });
          });
      }
    }, [criteriaValues]);
    return (
      <WrappedComponent
        reportSummaryData={reportSummaryData}
        criteriaValues={criteriaValues}
      />
    );
  };

  return ExcelReport;
};

export default excelReport;
