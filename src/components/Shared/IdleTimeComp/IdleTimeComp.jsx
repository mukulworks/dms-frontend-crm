import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import IdleTimer from "react-idle-timer";
import SessionTimeOutWarning from "../Session/SessionTimeOutWarning/SessionTimeOutWarning";
import { unathenticateToLogOut } from "../../../actions/authenticationActions";

const IdleTimeComp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [timeout, setTimeout] = useState(1000 * 60 * 1); // time given to IdleTimer is in milliseconds
  const [showModal, setShowModal] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  let idleTimer = null;
  const [seconds, setSeconds] = useState();
  const [value, setValue] = useState(0);
  let secondsRemaining;
  let intervalHandle;

  function tick() {
    let min = Math.floor(secondsRemaining / 60);
    let sec = secondsRemaining - min * 60;

    let startTime;
    //get start time when startTime variable is null
    if (!startTime) {
      startTime = localStorage.getItem("sessionTimeOut");
    }

    //after getting startTime, comparing it with current time
    if (startTime) {
      let currentTime = new Date();
      if (startTime < currentTime) {
        clearInterval(intervalHandle);
        setShowModal(false);
        dispatch(unathenticateToLogOut());
        localStorage.clear();
        history.push("/");
      }

      setValue(min);
      setSeconds(sec);

      if (min === 0 && sec === 0) {
        clearInterval(intervalHandle);
        setShowModal(false);
        dispatch(unathenticateToLogOut());
        localStorage.clear();
        history.push("/");
      }
      secondsRemaining--;
    }
  }

  function startCountDown() {
    let startTime = new Date();
    startTime.setMinutes(startTime.getMinutes() + 1);
    startTime = new Date(startTime);

    localStorage.setItem("sessionTimeOut", startTime);

    intervalHandle = setInterval(tick, 1000);
    let time = timeout;
    secondsRemaining = 30;
    secondsRemaining = time / 1000 - 60;
  }
  function _onAction(e) {
    setIsTimedOut(false);
  }

  function _onActive(e) {
    setIsTimedOut(false);
  }
  function _onIdle(e) {
    const timedOut = isTimedOut;
    if (timedOut) {
      setShowModal(false);
      dispatch(unathenticateToLogOut());
      localStorage.clear();
      history.push("/");
    } else {
      startCountDown();
      setShowModal(true);
      idleTimer.reset();
      setIsTimedOut(true);
    }
  }

  function handleClose() {
    setShowModal(false);
    idleTimer.reset();
  }

  function handleLogout() {
    setShowModal(false);
    dispatch(unathenticateToLogOut());
    localStorage.clear();
    history.push("/");
  }
  return (
    <>
      <IdleTimer
        ref={(ref) => {
          idleTimer = ref;
        }}
        element={document}
        onActive={_onActive}
        onIdle={_onIdle}
        onAction={_onAction}
        debounce={250}
        timeout={timeout}
      />
      <SessionTimeOutWarning
        seconds={seconds}
        value={value}
        showModal={showModal}
        handleClose={handleClose}
        handleLogout={handleLogout}
      />
    </>
  );
};
export default IdleTimeComp;
