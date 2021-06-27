import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Game from "./Components/Game";
import "./CSS/game.css";

function Index() {
  return <Game />;
  }
const reactContainer = document.getElementById("react-dom-container");
ReactDOM.render(<Index/>, reactContainer);
