import React, { useState } from "react";
import Face from "./Face";

// side = front | back
export default function PlaceFace({ name, temp, status, hooks, suspensing }) {
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
                hooks.setAnswer("hotter");
                hooks.setGameStatus("suspensing");
              }}
            >
              <i className="fa-solid fa-angle-up"></i>
            </button>
            <button
              className="colder"
              onClick={() => {
                hooks.setAnswer("colder");
                hooks.setGameStatus("suspensing");
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
