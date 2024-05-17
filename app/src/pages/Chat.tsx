import './Chat.scss'
import RoomList from '../components/RoomList';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import { useAppSelector } from '../redux/hooks';
import { createPasskey } from '../util/functions';
export interface IChatProps { }

const Chat: React.FC = () => {

    const activeRoom = useAppSelector(state => state.messageReducer.activeRoom)!
    const { username, JWT } = useAppSelector(state => state.userData)!

    const handleCreatePasskey = async () => {
        const { error } = await createPasskey(username, JWT)
        if (error) {
            console.error(error)
        }
    }

    return (
        <div className='Chat'>
            <div className="topBar">
                <button onClick={handleCreatePasskey}>create passkey</button>
            </div>
            <div className="body">
                <div className="left">
                    <RoomList />
                </div>
                <div className="right">
                    {activeRoom ? <ChatMessages /> : null}
                    <ChatInput />
                </div>
            </div>
        </div>
    );
}
export default Chat