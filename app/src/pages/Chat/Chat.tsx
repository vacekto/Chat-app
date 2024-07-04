import './Chat.scss'
import RoomList from './RoomList/RoomList';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useAppSelector } from '../../redux/hooks';
import { createPasskey } from '../../util/functions';
export interface IChatProps { }

const Chat: React.FC = () => {

    const activeRoom = useAppSelector(state => state.message.activeChannel)!
    const { username, accessToken: JWT } = useAppSelector(state => state.userData)!

    const handleCreatePasskey = async () => {
        const { ok, res } = await createPasskey(username, JWT)
        if (!ok) console.error(res)

    }

    return (
        <div className='Chat'>
            <div className="topBar">
                <button onClick={handleCreatePasskey}>create passkey</button>
                <button>hide left bar</button>
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