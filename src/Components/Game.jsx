import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebsocket } from "websocket";
import "../CSS/game.css";
import Banner from "./Banner";
import Grid from "./Grid";
function Game() {
  const [state, setState] = useState({
    squares: Array(9).fill(null),
    zeroIsNext: true,
  });
  function isWinner() {
    const winnerLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of winnerLines) {
      const [a, b, c] = line;
      if (
        state.squares[a] &&
        state.squares[a] === state.squares[b] &&
        state.squares[a] === state.squares[c]
      ) {
        return state.squares[a];
      }
    }
    return null;
  }

  function GameOver() {
    for (const square of state.squares) {
      if (square === null) {
        return null;
      }
    }
    return true;
  }

  const winner = isWinner();
  const gameOver = GameOver();

  function handleClick(i) {
    if (state.squares[i] || winner || gameOver) {
      return null;
    }
    state.squares[i] = state.zeroIsNext ? "0" : "X";
    state.zeroIsNext = !state.zeroIsNext;
    setState(state);
    client.send(JSON.stringify({
        type : "message",
        msg : state 
    }));
  }

  const client = new W3CWebsocket("ws://127.0.0.1:8000");
  useEffect(() => {
    client.onopen = () => {
      console.log("Client Connected");
    };
    client.onmessage = ((message)=>{
        const datafromServer =  JSON.parse(message.data);
        console.log("Message !!! ", datafromServer);
        setState(datafromServer.msg)
    });
  },[]);
  return (
    <div className="game">
      {" "}
      Tic Tac Toe
      <div className="game-board">
        <Grid squares={state.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="announcement">
        {winner ? <Banner value={"Winner is : " + winner} /> : null}
        {gameOver ? <Banner value="Game Over" /> : null}
      </div>
    </div>
  );
}

Game.displayName = "Game";
export default Game;
