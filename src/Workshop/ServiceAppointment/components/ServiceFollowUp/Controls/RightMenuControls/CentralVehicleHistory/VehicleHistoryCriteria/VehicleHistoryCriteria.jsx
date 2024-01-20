import React from "react";
import CriteriaArrow from "../../../../../../../../images/criteria-arrow.png";

const VehicleHistoryCriteria = ({
  submitCriteria,
  isOpen,
  toggleCriteria,
  errorMessage,
  isRequired,
}) => {
  return (
    <React.Fragment>
      <aside className={isOpen ? "" : "small-without-menu"}>
        <div className={isOpen ? "card" : " d-none"}>
          <div className="card-body px-0 pt-2 pb-0">
            <p className="card-title font-13 px-3 text-capitalize mb-1 font-weight-bold criteria-right-arrow">
              please select your criteria{" "}
              <span
                className="mdi mdi-chevron-double-left font-20 float-right"
                onClick={() => toggleCriteria()}
              ></span>
            </p>
            <hr className="mt-2" />
            <form>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="row form-group">
                    <div className="col-4 pt-1 pr-0">
                      <label htmlFor="">Identification</label>
                    </div>
                    <div className="col-8">
                      <select
                        name="identification"
                        id="identification"
                        className="form-control"
                      >
                        <option value="C">Chassis</option>
                        <option value="R">Registration</option>
                        <option value="E">Engine</option>
                      </select>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row form-group">
                    <div className="col-4 pt-1 pr-0">
                      <label htmlFor="">Value</label>
                    </div>
                    <div className="col-8">
                      <input
                        name="criteriaType"
                        className={
                          "form-control" + (isRequired ? " is-invalid" : "")
                        }
                      />
                    </div>
                  </div>
                  {/* <div className="invalid-feedback">{errorMessage}</div> */}
                  <div>{errorMessage}</div>
                </li>
              </ul>
              <div className="p-3">
                <button
                  onClick={(e) => submitCriteria(e)}
                  type="button"
                  name=""
                  className="btn btn-danger btn-lg btn-block rounded-0"
                >
                  Proceed
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className={(isOpen ? "d-none " : "") + " criteria-button"}>
          <a onClick={() => toggleCriteria()}>
            <img src={CriteriaArrow} alt="" />
          </a>
        </div>
      </aside>
    </React.Fragment>
  );
};

export default VehicleHistoryCriteria;
