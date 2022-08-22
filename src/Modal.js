import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// This is from https://github.com/btholt/citr-v7-project/blob/main/12-portals-and-refs/src/Modal.js
const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
