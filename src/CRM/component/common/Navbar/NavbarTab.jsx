import React from "react";

const NavbarTab = ({
  activeId,
  setActiveId,
  screenTabs,
  isCallConnected,
  reason,
  showFeedback,
}) => {
  return (
    <>
      <nav className="nav process-flow-section connected d-inline-flex">
        {screenTabs?.map((tab) => {
          return (
            <a
              className={
                "nav-link " +
                (tab.tabCode == activeId ? "active " : "") +
                (isCallConnected == "Y" ? "" : "disabled")
              }
              href="#"
              id={tab.tabCode}
              onClick={() => {
                isCallConnected == "Y" &&
                (!showFeedback ? reason == "EC" : true)
                  ? setActiveId(tab.tabCode)
                  : "";
              }}
            >
              <div className="process-section">
                <span
                  className={
                    "mdi " +
                    (tab.isValid === null
                      ? ""
                      : tab.isValid === true
                      ? "pass"
                      : "fail")
                  }
                >
                  <img className="nav-link-img" src={tab.imgId} alt="" />
                </span>
                <p>{tab.tabCode == activeId ? tab.tabTitle : ""}</p>
              </div>
            </a>
          );
        })}
      </nav>
    </>
  );
};

export default NavbarTab;
