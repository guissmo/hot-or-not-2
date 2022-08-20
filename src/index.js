import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import { createRoot } from "react-dom/client";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "calc(100vh - 40px)",
        width: "min(100%, 600px)",
      }}
    >
      <div style={{ width: "100%" }}>
        <Link to="/en" style={{ textDecoration: "none" }}>
          <button
            style={{
              display: "block",
              marginTop: "10px",
              marginBottom: "10px",
              width: "90%",
              height: "100px",
              fontSize: "16pt",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            ENGLISH
          </button>
        </Link>
        <Link to="/tl" style={{ textDecoration: "none" }}>
          <button
            style={{
              display: "block",
              marginTop: "10px",
              marginBottom: "10px",
              width: "90%",
              height: "100px",
              fontSize: "16pt",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            TAGALOG
          </button>
        </Link>
      </div>
    </div>
  );
};
const App = () => {
  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.log("DEVELOPMENT");
    } else {
      console.log("PRODUCTION");
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/en" element={<Game language="EN" />} />
        <Route path="/tl" element={<Game language="TL" />} />
        <Route path="/fr" element={<Game language="FR" />} />
        <Route path="/en/:id" element={<Game language="EN" />} />
        <Route path="/tl/:id" element={<Game language="TL" />} />
        <Route path="/fr/:id" element={<Game language="FR" />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
