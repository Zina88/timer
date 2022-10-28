import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PauseButton from "../PauseButton";
import PlayButton from "../PlayButton";
import SettingsButton from "../SettingsButton";
import { useContext, useState, useEffect, useRef, useCallback } from "react";
import SettingContext from "../SettingsContext";

const red = "#f54e4e";
const green = "#4aec8c";

function Timer() {
  const settingsInfo = useContext(SettingContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); //work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  const switchMode = useCallback(() => {
    const nextMode = modeRef.current === "work" ? "break" : "work";
    const nextSeconds =
      (nextMode === "work"
        ? settingsInfo.workMinutes
        : settingsInfo.breakMinutes) * 60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }, [settingsInfo]);

  function tick() {
    secondsLeftRef.current--; //(-1)
    setSecondsLeft(secondsLeftRef.current);
  }

  const initTimer = useCallback(() => {
    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
  }, [settingsInfo]);

  useEffect(() => {
    initTimer();

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [initTimer, switchMode]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={minutes + ":" + seconds}
        styles={buildStyles({
          strokeLinecap: "butt",
          transition: "stroke-dashoffset 1s ease 0.3s",
          textColor: "#fff",
          pathColor: mode === "work" ? red : green,
          tailColor: "rgba(255, 255, 255, .1)",
        })}
      />
      <div style={{ marginTop: "20px" }}>
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
}

export default Timer;
