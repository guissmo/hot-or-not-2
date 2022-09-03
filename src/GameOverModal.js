import React, { useContext } from "react";
import { GameContext } from "./index";

export default function GameOverModal({ leftName, rightName, correctAnswer }) {
  const GCon = useContext(GameContext);
  return (
    <div className="pane full-pane">
      <div className="card-container rotate game-over">
        <div className="card-container-inner">
          <div
            className={`pane-interior game-over-card card-container-front ${
              GCon.gameStatus === "transitioning-from-game-over"
                ? "scale-out"
                : "scale-in"
            }`}
          >
            <span className="game-over-title">GAME OVER</span>
            <span className="game-over-info">
              {rightName} is currently {correctAnswer} than {leftName}.
            </span>
            <span className="game-over-score">
              <p className="game-over-score-label">SCORE</p>
              <p>{GCon.finalScore}</p>
            </span>
            <span className="game-over-buttons">
              <button className="share">
                <i className="fa-solid fa-share-nodes"></i>
              </button>
              <button
                className="restart"
                onClick={() => {
                  GCon.restartGame();
                }}
              >
                <i className="fa-solid fa-refresh"></i>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
