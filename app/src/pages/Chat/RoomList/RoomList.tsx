import './RoomList.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { v4 as uuidv4 } from 'uuid';
import { messagesActions } from '../../../redux/slice/messagesSlice';
import SelectionBar from './SelectionBar/SelectionBar';
import { useState } from 'react';
import { TChannelKind } from '@chatapp/shared';

interface IRoomListProps { }

const RoomList: React.FC<IRoomListProps> = () => {

    const [activeChannelKind, setActiveChannelKind] = useState<TChannelKind>("group")
    const directChannels = useAppSelector(state => state.message.directChannels)
    const groupChannels = useAppSelector(state => state.message.groupChannels)

    const dispatch = useAppDispatch()

    const handleSelect = (channelKind: TChannelKind, channelId: string) => {
        channelKind === "direct" ?
            dispatch(messagesActions.selectDirectChannel(channelId)) :
            dispatch(messagesActions.selectGroupChannel(channelId))
    }

    return <div className="RoomList">

        <SelectionBar selectChannelKind={setActiveChannelKind} />

        <div className="list">
            {
                activeChannelKind === "direct" ?
                    directChannels.map(channel => {
                        return <div
                            onClick={() => handleSelect("direct", channel.id)}
                            className='room'
                            key={uuidv4()}>
                            {channel.channelName}
                        </div>
                    }) :
                    groupChannels.map(channel => {
                        return <div
                            onClick={() => handleSelect("group", channel.id)}
                            className='room'
                            key={uuidv4()}>
                            {channel.channelName}

                        </div>
                    })
            }

        </div>
    </div>
}

export default RoomList