import { useState } from 'react';
import './Alert.scss';
import { IAlert } from '../util/types';
import { Icon } from '@chakra-ui/react';
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useAppDispatch } from '../redux/hooks';
import { alertActions } from '../redux/slice/alert';

interface IAlertProps {
    alert: IAlert
}

const Alert: React.FC<IAlertProps> = ({ alert }) => {
    const [timerCSS, setTimerCSS] = useState<"" | "quickened">("")

    const dispatch = useAppDispatch()

    const handleMouseEnter = () => {
        setTimerCSS("quickened")
        dispatch(alertActions.setAlertTimeout({
            alertId: alert.id,
            delay: -1
        }))
    }

    const handleMouseLeave = () => {
        dispatch(alertActions.setAlertTimeout({
            alertId: alert.id,
            delay: 2000
        }))
    }

    const handleCancelAlert = () => {
        dispatch(alertActions.setAlertTimeout({
            alertId: alert.id,
            delay: 0
        }))
    }

    return <div className='Alert'>
        <div
            className='content'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Icon as={IoCheckmarkOutline} />
            <span>{alert.message}</span>
            <div
                className="cross"
                onClick={handleCancelAlert}
            >
                <Icon as={RxCross1} />
            </div>
        </div>
        <div className='timer'>
            <div className={timerCSS} />
        </div>
    </div>
}

export default Alert