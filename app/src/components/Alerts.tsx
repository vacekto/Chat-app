import { useAppSelector } from '../redux/hooks';
import { Icon } from '@chakra-ui/react'
import { IoCheckmarkOutline } from "react-icons/io5";
import './Alerts.scss';

interface IAlertsProps { }

const Alerts: React.FC<IAlertsProps> = () => {
    const alerts = useAppSelector(state => state.alert.alerts)

    return <div className="Alerts">
        <div className="test"></div>
        {alerts.map(alert => <div key={alert.id} className='alert'>
            <div>
                <div>
                </div>
            </div>
            <div>
                <Icon as={IoCheckmarkOutline} />
                <span>{alert.message}</span>
            </div>
        </div>)}
    </div>
}

export default Alerts