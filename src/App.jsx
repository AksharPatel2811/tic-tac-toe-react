import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXTurn, setIsXTurn] = useState(true)

  const [xScore, setXScore] = useState(0)
  const [oScore, setOScore] = useState(0)

  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const winnerData = calculateWinner(board)
  const winner = winnerData?.player
  const winningLine = winnerData?.line || []

  const isDraw = !winner && board.every(cell => cell !== null)

  // ✅ Safe score update (runs ONCE per game)
  useEffect(() => {
    if (winner && !gameOver) {
      if (winner === 'X') setXScore(prev => prev + 1)
      if (winner === 'O') setOScore(prev => prev + 1)
      setGameOver(true)
    }
  }, [winner, gameOver])

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXTurn(true)
    setHoveredIndex(null)
    setGameOver(false)
  }

  const resetScores = () => {
    setXScore(0)
    setOScore(0)
    resetGame()
  }

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return

    const newBoard = [...board]
    newBoard[index] = isXTurn ? 'X' : 'O'

    setBoard(newBoard)
    setIsXTurn(!isXTurn)
  }

  return (
    <div className="app-container">
      <h1 className="title">Tic Tac Toe</h1>

      <div className="scoreboard">
        X: {xScore} | O: {oScore}
      </div>

      {winner ? (
        <h2 className="status">Winner: {winner}</h2>
      ) : isDraw ? (
        <h2 className="status">Draw!</h2>
      ) : (
        <h2 className="status">Turn: {isXTurn ? 'X' : 'O'}</h2>
      )}

      <div className="buttons">
        <button onClick={resetGame}>Restart Game</button>
        <button onClick={resetScores}>Reset Scores</button>
      </div>

      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell 
              ${cell === 'X' ? 'x' : ''} 
              ${cell === 'O' ? 'o' : ''} 
              ${winningLine.includes(index) ? 'win' : ''}
              ${hoveredIndex === index && !cell && !winner ? 'hover' : ''}
            `}
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

function calculateWinner(board) {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
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
