import './ChatInput.scss';
import BorderContainer from './BorderContainer';

interface IChatInputProps { }

const ChatInput: React.FC<IChatInputProps> = () => {

    return <div className="ChatInput">
        <BorderContainer
            title='Message'
        >
        </BorderContainer>
    </div>
}

export default ChatInput