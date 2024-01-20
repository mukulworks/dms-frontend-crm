import moment from "moment";
import StatusActive from "../images/Active@2x.png";
import StatusClosed from "../images/Closed.png";

const helperFunctions = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }

  //For ag-grid table
  const dateFormatter = (params) => {
    if (params) {
      if (params.value !== null && params.value !== undefined) {
        return moment(params.value).format("DD-MMM-YYYY");
      } else {
        return moment(params).format("DD-MMM-YYYY");
      }
    }
    return "-";
  };

  const dateTimeFormatter = (param) => {
    if (param != null) {
      return moment(param).format("DD-MMM-YYYY hh:mm A");
    }
    return param;
  };
  const outboundDateTimeFormatter = (param) => {
    if (param != null || param.value) {
      return moment(param?.value).format("DD-MMM-YYYY hh:mm A");
    }
    return param || "-";
  };

  const dayDateTimeFormatter = (param) => {
    if (param != null) {
      return moment(param).format("dddd DD-MMM-YYYY hh:mm A");
    }
    return param;
  };

  const dateMonthFormatter = (param) => {
    if (param != null) {
      return moment(param).format("DD-MMM");
    }
    return param;
  };

  const getCurrentDate = () => {
    return moment(new Date()).format("DD-MMM-YYYY");
  };

  const monthYearFormatter = (param) => {
    if (param != null) {
      return moment(param).format("MMM YYYY");
    }
  };

  const yearFormatter = (param) => {
    if (param != null) {
      return moment(param).format("YYYY");
    }
  };

  //For ag-grid table
  const numberFormatter = (params) => {
    if (params.value > 0) {
      return commaFormatter(params.value);
    } else if (params > 0) {
      return commaFormatter(params);
    } else {
      return "-";
    }
  };

  const commaFormatter = (number) => {
    return Math.floor(number)
      .toString()
      .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  };

  const agNumberHyphenFormatter = (params) => {
    return params.value === 0
      ? "-"
      : params.value === "0"
      ? "-"
      : params.value === ""
      ? "-"
      : params.value === null
      ? "-"
      : params.value;
  };

  const agMobileNumberHyphenFormatter = (params) => {
    return params.value === 0
      ? "-"
      : params.value === ""
      ? "-"
      : params.value === null
      ? "-"
      : "+91 " + params.value;
  };

  //For ag-grid table
  const agStringFormatter = (params) => {
    return params.value === ""
      ? "-"
      : params.value === null
      ? "-"
      : params.value === "Y"
      ? "Yes"
      : params.value === "N"
      ? "No"
      : params.value;
  };

  const agEmailStringFormatter = (params) => {
    return params.value === ""
      ? "-"
      : params.value === null
      ? "-"
      : params.value === "Y"
      ? "Yes"
      : params.value === "N"
      ? "No"
      : params.value?.toLowerCase();
  };

  const agStatusFormatter = (params) => {
    return params.value === ""
      ? "-"
      : params.value === null
      ? "-"
      : params.value === "C"
      ? "Closed"
      : params.value === "A"
      ? "Active"
      : params.value;
  };

  const agGetSerialNumber = (params) => {
    return params.node.rowIndex + 1 + ".";
  };
  const agDateTimeFormatter = (params) => {
    if (params.value != null) {
      return moment(params.value).format("DD-MMM-YYYY hh:mm A");
    }
    return "";
  };
  const agDateTimeFormatterWithT = (params) => {
    if (params != null) {
      return moment(params).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      //return params.toISOString();
    }
    return "";
  };
  const agDateFormatter = (params) => {
    if (params.value != null) {
      return moment(params.value).format("DD-MMM-YYYY");
    }
    return "";
  };
  //For tr, td table
  const emptyStringFormatter = (data) => {
    return data === ""
      ? "-"
      : data === 0
      ? "-"
      : data === null
      ? "-"
      : data === "0"
      ? "-"
      : data;
  };

  const substringStringFormatter = (data, maxLength) => {
    if (data === null) return "-";

    return data === ""
      ? "-"
      : data?.length > maxLength
      ? data.substring(0, maxLength) + "..."
      : data;
  };
  const noRecordData = (data) => {
    return data === null
      ? "No Record Found"
      : data === ""
      ? "No Record Found"
      : data === "0"
      ? "No Record Found"
      : data === ""
      ? "No Record Found"
      : data;
  };
  const roundOffDigits = (num) => {
    if (num !== null) {
      return num.toFixed(2);
    }
  };
  function addLeadingZeros(num, size) {
    if (num !== null) {
      var s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    }
  }

  const statusFormatter = (params) => {
    if (params.value) {
      return `<span style="color: #fff;
      border-radius: 5px;
      padding-left: 5px;
      padding-right: 5px;
      min-width: 55px;
      display: inline-block;
      text-align: center;
      background-color: #28a745;">${params.value}</span>`;
    }
    return "-";
  };

  const statusDescriptionFormatter = (status) => {
    if (status) {
      return status === "A"
        ? "Active"
        : status === "S"
        ? "Soft Close"
        : status == "C"
        ? "Closed"
        : status === "P"
        ? "Pending"
        : status === "T"
        ? "Soft Close - 1"
        : "-";
    }
  };

  const historyStatusDescriptionFormatter = (statusVal) => {
    let status = statusVal?.value;
    if (status) {
      return status === "A"
        ? "Active"
        : status === "S"
        ? "Soft Close"
        : status == "C"
        ? "Closed"
        : status === "P"
        ? "Pending"
        : "-";
    }
  };

  const statusImageSelector = (params) => {
    if (params) {
      return params === "A"
        ? StatusActive
        : params === "S" || params === "T"
        ? StatusActive
        : params === "C"
        ? StatusClosed
        : params === "P"
        ? StatusActive
        : null;
    }
  };

  const groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  };

  const setColor = (statusCode) => {
    switch (statusCode) {
      case "A":
        return "";
      case "C":
      case "S":
      case "T":
        return "active";
      default:
        break;
    }
  };

  const dataSizeFormatter = (size) => {
    let formattedSize;
    if (size > 1024) {
      formattedSize = size / 1048576;
      if (formattedSize % 1 === 0) {
        formattedSize = formattedSize + "MB";
      } else {
        formattedSize = formattedSize.toFixed(2) + "MB";
      }
    } else if (size < 1024) {
      size === 0
        ? (formattedSize = "-")
        : size === null
        ? (formattedSize = "-")
        : (formattedSize = size + "KB");
    }
    return formattedSize;
  };

  const convertUppercase = (text) => {
    return text.toString().toUpperCase();
  };

  function sortByProperty(property) {
    return function (a, b) {
      if (a[property] > b[property]) return 1;
      else if (a[property] < b[property]) return -1;
      return 0;
    };
  }

  function getFirstDateOfCurrentMonth(date) {
    if (date) {
      return new Date(date.getFullYear(), date.getMonth(), 1);
    }
  }

  function getLastDateOfCurrentMonth(date) {
    if (date) {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }
  }

  function emptyObjectCheck(value) {
    return Object.keys(value).length === 0 && value.constructor === Object;
  }

  const addressDescriptionSelector = (addresstype) => {
    if (addresstype) {
      return addresstype === "RES"
        ? "Registration"
        : addresstype === "REGN"
        ? "Residence"
        : addresstype === "OFF"
        ? "Office"
        : null;
    }
  };
  const callDescriptionFormatter = (callType) => {
    if (callType) {
      return callType === "Y" ? "Yes" : callType === "N" ? "No" : null;
    }
  };
  function numberWithCommas(x) {
    if (x == 0) {
      return x.toString().replace(0, "-");
    }
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  function roundOff(value, decimals) {
    return numberFormatter(
      Number(Math.round(value + "e" + decimals) + "e-" + decimals)
    );
  }

  return {
    getService: _getService,
    numberFormatter,
    agNumberHyphenFormatter,
    agMobileNumberHyphenFormatter,
    agStringFormatter,
    agEmailStringFormatter,
    agGetSerialNumber,
    agDateTimeFormatter,
    agDateFormatter,
    commaFormatter,
    dateFormatter,
    agDateTimeFormatterWithT,
    dateTimeFormatter,
    dayDateTimeFormatter,
    dateMonthFormatter,
    getCurrentDate,
    monthYearFormatter,
    yearFormatter,
    emptyStringFormatter,
    noRecordData,
    roundOffDigits,
    addLeadingZeros,
    statusFormatter,
    statusDescriptionFormatter,
    statusImageSelector,
    groupBy,
    setColor,
    dataSizeFormatter,
    convertUppercase,
    substringStringFormatter,
    sortByProperty,
    getFirstDateOfCurrentMonth,
    getLastDateOfCurrentMonth,
    emptyObjectCheck,
    addressDescriptionSelector,
    callDescriptionFormatter,
    roundOff,
    numberWithCommas,
    agStatusFormatter,
    outboundDateTimeFormatter,
    historyStatusDescriptionFormatter,
  };
})();
export default helperFunctions;
