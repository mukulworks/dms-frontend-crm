import React from "react";
const FupListingHeader = ({ headerData }) => {
  return (
    <div className="row border-bottom text-uppercase bg-light justify-content-between font-10">
      <div className="col-auto pl-0">
        <nav className="nav justify-content-start filter-selectedText">
          {headerData.viewTypeCode === "CALENDAR" ? (
            <span className="nav-link text-muted">
              {headerData.headerDesc} for {headerData.monthYearDesc}
            </span>
          ) : (
            <>
              <span className="nav-link text-muted">
                {headerData.eventDesc}
              </span>
              <span className="nav-link text-muted">
                {headerData.headerDesc} for {headerData.monthYearDesc}
              </span>
            </>
          )}
        </nav>
      </div>
      <div className="col-auto pr-0">
        <ul className="nav justify-content-end loaction-car">
          <li className="nav-item">
            <span className="nav-link text-muted">{headerData.brandDesc}</span>
          </li>
          <li className="nav-item">
            <span className="nav-link text-muted">
              {headerData.countryDesc}
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link text-muted">{headerData.dealerDesc}</span>
          </li>
          <li className="nav-item">
            <span className="nav-link text-muted">
              {headerData.monthYearDesc}
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link text-muted">{headerData.callerName}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FupListingHeader;
