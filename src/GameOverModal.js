import React, { useState, useContext } from "react";
import { GameContext } from "./index";

const URL = `https://hotornot.guissmo.com`;
const TITLE = `🔥 HOT or NOT \uD83D\uDC4E`;

function tauntMessage(leftName, rightName, score) {
  let ret = "";
  ret += `${TITLE} \n`;
  ret += `Can you guess if ${leftName} is currently hotter than ${rightName}? `;
  ret += `Try to beat my score of ${score} point${score != 1 ? "s" : ""}! `;
  ret += `${URL}\n`;
  return ret;
}

function copyResultsToClipboard(leftName, rightName, setCopied, score) {
  const ret = tauntMessage(leftName, rightName, score);
  navigator.clipboard.writeText(ret);
  setCopied(true);
  setTimeout(() => {
    setCopied(false);
  }, 10000);
}

export function ShareModal({ leftName, rightName, score }) {
  const GCon = useContext(GameContext);
  const [copied, setCopied] = useState(false);
  const textArea = tauntMessage(leftName, rightName, score);
  return (
    <div
      className="pane full-pane"
      // style="width: 100%; height: 100%"
      // style="opacity: 0.5"
    >
      <div className="card-container rotate game-over">
        <div className="card-container-inner">
          <div
            className={`pane-interior share-card card-container-front scale-in ${
              GCon.gameStatus === "transitioning-from-game-over"
                ? "scale-out"
                : "scale-in"
            }`}
          >
            <span className="share-title">SHARE</span>
            <span className="share-info">
              <div>
                <p>
                  {copied ? (
                    "Now, open your messaging app and paste!"
                  ) : (
                    <>
                      Tap one of the social media buttons or tap{" "}
                      <a
                        onClick={() => {
                          copyResultsToClipboard(
                            leftName,
                            rightName,
                            setCopied,
                            score
                          );
                        }}
                        href="#"
                      >
                        here
                      </a>{" "}
                      to copy to your clipboard.
                    </>
                  )}
                </p>
              </div>
            </span>
            <span className="restart-span game-over-buttons">
              <button
                className="restart"
                onClick={
                  GCon.gameStatus === "game-over"
                    ? () => {
                        GCon.restartGame();
                      }
                    : null
                }
              >
                <i
                  className={`fa-solid fa-refresh ${
                    GCon.gameStatus === "loading-next-card-from-game-over"
                      ? "spinning"
                      : null
                  }`}
                ></i>
              </button>
            </span>
            <span className="share-buttons">
              <span className="facebook-span">
                <a
                  href="https://www.facebook.com/sharer.php?u=https://hotornot.guissmo.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="facebook share">
                    <i className="fa-brands fa-facebook"></i>
                  </button>
                </a>
              </span>
              <span className="whatsapp-span">
                <a
                  href={`https://api.whatsapp.com/send?text=${textArea}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="whatsapp share">
                    <i className="fa-brands fa-whatsapp"></i>
                  </button>
                </a>
              </span>
              <span className="twitter-span">
                <a
                  href={`https://twitter.com/share?text=${textArea}&via=jguissmo&hashtags=#hotornot`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="twitter share">
                    <i className="fa-brands fa-twitter"></i>
                  </button>
                </a>
              </span>
              <span className="mail-span">
                <a
                  href={`mailto:?subject=${TITLE}&body=${textArea}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="mail share">
                    <i className="fa-solid fa-envelope"></i>
                  </button>
                </a>
              </span>
              <span className="linkedin-span">
                <a
                  href={`https://www.linkedin.com/shareArticle?url=${URL}&title=${TITLE}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="linkedin share">
                    <i className="fa-brands fa-linkedin"></i>
                  </button>
                </a>
              </span>
              <span className="reddit-span">
                <a
                  href={`https://reddit.com/submit?url=${URL}&title=${TITLE}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="reddit share">
                    <i className="fa-brands fa-reddit"></i>
                  </button>
                </a>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GameOverModal({ leftName, rightName, correctAnswer }) {
  const GCon = useContext(GameContext);
  const [share, setShare] = useState(false);

  let copiedDialog = null;
  if (share) {
    copiedDialog = (
      <ShareModal
        leftName={leftName}
        rightName={rightName}
        score={GCon.finalScore}
      />
    );
  }

  return (
    <>
      <div className="pane full-pane">
        <div className="card-container rotate game-over">
          <div className="card-container-inner">
            <div
              className={`pane-interior game-over-card card-container-front ${
                GCon.gameStatus === "transitioning-from-game-over"
                  ? "scale-out"
                  : "scale-in"
              }`}
            >
              <span className="game-over-title">GAME OVER</span>
              <span className="game-over-info">
                {rightName} is currently {correctAnswer} than {leftName}.
              </span>
              <span className="game-over-score">
                <p className="game-over-score-label">SCORE</p>
                <p>{GCon.finalScore}</p>
              </span>
              <span className="game-over-buttons">
                <button className="share" onClick={() => setShare(true)}>
                  <i className="fa-solid fa-share-nodes"></i>
                </button>
                <button
                  className="restart"
                  onClick={
                    GCon.gameStatus === "game-over"
                      ? () => {
                          GCon.restartGame();
                        }
                      : null
                  }
                >
                  <i
                    className={`fa-solid fa-refresh ${
                      GCon.gameStatus === "loading-next-card-from-game-over" ||
                      GCon.gameStatus === "transitioning-from-game-over"
                        ? "spinning"
                        : null
                    }`}
                  ></i>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      {copiedDialog}
    </>
  );
}
