import { useState } from 'react'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXTurn, setIsXTurn] = useState(true)

  const handleClick = (index) => {
    // prevent overwriting a cell
    if (board[index] !== null) return

    const newBoard = [...board]
    newBoard[index] = isXTurn ? 'X' : 'O'

    setBoard(newBoard)
    setIsXTurn(!isXTurn)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Tic Tac Toe</h1>
      <h2>Turn: {isXTurn ? 'X' : 'O'}</h2>

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
            style={cellStyle}
            onClick={() => handleClick(index)}
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
  border: '2px solid black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '32px',
  cursor: 'pointer'
}

export default App
