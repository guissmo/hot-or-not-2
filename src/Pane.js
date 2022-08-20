import React from "react";

// side = left | right
export default function Pane({ side, children, onAnimationEnd }) {
  return (
    <div className={`pane ${side}`} onAnimationEnd={onAnimationEnd}>
      {children}
    </div>
  );
}
