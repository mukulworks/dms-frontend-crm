import React from "react";

const SearchResultNavItem = ({ name, id, counts, isActive, setActiveId }) => {
  return (
    <li className="nav-item" role="presentation">
      <a
        className={"nav-link " + (isActive === true ? "active" : "")}
        id={id + "-tab"}
        data-toggle="tab"
        href={"#" + id}
        role="tab"
        aria-controls={id}
        aria-selected={isActive}
        onClick={() => setActiveId(id)}
      >
        {name}
        <sup>{"   "}</sup>
        <sup className="supNumber">{counts ? counts : "  "}</sup>
      </a>
    </li>
  );
};

export default SearchResultNavItem;
