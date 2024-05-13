import './Chat.scss'
import RoomList from '../components/RoomList';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import { useAppSelector } from '../redux/hooks';
import { createPasskey } from '../util/functions';
import { startRegistration } from '@simplewebauthn/browser';
export interface IChatProps { }

const Chat: React.FC = () => {

    const activeRoom = useAppSelector(state => state.messageReducer.activeRoom)!
    const { JWT } = useAppSelector(state => state.userData)!

    const handleCreatePasskey = async () => {
        const data = await createPasskey(JWT)
        console.log(data)
        const attResp = await startRegistration(data);

        // const verificationResp = await fetch(`${import.meta.env.VITE_SERVER_URL}/veryfiRegistration`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(attResp),
        // });

        // const verificationJSON = await verificationResp.json();
        // console.log(verificationJSON)

    }

    return (
        <div className='Chat'>
            <div className="topBar">
                <button onClick={handleCreatePasskey}>create passkey</button>
            </div>
            <div className="body">
                <div className="left">
                    <RoomList />
                </div>
                <div className="right">
                    {activeRoom ? <ChatMessages /> : null}
                    <ChatInput />
                </div>
            </div>
        </div>
    );
}
export default Chat