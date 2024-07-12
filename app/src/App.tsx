import './App.scss'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import socket from './util/socket'
import AppForm from './pages/AppForm'
import Chat from './pages/Chat'
import Alerts from './components/Alerts'
import { IMessage, IUserData } from '@chatapp/shared'
import { LS_CHAP_APP_ACCESS_TOKEN } from './util/constants'
import { refreshTokens } from './util/functions'
import { userDataActions } from './redux/slice/userDataSlice'
import thunk from './redux/thunk'

function App() {
  const connected = useAppSelector(state => state.userData.socketConnected)
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.userData)


  const handleTest = async () => {
    // const url = `${import.meta.env.VITE_SERVER_URL}/test`
    // const res = await fetch(url)
    // const users: IUser[] = await res.json()
    // console.log(users.map(u => u.username))
    console.log(state)
  }

  const handleLogout = () => {
    dispatch(userDataActions.logout())
  }

  const onTestEvent = () => {
    console.log("test from server")
  }

  const onErrorEvent = async (err: Error) => {
    if (err.message.includes("jwt expired")) {
      const data = await refreshTokens()
      if (!data.ok) {
        dispatch(userDataActions.logout())
        return
      }
      const accessToken = data.res.accessToken
      dispatch(userDataActions.setAccessToken(accessToken))
      localStorage.setItem(LS_CHAP_APP_ACCESS_TOKEN, accessToken)
      socket.connect(accessToken)
    }
  }

  const onConnectEvent = () => {
    dispatch(userDataActions.setSocketConnected(true))

  }

  const onDisconnectEvent = () => {
    dispatch(userDataActions.setSocketConnected(false))
  }

  const onDirectMessageEvent = (msg: IMessage) => {
    dispatch(thunk.addDirectMessage(msg))
  }

  const onGroupMessageEvent = (msg: IMessage) => {
    dispatch(thunk.addGroupMessage(msg))
  }

  const onUserData = (data: IUserData) => {
    dispatch(userDataActions.setUserData(data))
  }


  useEffect(() => {

    socket.on("connect_error", onErrorEvent)
    socket.on('connect', onConnectEvent)
    socket.on('disconnect', onDisconnectEvent)
    socket.on("directMessage", onDirectMessageEvent)
    socket.on("groupMessage", onGroupMessageEvent)
    socket.on("test", onTestEvent)
    socket.on("useData", onUserData)

    const token = localStorage.getItem(LS_CHAP_APP_ACCESS_TOKEN)
    if (token) socket.connect(token)

    return () => {
      socket.disconnect()
      socket.offAny()
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