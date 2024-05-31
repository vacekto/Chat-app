import { useAppSelector } from '../redux/hooks';
import { Icon } from '@chakra-ui/react'
import { IoCheckmarkOutline } from "react-icons/io5";
import './Alerts.scss';

interface IAlertsProps { }

const Alerts: React.FC<IAlertsProps> = () => {
    const alerts = useAppSelector(state => state.alert.alerts)

    return <div className="Alerts">
        {alerts.map(alert => <div key={alert.id}>
            <Icon as={IoCheckmarkOutline} />
            <span>{alert.message}</span>
        </div>)}
    </div>
}

export default Alerts