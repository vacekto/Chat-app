import './App.scss'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { dataActions } from './redux/slice/userData'
import socket from './util/socketSingleton'
import AppForm from './pages/AppForm'
import Chat from './pages/Chat'
import Alerts from './components/Alerts'
import { logoutThunk } from './redux/thunk'
import { alertActions } from './redux/slice/alert'
import { IMessage } from '@chatapp/shared'
import { messagesActions } from './redux/slice/messages'
import { CHAP_APP_LAST_ONLINE } from './util/constants'
import { refreshTokens } from './util/functions'

function App() {

  const connected = useAppSelector(state => state.userData.socketConnected)
  const dispatch = useAppDispatch()
  const onConnectEvent = () => {
    dispatch(dataActions.setSocketConnected(true))
  }

  const onDisconnectEvent = () => {
    dispatch(dataActions.setSocketConnected(false))
  }

  const onMessageEvent = (msg: IMessage) => {
    dispatch(messagesActions.addMessage(msg))
  }

  const test = async () => {
    // const items = { ...localStorage };
  }

  const handleLogout = () => {
    dispatch(logoutThunk())
    dispatch(alertActions.addAlert({
      id: Date.now(),
      message: "You are now logged out",
      severity: "success"
    }))
  }

  const connectSocket = async () => {
    const JWT = await refreshTokens()
    if (!JWT) return
    dispatch(dataActions.setJWT(JWT))
    socket.connect(JWT)
  }

  useEffect(() => {
    socket.on('connect', onConnectEvent)
    socket.on('disconnect', onDisconnectEvent)
    socket.on("message", onMessageEvent)
    const username = localStorage.getItem(CHAP_APP_LAST_ONLINE)
    if (username) connectSocket()
    return () => {
      socket.disconnect()
      socket.off('connect', onConnectEvent)
      socket.off('disconnect', onDisconnectEvent)
      socket.off("message", onMessageEvent)
    }
  }, [])

  return (
    <div className="App">
      <Alerts />
      {connected ? <Chat /> : <AppForm />}
      <div id='temporary'>
        <button onClick={test}>test</button>
        <button onClick={handleLogout}>logout</button>
      </div >
    </div>
  )
}

export default App