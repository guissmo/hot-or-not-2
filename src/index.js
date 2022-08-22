import React, { useState, useEffect, StrictMode } from "react";
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import Pane from "./Pane";
import CardDisplay from "./CardDisplay";
import { createRoot } from "react-dom/client";
import Modal from "./Modal";

export const GameContext = React.createContext();

function randomInteger(max) {
  const ret = Math.floor(Math.random() * max);
  return ret;
}

function randomAngle(max) {
  const ret = Math.floor(Math.random() * max) + 1;
  return ret;
}

function newCard(num) {
  const myTemp = randomInteger(10) - 5;
  return {
    angle: randomAngle(5) * (num % 2 ? 1 : -1),
    name: "newCard", // + myTemp,
    temp: myTemp,
  };
}

const cardInfo = [];
cardInfo.push({ ...newCard(0), type: "intro" });
cardInfo.push({ ...newCard(1), type: "back" });

const App = () => {
  const [roundNumber, setRoundNumber] = useState(0);
  const [newRound, setNewRound] = useState(null);
  const [gameStatus, setGameStatus] = useState("not-started");
  const [flipped, setFlipped] = useState(0);
  const [answer, setAnswer] = useState("waiting-for-answer"); // waiting-for-answer | higher | lower

  function shownTemperature() {
    return cardInfo[roundNumber].temp;
  }

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.log("DEVELOPMENT");
    } else {
      console.log("PRODUCTION");
    }
  });

  const leftCard = cardInfo[roundNumber];
  const rightCard = cardInfo[roundNumber + 1];
  const nextCard = cardInfo[roundNumber + 2];

  const gameOverModal = (
    <Modal>
      <div className="pane" style={{ width: "100%", height: "100%" }}>
        <div className="card-container rotate game-over">
          <div className="card-container-inner">
            <div className="pane-interior game-over-card card-container-front">
              <p>Game Over</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );

  return (
    <GameContext.Provider
      value={{
        roundNumber,
        answer,
        setAnswer,
        gameStatus,
        setGameStatus,
        flipped,
        setFlipped,
        shownTemperature,
        startNewRound,
      }}
    >
      {gameStatus === "game-over" ? gameOverModal : null}
      <button
        style={{ position: "absolute", zIndex: 100 }}
        onClick={startNewRound}
      >
        Hi
      </button>
      <Pane
        side={`left ${newRound !== null ? "left-out" : null}`}
        onAnimationEnd={() => {
          setNewRound(null);
          setRoundNumber(roundNumber + 1);
          setGameStatus("started");
          setAnswer("waiting-for-answer");
        }}
      >
        <CardDisplay
          cardInfo={leftCard}
          key={roundNumber}
          myRoundNumber={roundNumber}
        />
      </Pane>
      <Pane side={`right ${newRound !== null ? "right-move" : null}`}>
        <CardDisplay
          cardInfo={rightCard}
          key={roundNumber + 1}
          myRoundNumber={roundNumber + 1}
          suspensing={gameStatus === "suspensing"}
        />
      </Pane>
      {newRound !== null ? (
        <Pane side={`outside outside-enter`}>
          <CardDisplay
            cardInfo={nextCard}
            key={roundNumber + 2}
            myRoundNumber={roundNumber + 2}
            showOverlayOverride={true}
          />
        </Pane>
      ) : null}
    </GameContext.Provider>
  );

  function startNewRound() {
    cardInfo.push(newCard(roundNumber));
    console.log(cardInfo);
    setGameStatus("transitioning");
    setNewRound(roundNumber + 1);
  }
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
