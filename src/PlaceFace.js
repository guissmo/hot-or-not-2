import React from "react";
import Face from "./Face";
import TemperatureDisplay from "./TemperatureDisplay";
import Image from "./Image";

export default function PlaceFace({ name, temp, showOverlay, activeCard }) {
  return (
    <Face className="place-card">
      <div className="photo">
        <Image />
      </div>
      <div className="info">
        <p>{name}</p>
      </div>
      <TemperatureDisplay
        temp={temp}
        showOverlay={showOverlay}
        activeCard={activeCard}
      />
    </Face>
  );
}
