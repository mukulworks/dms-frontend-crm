import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDayWiseServiceBookingCount } from "../../../../../../store/actions/serviceAppointmentAction";
import DayWiseBookingDataPool from "./DayWiseBookingDataPool";
import DayWiseAdvisorBookingSlot from "./Slots/DayWiseAdvisorBookingSlot";

const DayWiseAdvisorBookingMain = () => {
  const [selectedDate, setSelectedDate] = useState("22-Sep-2020");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchDayWiseServiceBookingCount({
        dealerId: "KRISTAN",
        branchCode: "GGN01",
      })
    );
  }, []);

  return (
    <div className="card-body p-0 time-slot">
      {/* <DayWiseBookingDataPool selectedDate={selectedDate} setSelectedDate={setSelectedDate} /> */}
      <div
        id="grid"
        className="mb-4 mt-1 border clearfix"
        style={{ height: "250px", fontSize: "11px", fontWeight: "normal" }}
      >
        <DayWiseAdvisorBookingSlot selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default DayWiseAdvisorBookingMain;
