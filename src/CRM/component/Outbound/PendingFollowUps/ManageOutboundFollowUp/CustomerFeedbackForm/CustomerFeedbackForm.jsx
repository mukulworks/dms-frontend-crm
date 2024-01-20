import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const CustomerFeedbackForm = ({
  surveyQuestions,
  show,
  screenHeading,
  surveyPageCount,
  satisfiedCustomerRange,
}) => {
  const [customerFeedbackPoint, setCustomerFeedbackPoint] = useState(0);
  const surveyQuestionsMapped =
    surveyQuestions?.filter(
      (x) => x.questionControlType && x.questionControlType != "HEADER"
    ) || [];
  const businessOwnerCode =
    sessionStorage.getItem("selectedBusinessOwnerCode") || "";
  return (
    <>
      <div className={`${show ? "col-8" : " d-none"}`}>
        <div className="card h-100 customer-feedback">
          <div
            className="card-header position-sticky d-flex justify-content-between py-2"
            style={{ zIndex: 100, top: 0, background: "#f0f0f0" }}
          >
            <div>{screenHeading}</div>
            {businessOwnerCode == "AARI" && (
              <div className="text-muted">
                Take Feedback - {customerFeedbackPoint}
              </div>
            )}
          </div>
          <div className="card-body border h-100 bg-white p-2">
            {surveyPageCount == 1 ? (
              <SurveyQuestion
                surveyQuestions={surveyQuestionsMapped}
                surveyQuestionFilterBased={surveyQuestionsMapped}
                setCustomerFeedbackPoint={setCustomerFeedbackPoint}
                
              />
            ) : (
              <SurveyQuestionFilterBased
                surveyQuestions={surveyQuestionsMapped}
                setCustomerFeedbackPoint={setCustomerFeedbackPoint}
              />
            )}
          </div>
        </div>
      </div>
      {businessOwnerCode == "AARI" && (
        <div className={`${show ? "col-4" : " d-none"}`}>
          <div
            className="p-0"
            style={{
              width: 250,
              margin: "auto",
              position: "sticky",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <CircularProgressbar
              value={customerFeedbackPoint}
              text={
                customerFeedbackPoint > satisfiedCustomerRange
                  ? "Satisfied - " + customerFeedbackPoint + "%"
                  : "Dis-satisfied - " + customerFeedbackPoint + "%"
              }
              styles={buildStyles({
                textSize: "10px",
              })}
              strokeWidth={5}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerFeedbackForm;

const SurveyQuestion = ({
  surveyQuestions,
  surveyQuestionFilterBased,
  setCustomerFeedbackPoint,
}) => {
  let index = -1;
  return surveyQuestions
    ? surveyQuestions.map((surveyQuestion, key) => {
        let isDnone = true;
        const temp = surveyQuestionFilterBased.filter(
          (x) => x.questionNo == surveyQuestion.questionNo
        );
        if (temp.length > 0) {
          isDnone = false;
        }
        if (surveyQuestion.questionControlType != "TEXT") {
          index++;
        }
        return surveyQuestion.questionControlType === "DATETIME_PICKER" ? (
          <DateTypeFeedback
            key={key}
            index={index}
            surveyId={surveyQuestion.surveyId}
            questionNo={surveyQuestion.questionNo}
            questionText={surveyQuestion.questionText}
            surveyResponses={surveyQuestion.surveyResponses}
            isDnone={isDnone}
            setCustomerFeedbackPoint={setCustomerFeedbackPoint}
          />
        ) : surveyQuestion.questionControlType === "RADIO" ? (
          <RadioButtonTypeFeedback
            key={key}
            index={index}
            surveyId={surveyQuestion.surveyId}
            questionNo={surveyQuestion.questionNo}
            questionText={surveyQuestion.questionText}
            surveyResponses={surveyQuestion.surveyResponses}
            isDnone={isDnone}
            setCustomerFeedbackPoint={setCustomerFeedbackPoint}
          />
        ) : surveyQuestion.questionControlType === "DROPDOWN3" ? (
          <DropdownTypeFeedback
            key={key}
            index={index}
            surveyId={surveyQuestion.surveyId}
            questionNo={surveyQuestion.questionNo}
            questionText={surveyQuestion.questionText}
            surveyResponses={surveyQuestion.surveyResponses}
            isDnone={isDnone}
            setCustomerFeedbackPoint={setCustomerFeedbackPoint}
          />
        ) : surveyQuestion.questionControlType === "TEXTAREA" ? (
          <TextareaFeedback
            key={key}
            index={index}
            surveyId={surveyQuestion.surveyId}
            questionNo={surveyQuestion.questionNo}
            questionText={surveyQuestion.questionText}
            
            surveyResponses={surveyQuestion.surveyResponses}
            isDnone={isDnone}
            setCustomerFeedbackPoint={setCustomerFeedbackPoint}
          />
        ) : surveyQuestion.questionControlType === "TEXT" ? (
          <OnlyTextFeedback
            key={key}
            surveyId={surveyQuestion.surveyId}
            questionNo={surveyQuestion.questionNo}
            questionText={surveyQuestion.questionText}
            surveyResponses={surveyQuestion.surveyResponses}
            isDnone={isDnone}
            setCustomerFeedbackPoint={setCustomerFeedbackPoint}
          />
        ) : surveyQuestion.questionControlType === "TEXT_BOX" ? (
          <InputTypeFeedback
            key={key}
            index={index}
            surveyId={surveyQuestion.surveyId}
            questionNo={surveyQuestion.questionNo}
            questionText={surveyQuestion.questionText}
            surveyResponses={surveyQuestion.surveyResponses}
            isDnone={isDnone}
            questionInputType={surveyQuestion.questionInputType}
            setCustomerFeedbackPoint={setCustomerFeedbackPoint}
          />
        ) : null;
      })
    : null;
};

const SurveyQuestionFilterBased = ({
  surveyQuestions,
  setCustomerFeedbackPoint,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const surveyQuestionFilterBased = surveyQuestions.filter((quest) => {
    return quest.currentPage == currentPage;
  });
  const [errorMsg, setErrorMsg] = useState("");
  const { getValues } = useFormContext();

  const renderPage = (pageType) => {
    let index = -1;
    const tempFiltered = surveyQuestionFilterBased.filter(
      (surveyQuestion) => surveyQuestion.questionControlType != "TEXT"
    );
    if (tempFiltered.length == 0) {
      if (surveyQuestionFilterBased.length > 0) {
        if (surveyQuestionFilterBased[0].surveyResponses.length > 0) {
          const pageValue =
            pageType == "Next"
              ? surveyQuestionFilterBased[0].surveyResponses[0].nextPage
              : surveyQuestionFilterBased[0].surveyResponses[0].previousPage;
          if (pageValue) {
            setCurrentPage(pageValue);
            setErrorMsg("");
          } else {
            setErrorMsg(`No ${pageType} Page found`);
          }
        }
      } else {
        setErrorMsg("No Next Page found");
      }
      return;
    }
    const findIndex = tempFiltered[0].questionNo;
    surveyQuestions.every((x) => {
      if (x.questionControlType != "TEXT") {
        index++;
      }
      if (x.questionNo == findIndex) {
        return false;
      }
      return true;
    });
    const currentPageValue = getValues(
      `surveyResponses[${index}].responseText`
    );
    const currentPageResponseNo = getValues(
      `surveyResponses[${index}].responseNo`
    );
    if (tempFiltered[0].questionControlType == "TEXT_BOX") {
      const nextPageCriterias =
        tempFiltered[0].surveyResponses[0].nextPageCriterias;
      const filteredData = nextPageCriterias.filter((criteria) => {
        return (
          parseInt(currentPageValue) <= parseInt(criteria.maxValue) &&
          parseInt(currentPageValue) >= parseInt(criteria.minValue)
        );
      });
      if (filteredData.length > 0) {
        const pageValue =
          pageType == "Next"
            ? filteredData[0].nextPage
            : filteredData[0].previousPage;
        if (pageValue) {
          setCurrentPage(pageValue);
          setErrorMsg("");
        } else {
          setErrorMsg(`Enter Value Or ${pageType} Page Not Found`);
        }
      } else {
        setErrorMsg(`Enter Value Or ${pageType} Page Not Found`);
      }
    } else if (tempFiltered[0].questionControlType == "RADIO") {
      if (currentPageResponseNo == 2) {
        const data = tempFiltered[0].surveyResponses.filter(
          (res) => res.responseText == "No"
        );
        if (data.length > 0) {
          const pageValue =
            pageType == "Next" ? data[0].nextPage : data[0].previousPage;
          if (pageValue) {
            setCurrentPage(pageValue);
            setErrorMsg("");
          } else {
            setErrorMsg(`Enter Value Or ${pageType} Page Not Found`);
          }
          setErrorMsg("");
        } else {
          setErrorMsg(`Enter Value Or ${pageType} Page Not Found`);
        }
      } else if (currentPageResponseNo == 1) {
        const data = tempFiltered[0].surveyResponses.filter(
          (res) => res.responseText == "Yes"
        );
        if (data.length > 0) {
          const pageValue =
            pageType == "Next" ? data[0].nextPage : data[0].previousPage;
          if (pageValue) {
            setCurrentPage(pageValue);
            setErrorMsg("");
          } else {
            setErrorMsg(`Enter Value Or ${pageType} Page Not Found`);
          }
          setErrorMsg("");
        } else {
          setErrorMsg(`Enter Value Or ${pageType} Page Not Found`);
        }
      } else {
        setErrorMsg(`Enter Value Or ${pageType} Page Not Found`);
      }
    }
  };

  return (
    <>
      <SurveyQuestion
        surveyQuestions={surveyQuestions}
        surveyQuestionFilterBased={surveyQuestionFilterBased}
        setCustomerFeedbackPoint={setCustomerFeedbackPoint}
      />
      {errorMsg && <div class="text-danger mb-3">{errorMsg}</div>}
      {currentPage > 1 && (
        <a
          id="no fire"
          className="btn btn-success"
          onClick={() => renderPage("Previous")}
        >
          Prev Page
        </a>
      )}
      <a
        id="no fire next"
        className="btn btn-success ml-5"
        onClick={() => renderPage("Next")}
      >
        Next Page
      </a>
    </>
  );
};

const DateTypeFeedback = ({
  index,
  surveyId,
  questionNo,
  questionText,
  surveyResponses,
  isDnone,
}) => {
  const { register, control } = useFormContext();

  return (
    <div className={"row mb-3" + (isDnone ? " d-none" : "")}>
      <div className="col-6">
        <h6 className="color-black">
          <span className="text-muted mr-2">Q {index + 1}.</span> {questionText}
          <span className="star">*</span>    {/* edit by mukul */}
          <br></br> {"Reply"}
        </h6>
        <div className="row" style={{ marginTop: -30, marginLeft: 100 }}>
          <div className="col-8">
            <Controller
              control={control}
              name={`surveyResponses[${index}].responseText`}
              // rules={{ required: true }}
              render={(props) => (
                <ReactDatePicker
                  className="form-control"
                  onChange={(e) => props.onChange(e)}
                  closeOnScroll={true}
                  selected={props.value}
                  onBlur={props.onBlur}
                  dateFormat="dd-MMM-yyyy"
                  filterDate={(date) => date.getMonth()}
                  ref={register}
                />
              )}
            />
            <input
              name={`surveyResponses[${index}].responseNo`}
              id={`surveyResponses[${index}].responseNo`}
              ref={register}
              hidden
              type="number"
              defaultValue={surveyResponses[0].responseSrNo}
            />
            <input
              name={`surveyResponses[${index}].surveyId`}
              id={`surveyResponses[${index}].surveyId`}
              ref={register}
              hidden
              type="number"
              defaultValue={surveyId}
            />
            <input
              name={`surveyResponses[${index}].questionNo`}
              id={`surveyResponses[${index}].questionNo`}
              ref={register}
              hidden
              type="number"
              defaultValue={questionNo}
            />
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
  index,
  surveyId,
  questionNo,
  questionText,
  surveyResponses,
  isDnone,
  setCustomerFeedbackPoint,
}) => {
  const [toggleVisibility, setToggleVisibility] = useState("");
  const { register, control } = useFormContext();
  const [points, setPoints] = useState(0);
  const [responseSubCategoryList1, setResponseSubCategoryList1] = useState([]);
  const [responseSubCategoryList2, setResponseSubCategoryList2] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState("");

  useEffect(() => {
    if (responseSubCategoryList1?.length > 0) {
      setSelectedDealer(responseSubCategoryList1[0].code);
      const selectedDealerOp = responseSubCategoryList1.filter((x) => {
        return x.code == (selectedDealer || responseSubCategoryList1[0].code);
      })[0];

      setCollections(selectedDealerOp.collections);
    }
  }, [responseSubCategoryList1]);
  const handleChange = (val) => {
    if (responseSubCategoryList1?.length > 0) {
      setSelectedDealer(val);
      const selectedDealer = responseSubCategoryList1.filter((x) => {
        return x.code == val;
      })[0];
      setCollections(selectedDealer.collections);
    }
  };

  const handleClick = (flag, type, surveyResponse) => {
    setCustomerFeedbackPoint(
      (prevState) => prevState + surveyResponse?.responsePoints - points
    );
    setPoints(surveyResponse?.responsePoints);
    if (flag === "Y") {
      setResponseSubCategoryList1(surveyResponse?.responseSubCategoryList1);
      setResponseSubCategoryList2(surveyResponse?.responseSubCategoryList2);
      setToggleVisibility(type);
    } else {
      setResponseSubCategoryList1([]);
      setResponseSubCategoryList2([]);
      setToggleVisibility("");
    }
  };

  return (
    <div className={"row mb-3" + (isDnone ? " d-none" : "")}>
      <div className="col-12">
        <h6 className="color-black">
          <span className="text-muted mr-2">Q{index + 1}.</span> {questionText}
          <span className="star">*</span>    {/* edit by mukul */}
          <br />
          {"Reply"}
        </h6>
        <div className="custom-radio-btn pl-4 font-14 ml-3">
          {surveyResponses &&
            surveyResponses.map((surveyResponse, key) => (
              <div
                key={key}
                className="custom-control custom-radio form-check-inline"
              >
                <input
                  type="radio"
                  className="custom-control-input"
                  name={`surveyResponses[${index}].responseNo`}
                  id={`response[${questionNo}${key}].response`}
                  onClick={() =>
                    handleClick(
                      surveyResponse.flagTextRequired,
                      surveyResponse.flagTextRequiredType,
                      surveyResponse
                    )
                  }
                  value={surveyResponse.responseSrNo}
                  ref={register}
                />
                <label
                  className="custom-control-label"
                  htmlFor={`response[${questionNo}${key}].response`}
                >
                  {surveyResponse.responseText}
                </label>
              </div>
            ))}
        </div>
        {toggleVisibility === "DATEPICKER" ? (
          <div className="custom-control custom-radio form-check-inline">
            <Controller
              control={control}
              name={`surveyResponses[${index}].responseText`}
              // rules={{ required: true }}
              render={(props) => (
                <ReactDatePicker
                  className="form-control"
                  onChange={(e) => props.onChange(e)}
                  closeOnScroll={true}
                  selected={props.value}
                  onBlur={props.onBlur}
                  dateFormat="dd-MMM-yyyy"
                  filterDate={(date) => date.getMonth()}
                  ref={register}
                />
              )}
            />
            {responseSubCategoryList1?.length > 0 && (
              <>
                <select
                  name={`surveyResponses[${index}].subcategory1`}
                  className="form-control"
                  ref={register}
                  onChange={(e) => handleChange(e.target.value)}
                >
                  {responseSubCategoryList1 &&
                    responseSubCategoryList1.map((subCategory, key) => (
                      <option key={key} value={subCategory.code}>
                        {subCategory.description}
                      </option>
                    ))}
                </select>
                <select
                  name={`surveyResponses[${index}].subcategory2`}
                  className="form-control"
                  ref={register}
                >
                  {collections &&
                    collections.map((subCategory, key) => {
                      return (
                        <option key={key} value={subCategory.code}>
                          {subCategory.description}
                        </option>
                      );
                    })}
                </select>
              </>
            )}
            {responseSubCategoryList2?.length > 0 && (
              <>
                <select
                  name={`surveyResponses[${index}].subcategory3`}
                  id="subcategory"
                  className="form-control"
                  ref={register}
                >
                  {responseSubCategoryList2 &&
                    responseSubCategoryList2.map((subCategory, key) => (
                      <option key={key} value={subCategory.code}>
                        {subCategory.description}
                      </option>
                    ))}
                </select>
              </>
            )}
          </div>
        ) : toggleVisibility === "TEXTAREA" ? (
          <div className="custom-control custom-radio form-check-inline">
            <textarea
              className="form-control"
              // ref={register}
              placeholder="Enter Caller Reply"
              name={`surveyResponses[${index}].responseText`}
              id="feedback"
              cols="15"
              rows="5"
              maxLength="1500"
              ref={register}
            ></textarea>
          </div>
        ) : (
          <input
            name={`surveyResponses[${index}].responseText`}
            ref={register}
            hidden
            type="text"
            defaultValue={""}
          />
        )}
        <input
          name={`surveyResponses[${index}].surveyId`}
          ref={register}
          hidden
          type="number"
          defaultValue={surveyId}
        />
        <input
          name={`surveyResponses[${index}].questionNo`}
          ref={register}
          hidden
          type="number"
          defaultValue={questionNo}
        />
      </div>
    </div>
  );
};

const DropdownTypeFeedback = ({
  index,
  surveyId,
  questionNo,
  questionText,
  surveyResponses,
  isDnone,
}) => {
  const { register } = useFormContext();
  const [responseSubCategoryList1, setResponseSubCategoryList1] =
    React.useState([]);
  const [responseSubCategoryList2, setResponseSubCategoryList2] =
    React.useState([]);
  const handleOnChange = (e) => {
    surveyResponses?.map((res) => {
      if (res?.responseSrNo == e.target.value) {
        setResponseSubCategoryList1(res?.responseSubCategoryList1 || []);
        setResponseSubCategoryList2(res?.responseSubCategoryList2 || []);
      }
    });
  };
  const colNum =
    responseSubCategoryList1?.length && responseSubCategoryList2?.length
      ? "2"
      : "6";
  return (
    <div className={"row mb-3" + (isDnone ? " d-none" : "")}>
      <div className="col-6">
        <h6 className="color-black">
          <span className="text-muted mr-2">Q {index + 1}.</span> {questionText}
          <span className="star">*</span>    {/* edit by mukul */}
          <br />
          {"Reply"}
        </h6>
      </div>
      <div className={`col-${colNum}`}>
        <select
          name={`surveyResponses[${index}].responseNo`}
          ref={register}
          className="form-control"
          onChange={handleOnChange}
        >
          <option value={""}>Select</option>
          {surveyResponses &&
            surveyResponses.map((surveyResponse, key) => (
              <option value={surveyResponse.responseSrNo} key={key}>
                {surveyResponse.responseText}
              </option>
            ))}
        </select>
      </div>
      {responseSubCategoryList1.length > 0 && (
        <>
          <div className="col-2">
            <select
              name={`surveyResponses[${index}].subcategory1`}
              ref={register}
              className="form-control"
            >
              <option value={""}>Select</option>
              {responseSubCategoryList1 &&
                responseSubCategoryList1.map((surveyResponse, key) => (
                  <option value={surveyResponse.code} key={key}>
                    {surveyResponse.description}
                  </option>
                ))}
            </select>
          </div>
        </>
      )}
      {responseSubCategoryList2.length > 0 && (
        <>
          <div className="col-2">
            <select
              name={`surveyResponses[${index}].subcategory2`}
              ref={register}
              className="form-control"
            >
              <option value={""}>Select</option>
              {responseSubCategoryList2 &&
                responseSubCategoryList2.map((surveyResponse, key) => (
                  <option value={surveyResponse.code} key={key}>
                    {surveyResponse.description}
                  </option>
                ))}
            </select>
          </div>
        </>
      )}
      <input
        name={`surveyResponses[${index}].surveyId`}
        ref={register}
        hidden
        type="text"
        defaultValue={surveyId}
      />
      <input
        name={`surveyResponses[${index}].questionNo`}
        ref={register}
        hidden
        type="text"
        defaultValue={questionNo}
      />
      <input
        name={`surveyResponses[${index}].responseText`}
        ref={register}
        hidden
        type="text"
        defaultValue={""}
      />
    </div>
  );
};

const TextareaFeedback = ({
  index,
  surveyId,
  questionNo,
  questionText,
  surveyResponses,
  isDnone,
}) => {
  const { register } = useFormContext();
  return (
    <div className={"row mb-3" + (isDnone ? " d-none" : "")}>
      <div className="col-12">
        <h6 className="color-black">
          <span className="text-muted mr-2">Q {index + 1}.</span> {questionText}
          <span className="star">*</span>    {/* edit by mukul */}
          <br />
          {"Reply"}
        </h6>
      </div>
      <div className="col-6">
        <input
          name={`surveyResponses[${index}].responseNo`}
          ref={register}
          hidden
          type="number"
          defaultValue={surveyResponses[0].responseSrNo}
        />
        <input
          name={`surveyResponses[${index}].surveyId`}
          ref={register}
          hidden
          type="number"
          defaultValue={surveyId}
        />
        <input
          name={`surveyResponses[${index}].questionNo`}
          ref={register}
          hidden
          type="number"
          defaultValue={questionNo}
        />
        <textarea
          className="form-control"
          ref={register}
          id="feedback"
          placeholder="Enter Caller Reply"
          cols="15"
          rows="5"
          maxLength="1500"
          name={`surveyResponses[${index}].responseText`}
        />
      </div>
    </div>
  );
};
const InputTypeFeedback = ({
  index,
  surveyId,
  questionNo,
  questionText,
  surveyResponses,
  isDnone,
  questionInputType,
}) => {
  const { register } = useFormContext();
  return (
    <div className={"row mb-3" + (isDnone ? " d-none" : "")}>
      <div className="col-12">
        <h6 className="color-black">
          <span className="text-muted mr-2">Q {index + 1}.</span> {questionText}
          <span className="star">*</span>    {/* edit by mukul */}
          <br />
          {"Reply"}
        </h6>
      </div>
      <div className="col-6">
        <input
          name={`surveyResponses[${index}].responseNo`}
          ref={register}
          hidden
          type="number"
          defaultValue={surveyResponses[0].responseSrNo}
        />
        <input
          name={`surveyResponses[${index}].surveyId`}
          ref={register}
          hidden
          type="number"
          defaultValue={surveyId}
        />
        <input
          name={`surveyResponses[${index}].questionNo`}
          ref={register}
          hidden
          type="number"
          defaultValue={questionNo}
        />
        <input
          className="form-control"
          ref={register}
          id="feedback"
          placeholder="Enter Caller Reply"
          cols="15"
          rows="5"
          maxLength="1500"
          name={`surveyResponses[${index}].responseText`}
          type={questionInputType == "INTEGER" ? "number" : "string"}
        />
      </div>
    </div>
  );
};
const OnlyTextFeedback = ({ index, questionText, isDnone, questionNo }) => {
  return (
    <>
      <div className={"row mb-3" + (isDnone ? " d-none" : "")}>
        <div className="col-12">
          <h6 className="color-black">
            {/* <span className="text-muted mr-2">Q {index + 1}.</span>{" "} */}
            <div
              dangerouslySetInnerHTML={{
                __html: questionText,
              }}
            ></div>
            <br />
          </h6>
        </div>
      </div>
    </>
  );
};
