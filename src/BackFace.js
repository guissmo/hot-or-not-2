import React from "react";
import Face from "./Face";

export default function BackFace() {
  return (
    <Face className="back-card">
      <div className="back-card-inner-div">
        <div className="logo">
          <span className="hot">
            <span>H</span>
            <span>
              <i className="fa-solid fa-fire-flame-curved"></i>
            </span>
            <span>T</span>
          </span>
          <span className="or">
            <i className="fa-solid fa-angle-down"></i> OR{" "}
            <i className="fa-solid fa-angle-up"></i>
          </span>
          <span className="not">
            <span>N</span>
            <span>
              <i className="fa-solid fa-ban"></i>
            </span>
            <span>T</span>
          </span>
        </div>
      </div>
    </Face>
  );
}
