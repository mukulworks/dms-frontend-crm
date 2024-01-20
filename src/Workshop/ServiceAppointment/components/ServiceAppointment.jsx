import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Criteria from "./Criteria/Criteria";
import { fetchServiceAppointmentCriteria } from "../store/actions/serviceAppointmentAction";
import FupListingHeader from "./FupListing/FupListingHeader";
import FupListing from "./FupListing/FupListing";
import FupDetail from "./FupListing/FupDetail/FupDetail";
import DataPoolMain from "./DataPoolMain/DataPoolMain";
import NoRecordFound from "../../../components/Shared/NoRecordFound/NoRecordFound";
import CalendarView from "./CalendarView/CalendarView";
import useUserContext from "../../../Hooks/useUserContext";
const ServiceAppointment = () => {
  const [header, setHeader] = useState({
    brandDesc: "",
    countryDesc: "",
    eventDesc: "",
    dealerDesc: "",
  });
  const [isFupModalOpen, setFupModalOpen] = useState(false);
  const [vin, setVin] = useState();
  const callFolloUpHistory = (vinNum) => {
    setVin(vinNum);
    setFupModalOpen(true);
  };

  const [isCriteriaOpen, setCriteriaOpen] = useState(false);
  const userContext = useUserContext();

  const dispatch = useDispatch();
  useEffect(() => {
    let brand = userContext.userDetail.brandCode;
    let country = userContext.userDetail.countryCode;
    let dealer = userContext.userDetail.userContext.companyCode;
    let data = { brand, country, dealer };
    dispatch(fetchServiceAppointmentCriteria(data));
  }, []);
  const { criteriaModel, isLoading, dataPools } = useSelector((state) => {
    let brands =
      state.serviceAppointment.serviceAppointmentModel.criteriaModel.brands;
    let country =
      state.serviceAppointment.serviceAppointmentModel.criteriaModel.country;
    let dealers =
      state.serviceAppointment.serviceAppointmentModel.criteriaModel.dealers;
    let branchs =
      state.serviceAppointment.serviceAppointmentModel.criteriaModel.branchs;
    let events =
      state.serviceAppointment.serviceAppointmentModel.criteriaModel.events;
    let viewTypes =
      state.serviceAppointment.serviceAppointmentModel.criteriaModel.viewTypes;
    let months =
      state.serviceAppointment.serviceAppointmentModel.criteriaModel.months;
    let years =
      state.serviceAppointment.serviceAppointmentModel.criteriaModel.years;
    let caller =
      state.serviceAppointment.serviceAppointmentModel.criteriaModel.caller;
    let dataPoolModel =
      state.serviceAppointment.serviceAppointmentModel.dataPoolModel;

    return {
      criteriaModel: {
        brands: brands,
        country: country,
        dealers: dealers,
        branchs: branchs,
        events: events,
        viewTypes: viewTypes,
        months: months,
        years: years,
        callers: caller,
      },
      isLoading: state.serviceAppointment.isLoading,
      dataPools: dataPoolModel.dataPools,
    };
  });

  const bindCriteria = (selectedCriteriaProps) => {
    let selectedBrandDesc = criteriaModel.brands.find(
      (x) => x.code === selectedCriteriaProps.brandCode
    ).description;
    let selectedCountryDesc = criteriaModel.country.find(
      (x) => x.code === selectedCriteriaProps.countryCode
    ).description;
    let selectedEventDesc = criteriaModel.events.find(
      (x) => x.code === selectedCriteriaProps.eventId
    ).description;
    //let selectedDealerDesc = criteriaModel.dealers.find(x => x.code === selectedCriteriaProps.dealerId).description;
    let selectedBranchDesc = criteriaModel.branchs.find(
      (x) => x.branchCode === selectedCriteriaProps.branchCode
    ).branchName;
    let selectedMonthName = criteriaModel.months.find(
      (x) => x.code === parseInt(selectedCriteriaProps.month)
    ).description;
    let callerName = criteriaModel.callers.find(
      (x) => x.code === selectedCriteriaProps.callerId
    ).name;
    let viewTypeCode = selectedCriteriaProps.viewType;
    let year = selectedCriteriaProps.year;
    let headerDesc = selectedCriteriaProps.headerDesc;
    setHeader({
      brandDesc: selectedBrandDesc,
      countryDesc: selectedCountryDesc,
      eventDesc: selectedEventDesc,
      dealerDesc: selectedBranchDesc,
      monthYearDesc: selectedMonthName + " " + year,
      selectedMonthCode: selectedCriteriaProps.month,
      viewTypeCode: viewTypeCode,
      callerName: callerName,
      headerDesc: headerDesc,
    });
  };

  if (criteriaModel.brands == undefined) return null;

  return (
    <div>
      <Criteria
        bindCriteria={bindCriteria}
        criteriaModel={criteriaModel}
        isCriteriaOpen={isCriteriaOpen}
        setCriteriaOpen={setCriteriaOpen}
      />
      {header.viewTypeCode !== "CALENDAR" ? (
        dataPools.length > 0 ? (
          <div
            className={
              "section" +
              (isLoading ? " d-none" : "") +
              (isCriteriaOpen ? " criteria-width" : "")
            }
          >
            {/* <DataPoolMain /> */}
            <section className="border mx-1">
              <div className="col-12">
                <FupListingHeader headerData={header} />
                <div className="row justify-content-between">
                  <div className="col-12 col-sm-12 col-md-auto page-title pt-1">
                    <h1 className="d-inline-block" id="dealerName">
                      Vehicles where Most Recent Service was at our Dealership
                    </h1>
                    <a
                      href=""
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="mdi mdi-dots-horizontal"></span>
                    </a>
                    <div className="dropdown-menu item-style">
                      <a className="dropdown-item" href="">
                        Vehicles where Most Recent Service was at our
                        Dealership​
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="">
                        Vehicles where Most Recent Service was at other
                        Dealerships in our Territory (NCR)​
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="">
                        Vehicles where Most Recent Service was in a Territory
                        other than NCR​
                      </a>
                    </div>
                  </div>
                </div>
                <hr className="my-0" />
                <div className="row">
                  <div className="col-12 pl-1 pr-1">
                    <div id="grid" className="mb-1 clearfix">
                      <FupListing callFolloUpHistory={callFolloUpHistory} />
                    </div>
                  </div>
                </div>
                <FupDetail
                  isFupModalOpen={isFupModalOpen}
                  setFupModalOpen={setFupModalOpen}
                  vin={vin}
                />
              </div>
            </section>
          </div>
        ) : (
          <div
            className={
              "section" +
              (isLoading ? " d-none" : "") +
              (isCriteriaOpen ? " criteria-width" : "")
            }
          >
            <section className="border mx-1">
              <NoRecordFound />
            </section>
          </div>
        )
      ) : (
        <CalendarView
          month={header.selectedMonthCode}
          headerData={header}
          isCriteriaOpen={isCriteriaOpen}
        />
      )}
    </div>
  );
};

export default ServiceAppointment;
