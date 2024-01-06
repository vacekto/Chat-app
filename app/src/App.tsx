import './App.scss'
import Login from './components/Login'
import { useEffect } from 'react'
import clientSocketSingleton from './util/socket'

function App() {

  useEffect(() => {
    const token = localStorage.getItem('chatAppToken')
    if (!token) return
    clientSocketSingleton.connect(token)
  }, [])

return (
  <div className="App">
    <h1>Chat app</h1>
    <Login />
  </div>
)
}

export default App
