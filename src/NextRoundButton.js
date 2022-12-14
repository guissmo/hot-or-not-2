import React, { useContext } from "react";
import { GameContext } from "./index";

export default function NextRoundButton() {
  const GCon = useContext(GameContext);

  return (
    <button
      className={`next-button scale-in ${
        GCon.gameStatus === "loading-next-card" ? "throb" : null
      } ${GCon.gameStatus === "transitioning" ? "peek-out" : null}`}
      onClick={
        GCon.gameStatus !== "loading-next-card" &&
        GCon.gameStatus !== "transitioning"
          ? GCon.startNextRound
          : null
      }
    >
      <p>
        <i className={`fa-solid fa-play`}></i>
      </p>
    </button>
  );
}
