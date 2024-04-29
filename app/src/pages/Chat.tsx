import './Chat.scss'
// import { useAppDispatch } from '../redux/hooks'

export interface IChatProps {

}

const Chat: React.FC = () => {

    // const dispatch = useAppDispatch()

    const handleLogout = () => {
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