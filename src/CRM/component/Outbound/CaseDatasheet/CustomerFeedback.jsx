import React, { useState } from "react";
import func from "../../../../utils/common.functions";
import NoData from "../../../../images/no-data.jpg";
import { CircularProgressbar } from "react-circular-progressbar";

const CustomerFeedback = ({ caseDataSheetData }) => {
  const businessOwnerCode =
    sessionStorage.getItem("selectedBusinessOwnerCode") || "";
  return (
    <div>
      <div className="overflow-auto" style={{ width: 500 }}>
        {caseDataSheetData?.caseSurvey?.surveyQuestions.length > 0 ? (
          <>
            {caseDataSheetData?.caseSurvey?.csiScore > 0 &&
              businessOwnerCode == "AARI" && (
                <div style={{ width: "100px" }}>
                  <CircularProgressbar
                    value={caseDataSheetData?.caseSurvey?.csiScore}
                    text={
                      caseDataSheetData?.caseSurvey?.csiStatus +
                      "-" +
                      caseDataSheetData?.caseSurvey?.csiScore +
                      "%"
                    }
                    strokeWidth={5}
                  />
                </div>
              )}
            {caseDataSheetData?.caseSurvey?.surveyQuestions &&
              caseDataSheetData?.caseSurvey?.surveyQuestions.map(
                (surveyQuestion, key) => (
                  <DropdownTypeFeedback
                    key={key}
                    index={key}
                    questionNo={surveyQuestion.questionNo}
                    questionText={surveyQuestion.questionText}
                    surveyResponses={surveyQuestion.surveyResponses}
                  />
                )
              )}
          </>
        ) : (
          <tr>
            <td
              colSpan="9"
              style={{ textAlign: "center", paddingLeft: "250px" }}
            >
              <img src={NoData} alt="No Records" />
            </td>
          </tr>
        )}
      </div>
    </div>
  );
};

export default CustomerFeedback;

const DateTypeFeedback = ({ questionNo, questionText, surveyResponses }) => {
  return (
    <div className="row mb-3">
      <div className="col-6">
        <h6 className="color-black">
          <span className="text-muted mr-2">Q {questionNo}.</span>{" "}
          {questionText}
        </h6>
      </div>
      <div className="col-6">
        <div className="row">
          <div className="col-10">
            <div className="react-datepicker-wrapper">
              <div className="react-datepicker__input-container">
                <input
                  type="text"
                  className="form-control"
                  value="28-Jan-2021"
                />
              </div>
            </div>
          </div>
          <div className="col-2 p-0 text-left">
            <span className="mdi mdi-calendar-clock font-20 text-muted"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const RadioButtonTypeFeedback = ({
  questionNo,
  questionText,
  surveyResponses,
}) => {
  const [toggleVisibility, setToggleVisibility] = useState("");

  const handleClick = (flag, type) => {
    if (flag === "Y") setToggleVisibility(type);
    else setToggleVisibility("");
  };

  return (
    <div className="row mb-3">
      <div className="col-12">
        <h6 className="color-black">
          <span className="text-muted mr-2">Q {questionNo}</span> {questionText}
        </h6>
        <div className="custom-radio-btn pl-4 font-14 ml-3">
          {surveyResponses &&
            surveyResponses.map((surveyResponse, key) => (
              <div className="custom-control custom-radio form-check-inline">
                <input
                  type="radio"
                  className="custom-control-input"
                  id={`feedback.${questionNo}${key}`}
                  name={`feedback.${questionNo}`}
                  onClick={() =>
                    handleClick(
                      surveyResponse.flagTextRequired,
                      surveyResponse.flagTextRequiredType
                    )
                  }
                />
                <label
                  className="custom-control-label"
                  htmlFor={`feedback${questionNo}${key}`}
                >
                  {surveyResponse.responseText}
                </label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const DropdownTypeFeedback = ({
  questionNo,
  questionText,
  surveyResponses,
  index,
}) => {
  const mysurverRes = surveyResponses?.filter((x) => x.isSelected);
  return (
    <div className="row mb-3">
      <div className="col-6">
        <h6 className="color-black">
          <span className="text-muted mr-2">Q {index + 1}</span> {questionText}
        </h6>
      </div>
      <div className="col-6">
        <select name="feedback" id="feedback" className="form-control" disabled>
          {mysurverRes &&
            mysurverRes.map((surveyResponse, key) => (
              <option value={surveyResponse.responseCustomSerial} key={key}>
                {surveyResponse.responseText ||
                  func.dateFormatter(surveyResponse.responseSelectedText)}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};
