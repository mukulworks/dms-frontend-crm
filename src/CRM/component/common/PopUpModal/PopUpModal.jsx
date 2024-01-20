import React from "react";
import { Link, useHistory } from "react-router-dom";

const PopUpModal = ({ show, image, pathname, calledFrom, caseType }) => {
  let history = useHistory();

  const customStyle = {
    show: {
      display: "block",
      paddingRight: "17px",
    },
    hide: {
      display: "block",
    },
  };
  return (
    <React.Fragment>
      <div
        className={"modal fade " + (show ? "show" : "")}
        id="alreadyModifiedModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={show}
        aria-modal={show}
        style={show ? customStyle.show : customStyle.hide}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-body text-center p-5">
              {image ? (
                <img src={image} alt="" />
              ) : (
                <img alt="Image Not Found" />
              )}
              <h5 className="mb-3">Case is already being modified</h5>
              <Link
                to={{ pathname: pathname, state: { calledFrom: calledFrom } }}
                className="btn btn-success"
              >
                Back to {caseType} Case
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={"modal-backdrop fade " + (show ? "show" : "")}></div>
    </React.Fragment>
  );
};

export default PopUpModal;
