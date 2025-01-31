import { useState } from "react"

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0) // how you're placed in time
  const [descending, setDescending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]; 

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  };

  // improvement 3: toggle moves by ascending/descending order 
  let moveList = history.map((squares, move) => {
    let description = (move > 0)
     ? (move === currentMove) // improvement 1: nested ternary
     ? `You are at move #${move}` 
     : `Go to move #${move}`
     : `Go to game start`
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  const moves = descending ? moveList : moveList.reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ul>{moves}</ul>
        <button
         onClick={() => setDescending(!descending)}>
          Sort by {descending ? "ascending" : "descending"} order
        </button>
      </div>
    </div>
  )
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) { return } // guard pattern noice
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O"; 
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  // ternary operator multiline so clean 
  let status = (winner) 
    ? `Winner: ${winner}` // and string formatting wutttt
    : `Current Player: ${xIsNext ? "X" : "O"}`

  let board = []
  for (let row = 0; row < 3; row++) {
    let rowArray = []
    for (let col = 0; col < 3; col++) {
      const pos = 3 * row + col
      rowArray.push(<Square 
        value={squares[pos]} 
        onSquareClick={() => handleClick(pos)} 
        key={pos} 
      />)
    }
    board.push(rowArray)
  }

  return (
    <>
      <h1 className="status">{status}</h1>
      {// improvement 2: mapping nested arrays
      board.map((row, index) => (
        <div className="board-row" key={index}>{row}</div> 
      ))}
    </>
  )
}

function Square({ value, onSquareClick }) {
  return (
    <button 
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

// REFACTORING NOTES
// use List.at() for negative indexing,

// FOR NEXT TIME:
// push incremental changes
// to track interesting syntax shifts over time
// rather than breezing through implementation in bursts
// and only committing final versions of code
// seeing how code evolves over time seems cool...