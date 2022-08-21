import React, { useContext } from "react";
import { GameContext } from "./index";

export default function TemperatureOverlay({ answerChosen }) {
  const GCon = useContext(GameContext);
  return (
    <div className="temp-overlay">
      <button
        className="hotter"
        onClick={
          GCon.gameStatus === "started"
            ? () => {
                GCon.setAnswer("hotter");
                GCon.setGameStatus("suspensing");
                answerChosen();
              }
            : null
        }
      >
        <i className="fa-solid fa-angle-up"></i>
      </button>
      <button
        className="colder"
        onClick={
          GCon.gameStatus === "started"
            ? () => {
                GCon.setAnswer("colder");
                GCon.setGameStatus("suspensing");
                answerChosen();
              }
            : null
        }
      >
        <i className="fa-solid fa-angle-down"></i>
      </button>
    </div>
  );
}
