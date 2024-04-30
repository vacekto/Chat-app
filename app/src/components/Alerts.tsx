import { Alert } from '@mui/material';
import { useAppSelector } from '../redux/hooks';
import './Alerts.scss';

interface IAlertsProps { }

const Alerts: React.FC<IAlertsProps> = () => {
    const alerts = useAppSelector(state => state.alert.alerts)

    return <div className="Alerts">
        {alerts.map(alert => <Alert key={alert.id} severity={alert.severity}>
            {alert.message}
        </Alert>)}
    </div>
}

export default Alerts