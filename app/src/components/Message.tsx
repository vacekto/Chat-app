import { IMessage } from '@chatapp/shared';
import './Message.scss';

interface IMessageProps {
    message: IMessage
}

const Message: React.FC<IMessageProps> = ({ message }) => {

    return <div className="Message">
        {message.text}
    </div>
}

export default Message