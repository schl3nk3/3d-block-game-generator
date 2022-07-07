import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import GameCanvas from './components/GameCanvas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <GameCanvas></GameCanvas>
    </div>
  )
}

export default App
