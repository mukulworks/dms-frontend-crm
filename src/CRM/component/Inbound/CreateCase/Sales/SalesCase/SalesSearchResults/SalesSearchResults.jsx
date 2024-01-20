import React, { useState } from "react";
import { Rolling } from "react-loading-io";
import SalesCard from "./SalesCard/SalesCard";
import SearchResultNavItem from "../SearchResultNavItem/SearchResultNavItem";
import CaseDataSheet from "../../../../CaseDataSheet/CaseDataSheet";
import * as constants from "../../../../../../../utils/constant";
import NoRecordFound from "../../../../../../../components/Shared/NoRecordFound/NoRecordFound";
import ProspectCard from "./ProspectCard/ProspectCard";
import OrderCard from "./OrderCard/OrderCard";
import Loader from "../../../../../common/Loader/Loader";

const SalesSearchResults = ({
  prospectList,
  orderList,
  caseList,
  counts,
  isCircularLoading,
  isControlActive,
  setIsControlActive,
}) => {
  const [isCaseDataSheetActive, setIsCaseDataSheetActive] = useState(false);
  const [caseDataSheetApiReqData, setCaseDataSheetApiReqData] = useState();
  const [activeId, setActiveId] = useState(constants.PROSPECTS);
  React.useEffect(() => {
    setActiveId(
      prospectList?.length > 0
        ? constants.PROSPECTS
        : orderList?.length > 0
        ? constants.ORDERS
        : caseList?.length > 0
        ? constants.CASES
        : constants.PROSPECTS
    );
  }, [isCircularLoading, prospectList, orderList, caseList]);

  return (
    <React.Fragment>
      <div className="card h-100">
        <div className="card-header">
          Search Results - Prospects, Customers and Cases
          <div className="float-right text-muted">
            {counts.totalRecords ? counts.totalRecords : "-"}
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
                id={constants.PROSPECTS}
                name="Prospects"
                counts={counts?.prospectCounts}
                isActive={activeId == constants.PROSPECTS}
                setActiveId={setActiveId}
              />
              <SearchResultNavItem
                id={constants.ORDERS}
                name="Orders"
                counts={counts?.orderCounts}
                isActive={activeId == constants.ORDERS}
                setActiveId={setActiveId}
              />
              <SearchResultNavItem
                id={constants.CASES}
                name="Cases"
                counts={counts?.caseCounts}
                isActive={activeId == constants.CASES}
                setActiveId={setActiveId}
              />
            </ul>
            {isCircularLoading ? (
              <Loader />
            ) : (
              <div>
                {activeId == constants.PROSPECTS ? (
                  prospectList && prospectList.length > 0 ? (
                    <ProspectCard
                      id={constants.PROSPECTS}
                      listData={prospectList}
                      isActive={true}
                    />
                  ) : prospectList?.length == 0 ? (
                    <div id={constants.PROSPECTS} role="tabpanel">
                      <NoRecordFound message="No Prospects Found" />
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                {activeId == constants.ORDERS ? (
                  orderList && orderList.length > 0 ? (
                    <OrderCard
                      id={constants.ORDERS}
                      listData={orderList}
                      isActive={true}
                    />
                  ) : orderList?.length == 0 ? (
                    <div id={constants.ORDERS} role="tabpanel">
                      <NoRecordFound message="No Orders Found" />
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                {activeId == constants.CASES ? (
                  caseList && caseList.length > 0 ? (
                    <SalesCard
                      id={constants.CASES}
                      listData={caseList}
                      isActive={true}
                      isCaseDataSheetActive={isCaseDataSheetActive}
                      setIsCaseDataSheetActive={setIsCaseDataSheetActive}
                      setCaseDataSheetApiReqData={setCaseDataSheetApiReqData}
                    />
                  ) : caseList?.length == 0 ? (
                    <div id={constants.CASES} role="tabpanel">
                      <NoRecordFound message="No Cases Found" />
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
      <CaseDataSheet
        isCaseDataSheetActive={isCaseDataSheetActive}
        setIsCaseDataSheetActive={setIsCaseDataSheetActive}
        caseDataSheetApiReqData={caseDataSheetApiReqData}
      />
    </React.Fragment>
  );
};

export default SalesSearchResults;
