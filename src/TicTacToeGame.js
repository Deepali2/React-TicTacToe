import React, { useState, useEffect } from 'react';
import Board from './Board';
import Moves from './Moves';

const TicTacToeGame = () => {
  // states
  const [step, setStep] = useState(0) // keeps track of where we are in the game
  const [history, setHistory] = useState([{ squares: Array.from({ length: 9 }, () => null) }]); // set the initial state of the board to null values
  const [xIsNext, setXIsNext] = useState(true); // keeps track of whose turn it is: X or O. Assuming here that O goes first (so odd moves) and X goes on even moves
  const [status, setStatus] = useState(''); // tracks the status of the game: ongoing, draw, winner

  //functions
  const handleClick = (i) => {
    const historyArr = history.slice(0, step + 1);
    const curr = historyArr[historyArr.length - 1];
    const squares = curr.squares.slice();

    if (calculateWinner(squares)) return;
    else if (checkDraw(squares)) return;

    squares[i] = xIsNext ? 'X' : 'O';

    setHistory([...historyArr, { squares }]);
    setXIsNext(prevState => !prevState);
    setStep(historyArr.length)
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const checkDraw = (squares) => {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        return false;
      }
    }
    return true;
  }

  useEffect(
    () => {
      const winner = calculateWinner(history[step].squares);
      const draw = checkDraw(history[step].squares);

      if (winner) setStatus(`Winner: ${winner}`);
      else if (draw) setStatus(`It is a draw`);
      else setStatus(`Next player: ${xIsNext ? 'X' : 'O'}`)
    }, [setStatus, xIsNext, step]
  )

  // return
  return (
    <div>
      <h1 className="heading">tic tac toe</h1>
      <div className="game">
        <Board squares={history[history.length - 1].squares} handleClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <h1 className="status">{status}</h1>
        {/* <Moves setStep={setStep} setXIsNext={setXIsNext} history={history} /> */}
      </div>
    </div>
  )
};

export default TicTacToeGame;