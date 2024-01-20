import React from "react";
import { Redirect, Route } from "react-router-dom";
import { checkCookie } from "../utils/cookies";
import { NProgress } from "@tanem/react-nprogress";
import Bar from "./Bar";
import Container from "./Container";

const PrivateRoute = ({
  component: Component,
  isAnimating: isAnimating,
  routeKey: routeKey,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("token") !== null ? (
        <React.Fragment>
          <NProgress isAnimating={isAnimating} key={routeKey}>
            {({ isFinished, progress, animationDuration }) => (
              <Container
                isFinished={isFinished}
                animationDuration={animationDuration}
              >
                <Bar
                  progress={progress}
                  animationDuration={animationDuration}
                />
              </Container>
            )}
          </NProgress>
          <Component {...props} />
        </React.Fragment>
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
