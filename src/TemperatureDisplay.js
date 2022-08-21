/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import TemperatureOverlay from "./TemperatureOverlay";
import { GameContext } from "./index";

function randomInteger(max) {
  const ret = Math.floor(Math.random() * max);
  return ret;
}

function suspenser(leftTemp, rightTemp, answer, gap) {
  let t = 0;
  const ret = [];
  if (answer === "hotter") {
    if (leftTemp <= rightTemp) {
      const startTemp = leftTemp - (randomInteger(10) + 10);
      const slowDown = randomInteger(3) + 3;
      const closeEnough = randomInteger(3) + 2;
      for (let i = startTemp; i <= rightTemp; i++) {
        ret.push([i, t]);
        t += gap;
        if (i <= leftTemp && leftTemp - i < slowDown) {
          t += Math.floor(gap * (1 + 2 * (5 - (leftTemp - i))));
          if (leftTemp - rightTemp < closeEnough) {
            t += gap * 10;
          }
        }
        if (leftTemp < i && i < rightTemp) {
          t += Math.floor(gap * 0.2);
        }
      }
    } else {
      const startTemp = rightTemp - (randomInteger(5) + 15);
      const slowDown = randomInteger(3) + 1;
      const closeEnough = randomInteger(3) + 2;
      for (let i = startTemp; i <= rightTemp; i++) {
        ret.push([i, t]);
        t += gap;
        if (i <= rightTemp && rightTemp - i < slowDown) {
          t += Math.floor(gap * (1 + 2 * (5 - (rightTemp - i))));
          if (rightTemp - leftTemp < closeEnough) {
            t += gap * 10;
          }
        }
      }
    }
  }
  if (answer === "colder") {
    if (leftTemp >= rightTemp) {
      const startTemp = leftTemp + (randomInteger(10) + 10);
      const slowDown = randomInteger(3) + 1;
      const closeEnough = randomInteger(3) + 2;
      for (let i = startTemp; i >= rightTemp; i--) {
        ret.push([i, t]);
        t += gap;
        if (leftTemp <= i && i - leftTemp < slowDown) {
          t += Math.floor(gap * (1 + 2 * (5 - (i - leftTemp))));
          if (leftTemp - rightTemp < closeEnough) {
            t += gap * 10;
          }
        }
        if (rightTemp < i && i < leftTemp) {
          t += Math.floor(gap * 0.2);
        }
      }
    } else {
      const startTemp = rightTemp + (randomInteger(5) + 15);
      const slowDown = randomInteger(3) + 3;
      const closeEnough = randomInteger(3) + 2;
      for (let i = startTemp; i >= rightTemp; i--) {
        ret.push([i, t]);
        t += gap;
        if (rightTemp <= i && i - rightTemp < slowDown) {
          t += Math.floor(gap * (1 + 2 * (5 - (i - rightTemp))));
          if (rightTemp - leftTemp < closeEnough) {
            t += gap * 10;
          }
        }
      }
    }
  }
  t += 150;
  ret.push([NaN, t]);
  return ret;
}

export default function TemperatureDisplay({ temp, showOverlay, activeCard }) {
  const [tempDisplay, setTempDisplay] = useState(activeCard ? "?" : temp);
  const [dummyTemp, setDummyTemp] = useState(2);
  const GCon = useContext(GameContext);
  console.log(temp, showOverlay);

  function answerChosen() {
    suspenser(GCon.shownTemperature(), temp, "colder", 10).map(([x, y]) => {
      if (!Number.isNaN(x)) setTimeout(() => setDummyTemp(x), y);
      else
        setTimeout(() => {
          setTempDisplay(temp);
          GCon.setGameStatus("answer-shown");
        }, y);
    });
  }

  return (
    <div className="temp">
      <p>
        {GCon.gameStatus === "suspensing" && activeCard
          ? dummyTemp
          : tempDisplay}
      </p>
      {showOverlay ? <TemperatureOverlay answerChosen={answerChosen} /> : null}
    </div>
  );
}
