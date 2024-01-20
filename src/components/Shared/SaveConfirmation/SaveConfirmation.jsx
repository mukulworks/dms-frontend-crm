import React, { useState } from "react";
import { useSelector } from "react-redux";
import image from "../../../images/already-modified.png";

const SaveConfirmation = ({
  confirm,
  isLoading,
  modalState,
  hide,
  message,
}) => {
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
      {modalState.open && (
        <React.Fragment>
          <div
            className={"modal fade " + (modalState.open ? "show" : "")}
            id="alreadyModifiedModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden={modalState.open}
            aria-modal={modalState.open}
            style={modalState.open ? customStyle.show : customStyle.hide}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0">
                <div className="modal-body text-center p-5">
                  {image ? (
                    <img src={image} alt="" />
                  ) : (
                    <img alt="Image Not Found" />
                  )}
                  <h5 className="mb-3">{message}</h5>
                  <button
                    onClick={hide}
                    className="btn btn-success mx-2"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirm}
                    className="btn btn-success mx-2"
                    disabled={isLoading}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={"modal-backdrop fade " + (modalState.open ? "show" : "")}
          ></div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default SaveConfirmation;
