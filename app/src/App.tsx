import './App.scss'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { dataActions } from './redux/slice/data'
import socket from './util/socketSingleton'
import AppForm from './pages/AppForm'
import Chat from './pages/Chat'
import Alerts from './components/Alerts'
import { logoutThunk } from './redux/thunk'
// import { alertActions } from './redux/slice/alert'

function App() {

  const connected = useAppSelector(state => state.userData.socketConnected)
  // const JWT = useAppSelector(state => state.userData.JWT)
  const dispatch = useAppDispatch()

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

  const test = async () => { }

  useEffect(() => {
    socket.on('connect', onConnectEvent)
    socket.on('disconnect', onDisconnectEvent)
    socket.on("connect_error", onErrorEvent)
    const token = localStorage.getItem('chatAppAccessToken')
    if (token) socket.connect(token)
    return () => {
      socket.disconnect()
      socket.off('connect', onConnectEvent)
      socket.off('disconnect', onDisconnectEvent)
      socket.off("connect_error", onErrorEvent)
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