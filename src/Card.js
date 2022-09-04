import React, { useState, useContext } from "react";
import { GameContext } from "./index";
import NextRoundButton from "./NextRoundButton";

export default function Card({
  angle,
  front = null,
  back = null,
  activeCard = false,
}) {
  const [visibleFace, setVisibleFace] = useState("front");
  const GCon = useContext(GameContext);

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
          return back !== null && visibleFace !== "back"
            ? setVisibleFace("back")
            : null;
        }}
        onTransitionEnd={onFlip}
      >
        {faces}
      </div>
      {(GCon.gameStatus === "answer-shown" ||
        GCon.gameStatus === "transitioning" ||
        GCon.gameStatus === "loading-next-card") &&
      activeCard ? (
        <NextRoundButton />
      ) : null}
    </div>
  );

  function onFlip(ev) {
    if (ev.propertyName === "transform") {
      GCon.setFlipped(GCon.flipped + 1);
      if (GCon.flipped >= 1 && GCon.gameStatus === "not-started") {
        GCon.setGameStatus("started");
      }
    }
  }
}
