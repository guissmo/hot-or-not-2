import React, { useState, useEffect, StrictMode } from "react";
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import Pane from "./Pane";
import CardDisplay from "./CardDisplay";
import { createRoot } from "react-dom/client";
import Modal from "./Modal";
import GameOverModal from "./GameOverModal";
import { getCityName } from "./cities";

export const GameContext = React.createContext();

function randomInteger(max) {
  const ret = Math.floor(Math.random() * max);
  return ret;
}

function randomAngle(max) {
  const ret = Math.floor(Math.random() * max) + 1;
  return ret;
}

async function newCard(num) {
  const cityId = randomInteger(200);
  const myTemp = randomInteger(10) - 5;
  const name = await getCityName(cityId);
  console.log("wee" + name);
  return {
    angle: randomAngle(5) * (num % 2 ? 1 : -1),
    name, // + myTemp,
    temp: myTemp,
  };
}

const App = () => {
  const [roundNumber, setRoundNumber] = useState(0);
  const [newRound, setNewRound] = useState(null);
  const [gameStatus, setGameStatus] = useState("not-started");
  const [flipped, setFlipped] = useState(0);
  const [answer, setAnswer] = useState("waiting-for-answer"); // waiting-for-answer | higher | lower
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [cardInfo, setCardInfo] = useState([]);
  const [loadedInitialCards, setLoadedInitialCards] = useState(false);

  // async function pushCard() {
  //   const introCard = await newCard(0);
  //   const secondCard = await newCard(1);
  //   setCardInfo(
  //     cardInfo.concat([
  //       { ...introCard, type: "intro" },
  //       { ...secondCard, type: "back" },
  //     ])
  //   );
  //   setLoadedInitialCards(true);
  // }

  function shownTemperature() {
    return cardInfo[roundNumber].temp;
  }

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.log("DEVELOPMENT");
    } else {
      console.log("PRODUCTION");
    }
  }, []);

  useEffect(
    () =>
      async function () {
        if (!loadedInitialCards) {
          const introCard = await newCard(0);
          const secondCard = await newCard(1);
          setLoadedInitialCards(true);
          setCardInfo(
            cardInfo.concat([
              { ...introCard, type: "intro" },
              { ...secondCard, type: "back" },
            ])
          );
        }
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /*** SKELETON ***/
  if (!loadedInitialCards) {
    // console.log(pushCard);
    // return <button onClick={pushCard}>yo.</button>;
    return "yo.";
  }

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
        id="left-pane"
        side={`left ${newRound !== null ? "left-out" : null}`}
        onAnimationEnd={(e) => {
          if (e.animationName !== "fadeIn") {
            console.log(e);
            setNewRound(null);
            setRoundNumber(roundNumber + 1);
            setGameStatus("started");
            setAnswer("waiting-for-answer");
          }
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

  async function addNextCard(str = "") {
    cardInfo.push(await newCard(roundNumber));
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
