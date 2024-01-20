import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Rolling } from "react-loading-io";

const InboundDetails = ({ openInboundDetails, setOpenInboundDetails }) => {
  const { caseFollowUps } = useSelector((state) => {
    return state.inboundReducer.inboundModel;
  });

  const { isCircularLoading } = useSelector((state) => {
    let isCircularLoading = state.inboundReducer.isCircularLoading;
    return {
      isCircularLoading: isCircularLoading,
    };
  });

  return (
    <div className={"popup-followup " + (openInboundDetails ? "" : " d-none")}>
      <div className="card">
        <div className="card-header">
          <ul className="nav justify-content-between bg-light popup-followup-heading">
            <li className="nav-item">
              <span>Follow Up(s) for Case</span>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setOpenInboundDetails(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="card-body p-0 overflow-height">
        <table className="table text-center mb-0">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Follow-Up Date</th>
              <th>By</th>
              <th>Next Follow-Up Due Date</th>
              <th>Call Status</th>
              <th>Status</th>
              <th>Next FUP Date</th>
            </tr>
          </thead>
          <tbody>
            {isCircularLoading ? (
              <Rolling size={30} thickness={5} speed={0.8} color="#42bd3b" />
            ) : caseFollowUps.length > 0 ? (
              caseFollowUps.map((caseFollowUp, key) => (
                <>
                  <tr key={key}>
                    <td>
                      <div>
                        <a style={{ color: "#007bff" }}>{key + 1}.</a>
                      </div>
                    </td>
                    <td>
                      <span>
                        {caseFollowUp.fupDate === null
                          ? "-"
                          : moment(caseFollowUp.fupDate).format(
                              "DD-MMM-YYYY HH:mm"
                            )}
                      </span>
                    </td>
                    <td>
                      <span>{caseFollowUp.byCompany}</span>
                    </td>
                    <td>
                      <span>
                        {caseFollowUp.fupDueDatetime === null
                          ? "-"
                          : moment(caseFollowUp.fupDueDatetime).format(
                              "DD-MMM-YYYY HH:mm"
                            )}
                      </span>
                    </td>
                    <td>
                      <span>
                        {caseFollowUp.fupCallConnected === "Y"
                          ? "Call Connected"
                          : "Call not Connected"}
                      </span>
                    </td>
                    <td>
                      <span>{caseFollowUp.fupStatus}</span>
                    </td>
                    <td>
                      <span>
                        {caseFollowUp.fupNextDueDatetime === null
                          ? "-"
                          : moment(caseFollowUp.fupNextDueDatetime).format(
                              "DD-MMM-YYYY HH:mm"
                            )}
                      </span>
                    </td>
                  </tr>
                  <tr key={key}>
                    <td colspan="7" className="fupText">
                      <span>
                        <i>{caseFollowUp.fupText}</i>
                      </span>
                    </td>
                  </tr>
                </>
              ))
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InboundDetails;
