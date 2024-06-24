import './ChatInput.scss';
import BorderContainer from '../../../components/BorderContainer';
import { ChangeEvent, KeyboardEventHandler, useState } from 'react';
import { Button } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'

interface IChatInputProps { }

const ChatInput: React.FC<IChatInputProps> = () => {
    const [text, setText] = useState<string>("")

    const sendMessage = async () => { }

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