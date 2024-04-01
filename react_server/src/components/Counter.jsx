import '../App.css'
import reactLogo from '../assets/react.svg'
import { useState } from 'react'

// Define your component
function Counter() {
  const [count, setCount] = useState(0)

  function incrementAndDecrement(operator) {
    switch (operator) {
      case '+':
        setCount(count + 1)
        break
      case '-':
        if (count > 0) {
          setCount(count - 1)
        }
        break
      default:
        throw new Error('Unsupported operator')
    }
  }
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React Counter</h1>
      <div className="card flex">
        <div>
          <button onClick={() => incrementAndDecrement('+')}>+</button>
        </div>
        <div>
          <button>count is {count}</button>
        </div>
        <div>
          <button onClick={() => incrementAndDecrement('-')}>-</button>
        </div>
      </div>
    </>
  )
}

// Export your component
export default Counter
