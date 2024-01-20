import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import OutboundHeader from "../Outbound/OutboundHeader/OutboundHeader";
import Criteria from "./Criteria/Criteria";
import { fetchReportsCriteria } from "../../store/services/ReportsServices/reportsServices";
import CaseSummary from "./Main/CaseSummary/CaseSummary";
import CRMExcel from "./Main/CRMExcel/CRMExcel";
import CRMRegister from "./Main/CRMRegister/CRMRegister";
import QFBData from "./Main/QFBData/QFBData";
import CXDataDump from "./Main/CXDataDump/CXDataDump";
import CXSurveyReport from "./Main/CXSurveyReport/CXSurveyReport";
import InboundHeader from "../Inbound/InboundHeader/InboundHeader";
import * as constants from "../../../utils/constant";
import * as types from "../../store/actions/index";

const Reports = (props) => {
  const dispatch = useDispatch();
  const pathnames = location.pathname.split("/");
  const prevPath =
    "/" +
    pathnames[pathnames.length - 2] +
    "/" +
    pathnames[pathnames.length - 1];
  const [isCriteriaOpen, setIsCriteriaOpen] = useState(true);
  const [criteriaObjects, setCriteriaObjects] = useState([]);
  const [criteriaValues, setCriteriaValues] = useState();
  const [header, setHeader] = useState();
  const [criteriaType, setCriteriaType] = useState("");
  const [listType, setListType] = useState("");
  const [resetStatus, setResetStatus] = useState(0);
  useEffect(() => {
    dispatch({ type: types.SHOW_LOADER });

    let type = null;
    let caseType = "";
    switch (prevPath) {
      case "/CRMREPORTS/INDEX":
        type = constants.CASE_SUMMARY;
        caseType = constants.CASE_SALES_SUMMARY;
        setListType("CASE SUMMARY");
        setCriteriaType(constants.CASE_SUMMARY);
        break;
      case "/CRMREPORTS/Service":
        type = constants.CASE_SUMMARY;
        caseType = constants.CASE_SERVICE_SUMMARY;
        setListType("SERVICE CASE SUMMARY");
        setCriteriaType(constants.CASE_SUMMARY);
        break;
      case "/CRMREPORTS/ServiceExcel":
        type = constants.CASE_REGISTER;
        caseType = constants.CASE_REGISTER;
        setListType("CRM REGISTER");
        setCriteriaType(constants.CASE_REGISTER);
        break;
      case "/CRMREPORTS/SurveyExcelReport":
        caseType = constants.SCX_CASE_SUMMARY;
        setListType("CX - DATA DUMP");
        type = constants.SCX_CASE_SUMMARY;
        break;
      case "/CRMREPORTS/CxSurveyExcelReport":
        caseType = constants.SCX_SURVEY_SUMMARY;
        setListType("CX - SURVEY REPORT");
        type = constants.SCX_SURVEY_SUMMARY;
        break;
      case "/CRMREPORTS/QFBData":
        caseType = constants.QFB_SUMMARY;
        type = constants.QFB_SUMMARY;
        break;
      case "/CRMREPORTS/ExcelReportCriteria":
        caseType = constants.CASE_INBOUND_EXCEL;
        setListType("CRM EXCEL");
        type = constants.CASE_INBOUND_EXCEL;
        break;
      default:
        caseType = constants.CASE_SALES_SUMMARY;
        setListType("CASE SUMMARY");
        break;
    }

    let data = fetchReportsCriteria(caseType);
    Promise.resolve(data)
      .then((res) => {
        setCriteriaObjects(res);
        dispatch({ type: types.HIDE_LOADER });
      })
      .catch((error) => {
        dispatch({ type: types.HIDE_LOADER });
      });
  }, [prevPath]);

  const bindCriteria = (payload, headerData) => {
    if (payload) {
      setCriteriaValues(payload);
    }
    if (headerData) {
      setHeader(headerData);
    }
    if (payload === "RESET") {
      setCriteriaValues();
      setResetStatus((prevState) => prevState + 1);
    }
  };

  return (
    <div>
      <Criteria
        isCriteriaOpen={isCriteriaOpen}
        setIsCriteriaOpen={setIsCriteriaOpen}
        criteriaObjects={criteriaObjects?.screenCriteria?.criteriaObjects}
        bindCriteria={bindCriteria}
        criteriaType={criteriaType}
        prevPath={prevPath}
        resetStatus={resetStatus}
      />
      <div className={"section" + (isCriteriaOpen ? "" : " criteria-width")}>
        <InboundHeader listType={listType} header={header} />
        {criteriaValues && (
          <div className="mt-3 reports">
            <div className="row mx-2">
              <div className="col-12 p-0">
                {prevPath === "/CRMREPORTS/INDEX" ||
                prevPath === "/CRMREPORTS/Service" ? (
                  <CaseSummary
                    criteriaValues={criteriaValues}
                    header={header}
                    calledFrom={
                      prevPath === "/CRMREPORTS/INDEX" ? "SALES" : "SERVICE"
                    }
                  />
                ) : prevPath === "/CRMREPORTS/ExcelReportCriteria" ? (
                  <CRMExcel criteriaValues={criteriaValues} />
                ) : prevPath === "/CRMREPORTS/ServiceExcel" ? (
                  <CRMRegister criteriaValues={criteriaValues} />
                ) : prevPath === "/CRMREPORTS/QFBData" ? (
                  <QFBData criteriaValues={criteriaValues} />
                ) : prevPath === "/CRMREPORTS/SurveyExcelReport" ? (
                  <CXDataDump criteriaValues={criteriaValues} />
                ) : prevPath === "/CRMREPORTS/CxSurveyExcelReport" ? (
                  <CXSurveyReport criteriaValues={criteriaValues} />
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
