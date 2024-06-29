import './App.scss'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { dataActions } from './redux/slice/userDataSlice'
import socket from './util/socket'
import AppForm from './pages/AppForm'
import Chat from './pages/Chat'
import Alerts from './components/Alerts'
import { logout } from './redux/thunk'
import { IMessage, getJWTPayload } from '@chatapp/shared'
import { messagesActions } from './redux/slice/messagesSlice'
import { LS_CHAP_APP_LAST_ONLINE } from './util/constants'
import { refreshTokens } from './util/functions'

function App() {
  const connected = useAppSelector(state => state.userData.socketConnected)
  const JWT = useAppSelector(state => state.userData.JWT)
  const dispatch = useAppDispatch()

  const onConnectEvent = () => {
    dispatch(dataActions.setSocketConnected(true))
  }

  const onDisconnectEvent = () => {
    dispatch(dataActions.setSocketConnected(false))
  }

  const onMessageEvent = (msg: IMessage) => {
    dispatch(messagesActions.addDirectMessage(msg))
  }

  const handleTest = async () => {
    const payload = getJWTPayload(JWT, true)
    console.log(payload)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const onTestEvent = () => {
    console.log("test from server")
  }

  const connectSocket = async () => {
    const JWT = await refreshTokens()
    if (!JWT) {
      localStorage.removeItem(LS_CHAP_APP_LAST_ONLINE)
      return
    }
    socket.connect(JWT)
    dispatch(dataActions.setJWT(JWT))
  }

  useEffect(() => {
    socket.on('connect', onConnectEvent)
    socket.on('disconnect', onDisconnectEvent)
    socket.on("message", onMessageEvent)
    socket.on("test", onTestEvent)

    const username = localStorage.getItem(LS_CHAP_APP_LAST_ONLINE)
    if (username) connectSocket()

    return () => {
      socket.disconnect()
      socket.off('connect', onConnectEvent)
      socket.off('disconnect', onDisconnectEvent)
      socket.off("message", onMessageEvent)
      socket.off("test", onTestEvent)
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