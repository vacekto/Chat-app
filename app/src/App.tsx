import './App.scss'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { dataActions } from './redux/slice/data'
import socket from './util/socketSingleton'
import AppForm from './pages/AppForm'
import Chat from './pages/Chat'
import Alerts from './components/Alerts'

function App() {

  const connected = useAppSelector(state => state.userData.socketConnected)
  const dispatch = useAppDispatch()

  const onConnectEvent = () => {
    dispatch(dataActions.setSocketConnected(true))
  }

  const onDisconnectEvent = () => {
    dispatch(dataActions.setSocketConnected(false))
  }

  const test = async () => {
    console.log("testing", import.meta.env.VITE_SERVER_URL)
    fetch(`${import.meta.env.VITE_SERVER_URL}/test`, {
      credentials: "include"
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('chatAppToken')
    if (token) socket.connect(token)
    socket.instance.on('connect', onConnectEvent)
    socket.instance.on('disconnect', onDisconnectEvent)
    return () => {
      socket.instance.disconnect()
      socket.instance.off('connect', onConnectEvent)
      socket.instance.off('disconnect', onDisconnectEvent)
    }
  }, [])

  return (
    <div className="App">
      <Alerts />
      {connected ? <Chat /> : <AppForm />}
      <button id='testBtn' onClick={test}>
        test
      </button>
    </div>
  )
}

export default App