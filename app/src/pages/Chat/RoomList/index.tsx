import './index.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { v4 as uuidv4 } from 'uuid';
import { messagesActions } from '../../../redux/slice/messagesSlice';
import SelectionBar from './SelectionBar';

interface IRoomListProps { }

const RoomList: React.FC<IRoomListProps> = () => {

    const directChannels = useAppSelector(state => state.message.directChannels)

    const dispatch = useAppDispatch()

    const handleUserClick = () => {
        dispatch(messagesActions.selectDirectChannel(""))
    }

    return <div className="RoomList">

        <SelectionBar />

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