import {
    // canAuthenticateWithPasskey,
    // canCreatePasskey,
    sendJSON
} from "../functions";
import "./BitWardenSVG.scss"
import { passwordless } from "../passwordlessClient";
interface IBitWardenSVGProps { }

const BitWardenIcon: React.FC<IBitWardenSVGProps> = () => {
    const handleClick = async () => {
        const { token } = await passwordless.signinWithDiscoverable()
        const url = import.meta.env.VITE_SERVER_URL
        const response = await sendJSON(url + "/passkeyLogin", token)
        const verifiedUser = await response.json()
        if (verifiedUser.outcome) {

        }
    }

    return <div className="BitWardenSVG" onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg"
            aria-label="imgur" role="img"
            viewBox="0 0 512 512"><rect
                width="512" height="512"
                rx="15%"
                fill="#175DDC" /><path fill="#ffffff" d="M372 297V131H256v294c47-28 115-74 116-128zm49-198v198c0 106-152 181-165 181S91 403 91 297V99s0-17 17-17h296s17 0 17 17z" />
        </svg>
    </div>
}

export default BitWardenIcon