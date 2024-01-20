import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModelToolTipTemp = ({ params }) => {
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
  const variant = params.data.crmCaseVehicle.vehVariant;
  const model = params.data.crmCaseVehicle.vehModel;
  const regno = params.data.crmCaseVehicle.vehRegnNo;
  const chassisno = params.data.crmCaseVehicle.vehChassisNo;

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
                    Model Info
                  </th>
                </tr>
                <tr>
                  <th style={{ width: 55 }}>Sub:</th>
                  <td>{variant}</td>
                </tr>
                <tr>
                  <th style={{ width: 55 }}>Model:</th>
                  <td>{model}</td>
                </tr>
                <tr>
                  <th style={{ width: 55 }}>Chassis:</th>
                  <td>{chassisno}</td>
                </tr>
                <tr>
                  <th style={{ width: 55 }}>Reg. No: -</th>
                  <td>{regno}</td>
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
export default ModelToolTipTemp;
