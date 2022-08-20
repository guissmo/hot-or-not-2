import React, { useState } from "react";

export default function Card({
  children,
  angle = 0,
  flippable,
  onFlip = null,
}) {
  const [visibleFace, setVisibleFace] = useState("front");
  console.log(onFlip);

  let faces;
  if (flippable) {
    faces = (
      <>
        <div className={`pane-interior card-container-front`}>
          {children[0]}
        </div>
        <div className={`pane-interior card-container-back`}>{children[1]}</div>
      </>
    );
  } else {
    faces = (
      <div className={`pane-interior card-container-front`}>{children}</div>
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
        onClick={() => setVisibleFace("back")}
        onAnimationEnd={flippable ? onFlip() : console.log("none")}
      >
        {faces}
      </div>
    </div>
  );
}
