import React from "react";
import DataPoolItem from "./DataPoolItem/DataPoolItem";

const DataPool = ({ dataPools }) => {
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
    <div className="col top-list">
      {dataPools.length > 0 && (
        <OwlCarousel className="owl-theme" {...options}>
          {dataPools.map((dataPool, key) => (
            <DataPoolItem key={key} dataPool={dataPool} />
          ))}
        </OwlCarousel>
      )}
    </div>
  );
};

export default DataPool;
