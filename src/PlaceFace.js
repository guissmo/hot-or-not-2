import React from "react";
import Face from "./Face";
import TemperatureDisplay from "./TemperatureDisplay";
import Image from "./Image";

export default function PlaceFace({
  name,
  country,
  temp,
  photoData,
  showOverlay,
  activeCard,
}) {
  return (
    <Face className="place-card">
      <div className="photo">
        <Image src={photoData.image.web} />
      </div>
      <div className="info">
        <p className="p-info info-name">{name}</p>
        <p className="p-info info-country">{country}</p>
      </div>
      <TemperatureDisplay
        temp={temp}
        showOverlay={showOverlay}
        activeCard={activeCard}
      />
    </Face>
  );
}
