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
  const activeCard = myRoundNumber === GCon.roundNumber + 1;
  const MyPlaceFace = (
    <PlaceFace
      key={key}
      name={cardInfo.name}
      temp={cardInfo.temp}
      activeCard={activeCard}
      showOverlay={GCon.answer === "waiting-for-answer" && activeCard}
      suspensing={suspensing}
    />
  );

  if (cardInfo.type === "intro" && GCon.roundNumber === 0) {
    return (
      <Card
        key={key}
        angle={cardInfo.angle}
        flippable={cardInfo.type === "intro" || cardInfo.type === "back"}
        onFlip={() => {
          console.log("yeaaa");
          // GCon.setFlipped(GCon.flipped + 1);
        }}
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
