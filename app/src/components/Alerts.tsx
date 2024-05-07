import { useAppSelector } from '../redux/hooks';
import './Alerts.scss';

interface IAlertsProps { }

const Alerts: React.FC<IAlertsProps> = () => {
    const alerts = useAppSelector(state => state.alert.alerts)

    return <div className="Alerts">
        {alerts.map(alert => <div key={alert.id}>
            {alert.message}
        </div>)}
    </div>
}

export default Alerts