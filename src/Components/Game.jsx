import React, { useEffect, useMemo, useState } from "react";
import { w3cwebsocket as W3CWebsocket } from "websocket";

import Banner from "./Banner";
import Grid from "./Grid";
import Login from "./Login";

import "../CSS/game.css";

function Game() {
  // state to maintain the status of the game-board.
  const initialState = useMemo(
    () => ({
      squares: Array(9).fill(null),
      zeroIsNext: true,
    }),
    []
  );
  const [state, setState] = useState(initialState);
  // running websocket server at this config.
  const client = new W3CWebsocket("ws://192.168.1.39:8000");

  // maintain the currentUser details
  const [userName, setUserName] = useState({ name: null, allowed: true });
  const setName = (value) => {
    setUserName({ ...userName, name: value });
    window.sessionStorage.setItem("userName", value);
  };
  /**
   * This Api is responsible for the logic to calculate if any user wins the game.
   * the following array has all the possible combination for winning the game.
   * if any of those match return the value that wins, and terminate the game.
   * @returns {string} value either 0 wins or X.
   */
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

  /**
   * This API is responsible to terminate the game when there is no empty
   * box left to click, and ask user to re-start the game.
   * @returns {Boolean} returns true is all the sqaures in the game are filled, else null.
   */
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

  /**
   * @param {Integer} i is the index of the grid which gets clicked.
   * This is the main API makes sure to update the state whenever any box is clicked.
   * Also this API covers edge cases, to terminate the flow if game is over or winned.
   * Here we fire the websocket client to pass the message to all connected clients
   * with updated state and message.
   */
  function handleClick(i) {
    if (state.squares[i] || winner || gameOver || !userName.allowed) {
      return null;
    }
    setUserName({ name: window.sessionStorage.userName, allowed: false });

    state.squares[i] = state.zeroIsNext ? "0" : "X";
    state.zeroIsNext = !state.zeroIsNext;
    setState(state);
    client.send(
      JSON.stringify({
        type: "message",
        state: state,
        userName: userName,
      })
    );
  }

  /**
   * This is the life-cycle hack for functions component in react,
   * this method gets called when "componentDidMount" means after compoenent is rendered.
   * @returns {Function} this is callback function called when component will unmount.
   */
  useEffect(() => {
    client.onopen = () => {
      console.log("Client Connected");
    };
    client.onmessage = (message) => {
      const datafromServer = JSON.parse(message.data);
      console.log("Message !!! ", datafromServer);
      setUserName({
        name: window.sessionStorage.userName,
        allowed:
          window.sessionStorage.userName !== datafromServer.userName.name,
      });
      setState(datafromServer.state);
    };
    return () => {
      client.close();
    };
  }, []);

  /**
   *Brings back the game to the initial stage ,
   *i.e. board is cleaned and game starts from beginning.
   */
  function resetState() {
    setState(initialState);
    client.send(
      JSON.stringify({
        type: "message",
        state: initialState,
        userName: userName,
      })
    );
  }

  if (!userName.name) {
    return <Login onClick={setName} />;
  }

  return (
    <div className="game">
      <div className="heading">{userName.name + " :  Tic Tac Toe"}</div>
      <div className="game-board">
        <Grid squares={state.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="announcement">
        {winner ? (
          <Banner onClick={resetState} value={"Winner is : " + winner} />
        ) : null}
        {!winner && gameOver ? (
          <Banner onClick={resetState} value="Game Over" />
        ) : null}
      </div>
    </div>
  );
}

Game.displayName = "Game";
export default Game;
