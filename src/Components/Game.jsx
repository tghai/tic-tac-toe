import React, { useState } from 'react';
import Grid from './Grid';
import Banner from './Banner';
import '../CSS/game.css';
function Game() {
    const[state, setState] = useState({
        squares : Array(9).fill(null),
        zeroIsNext : true
    });
    function isWinner () {
        const winnerLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]]
        for(let line of winnerLines) {
            const[a,b,c] = line;
            if(state.squares[a] && state.squares[a] ===state.squares[b] && state.squares[a] ===state.squares[c]) {
                return state.squares[a];
            }
        }
        return null;
    }

    function GameOver() {
        for(const square of state.squares) {
            if(square === null) {
                return null;
            }
        }
        return true;
    }

    const winner = isWinner();
    const gameOver = GameOver();
  
   function handleClick(i) {
       if(state.squares[i]|| winner || gameOver) {
           return null;
       }
       state.squares[i] =  state.zeroIsNext ? "0" : "X";
       setState({...state, zeroIsNext : !state.zeroIsNext})
   }
    return (
    <div className = "game"> Tic Tac Toe
        <div className="game-board">
            <Grid squares={state.squares} onClick={(i)=>handleClick(i)}/>
        </div>
        <div className="announcement">
            {winner ? <Banner value={"Winner is : " + winner}/> : null}
            {gameOver ? <Banner value= "Game Over" />: null}
        </div>
    </div>);
}

Game.displayName = 'Game';
export default Game;
