import React, { useContext } from "react";
import { GameContext } from "./index";

export default function NextRoundButton() {
  const GCon = useContext(GameContext);

  return (
    <button
      className={`next-button scale-in ${
        GCon.gameStatus === "transitioning" ? "peek-out" : null
      }`}
      onClick={GCon.startNewRound}
    >
      <p>
        <i className="fa-solid fa-play"></i>
      </p>
    </button>
  );
}
