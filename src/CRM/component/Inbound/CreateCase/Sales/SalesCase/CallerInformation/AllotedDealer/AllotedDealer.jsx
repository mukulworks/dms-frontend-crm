import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormContext } from "react-hook-form";
import Select from "../../../../../../common/Select/Select";
import SelectWithVal from "../../../../../../common/Select/SelectWithVal";
import * as constants from "../../../../../../../../utils/constant";
import { fetchDealerOutletInfo } from "../../../../../../../store/actions/inboundActions";

const AllotedDealer = ({
  dealers,
  isAllotedControlActive,
  setIsAllotedControlActive,
  stateCode,
}) => {
  const [selectedAllotedDealer, setSelectedAllotedDealer] = useState(null);
  const [outletList, setOutletList] = useState();
  const dispatch = useDispatch();
  const { register, errors, setValue } = useFormContext();
  const hasError = (inputName) =>
    Boolean(
      errors && errors["allotedDealer"] && errors["allotedDealer"][inputName]
    );

  useEffect(() => {
    setValue("allotedDealer.allotedDealerCode", "");
    setValue("allotedDealer.allotedOutletCode", "");

    setSelectedAllotedDealer((selectedAllotedDealer) => {
      return {
        ...selectedAllotedDealer,
        allotedOutlet: "",
      };
    });
  }, [stateCode]);
  const handleDealer = (e) => {
    let outlet = [];
    if (e.target.value !== "") {
      let dealerCode = e.target.value;

      if (dealers.length > 0) {
        outlet = dealers.find((dealer) => {
          return dealer.dealerCode === dealerCode;
        }).outets;
      }

      setSelectedAllotedDealer((selectedAllotedDealer) => {
        return {
          ...selectedAllotedDealer,
          allotedDealer: dealerCode,
          allotedOutlet: outlet.branchCode,
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

  const selectListOptions = (selectCode) => {
    let list;
    switch (selectCode) {
      case constants.DEALER:
        if (stateCode) {
          //the stateCode code is set on click of Job Card
          let stateWiseDealer =
            dealers && dealers.filter((x) => x.stateCode === stateCode);
          //show dealers on the basis of selected state code
          list =
            stateWiseDealer &&
            stateWiseDealer.map((dealer, key) => (
              <option value={dealer.dealerCode} key={key}>
                {dealer.dealerName}
              </option>
            ));
          //if dealer doesn't exist in the selected state then all dealers should be rendered
          if (stateWiseDealer?.length === 0) {
            list =
              dealers &&
              dealers.map((dealer, key) => (
                <option value={dealer.dealerCode} key={key}>
                  {dealer.dealerName}
                </option>
              ));
          }
        } else {
          //show dealers while loading the page
          list =
            dealers &&
            dealers.map((dealer, key) => (
              <option value={dealer.dealerCode} key={key}>
                {dealer.dealerName}
              </option>
            ));
        }
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
    setIsAllotedControlActive(true);
    dispatch(fetchDealerOutletInfo(payload));
  };

  const validate = {
    allotedDealer: {
      allotedDealerCode: {
        required: true,
      },
      allotedOutletCode: {
        required: true,
      },
    },
  };

  return (
    <div className="card">
      <div className="card-header">Alloted Dealer</div>
      <div className="card-body p-1">
        <Select
          label="Dealer"
          name="allotedDealer.allotedDealerCode"
          id="allotedDealer.allotedDealerCode"
          selectClassName={
            "form-control" +
            (hasError("allotedDealerCode") ? " is-invalid" : "")
          }
          star="star"
          emptyOption="Select Dealer"
          selectList={selectListOptions(constants.DEALER)}
          customRef={register(validate.allotedDealer.allotedDealerCode)}
          onChangeFunction={handleDealer}
        />
      </div>
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
            customRef={register(validate.allotedDealer.allotedOutletCode)}
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
  );
};

export default AllotedDealer;
