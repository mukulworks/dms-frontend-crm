import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Rolling } from "react-loading-io";
import ServiceJobCard from "./ServiceJobCard/ServiceJobCard";
import SearchResultNavItem from "../SearchResultNavItem/SearchResultNavItem";
import ServiceCaseCard from "./ServiceCaseCard/ServiceCaseCard";
import CaseDataSheet from "../../../../CaseDataSheet/CaseDataSheet";
import NoRecordFound from "../../../../../../../components/Shared/NoRecordFound/NoRecordFound";
import Loader from "../../../../../common/Loader/Loader";

const ServiceSearchResults = ({
  jobCards,
  cases,
  count,
  jobCardsCircularLoader,
  isTagROChecked,
  setIsTagROChecked,
  isControlActive,
  setIsControlActive,
}) => {
  const [isCaseDataSheetActive, setIsCaseDataSheetActive] = useState(false);
  const [caseDataSheetApiReqData, setCaseDataSheetApiReqData] = useState();
  const [activeId, setActiveId] = useState("JobCard");
  React.useEffect(() => {
    setActiveId(
      jobCards?.length > 0 ? "JobCard" : cases?.length > 0 ? "Cases" : "JobCard"
    );
  }, [jobCardsCircularLoader, jobCards, cases]);
  return (
    <React.Fragment>
      {/* <div className="col-5"> */}
      <div className="card h-100">
        <div className="card-header">
          Search Results - Job Cards
          <div className="float-right text-muted">
            {count.totalRecords ? count.totalRecords : "-"}
          </div>
        </div>
        <div
          className="card-body border h-100 bg-white p-2 accordion show "
          id="accordionExample"
        >
          <div className="result-tab">
            <ul
              className="nav nav-pills nav-fill nav-tabs m-0"
              id="myTab"
              role="tablist"
            >
              <SearchResultNavItem
                name={"Job Card"}
                id="JobCard"
                isActive={activeId == "JobCard"}
                counts={count.jobCardsCount}
                setActiveId={setActiveId}
              />
              <SearchResultNavItem
                name={"Cases"}
                id="Cases"
                isActive={activeId == "Cases"}
                counts={count.casesCount}
                setActiveId={setActiveId}
              />
            </ul>
            {jobCardsCircularLoader ? (
              <Loader />
            ) : (
              <div className="tab-content" id="myTabContent">
                {activeId == "JobCard" ? (
                  jobCards && jobCards.length > 0 ? (
                    <ServiceJobCard
                      name="Job Card"
                      id="JobCard"
                      listData={jobCards}
                      isActive={true}
                      isControlActive={isControlActive}
                      setIsControlActive={setIsControlActive}
                      isTagROChecked={isTagROChecked}
                      setIsTagROChecked={setIsTagROChecked}
                    />
                  ) : jobCards?.length == 0 ? (
                    <div id="JobCard" role="tabpanel">
                      <NoRecordFound message="No Job Card Exists" />
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                {activeId == "Cases" ? (
                  cases && cases.length > 0 ? (
                    <ServiceCaseCard
                      name={"Cases"}
                      id="Cases"
                      listData={cases}
                      isActive={true}
                      setIsCaseDataSheetActive={setIsCaseDataSheetActive}
                      setCaseDataSheetApiReqData={setCaseDataSheetApiReqData}
                      setActiveId={setActiveId}
                    />
                  ) : cases?.length == 0 ? (
                    <div id="Cases" role="tabpanel">
                      <NoRecordFound message="No Case Card Exists" />
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
      <CaseDataSheet
        isCaseDataSheetActive={isCaseDataSheetActive}
        setIsCaseDataSheetActive={setIsCaseDataSheetActive}
        caseDataSheetApiReqData={caseDataSheetApiReqData}
      />
    </React.Fragment>
  );
};

export default ServiceSearchResults;
