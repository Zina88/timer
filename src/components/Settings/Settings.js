import ReactSlider from "react-slider";
import { useContext } from "react";
import SettingsContext from "../SettingsContext";

import BackButton from "../BackButton";
import "./slider.css";

function Settings() {
  const settigsInfo = useContext(SettingsContext);

  return (
    <div style={{ textAlign: "left" }}>
      <label>work minutes: {settigsInfo.workMinutes}:00</label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settigsInfo.workMinutes}
        onChange={(newValue) => settigsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
      <label>break minutes: {settigsInfo.breakMinutes}:00</label>
      <ReactSlider
        className={"slider green"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settigsInfo.breakMinutes}
        onChange={(newValue) => settigsInfo.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <BackButton onClick={() => settigsInfo.setShowSettings(false)} />
      </div>
    </div>
  );
}

export default Settings;
