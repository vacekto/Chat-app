import './Chat.scss'
import { useAppDispatch } from '../redux/hooks'
import { alertActions } from '../redux/slice/alert'
import { logoutThunk } from '../redux/thunk'
export interface IChatProps { }

const Chat: React.FC = () => {

    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(logoutThunk())
        dispatch(alertActions.addAlert({
            id: Date.now(),
            message: "You are now logged out",
            severity: "success"
        }))
    }

    return (
        <div className='Chat'>
            <h3>you are now logged in</h3>
            <button onClick={handleLogout}>
                log out
            </button>
        </div>
    );
}
export default Chat