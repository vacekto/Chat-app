import './SelectionBar.scss';
import { Icon } from '@chakra-ui/react';
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useRef, useState } from 'react';
import { TbUser } from "react-icons/tb";
import { TbUsersGroup } from "react-icons/tb";
import socket from '../../../../util/socket';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '@chatapp/shared';

interface ITopBarProps { }

const SelectionBar: React.FC<ITopBarProps> = () => {

    const [options, setOptions] = useState<IUser[]>([])

    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = () => {
        const debounceCb = () => {
            debounceTimeoutRef.current = null
            socket.emit("requestUsersList", inputRef.current!.value, users => {
                // const usernames = users.map(user => {
                //     // delete user.test
                //     return user.username
                // })

                setOptions(users)
            })
        }

        if (debounceTimeoutRef.current)
            clearTimeout(debounceTimeoutRef.current)
        debounceTimeoutRef.current = setTimeout(debounceCb, 300)

    }

    return <div className="SelectionBar">
        <div className="options">
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
                        value={user.username}
                    >
                        {user.username}
                    </AutoCompleteItem>
                ))}
            </AutoCompleteList>
        </AutoComplete>
    </div>
}

export default SelectionBar