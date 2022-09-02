import React, { useContext } from "react";
import Card from "./Card";
import PlaceFace from "./PlaceFace";
import IntroFace from "./IntroFace";
import BackFace from "./BackFace";
import { GameContext } from "./index";

export default function CardDisplay({
  cardInfo,
  myRoundNumber,
  suspensing,
  showOverlayOverride,
}) {
  const GCon = useContext(GameContext);
  const activeCard = myRoundNumber === GCon.roundNumber + 1;
  const MyPlaceFace = (
    <PlaceFace
      name={cardInfo.name}
      country={cardInfo.country}
      temp={cardInfo.temp}
      photoData={cardInfo.photoData}
      activeCard={activeCard}
      showOverlay={
        (GCon.answer === "waiting-for-answer" && activeCard) ||
        showOverlayOverride
      }
      suspensing={suspensing}
    />
  );

  if (cardInfo.type === "intro" && GCon.roundNumber === 0) {
    return (
      <Card
        angle={GCon.cardAngles[myRoundNumber]}
        flippable={cardInfo.type === "intro" || cardInfo.type === "back"}
        onFlip={() => {
          console.log("yeaaa");
          // GCon.setFlipped(GCon.flipped + 1);
        }}
        activeCard={activeCard}
        front={<IntroFace />}
        back={MyPlaceFace}
      ></Card>
    );
  }

  if (cardInfo.type === "back" && GCon.roundNumber === 0) {
    return (
      <Card
        angle={GCon.cardAngles[myRoundNumber]}
        flippable={cardInfo.type === "intro" || cardInfo.type === "back"}
        onFlip={() => console.log("hi")}
        activeCard={activeCard}
        front={<BackFace />}
        back={MyPlaceFace}
      ></Card>
    );
  }

  if (cardInfo.type === "game-over" && GCon.roundNumber === 0) {
    return (
      <Card
        angle={GCon.cardAngles[myRoundNumber]}
        flippable={false}
        activeCard={false}
        front={"Hello"}
        back={null}
      ></Card>
    );
  }

  return (
    <Card
      angle={GCon.cardAngles[myRoundNumber]}
      flippable={cardInfo.type === "intro" || cardInfo.type === "back"}
      onFlip={() => console.log("hi")}
      activeCard={activeCard}
      front={MyPlaceFace}
      back={null}
    ></Card>
  );
}
