import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import SelectWithVal from "../../../../../../common/Select/SelectWithVal";
import * as constants from "../../../../../../../../utils/constant";
import { fetchDealerOutletInfo } from "../../../../../../../store/actions/inboundActions";

const AllotedDealer = ({
  isAllotedControlActive,
  setIsAllotedControlActive,

  selectedJobCard,
}) => {
  const [selectedAllotedDealer, setSelectedAllotedDealer] = useState(null);
  const dispatch = useDispatch();
  const { register, errors } = useFormContext();
  const [outlet, setOutlet] = useState("");
  const hasError = (inputName) =>
    Boolean(
      errors && errors["allotedDealer"] && errors["allotedDealer"][inputName]
    );
  const {
    dealers,
    selectedJobCardDealer,
    selectedJobCardOutlet,
    selectedOutletsList,
  } = useSelector((state) => {
    let jobCards = state.inboundReducer.inboundModel.customerHistory?.jobCards;
    let selectedJobCard = state.inboundReducer?.selectedJobCard;
    let dealers = state.inboundReducer.inboundModel.createNewCase?.dealers;

    let selectedJobCardDealer;
    let selectedJobCardOutlet;
    let selectedOutletsList;
    if (selectedJobCard && jobCards) {
      let jobCard = jobCards.find(
        (x) => x.cardMasterSerial === selectedJobCard.cardMasterSerial
      );
      selectedJobCardDealer = jobCard?.companyCode;
      selectedJobCardOutlet = jobCard?.cardLocation;

      if (selectedJobCardDealer) {
        selectedOutletsList = dealers.find(
          (x) => x.dealerCode === selectedJobCardDealer
        )?.outets;
      }

      //if selectedOutletlist is not in the outlet list then take the first item
      if (selectedOutletsList) {
        let outlet = selectedOutletsList.find(
          (x) => x.branchCode === selectedJobCardOutlet
        );

        if (outlet === null || outlet === undefined) {
          let branch = selectedOutletsList.slice(0, 1)[0];
          selectedJobCardOutlet = branch?.branchCode;
        }
      }
    }

    return {
      dealers: dealers,
      selectedJobCardDealer: selectedJobCardDealer,
      selectedJobCardOutlet: selectedJobCardOutlet,
      selectedOutletsList: selectedOutletsList,
    };
  });

  const [outletList, setOutletList] = useState();
  useEffect(() => {
    let e = { target: { value: selectedJobCard?.listD?.companyCode } };
    handleDealer(e);
    e = { target: { value: selectedJobCard?.listD?.cardLocation } };
    handleOutlet(e);
  }, [selectedJobCard]);
  const handleDealer = (e) => {
    let outlet = [];
    if (e.target.value !== "") {
      let dealerCode = e.target.value;

      if (dealers.length > 0) {
        outlet = dealers.find((dealer) => {
          return dealer.dealerCode === dealerCode;
        })?.outets;
      }

      setSelectedAllotedDealer((selectedAllotedDealer) => {
        return {
          ...selectedAllotedDealer,
          allotedDealer: dealerCode,
          allotedOutlet: outlet?.branchCode,
        };
      });

      setOutletList(outlet);
    } else {
      setOutletList([]);
    }
  };

  const handleOutlet = (e) => {
    if (e.target.value !== "") {
      let outletCode = e.target.value;
      setSelectedAllotedDealer((selectedAllotedDealer) => {
        return {
          ...selectedAllotedDealer,
          allotedOutlet: outletCode,
        };
      });
    }
  };
  useEffect(() => {
    setOutlet(selectedJobCardOutlet);
    setOutletList(selectedOutletsList);
  }, [selectedJobCardOutlet]);

  const selectListOptions = (selectCode) => {
    let list;
    switch (selectCode) {
      case constants.DEALER:
        list =
          dealers &&
          dealers.map((dealer, key) => (
            <option value={dealer.dealerCode} key={key}>
              {dealer.dealerName}
            </option>
          ));

        return list;
      case constants.OUTLET:
        list =
          outletList &&
          outletList.map((outlet, key) => (
            <option value={outlet.branchCode} key={key}>
              {outlet.branchName}
            </option>
          ));
        return list;
      default:
        return null;
    }
  };

  const handleDealerOutletInfo = () => {
    let payload = {
      dealer: selectedAllotedDealer.allotedDealer,
      outlet: selectedAllotedDealer.allotedOutlet,
    };
    setIsAllotedControlActive(!isAllotedControlActive);
    dispatch(fetchDealerOutletInfo(payload));
  };

  return (
    <div className="card ">
      <div className="card-header">Alloted Dealer</div>
      <div className="card-body p-1">
        <SelectWithVal
          label="Dealer"
          name="allotedDealer.allotedDealerCode"
          id="allotedDealer.allotedDealerCode"
          selectClassName={
            "form-control" +
            (hasError("allotedDealerCode") ? " is-invalid" : "")
          }
          emptyOption="Select Dealer"
          star="star"
          selectList={selectListOptions(constants.DEALER)}
          customRef={register({ required: true })}
          onChangeFunction={handleDealer}
          defaultValue={selectedAllotedDealer?.allotedDealer}
        />
        <div className="row is-invalid">
          <div className="col-10">
            <SelectWithVal
              label="Outlet"
              name="allotedDealer.allotedOutletCode"
              id="allotedDealer.allotedOutletCode"
              selectClassName={
                "form-control" +
                (hasError("allotedOutletCode") ? " is-invalid" : "")
              }
              star="star"
              emptyOption="Select Outlet"
              selectList={selectListOptions(constants.OUTLET)}
              customRef={register({ required: true })}
              onChangeFunction={handleOutlet}
              defaultValue={selectedAllotedDealer?.allotedOutlet}
            />
          </div>
          <div className="col-1 px-0 text-center">
            <button
              onClick={handleDealerOutletInfo}
              className="btn btn-success ml-2 p-1 search-allotedDealer-button"
              type="button"
              name=""
              id="allotedDealerSearchButtons"
            >
              🔍
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllotedDealer;
