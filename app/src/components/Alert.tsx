import { useEffect, useState } from 'react';
import './Alert.scss';
import { IAlert } from '../util/types';
import { Icon } from '@chakra-ui/react';
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useAppDispatch } from '../redux/hooks';
import { alertActions } from '../redux/slice/alertSlice';
import { CiWarning } from "react-icons/ci";
import { MdOutlineErrorOutline } from "react-icons/md";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

const icons = {
    success: IoCheckmarkOutline,
    info: HiOutlineChatBubbleOvalLeftEllipsis,
    warning: CiWarning,
    error: MdOutlineErrorOutline
}

interface IAlertProps {
    alert: IAlert
}

const Alert: React.FC<IAlertProps> = ({ alert }) => {
    const [timerCSS, setTimerCSS] = useState<"" | "quickened">("")
    const [fadingCSS, setFadingCSS] = useState<"" | "fading">("")

    const dispatch = useAppDispatch()

    const handleMouseEnter = () => {
        if (alert.fading) return
        setTimerCSS("quickened")
        dispatch(alertActions.setAlertTimeout({
            alertId: alert.id,
            delay: -1
        }))
    }

    const handleMouseLeave = () => {
        if (alert.fading) return
        dispatch(alertActions.setAlertTimeout({
            alertId: alert.id,
            delay: 2000
        }))
    }

    const handleCancelAlert = () => {
        dispatch(alertActions.removeAlert(alert.id))
    }

    useEffect(() => {
        if (!alert.fading) return
        setTimeout(handleCancelAlert, 200)
        setFadingCSS("fading")
    }, [alert])


    return <div
        className={`Alert ${fadingCSS} ${alert.severity}`}
    >
        <div
            className="content"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="leftIcon">
                <Icon as={icons[alert.severity]} />
            </div>
            <div className='text'>
                <div>{alert.message}</div>
            </div>
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