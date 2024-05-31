import { faUnlock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sha3_256 } from "js-sha3"
import { useRef } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { passwordLogin } from '../redux/thunk';
import BitWardenIcon from '../util/SVG/BitWardenSVG';
import GoogleSVG from '../util/SVG/Google';

interface ILoginFormProps { }

const LoginFrom: React.FC<ILoginFormProps> = () => {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const dispatch = useAppDispatch()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const data = {
            username: usernameRef.current!.value,
            password: sha3_256(passwordRef.current!.value)
        }
        dispatch(passwordLogin(data))
    }

    return <form autoComplete='off' onSubmit={handleSubmit} className='LoginForm'>

        <div className="formGroup">
            <div className="inputContainer">
                <input type="text" placeholder='username' ref={usernameRef} />
                <FontAwesomeIcon icon={faUser} className='inputIcon' />
            </div>
        </div>

        <div className="formGroup">
            <div className="inputContainer">
                <input type="password" placeholder='password' ref={passwordRef} />
                <FontAwesomeIcon icon={faUnlock} className='inputIcon' />
            </div>
        </div>
        <button type='submit' >submit</button>
        <div className="icons">
            <BitWardenIcon />
            <GoogleSVG />
        </div>
    </form>
}

export default LoginFrom