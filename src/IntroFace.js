import React from "react";
import Face from "./Face";

export default function IntroFace() {
  return (
    <Face className="intro-card" style={{ fontSize: "max(2vmax, 30px)" }}>
      <div
        className="back-card-inner-div"
        // style={{
        //   color: "#eeeeee",
        //   backgroundColor: "rgba(72, 116, 54, 0.1)",
        //   filter: "drop-shadow(2px 2px 2px #000000ee)",
        //   height: "100%",
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "center",
        // }}
      >
        <h1>Instructions</h1>
        <p>
          Guess if the next city is{" "}
          <nobr>
            hotter (<i className="fa-solid fa-angle-up"></i>)
          </nobr>{" "}
          or{" "}
          <nobr>
            colder (<i className="fa-solid fa-angle-down"></i>)
          </nobr>{" "}
          by tapping the corresponding arrow.
        </p>
        {/* <div className="fake-card-container"> */}
        {/* <div className="card-container">
            <div className="card-container-inner null">
              <div className="pane-interior place-card card-container-front">
                <div className="photo"></div>
                <div className="info">
                  <p className="p-info info-name">Hell</p>
                  <p className="p-info info-country">Underworld</p>
                </div>
                <div className="temp">
                  <p>-100</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-container">
            <div className="card-container-inner null">
              <div className="pane-interior place-card card-container-front">
                <div className="photo"></div>
                <div className="info">
                  <p className="p-info info-name">Funkytown</p>
                  <p className="p-info info-country">USA</p>
                </div>
                <div className="temp">
                  <p>?</p>
                  <div className="temp-overlay">
                    <button className="hotter">
                      <i className="fa-solid fa-angle-up"></i>
                    </button>
                    <button className="colder">
                      <i className="fa-solid fa-angle-down"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        {/* </div> */}
        <p>Tap this and the other big card to start.</p>
      </div>
    </Face>
  );
}
