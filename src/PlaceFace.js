import React from "react";
import Face from "./Face";

// side = front | back
export default function PlaceFace({ name, temp, status, setAnswer }) {
  return (
    <Face className="place-card">
      <div className="photo">a</div>
      <div className="info">
        <p>{name}</p>
      </div>
      <div className="temp">
        <p>{status === "asking" ? "?" : temp}</p>
        {status === "asking" ? (
          <div className="temp-overlay">
            <button className="hotter" onClick={() => setAnswer("hotter")}>
              <i className="fa-solid fa-angle-up"></i>
            </button>
            <button className="colder" onClick={() => setAnswer("colder")}>
              <i className="fa-solid fa-angle-down"></i>
            </button>
          </div>
        ) : null}
      </div>
    </Face>
  );
}
