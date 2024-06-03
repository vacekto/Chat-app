import { useAppSelector } from '../redux/hooks';
import './Alerts.scss';
import Alert from './Alert';

interface IAlertsProps { }

const Alerts: React.FC<IAlertsProps> = () => {

    const alerts = useAppSelector(state => state.alert.alerts)

    return <div className="Alerts">
        {alerts.map(alert => <Alert alert={alert} key={alert.id} />)}
    </div>
}

export default Alerts