import React from "react";
import ReactDOM from "react-dom/client";
import { render } from "react-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import App from "./App.jsx";
import "./index.css";

const options = {
  // you can also just use 'bottom center'
  position: positions.MIDDLE,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>
);
