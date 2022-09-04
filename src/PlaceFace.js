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
        {photoData.attribution ? (
          <div className="photo-credits-container">
            <div className="photo-credits">
              <a
                href={photoData.attribution.source}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-solid fa-camera-retro"></i>{" "}
                {photoData.attribution.photographer}
              </a>
            </div>
          </div>
        ) : null}
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
