import './App.scss'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { setConnected } from './redux/slice/socket'
import socketSingleton from './util/socketSingleton'
import Login from './pages/Login'

function App() {

  const connected = useAppSelector(state => state.socket.connected)
  const dispatch = useAppDispatch()


  const onConnectEvent = () => {
    dispatch(setConnected(true))
  }

  const onDisconnectEvent = () => {
    dispatch(setConnected(false))
  }

  const test = async () => {
    console.log("testing")
    try {
      const res = await fetch("http://localhost:3000/test")
      const data = await res.text()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
  }, [connected])

  useEffect(() => {
    const token = localStorage.getItem('chatAppToken')

    if (token) socketSingleton.connect(token)

    socketSingleton.instance.on('connect', onConnectEvent)
    socketSingleton.instance.on('disconnect', onDisconnectEvent)

    return () => {
      socketSingleton.instance.disconnect()
      socketSingleton.instance.off('connect', onConnectEvent)
      socketSingleton.instance.off('disconnect', onDisconnectEvent)
    }
  }, [])

  return (
    <div className="App">
      <Login />
      <button id='testBtn' onClick={test}>
        test
      </button>
    </div>
  )
}

export default App
