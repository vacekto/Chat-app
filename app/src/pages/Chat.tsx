import './Chat.scss'
import RoomList from '../components/RoomList';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import { useAppSelector } from '../redux/hooks';

export interface IChatProps { }

const Chat: React.FC = () => {

    const activeRoom = useAppSelector(state => state.messageReducer.activeRoom)!

    return (
        <div className='Chat'>
            <div className="left">
                <RoomList />
            </div>
            <div className="right">
                {activeRoom ? <ChatMessages /> : null}
                <ChatInput />

            </div>
        </div>
    );
}
export default Chat