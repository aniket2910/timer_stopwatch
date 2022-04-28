import React, { useEffect, useState } from "react";
import styles from "./Wrapper.module.css";

export const Timer = () => {
  const [activeDisplay, setActiveDisplay] = useState("Timer");
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(5);
  const [sec, setSec] = useState(0);
  const [timerStatus, setTimerStatus] = useState(false);
  const [initHour, setInitHour] = useState(0);
  const [initMin, setInitMin] = useState(0);
  const [initSec, setInitSec] = useState(0);
  const [timerId, setTimerId] = useState(0);

  const resetTimer = () => {
    if (activeDisplay === "Timer") {
      setTimerStatus(false);
      clearInterval(timerId);
      setHour(0);
      setMin(0);
      setSec(0);
    } else {
      setActiveDisplay("Timer");
      handleTimer();
    }
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
    if (activeDisplay === "Timer") {
      if (hour === 0 && min === 0 && sec === 0) {
        setHour(0);
        setMin(5);
        setSec(0);
      }
      let intervalId;
      intervalId = setInterval(() => {
        setTimerStatus(true);
        setTimerId(intervalId);
        setSec((prev) => (prev < 0 ? prev + 59 : prev - 1));
      }, 10);
    } else {
      setActiveDisplay("Timer");
      setHour(initHour);
      setMin(initMin);
      setSec(initSec);
      let intervalId;
      intervalId = setInterval(() => {
        setTimerStatus(true);
        setTimerId(intervalId);
        setSec((prev) => (prev < 0 ? prev + 59 : prev - 1));
      }, 10);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (sec === 0 && min === 0 && hour === 0) {
      clearInterval(timerId);
      setTimerStatus(false);
    }
  }, [sec, min, hour]);

  useEffect(() => {
    if (sec < 0) {
      setMin((prev) => (prev < 0 ? prev + 59 : prev - 1));
    }
  }, [sec]);

  useEffect(() => {
    if (min < 0) {
      setHour((prev) => (prev < 0 ? prev + 59 : prev - 1));
    }
  }, [min]);

  const handleTimerInputs = (e) => {
    // console.log(e.target.value);
    let value = String(e.target.value);
    let name = e.target.name;
    if (value.length > 2) {
      let updatedStr = value[1] + value[2];
      if (name === "initMin") {
        setInitMin(updatedStr);
      } else if (name === "initSec") {
        setInitSec(updatedStr);
      } else {
        setInitHour(updatedStr);
      }
    } else {
      if (name === "initMin") {
        setInitMin(value);
      } else if (name === "initSec") {
        setInitSec(value);
      } else {
        setInitHour(value);
      }
    }
  };
  return (
    <>
      <div className={styles.display}>
        {activeDisplay === "Timer" ? (
          <div
            onClick={() => setActiveDisplay("Input")}
            className={styles.timerDisplay}
          >
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
          </div>
        ) : (
          <div className={styles.inputs}>
            <div className={styles.box}>
              <label>
                <input
                  type="number"
                  name="initHour"
                  value={initHour}
                  onChange={handleTimerInputs}
                  maxLength={2}
                  min={0}
                  max={23}
                />
                <span className={styles.variant}>h</span>
              </label>
            </div>
            <div className={styles.box}>
              <label>
                <input
                  type="number"
                  name="initMin"
                  onChange={handleTimerInputs}
                  value={initMin}
                  maxLength={2}
                  min={0}
                  max={59}
                />
                <span className={styles.variant}>m</span>
              </label>
            </div>
            <div className={styles.box}>
              <label>
                <input
                  type="number"
                  autoFocus
                  name="initSec"
                  min={0}
                  max={59}
                  onChange={handleTimerInputs}
                  value={initSec}
                  size={2}
                />
                <span className={styles.variant}>s</span>
              </label>
            </div>
          </div>
        )}
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
