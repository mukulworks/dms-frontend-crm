import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import {
  updateCreateNewCaseUploadedDocumentBalanceCountSize,
  updateManageFollowUpUploadedDocumentBalanceCountSize,
} from "../../../../../store/actions/inboundActions";
import * as constants from "../../../../../../utils/constant";

const FileUpload = ({
  caseUniqueId,
  uploadDocuments,
  screenType,
  isFileUploadMandatory,
  setSelectedFileGuid,
}) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState([]);
  const [filename, setFilename] = useState([]);
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const { errors, setError, clearErrors } = useFormContext();
  const hasError = (inputName) => Boolean(errors && errors[inputName]);

  const [isUploaded, setisUploaded] = useState(false);
  React.useEffect(() => {
    if (isFileUploadMandatory && !isUploaded) {
      setError("fileUpload", {
        name: "Invalid file upload",
      });
    } else {
      clearErrors("fileUpload");
    }
  }, [isFileUploadMandatory, isUploaded]);
  useEffect(() => {
    setSelectedFileGuid([]);
  }, []);
  const checkFileExtension = (extension) => {
    let isExtensionValid = false;
    let fileType = "";
    if (uploadDocuments !== undefined) {
      uploadDocuments.map((uploadDocument) => {
        uploadDocument.validExtensions.map((validExtension) => {
          if (validExtension === extension) {
            isExtensionValid = true;
            fileType = uploadDocument.documentType;
          }
        });
      });
    }
    return {
      fileType: fileType,
      isExtensionValid: isExtensionValid,
    };
  };

  const checkBalanceCount = (fileType) => {
    let isBalanceCountLeft = false;
    if (uploadDocuments !== undefined) {
      uploadDocuments.map((uploadDocument) => {
        if (uploadDocument.documentType === fileType) {
          if (uploadDocument.balanceCount > 0) {
            isBalanceCountLeft = true;
          }
        }
      });
    }
    return isBalanceCountLeft;
  };

  const checkBalanceSize = (fileType) => {
    let isBalanceSizeLeft = false;
    if (uploadDocuments !== undefined) {
      uploadDocuments.map((uploadDocument) => {
        if (uploadDocument.documentType === fileType) {
          if (uploadDocument.balanceSize > 0) {
            isBalanceSizeLeft = true;
          }
        }
      });
    }
    return isBalanceSizeLeft;
  };

  const handleDispatch = (payload) => {
    switch (screenType) {
      case constants.MANAGE_FOLLOW_UP:
        dispatch(updateManageFollowUpUploadedDocumentBalanceCountSize(payload));
        break;
      case constants.CREATE_NEW_CASE:
        dispatch(updateCreateNewCaseUploadedDocumentBalanceCountSize(payload));
      default:
        break;
    }
  };

  const attachFiles = (e) => {
    if (e.target.files.length > 0) {
      let fileExtension =
        typeof e.target.files[0].name === "string"
          ? e.target.files[0].name.split(".").pop().toLowerCase()
          : "";
      let fileSize = Math.round(e.target.files[0].size / 1024);

      let isBalanceCountLeft = false;
      let isBalanceSizeLeft = false;
      let { fileType, isExtensionValid } = checkFileExtension(fileExtension);
      if (isExtensionValid !== undefined && isExtensionValid === false) {
        setMessage("Please upload files with valid extensions.");
      }

      if (isExtensionValid !== undefined && isExtensionValid === true) {
        isBalanceCountLeft = checkBalanceCount(fileType);
        isBalanceCountLeft
          ? setMessage("")
          : setMessage("Only 2 files can be uploaded.");
        if (isBalanceCountLeft) {
          isBalanceSizeLeft = checkBalanceSize(fileType);
          isBalanceSizeLeft
            ? setMessage("")
            : setMessage("File size should be less than 2 MB.");
        }
      }

      if (isExtensionValid && isBalanceCountLeft && isBalanceSizeLeft) {
        let payload = {
          fileSize: fileSize,
          fileType: fileType,
          actionType: constants.ADD_ATTACHED_DOCUMENT,
        };
        handleDispatch(payload);

        setFile([...file, e.target.files[0]]);
        setFilename([...filename, e.target.files[0].name]);
      } else {
        console.log("file cannot be uploaded");
      }
    }
  };

  const upload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file.length > 0) {
      file.forEach((fil, i) => {
        formData.append(`file${i + 1}`, fil);
      });
      try {
        const res = await axios.post(
          `${constants.BASE_CRM_MAP.uploadFile}/${caseUniqueId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              brandCode: window.brandCode,
              countryCode: window.countryCode,
              Authorization: localStorage.getItem("token"),
              "Client-Ip": sessionStorage.getItem("ip"),
            },
            onUploadProgress: (progressEvent) => {
              setUploadPercentage(
                parseInt(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
              );
            },
          }
        );
        res.status == 200 && setSelectedFileGuid(res?.data?.filesUploaded);
        setisUploaded(true);
        setMessage("Files Uploaded");
      } catch (error) {
        setisUploaded(false);
        if (error.response.status === 500) {
          setMessage(
            "There is a problem with the server. Please try after sometime."
          );
        } else if (error.response.status === 400) {
          setMessage("Files were not uploaded.");
        }
      }
    } else {
      setisUploaded(false);
      setMessage("Please select file.");
    }
  };

  const resetUploadForm = () => {
    setisUploaded(false);
    setFile([]);
    setFilename([]);
    setMessage("");
    setUploadPercentage(0);
    let payload = {
      actionType: constants.RESET,
    };
    handleDispatch(payload);
  };

  const removeFileFromSelection = (fileName) => {
    document.getElementById("customFile").value = "";
    let fileSize;
    let fileExtension;

    file.map((fil) => {
      if (fil.name === fileName) {
        fileSize = Math.round(fil.size / 1024);
        fileExtension =
          typeof fil.name === "string"
            ? fil.name.split(".").pop().toLowerCase()
            : "";
      }
    });

    const { fileType } = checkFileExtension(fileExtension);
    let payload = {
      fileSize: fileSize,
      fileType: fileType, //'DOCUMENT'
      actionType: constants.REMOVE_ATTACHED_DOCUMENT,
    };

    var fileArray = [...file];
    var filenameArray = [...filename];
    let index = filenameArray.indexOf(fileName);
    if (index !== -1) {
      filenameArray.splice(index, 1);
      setFilename(filenameArray);

      fileArray.splice(index, 1);
      setFile(fileArray);
    }
    handleDispatch(payload);
  };

  const deleteFileFromServer = async (filename) => {
    let fileName = [];
    fileName.push(filename);

    let payload = {
      files: [...fileName],
    };
    const res = await axios.post(
      `${constants.BASE_CRM_MAP.removeFile}/${caseUniqueId}`,
      payload,
      {
        headers: {
          brandCode: window.brandCode,
          countryCode: window.countryCode,
          Authorization: localStorage.getItem("token"),
          "Client-Ip": sessionStorage.getItem("ip"),
        },
      }
    );
    res.status == 200 && setSelectedFileGuid([]);
    setMessage("");
    setUploadPercentage(0);
    removeFileFromSelection(filename);
    setisUploaded(false);
  };
  return (
    <div className="col-6">
      <div className="card">
        <div className="card-header">
          File upload
          <a
            href="#"
            className="text-dark float-right btn btn-link p-0"
            onClick={resetUploadForm}
          >
            <i className="mdi mdi-refresh"></i> Reset Details
          </a>
        </div>
        <div className="card-body p-1">
          <div className="form-group">
            <label className="form-label" htmlFor="customFile">
              Default file input example
            </label>
            <input
              type="file"
              id="customFile"
              name="fileUpload"
              className={
                "form-control file-upload mb-2" +
                (hasError("fileUpload") ? " is-invalid" : "")
              }
              onChange={attachFiles}
            />
            {filename &&
              filename.map((fileN, key) => (
                <React.Fragment key={key}>
                  <div className="progress" style={{ height: 10 }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${uploadPercentage}%` }}
                    >
                      {uploadPercentage}%
                    </div>
                  </div>
                  <div className="custom-file">
                    <div className="row">
                      <div className="col-10">{fileN}</div>
                      <div className="col-auto px-1">
                        <button
                          onClick={() => deleteFileFromServer(fileN)}
                          type="button"
                          name="deleteButton"
                          id="deleteButton"
                          className="btn p-0"
                        >
                          <span className="mdi mdi-trash-can"></span>
                        </button>
                      </div>
                      <div className="col-auto px-1">
                        <button
                          onClick={() => removeFileFromSelection(fileN)}
                          className="btn p-0"
                        >
                          <span className="mdi mdi-close"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            <br />
            {message && (
              <>
                <div
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  {message}
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setMessage("")}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="form-group">
            <input
              type="button"
              value="Upload Files"
              className="btn btn-success btn-block"
              onClick={upload}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
