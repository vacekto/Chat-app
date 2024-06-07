import './ChatInput.scss';
import BorderContainer from './BorderContainer';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import socket from '../util/socketSingleton';
import { IMessage } from '@chatapp/shared';
import { messagesActions } from '../redux/slice/messagesSlice';
import { v4 as uuidv4 } from 'uuid';
import { ChangeEvent, KeyboardEventHandler, useState } from 'react';
import { Button } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'

interface IChatInputProps { }

const ChatInput: React.FC<IChatInputProps> = () => {
    const [text, setText] = useState<string>("")
    const userData = useAppSelector(state => state.userData)
    const roomId = useAppSelector(state => state.messageReducer.activeRoom!.id)
    const dispatch = useAppDispatch()

    const sendMessage = () => {
        const message: IMessage = {
            id: uuidv4(),
            RoomId: roomId,
            sender: userData.username,
            text
        }
        dispatch(messagesActions.addMessage(message))
        socket.emit("message", message)

    }

    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key == "Enter" && e.shiftKey) {
            // setText(prevState => { return prevState + "\n" })
        }
        if (e.key == "Enter" && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
            setText("")
        }
    }

    const test = () => {
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }
    return <div className="ChatInput">
        <BorderContainer
            title='Message'
        >
            <Textarea
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                value={text}
                size='sm'
                resize='none'
            />
            <Button onClick={test}>send</Button>
        </BorderContainer>
    </div>
}

export default ChatInput