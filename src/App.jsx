import { useState } from 'react'
import './App.css'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXTurn, setIsXTurn] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const winnerData = calculateWinner(board)
  const winner = winnerData?.player
  const winningLine = winnerData?.line || []

  const isDraw = !winner && board.every(cell => cell !== null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXTurn(true)
  }

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return

    const newBoard = [...board]
    newBoard[index] = isXTurn ? 'X' : 'O'

    setBoard(newBoard)
    setIsXTurn(!isXTurn)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Tic Tac Toe</h1>

      {winner ? (
        <h2>Winner: {winner}</h2>
      ) : isDraw ? (
        <h2>Draw!</h2>
      ) : (
        <h2>Turn: {isXTurn ? 'X' : 'O'}</h2>
      )}

      <button
        onClick={resetGame}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Restart Game
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gap: '10px',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        {board.map((cell, index) => (
          <div
            key={index}
            style={{
              ...cellStyle,
              color: cell === 'X' ? '#e63946' : '#1d3557',
              backgroundColor: winningLine.includes(index)
                ? '#a8dadc'
                : hoveredIndex === index && !cell && !winner
                ? '#eaeaea'
                : '#ffffff'
            }}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {cell}
          </div>
        ))}
      </div>
    </div>
  )
}

const cellStyle = {
  width: '100px',
  height: '100px',
  border: '2px solid #333',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '36px',
  fontWeight: 'bold',
  cursor: 'pointer'
}

function calculateWinner(board) {
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

  for (let line of lines) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line }
    }
  }

  return null
}

export default App
