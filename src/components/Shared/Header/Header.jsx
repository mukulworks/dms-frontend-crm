import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setModuleNavBar } from "../../../actions/userAction";
import UserProfile from "./UserProfile/UserProfile";
import BrandLogo from "../../../images/audi.png";
import inida from "../../../images/india (1).svg";
import india from "../../../images/india.svg";
import isuzu from "../../../images/isuzu.jpg";
import Skoda from "../../../images/skoda-logo-header.png";

const Header = () => {
  const { userContext, brandCode } = useSelector((state) => {
    let userContext = state.user.userDetail.userContext;
    let brandCode = state.user.userDetail.brandCode;
    return {
      userContext: userContext,
      brandCode: brandCode,
    };
  });

  const companyName =
    userContext.companyDescription + ", " + userContext.locationName;
  const userName = userContext.title + " " + userContext.description;
  const dispatch = useDispatch();
  return (
    <header className="fixed-top shadow-sm bg-white">
      <nav className="navbar navbar-expand-sm navbar-light">
        <button
          className="border-0"
          onClick={() => dispatch(setModuleNavBar(true))}
        ></button>
        <Link
          className="navbar-brand text-uppercase font-weight-bold font-15"
          to={"/Home"}
        >
          {companyName}
        </Link>
        <div
          className="collapse justify-content-end navbar-collapse"
          id="collapsibleNavId"
        >
          <ul className="navbar-nav menu-top">
            <li className="nav-item">
              <a
                href=""
                className="nav-link currentDate text-capitalize disabled"
              >
                {/* <Moment format="ddd, MMM DD, YYYY">{new Date()}</Moment> */}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link brand" href="#">
                <img
                  src={
                    brandCode === "ISUZU"
                      ? isuzu
                      : brandCode === "SKODA"
                      ? Skoda
                      : brandCode === "AUDI"
                      ? BrandLogo
                      : null
                  }
                  alt=""
                ></img>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <img src={inida} alt=""></img>
                <img src={india} alt=""></img>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span className="mdi mdi-bell font-16"></span>{" "}
              </a>
            </li>
            <UserProfile userName={userName} />
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
