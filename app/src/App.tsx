import './App.scss'
import Login from './components/Login'
import { useEffect } from 'react'
import { useAppSelector } from './redux/hooks'


function App() {

  const socketSingleton = useAppSelector(state => state.socket.singleton)

  const onConnectEvent = () => {
    console.log('connected')
  }

  useEffect(() => {
    const token = localStorage.getItem('chatAppToken')
    console.log(token)
    if (!token) return

    socketSingleton.connect(token)
    socketSingleton.instance.on('connect', onConnectEvent)


    return () => {
      socketSingleton.instance.disconnect()
      socketSingleton.instance.off('connect', onConnectEvent)
    }
  }, [])

  return (
    <div className="App">
      <h1>Chat app</h1>
      <Login />
    </div>
  )
}

export default App
