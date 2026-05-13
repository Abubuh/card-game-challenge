import { useState } from 'react'
import Card from '../components/Card'
import moon from "../assets/images/moon.svg"


const GameScreen = () => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div>
      <Card image={moon} isFlipped={isFlipped} onClick={() => setIsFlipped(!isFlipped)} />
    </div>
  )
}

export default GameScreen   