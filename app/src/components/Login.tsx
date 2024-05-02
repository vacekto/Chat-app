import { faUnlock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sha3_256 } from "js-sha3"
import Button from '@mui/material/Button';
import { useRef } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { loginThunk } from '../redux/thunk';

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
        dispatch(loginThunk(data))
    }

    return <form autoComplete='off' onSubmit={handleSubmit} className='Login'>
        <div className="form-group">
            <div className="input-container">
                <input type="text" placeholder='username' ref={usernameRef} />
                <FontAwesomeIcon icon={faUser} className='input-icon' />
            </div>
        </div>

        <div className="form-group">
            <div className="input-container">
                <input type="password" placeholder='password' ref={passwordRef} />
                <FontAwesomeIcon icon={faUnlock} className='input-icon' />
            </div>
        </div>
        <Button type='submit' >submit</Button>

    </form>
}

export default LoginFrom