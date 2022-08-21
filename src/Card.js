import React, { useState } from "react";

export default function Card({
  angle = 0,
  front = null,
  back = null,
  onFlip = null,
}) {
  const [visibleFace, setVisibleFace] = useState("front");

  let faces;
  if (back !== null) {
    faces = (
      <>
        <div className={`pane-interior card-container-front`}>{front}</div>
        <div className={`pane-interior card-container-back`}>{back}</div>
      </>
    );
  } else {
    faces = (
      <>
        <div className={`pane-interior card-container-front`}>{front}</div>
      </>
    );
  }

  return (
    <div
      className="card-container"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <div
        className={`card-container-inner ${
          visibleFace === "front" ? null : "card-container-inner-animate"
        }`}
        onClick={() => {
          return back !== null ? setVisibleFace("back") : null;
        }}
        onAnimationEnd={back !== null ? onFlip() : console.log("none")}
      >
        {faces}
      </div>
    </div>
  );
}
