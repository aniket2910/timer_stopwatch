import React, { useEffect, useState } from "react";
import styles from "./Wrapper.module.css";

export const StopWatch = () => {
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [milliSeconds, setMilliSeconds] = useState(0);
  const [timerStatus, setTimerStatus] = useState(false);
  const [timerId, setTimerId] = useState(0);

  const resetTimer = () => {
    setTimerStatus(false);
    clearInterval(timerId);
    setHour(0);
    setMin(0);
    setSec(0);
    setMilliSeconds(0);
  };

  const stopTimer = () => {
    if (!timerStatus) {
      return;
    }
    clearInterval(timerId);
    setTimerStatus(false);
  };

  const handleTimer = () => {
    if (timerStatus) {
      return;
    }
    let intervalId;
    intervalId = setInterval(() => {
      setTimerStatus(true);
      setTimerId(intervalId);
      setMilliSeconds((prev) => (prev > 100 ? prev - prev : prev + 1));
    }, 10);
  };

  useEffect(() => {
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (milliSeconds > 100) {
      setSec((prev) => (prev > 59 ? prev - 59 : prev + 1));
    }
  }, [milliSeconds]);
  useEffect(() => {
    if (sec > 59) {
      setMin((prev) => (prev > 59 ? prev - 59 : prev + 1));
    }
  }, [sec]);

  useEffect(() => {
    if (min > 59) {
      setHour((prev) => (prev > 59 ? prev - 59 : prev + 1));
    }
  }, [min]);

  return (
    <>
      <div className={styles.display}>
        <div className={styles.timerDisplay}>
          <div className={styles.box}>
            <p className={styles.digit}>
              {hour < 10 ? `0${hour}` : hour}
              <span className={styles.variant}>h</span>
            </p>
          </div>
          <div className={styles.box}>
            <p className={styles.digit}>
              {min < 10 ? `0${min}` : min}
              <span className={styles.variant}>m</span>
            </p>
          </div>
          <div className={styles.box}>
            <p className={styles.digit}>
              {sec < 10 ? `0${sec}` : sec}
              <span className={styles.variant}>s</span>
            </p>
          </div>
          <div className={styles.box}>
            <p className={styles.digit}>
              {milliSeconds < 10 ? `0${milliSeconds}` : milliSeconds}
              <span className={styles.variant}>ms</span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.btnGroup}>
        <button
          onClick={timerStatus ? stopTimer : handleTimer}
          className={styles.primary}
        >
          {timerStatus ? "STOP" : "START"}
        </button>
        <button onClick={resetTimer} className={styles.secondary}>
          RESET
        </button>
      </div>
    </>
  );
};
