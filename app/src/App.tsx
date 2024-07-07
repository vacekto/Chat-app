import './App.scss'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { dataActions } from './redux/slice/userDataSlice'
import socket from './util/socket'
import AppForm from './pages/AppForm'
import Chat from './pages/Chat'
import Alerts from './components/Alerts'
import { addDirectMessage, logout } from './redux/thunk'
import { IMessage, IUserData } from '@chatapp/shared'
import { LS_CHAP_APP_ACCESS_TOKEN } from './util/constants'
import { refreshTokens } from './util/functions'
import { alertActions } from './redux/slice/alertSlice'

function App() {
  const connected = useAppSelector(state => state.userData.socketConnected)
  const dispatch = useAppDispatch()
  const activeChannel = useAppSelector(state => state.message.activeChannel)

  const handleTest = async () => {
    // const url = `${import.meta.env.VITE_SERVER_URL}/test`
    // const res = await fetch(url)
    // const users: IUser[] = await res.json()
    // console.log(users.map(u => u.username))
    console.log(activeChannel)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const onTestEvent = () => {
    console.log("test from server")
  }

  const onErrorEvent = async (err: Error) => {
    if (err.message.includes("jwt expired")) {
      const data = await refreshTokens()
      if (!data.ok) {
        dispatch(logout())
        return
      }
      const accessToken = data.res.accessToken
      dispatch(dataActions.setAccessToken(accessToken))
      localStorage.setItem(LS_CHAP_APP_ACCESS_TOKEN, accessToken)
      socket.connect(accessToken)
    }
  }

  const onConnectEvent = () => {
    dispatch(dataActions.setSocketConnected(true))

  }

  const onDisconnectEvent = () => {
    dispatch(dataActions.setSocketConnected(false))
    dispatch(alertActions.addAlert({
      message: "You are now logged out",
      severity: "success"
    }))
  }

  const onDirectMessageEvent = (msg: IMessage) => {
    dispatch(addDirectMessage(msg))
  }

  const onUserData = (data: IUserData) => {
    dispatch(dataActions.setUserData(data))
  }


  useEffect(() => {

    socket.on("connect_error", onErrorEvent)
    socket.on('connect', onConnectEvent)
    socket.on('disconnect', onDisconnectEvent)
    socket.on("directMessage", onDirectMessageEvent)
    socket.on("test", onTestEvent)
    socket.on("useData", onUserData)

    const token = localStorage.getItem(LS_CHAP_APP_ACCESS_TOKEN)
    if (token) socket.connect(token)

    return () => {
      socket.disconnect()
      socket.off('connect', onConnectEvent)
      socket.off('disconnect', onDisconnectEvent)
      socket.off("message", onDirectMessageEvent)
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