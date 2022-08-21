import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React, { useState, useEffect, StrictMode } from "react";
import Pane from "./Pane";
import Card from "./Card";
import PlaceFace from "./PlaceFace";
import IntroFace from "./IntroFace";
import BackFace from "./BackFace";
import { createRoot } from "react-dom/client";

function CardDisplay({ key, cardInfo, roundTwoStarted }) {
  console.log(cardInfo.type);
  if (cardInfo.type === "intro" && !roundTwoStarted) {
    return (
      <Card
        key={key}
        angle={cardInfo.angle}
        flippable={cardInfo.type === "intro" || cardInfo.type === "back"}
        onFlip={() => console.log("hi")}
        front={<IntroFace />}
        back={<PlaceFace name={cardInfo.name} temp={cardInfo.temp} />}
      ></Card>
    );
  }

  if (cardInfo.type === "back" && !roundTwoStarted) {
    return (
      <Card
        key={key}
        angle={cardInfo.angle}
        flippable={cardInfo.type === "intro" || cardInfo.type === "back"}
        onFlip={() => console.log("hi")}
        front={<BackFace />}
        back={<PlaceFace name={cardInfo.name} temp={cardInfo.temp} />}
      ></Card>
    );
  }

  return (
    <Card
      key={key}
      angle={cardInfo.angle}
      flippable={cardInfo.type === "intro" || cardInfo.type === "back"}
      onFlip={() => console.log("hi")}
      front={<PlaceFace name={cardInfo.name} temp={cardInfo.temp} />}
      back={null}
    ></Card>
  );
}

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
  // const [flipped, setFlipped] = useState(0);
  // const [answer, setAnswer] = useState("waiting-for-answer"); // waiting-for-answer | higher | lower

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
    <>
      <button
        style={{ position: "absolute", zIndex: 100 }}
        onClick={() => {
          console.log("clicked");
          cardInfo.push(newCard(roundNumber));
          setNewRound(roundNumber + 1);
        }}
      >
        Hi
      </button>
      <Pane
        side={`left ${newRound !== null ? "left-out" : null}`}
        onAnimationEnd={() => {
          setNewRound(null);
          setRoundNumber(roundNumber + 1);
        }}
      >
        <CardDisplay
          roundTwoStarted={roundNumber > 0}
          cardInfo={leftCard}
          key={roundNumber}
        />
      </Pane>
      <Pane side={`right ${newRound !== null ? "right-move" : null}`}>
        <CardDisplay
          roundTwoStarted={roundNumber > 0}
          cardInfo={rightCard}
          key={roundNumber + 1}
        />
      </Pane>
      {newRound !== null ? (
        <Pane side={`outside outside-enter`}>
          <CardDisplay
            roundTwoStarted={roundNumber > 0}
            cardInfo={nextCard}
            key={roundNumber + 2}
          />
        </Pane>
      ) : null}
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
