import './RoomList.scss';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '@chakra-ui/react';
import { TbUser } from "react-icons/tb";
import { TbUsersGroup } from "react-icons/tb";
import { messagesActions } from '../redux/slice/messagesSlice';
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import socket from '../util/socketSingleton';
import { useEffect, useRef, useState } from 'react';

interface IRoomListProps { }


const RoomList: React.FC<IRoomListProps> = () => {

    const [options, setOptions] = useState<string[]>([])
    // const [isLoading, setIsLoading] = useState<boolean>(false)
    const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const directChannels = useAppSelector(state => state.message.directChannels)

    const dispatch = useAppDispatch()

    const handleUserClick = () => {
        dispatch(messagesActions.selectDirectChannel(""))
    }

    const handleChange = () => {

        if (throttleTimeoutRef.current)
            clearTimeout(throttleTimeoutRef.current)
        throttleTimeoutRef.current = setTimeout(() => {
            throttleTimeoutRef.current = null
            socket.emit("requestUsersList", inputRef.current!.value, users => {
                setOptions(users)
            })
        }, 300)

    }

    return <div className="RoomList">

        <div className="selectionBar">
            <div className="icon">
                <Icon as={TbUser} />
                <div className="caption">messages</div>
            </div>
            <div className="icon">
                <Icon as={TbUsersGroup} />
                <div className="caption">groups</div>
            </div>
        </div>

        <AutoComplete openOnFocus>
            <AutoCompleteInput
                variant="filled"
                onChange={handleChange}
                ref={inputRef}
            />
            <AutoCompleteList>
                {options.map((user) => (
                    <AutoCompleteItem
                        key={uuidv4()}
                        value={user}
                        textTransform="capitalize"
                    >
                        {user}
                    </AutoCompleteItem>
                ))}
            </AutoCompleteList>
        </AutoComplete>

        <div className="list">
            {directChannels.map(channel => {
                return <div
                    onClick={handleUserClick}
                    className='room'
                    key={uuidv4()}>
                    {channel.channelName}
                </div>
            })}
        </div>
    </div>
}

export default RoomList