import React, { useState, useEffect, StrictMode } from "react";
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import Pane from "./Pane";
import CardDisplay from "./CardDisplay";
import { createRoot } from "react-dom/client";

export const GameContext = React.createContext();

function randomAngle(max) {
  const ret = Math.floor(Math.random() * max) + 1;
  return ret;
}

function newCard(num) {
  const rnum = randomAngle(2);
  return {
    key: rnum,
    angle: randomAngle(5) * (num % 2 ? 1 : -1),
    name: "newCard" + rnum,
    temp: rnum,
  };
}

const App = () => {
  const [roundNumber, setRoundNumber] = useState(0);
  const [newRound, setNewRound] = useState(null);
  const [gameStatus, setGameStatus] = useState("not-started");
  const [flipped, setFlipped] = useState(0);
  const [answer, setAnswer] = useState("waiting-for-answer"); // waiting-for-answer | higher | lower

  const cardInfo = [
    {
      angle: -1,
      type: "intro",
      name: "Hi",
      temp: 20,
    },
    {
      angle: 2,
      type: "back",
      name: "Yo",
      temp: -5,
    },
    {
      angle: -4,
      name: "Wee",
      temp: 33,
    },
    {
      angle: 1,
      name: "Yikes",
      temp: 0,
    },
  ];

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
      <button
        style={{ position: "absolute", zIndex: 100 }}
        onClick={() => {
          console.log("clicked");
          startNewRound();
        }}
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
