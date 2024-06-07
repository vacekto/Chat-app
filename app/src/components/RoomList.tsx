import './RoomList.scss';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '@chakra-ui/react';
import { TbUser } from "react-icons/tb";
import { TbUsersGroup } from "react-icons/tb";

interface IRoomListProps { }

const RoomList: React.FC<IRoomListProps> = () => {
    const users = useAppSelector(state => state.messageReducer.users)

    const dispatch = useAppDispatch()

    const handleUserClick = () => {
        // messagesActions.selectRoom()
    }
    const arr: string[] = []
    arr.length = 70
    arr.fill("coiskdosi")



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

        <div className="list">
            {arr.map(thing => <div key={Math.random()}>cosikdosi</div >)}

            {users.map(user => {
                return <div
                    onClick={handleUserClick}
                    className='room'
                    key={uuidv4()}>
                    {user}
                </div>
            })}
        </div>
    </div>
}

export default RoomList