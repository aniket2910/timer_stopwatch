import React, { useState } from "react";
import { StopWatch } from "./StopWatch";
import { Timer } from "./Timer";
import styles from "./Wrapper.module.css";

const Wrapper = () => {
  const [activeNav, setActiveNav] = useState("Timer");
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div
          className={`${styles.nav} ${
            activeNav === "Timer" ? `${styles.activeNav}` : ``
          }  `}
          onClick={() => setActiveNav("Timer")}
        >
          <p>Timer</p>
        </div>
        <div
          className={`${styles.nav} ${
            activeNav === "Stopwatch" ? `${styles.activeNav}` : ``
          }  `}
          onClick={() => setActiveNav("Stopwatch")}
        >
          <p>Stopwatch </p>
        </div>
      </div>
      <div className={styles.component}>
        {activeNav === "Timer" ? <Timer /> : <StopWatch />}
      </div>
    </div>
  );
};

export default Wrapper;
