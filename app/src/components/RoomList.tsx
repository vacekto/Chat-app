import './RoomList.scss';
import { useAppSelector } from '../redux/hooks';

interface IRoomListProps { }

const RoomList: React.FC<IRoomListProps> = () => {
    const rooms = useAppSelector(state => state.messageReducer.rooms)


    return <div className="RoomList">
        {rooms.map(room => {
            return <div className='room' key={room.id}>
                {room.roomName}
            </div>
        })}
    </div>
}

export default RoomList