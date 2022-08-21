import React, { useContext } from "react";
import Card from "./Card";
import PlaceFace from "./PlaceFace";
import IntroFace from "./IntroFace";
import BackFace from "./BackFace";
import { GameContext } from "./index";

export default function CardDisplay({
  key,
  cardInfo,
  myRoundNumber,
  suspensing,
}) {
  const GCon = useContext(GameContext);
  const activeRound = myRoundNumber === GCon.roundNumber + 1;
  const MyPlaceFace = (
    <PlaceFace
      key={key}
      name={cardInfo.name}
      temp={cardInfo.temp}
      status={activeRound ? "waiting-for-answer" : "else"}
      suspensing={suspensing}
    />
  );

  if (cardInfo.type === "intro" && GCon.roundNumber === 0) {
    return (
      <Card
        key={key}
        angle={cardInfo.angle}
        flippable={cardInfo.type === "intro" || cardInfo.type === "back"}
        onFlip={() => console.log("hi")}
        front={<IntroFace />}
        back={MyPlaceFace}
      ></Card>
    );
  }

  if (cardInfo.type === "back" && GCon.roundNumber === 0) {
    return (
      <Card
        key={key}
        angle={cardInfo.angle}
        flippable={cardInfo.type === "intro" || cardInfo.type === "back"}
        onFlip={() => console.log("hi")}
        front={<BackFace />}
        back={MyPlaceFace}
      ></Card>
    );
  }

  return (
    <Card
      key={key}
      angle={cardInfo.angle}
      flippable={cardInfo.type === "intro" || cardInfo.type === "back"}
      onFlip={() => console.log("hi")}
      front={MyPlaceFace}
      back={null}
    ></Card>
  );
}
