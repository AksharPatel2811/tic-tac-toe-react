function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Tic Tac Toe</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gap: '10px',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        <div style={cellStyle}></div>
        <div style={cellStyle}></div>
        <div style={cellStyle}></div>
        <div style={cellStyle}></div>
        <div style={cellStyle}></div>
        <div style={cellStyle}></div>
        <div style={cellStyle}></div>
        <div style={cellStyle}></div>
        <div style={cellStyle}></div>
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
