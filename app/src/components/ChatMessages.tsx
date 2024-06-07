import { useAppSelector } from '../redux/hooks';
import BorderContainer from './BorderContainer';
import './ChatMessages.scss';
import Message from './Message';

interface IChatMessagesProps { }

const ChatMessages: React.FC<IChatMessagesProps> = () => {
    const activeRoom = useAppSelector(state => state.messageReducer.activeRoom)!

    return <div className="ChatMessages">
        <BorderContainer
            title={activeRoom.roomName}
        >

            {activeRoom.messages.map(msg => {
                return <Message message={msg} key={msg.id} />
            })}
        </BorderContainer>
    </div>
}

export default ChatMessages