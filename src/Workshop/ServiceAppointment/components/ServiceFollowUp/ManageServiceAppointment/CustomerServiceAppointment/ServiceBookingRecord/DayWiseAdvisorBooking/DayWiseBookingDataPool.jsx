import React from "react";
import { useSelector } from "react-redux";
const DayWiseBookingDataPool = ({ selectedDate, setSelectedDate }) => {
  const { dataPools } = useSelector((state) => {
    let dataPools =
      state.serviceAppointment.serviceAppointmentModel
        .dayWiseAdvisorServiceBookingModel.dateWiseServiceBookingDataPools;
    return {
      dataPools: dataPools,
    };
  });
  const options = {
    items: 6,
    nav: true,
    navText: [
      "<span class='mdi mdi-menu-left' aria-label='Previous'></span>",
      "<span class='mdi mdi-menu-right' aria-label='Next'></span>",
    ],
    slideBy: 1,
    dots: true,
    dotsEach: true,
    dotData: true,
  };

  return (
    <OwlCarousel className="owl-theme" {...options}>
      {dataPools &&
        dataPools.map((dataPool, key) => (
          <div
            key={key}
            className={
              "item d-flex align-items-center text-center justify-content-between" +
              (dataPool.date === selectedDate ? " active" : "")
            }
            onClick={() => {
              setSelectedDate(dataPool.date);
            }}
          >
            <div className="title-width">
              {dataPool.date}
              <div>
                <span className="text-danger">
                  Total - {dataPool.bookingCount}
                </span>
              </div>
            </div>
          </div>
        ))}
    </OwlCarousel>
  );
};

export default DayWiseBookingDataPool;
