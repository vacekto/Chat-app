import './RoomList.scss';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '@chakra-ui/react';
import { TbUser } from "react-icons/tb";
import { TbUsersGroup } from "react-icons/tb";
import { messagesActions } from '../redux/slice/messagesSlice';

interface IRoomListProps { }

const RoomList: React.FC<IRoomListProps> = () => {
    const directChannels = useAppSelector(state => state.message.directChannels)

    const dispatch = useAppDispatch()

    const handleUserClick = () => {
        dispatch(messagesActions.selectDirectChannel(""))
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