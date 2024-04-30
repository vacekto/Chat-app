import { SubmitHandler, useForm } from 'react-hook-form'
import { faUnlock, faUser } from '@fortawesome/free-solid-svg-icons'
import { zodSchemas } from '@chatapp/shared'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sha3_256 } from "js-sha3"
import { useAppDispatch } from '../redux/hooks'
import { loginThunk } from '../redux/thunk'
import Button from '@mui/material/Button';

type Inputs = z.infer<typeof zodSchemas.loginFormZS>
interface ILoginFormProps { }

const LoginFrom: React.FC<ILoginFormProps> = () => {
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(zodSchemas.loginFormZS),
    })

    const onSubmit: SubmitHandler<Inputs> = async data => {
        data.password = sha3_256(data.password)
        dispatch(loginThunk(data))
    }

    return <form autoComplete='off' onSubmit={handleSubmit(onSubmit)} noValidate className='Login'>
        <div className="form-group">
            <div className="input-container">
                <input type="text" placeholder='username' {...register('username')} />
                <FontAwesomeIcon icon={faUser} className='input-icon' />
            </div>
            <span className="error-message">{errors.username?.message}</span>
        </div>

        <div className="form-group">
            <div className="input-container">
                <input type="password" placeholder='password' {...register('password')} />
                <FontAwesomeIcon icon={faUnlock} className='input-icon' />
            </div>
            <span className="error-message">{errors.password?.message}</span>
        </div>
        <Button type='submit' >submit</Button>

    </form>
}

export default LoginFrom