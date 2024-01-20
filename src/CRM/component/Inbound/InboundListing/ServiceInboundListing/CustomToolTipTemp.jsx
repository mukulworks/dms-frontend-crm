import React, { useEffect, useState } from "react";
import "./CustomToolTipTemp.css";
import { createPortal } from "react-dom";

const CustomToolTipTemp = ({ params }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({});

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
                    {" "}
                    Caller Details{" "}
                  </th>
                </tr>
                <tr>
                  <th>Name: </th>
                  <td>{params.data?.customer?.custName}</td>
                </tr>
                <tr>
                  <th>Mobile:</th>
                  <td>{params.data?.customer?.custMobile}</td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>{params.data?.customer?.custEmail}</td>
                </tr>
                <tr>
                  <th>Address:</th>
                  <td>
                    {" "}
                    {params.data?.customer?.custCity?.description},
                    {params.data?.customer?.custState?.description},
                    {params.data?.customer?.custPincode}
                  </td>
                </tr>
              </table>
            </div>
          ) : (
            <></>
          ),
          document.getElementById("mouseTooltip")
        )}
        {params.value}
      </div>
    </div>
  );
};
export default CustomToolTipTemp;
