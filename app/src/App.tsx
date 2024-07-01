import './App.scss'
import { useEffect, useRef } from 'react'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { dataActions } from './redux/slice/userDataSlice'
import socket from './util/socket'
import AppForm from './pages/AppForm'
import Chat from './pages/Chat'
import Alerts from './components/Alerts'
import { logout } from './redux/thunk'
import { IMessage } from '@chatapp/shared'
import { messagesActions } from './redux/slice/messagesSlice'
import { LS_CHAP_APP_ACCESS_TOKEN } from './util/constants'
import { refreshTokens } from './util/functions'

function App() {
  const connected = useAppSelector(state => state.userData.socketConnected)
  const tokenPlaceholder = useRef<string>("")
  const dispatch = useAppDispatch()

  const handleTest = async () => {
    const url = `${import.meta.env.VITE_SERVER_URL}/test`
    await fetch(url)
    console.log("fetched")
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const onTestEvent = () => {
    console.log("test from server")
  }


  const connectSocket = () => {
    const JWT = localStorage.getItem(LS_CHAP_APP_ACCESS_TOKEN)
    if (JWT) socket.connect(JWT)
  }

  const onErrorEvent = async (err: Error) => {
    if (err.message.includes("jwt expired")) {
      const JWT = await refreshTokens()
      socket.connect(JWT)
    } else {
      localStorage.removeItem(LS_CHAP_APP_ACCESS_TOKEN)
    }
  }

  const onConnectEvent = () => {
    dispatch(dataActions.setSocketConnected(true))
    dispatch(dataActions.setJWT(tokenPlaceholder.current))
  }

  const onDisconnectEvent = () => {
    dispatch(dataActions.setSocketConnected(false))
  }

  const onMessageEvent = (msg: IMessage) => {
    dispatch(messagesActions.addDirectMessage(msg))
  }

  useEffect(() => {

    socket.on("connect_error", onErrorEvent)
    socket.on('connect', onConnectEvent)
    socket.on('disconnect', onDisconnectEvent)
    socket.on("message", onMessageEvent)
    socket.on("test", onTestEvent)

    connectSocket()

    return () => {
      socket.disconnect()
      socket.off('connect', onConnectEvent)
      socket.off('disconnect', onDisconnectEvent)
      socket.off("message", onMessageEvent)
      socket.off("test", onTestEvent)
      socket.off("connect_error", onErrorEvent)
    }
  }, [])

  return (
    <div className="App">
      <Alerts />
      {connected ?
        <Chat /> :
        <div className="appFormContainer">
          <AppForm />
        </div>
      }
      <div id='temporary'>
        <button onClick={handleTest}>test</button>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default App