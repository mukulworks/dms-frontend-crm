import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import func from "../../../../../utils/common.functions";
const OpenOnToolTipTemp = ({ params }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({});
  const caseID = params?.data?.caseActivityLog?.logUserId;
  const ipAddress = params?.data?.caseActivityLog?.logIpAddress;
  const createdDate = func.dayDateTimeFormatter(
    params?.data?.caseActivityLog?.logDateTime
  );

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div className="CustomTooltipPopup">
        {createPortal(
          isHovered ? (
            <div
              className={isHovered ? "TooltipPopup" : "d-none"}
              style={{ top: mousePos.y, left: mousePos.x }}
            >
              <table className="table">
                <tr>
                  <th colSpan={2} style={{ backgroundColor: "#cccccc" }}>
                    Case Log
                  </th>
                </tr>
                <tr>
                  <th style={{ width: 85 }}>Case ID:</th>
                  <td>{caseID}</td>
                </tr>
                <tr>
                  <th style={{ width: 85 }}>IP Address:</th>
                  <td>{ipAddress}</td>
                </tr>
                <tr>
                  <th style={{ width: 85 }}>Created Date:</th>
                  <td>{createdDate}</td>
                </tr>
              </table>
            </div>
          ) : (
            <></>
          ),
          document.getElementById("mouseTooltip")
        )}
        {func.outboundDateTimeFormatter(params)}
      </div>
    </div>
  );
};
export default OpenOnToolTipTemp;
