import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {
  DefaultToastContainer,
  ToastProvider,
} from "react-toast-notifications";
import useUserContext from "../Hooks/useUserContext";
import { fetchUserDetail } from "../actions/userAction";
import ErrorBoundary from "../components/Shared/ErrorBoundary/ErrorBoundary";
import CustomLoader from "../components/Shared/Loader/CustomLoader";
import { history } from "../helpers/history";
import RouteWithPrivateRoute from "./RouteWithPrivateRoute";
import PrivateRoute from "./privateRoute";
import routes from "./routes.index";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/css/circle.css";
import "../styles/css/materialdesignicons.css";
import "../styles/css/style.css";
import "../styles/css/CRM.css";
import "../styles/css/RightHover.css";
import "../styles/css/IsuzuThemeRightHover.css";
import "../styles/css/IsuzuTheme.css";
import "../styles/css/SkodaTheme.css";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.brandCode = sessionStorage.getItem("selectedBrandCode");
    window.selectedBusinessOwnerCode = sessionStorage.getItem(
      "selectedBusinessOwnerCode"
    );
    window.countryCode = "IN";
    let token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserDetail());
    } else {
      localStorage.removeItem("token");
      window.location.href =
        window.location.origin +
        `/OrbitDmsIdentity/${window.selectedBusinessOwnerCode || "ISUZU"}`;
    }
  }, []);
  const { isuserOptionNavOpen } = useSelector((state) => {
    return { isuserOptionNavOpen: state.user.isuserOptionNavOpen };
  });
  const isLoading = useSelector((state) => {
    return state.serviceAppointment.isLoading;
  });
  const userContext = useUserContext();
  const userOptionNavClass = () => {
    if (isuserOptionNavOpen === "COMPLETE_SHOW") return " left-space";
    else if (isuserOptionNavOpen === "PARTIAL_SHOW") return " ";
    else return "";
  };
  const ToastContainer = (props) => (
    <DefaultToastContainer
      className="toast-container"
      style={{ zIndex: "2000" }}
      {...props}
    />
  );
  const WithoutMenuRoute = ({ component: Component, ...rest }) => {
    const component = (props) => (
      <>
        <div className={"withoutmenu flex-shrink-0" + userOptionNavClass()}>
          <Component {...props} />
        </div>
      </>
    );
    return <PrivateRoute {...rest} component={component} />;
  };
  return (
    <Router basename="Home/CRM2" history={history}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {userContext.userDetail.userContext !== null && (
            <>
              <div className={"flex-shrink-0" + userOptionNavClass()}>
                <ErrorBoundary>
                  <ToastProvider
                    components={{ ToastContainer }}
                    PlacementType="top-left"
                    autoDismiss="true"
                    autoDismissTimeout="5000"
                  >
                    {routes.map((route, key) => (
                      <RouteWithPrivateRoute
                        isAnimating={isLoading}
                        route={route}
                        routeKey={route.routeId}
                        key={key}
                      />
                    ))}
                  </ToastProvider>
                </ErrorBoundary>
                <CustomLoader />
              </div>
            </>
          )}
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
