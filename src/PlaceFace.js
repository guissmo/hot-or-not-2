import React from "react";
import Face from "./Face";

// side = front | back
export default function PlaceFace({ name, temp }) {
  return (
    <Face className="place-card">
      <div className="photo">a</div>
      <div className="info">
        <p>{name}</p>
      </div>
      <div className="temp">
        <p>{temp}</p>
      </div>
    </Face>
  );
}
