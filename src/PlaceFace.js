import React, { useState, useContext } from "react";
import Face from "./Face";
import { GameContext } from "./index";

// side = front | back
export default function PlaceFace({ name, temp, status, suspensing }) {
  const GCon = useContext(GameContext);
  const [tempDisplay, setTempDisplay] = useState(
    status === "waiting-for-answer" ? "?" : temp
  );

  if (suspensing) {
    setTimeout(() => setTempDisplay(Math.floor(Math.random() * 70) - 20), 150);
  }

  return (
    <Face className="place-card">
      <div className="photo">a</div>
      <div className="info">
        <p>{name}</p>
      </div>
      <div className="temp">
        <p>{tempDisplay}</p>
        {status === "waiting-for-answer" ? (
          <div className="temp-overlay">
            <button
              className="hotter"
              onClick={() => {
                GCon.setAnswer("hotter");
                GCon.setGameStatus("suspensing");
              }}
            >
              <i className="fa-solid fa-angle-up"></i>
            </button>
            <button
              className="colder"
              onClick={() => {
                GCon.setAnswer("colder");
                GCon.setGameStatus("suspensing");
              }}
            >
              <i className="fa-solid fa-angle-down"></i>
            </button>
          </div>
        ) : null}
      </div>
    </Face>
  );
}
