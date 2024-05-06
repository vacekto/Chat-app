import { ChangeEvent, KeyboardEventHandler, useState } from 'react';
import './ChatInput.scss';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import socket from '../util/socketSingleton';
import { IMessage } from '@chatapp/shared';
import { messagesActions } from '../redux/slice/messages';

interface IChatInputProps { }

const ChatInput: React.FC<IChatInputProps> = () => {
    const [text, setText] = useState<string>("")
    const userData = useAppSelector(state => state.userData)
    const roomId = useAppSelector(state => state.messageReducer.activeRoom!.id)
    const dispatch = useAppDispatch()

    const submitMessage = () => {
        const message: IMessage = {
            id: String(Math.random()),
            RoomId: roomId,
            sender: userData.username,
            text
        }
        dispatch(messagesActions.addMessage(message))
        socket.emit("message", message)

    }

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key == "Enter") submitMessage()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    return <div className="ChatInput">
        <input onKeyDown={handleKeyDown} onChange={handleChange} value={text} type="text" />
        <button onClick={submitMessage}>send</button>
    </div>
}

export default ChatInput