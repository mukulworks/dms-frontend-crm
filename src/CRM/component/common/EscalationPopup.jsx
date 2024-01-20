import { createPortal } from "react-dom";
import { escalationSagaService } from "../../store/services/inboundServices";
export const EscalationPopup = (props) => {
  const { handlePopupCancel, type, caseID, setIsReFetchListing } = props;
  const handleApprove = () => {
    escalationSagaService({
      CaseUniqueId: caseID,
      Status: "C",
    });
    setIsReFetchListing(true);
    handlePopupCancel();
  };
  const handleInitateSubmit = () => {
    escalationSagaService({
      CaseUniqueId: caseID,
      Status: "I",
    });
    setIsReFetchListing(true);
    handlePopupCancel();
  };
  const handleReject = () => {
    escalationSagaService({
      CaseUniqueId: caseID,
      Status: "X",
    });
    setIsReFetchListing(true);
    handlePopupCancel();
  };
  return (
    <>
      {createPortal(
        type == "ESCALATION_HOLD_INITIATE" ? (
          <>
            <div
              className={`modal fade show`}
              id="EscalationHoldRequestModal"
              tabindex="-1"
              aria-labelledby="EscalationHoldRequestModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h6
                      className="modal-title"
                      id="EscalationHoldRequestModalLabel"
                    >
                      {" "}
                      Escalation Hold Request for case - ID : {caseID}
                    </h6>
                  </div>
                  <div className="modal-body">
                    <div class="form-group form-check">
                      <label class="form-check-label" for="HoldEscalation">
                        Click submit to generate Escalation Hold Request{" "}
                      </label>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary mx-3"
                      data-dismiss="modal"
                      onClick={handlePopupCancel}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleInitateSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* <button type="submit" onClick={handleInitateSubmit}>Submit</button>
          <button onClick={handlePopupCancel}>Close</button> */}
          </>
        ) : (
          <>
            <div
              className={`modal fade show`}
              id="HoldEscalationModal"
              tabindex="-1"
              aria-labelledby="HoldEscalationModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h6 className="modal-title" id="HoldEscalationModalLabel">
                      {" "}
                      Escalation Hold Request for case - ID : {caseID}
                    </h6>
                  </div>
                  <div className="modal-body">
                    Hold Escalation
                    <button
                      type="submit"
                      className="btn btn-success mx-3"
                      onClick={handleApprove}
                    >
                      Approve
                    </button>
                    <button
                      type="submit"
                      className="btn btn-outline-success"
                      onClick={handleReject}
                    >
                      Dis-Approve
                    </button>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-success"
                      data-dismiss="modal"
                      onClick={handlePopupCancel}
                    >
                      Close
                    </button>
                    {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <button onClick={handlePopupCancel}>Close</button> */}
          </>
        ),
        document.getElementById("modal-container")
      )}
    </>
  );
};
