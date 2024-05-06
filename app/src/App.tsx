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

function App() {

  const connected = useAppSelector(state => state.userData.socketConnected)
  const dispatch = useAppDispatch()
  const activeRoom = useAppSelector(state => state.messageReducer.activeRoom)!
  const onConnectEvent = () => {
    dispatch(dataActions.setSocketConnected(true))
  }

  const onDisconnectEvent = () => {
    dispatch(dataActions.setSocketConnected(false))
  }

  const onErrorEvent = async (err: Error) => {
    if (err.message === "jwt expired") {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/refreshToken`, {
        method: "POST",
        credentials: 'include',
      })
      if (res.status !== 200) {
        dispatch(logoutThunk())
        return
      }
      const { JWT } = await res.json()
      dispatch(dataActions.setJWT(JWT))
      localStorage.setItem('chatAppAccessToken', JWT)
      socket.connect(JWT)
    }
  }

  const onMessageEvent = (msg: IMessage) => {
    console.log("on message event")
    dispatch(messagesActions.addMessage(msg))
  }

  const test = async () => {
    console.log(activeRoom.messages)
  }
  const handleLogout = () => {
    dispatch(logoutThunk())
    dispatch(alertActions.addAlert({
      id: Date.now(),
      message: "You are now logged out",
      severity: "success"
    }))
  }

  useEffect(() => {
    socket.on('connect', onConnectEvent)
    socket.on('disconnect', onDisconnectEvent)
    socket.on("connect_error", onErrorEvent)
    socket.on("message", onMessageEvent)
    const token = localStorage.getItem('chatAppAccessToken')
    if (token) socket.connect(token)
    return () => {
      socket.disconnect()
      socket.off('connect', onConnectEvent)
      socket.off('disconnect', onDisconnectEvent)
      socket.off("connect_error", onErrorEvent)
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