import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React, { useState, useEffect, StrictMode } from "react";
import Pane from "./Pane";
import Card from "./Card";
import PlaceFace from "./PlaceFace";
import IntroFace from "./IntroFace";
import BackFace from "./BackFace";
import { createRoot } from "react-dom/client";

function randomAngle(max) {
  const ret = Math.floor(Math.random() * max) + 1;
  return ret;
}

function newCard(num) {
  const rnum = randomAngle(1000000);
  return (
    <Card key={rnum} angle={randomAngle(5) * (num % 2 ? 1 : -1)}>
      <PlaceFace name={"newCard" + rnum} temp={rnum} />
    </Card>
  );
}

const App = () => {
  const [newDisplay, setNewDisplay] = useState(null);
  const [displayed, setDisplayed] = useState({
    left: (
      <Card angle={-1} onFlip={() => console.log("flipped")} flippable>
        <IntroFace />
        <PlaceFace name={"Hello"} temp={21} />
      </Card>
    ),
    right: (
      <Card angle={3} onFlip={() => console.log("flipped")} flippable>
        <BackFace />
        <PlaceFace name={"Yee"} temp={-1} />
      </Card>
    ),
  });
  const [roundNumber, setRoundNumber] = useState(1);

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.log("DEVELOPMENT");
    } else {
      console.log("PRODUCTION");
    }
  });

  return (
    <>
      <button
        style={{ position: "absolute", zIndex: 100 }}
        onClick={() => {
          console.log("clicked");
          setNewDisplay(newCard(roundNumber));
          setRoundNumber(roundNumber + 1);
        }}
      >
        Hi
      </button>
      <Pane
        side={`left ${newDisplay ? "left-out" : null}`}
        onAnimationEnd={() => {
          setDisplayed({
            left: displayed.right,
            right: newDisplay,
          });
          setNewDisplay(null);
        }}
      >
        {displayed.left}
      </Pane>
      <Pane side={`right ${newDisplay ? "right-move" : null}`}>
        {displayed.right}
      </Pane>
      {newDisplay ? (
        <Pane side={`outside outside-enter`}>{newDisplay}</Pane>
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
