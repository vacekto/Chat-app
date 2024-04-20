import './App.scss'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { setConnected } from './redux/slice/socket'
import socketSingleton from './util/socketSingleton'
import Login from './pages/Login'
import Chat from './pages/Chat'
// import { sha3_512 } from "js-sha3"

function App() {

  const connected = useAppSelector(state => state.socket.connected)
  const jwt = useAppSelector(state => state.userData.JWT)
  console.log("jwt: ", jwt)
  const dispatch = useAppDispatch()

  const onConnectEvent = () => {
    dispatch(setConnected(true))
  }

  const onDisconnectEvent = () => {
    dispatch(setConnected(false))
  }

  const test = async () => {
    console.log("testing", import.meta.env.VITE_SERVER_URL)
    // console.log(sha3_512("my testing string"))
    fetch(`${import.meta.env.VITE_SERVER_URL}/test`)
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
      {connected ? <Chat /> : <Login />}
      <button id='testBtn' onClick={test}>
        test
      </button>
    </div>
  )
}

export default App
