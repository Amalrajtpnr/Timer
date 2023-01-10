import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [time, setTime] = useState(); // new Date().toLocaleTimeString()
  const [isActive, setIsActive] = useState(true);

  // function toggle() {
  //   setIsActive(!isActive);
  // }

  // function checker() {
  //   if (toggle ===isActive) {
  //     setHours(hours);
  //     seconds(seconds);
  //     setMinutes(minutes);
  //   }
  // }

  // useEffect(() => {
  //   const interval = setInterval(() => {}, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  var date = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  let interval;

  useEffect(() => {
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(parseInt(seconds) + 1);
        // setDate(this.setState(new Date()));
        setTime(new Date().toLocaleTimeString());
        if (seconds === 59) {
          setMinutes(parseInt(minutes) + 1);
          setSeconds(0);
        } else if (minutes === 60) {
          setHours((hours) => parseInt(hours) + 1);
          setMinutes(0);
          setSeconds(0);
        }

        // convertToMinutesAndHours(seconds);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds, minutes, isActive]);

  // const convertToMinutesAndHours = (seconds) => {
  //   let hours = Math.floor(seconds / 3600);
  //   let minutes = Math.floor((seconds % 3600) / 60);
  //   let remainingSeconds = seconds % 60;
  //   console.log(hours, minutes, remainingSeconds);
  // };

  return (
    <div className={styles.App}>
      <div className={styles.mobile}>
        <div className={styles.clock}>
          <h1 className={styles.interval}>{time}</h1>
          <h1 className={styles.interval}>{formattedDate}</h1>
        </div>
        <div className={styles.navbar}></div>
        <div className={styles.timer}>
          <div className={styles.time}>
            <h1 className={styles.number}>
              {hours < 10 ? "0" + hours : hours}
            </h1>
            <h1 className={styles.title}>Hours</h1>
          </div>
          <div className={styles.time}>
            <h1 className={styles.number}>
              {minutes < 10 ? "0" + minutes : minutes}
            </h1>
            <h1 className={styles.title}>Minutes</h1>
          </div>
          <div className={styles.time}>
            <h1 className={styles.number}>
              {seconds < 10 ? "0" + seconds : seconds}
            </h1>
            <h1 className={styles.title}>Seconds</h1>
          </div>
        </div>
        <div className={styles.button}>
          <button
            className={styles.click}
            onClick={() => {
              setMinutes(0), setSeconds(0), setHours(0);
            }}
          >
            Restart
          </button>
          <button
            className={styles.click1}
            onClick={() => {
              // clearInterval(interval);
              setIsActive(!isActive);
            }}
          >
            Start/Stop
          </button>
        </div>
      </div>
    </div>
  );
}
