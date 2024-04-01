import './App.css'
import Counter from './components/Counter'
import ChatInterface from './components/ChatInterface'
function App() {
  return (
    <>
      <div className="flex">
        <div className="setWidth">
          <Counter />
        </div>
        <hr />
        <div className="setWidth">
          <ChatInterface />
        </div>
      </div>
    </>
  )
}

export default App
