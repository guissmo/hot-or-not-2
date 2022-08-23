import React, { useState, useEffect, StrictMode } from "react";
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import Pane from "./Pane";
import CardDisplay from "./CardDisplay";
import { createRoot } from "react-dom/client";
import Modal from "./Modal";
import GameOverModal from "./GameOverModal";

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
    name: "newCard" + myTemp,
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
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

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
      <GameOverModal
        leftName={cardInfo[roundNumber].name}
        rightName={cardInfo[roundNumber + 1].name}
        correctAnswer={
          cardInfo[roundNumber].temp < cardInfo[roundNumber + 1].temp
            ? "hotter"
            : "colder"
        }
      />
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
        startNextRound,
        addNextCard,
        restartGame,
        gameOver,
        finalScore,
      }}
    >
      {gameStatus === "game-over" ||
      gameStatus === "transitioning-from-game-over"
        ? gameOverModal
        : null}
      <button
        style={{ position: "absolute", zIndex: 100 }}
        onClick={addNextCard}
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

  function gameOver() {
    setGameStatus("game-over");
    setFinalScore(score);
  }

  function startNextRound() {
    setScore(score + 1);
    addNextCard();
  }

  function restartGame() {
    setScore(0);
    addNextCard("-from-game-over");
  }

  function addNextCard(str = "") {
    cardInfo.push(newCard(roundNumber));
    console.log(cardInfo);
    setGameStatus("transitioning" + str);
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
