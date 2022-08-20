import React from "react";

// side = front | back
export default function Face({ className, children }) {
  return <div className={`pane-interior ${className}`}>{children}</div>;
}
