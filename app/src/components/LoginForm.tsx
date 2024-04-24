import { SubmitHandler, useForm } from 'react-hook-form'
import { faUnlock, faUser } from '@fortawesome/free-solid-svg-icons'
import { zodSchemas } from '@chatapp/shared'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch } from '../redux/hooks'
import { setConnected } from '../redux/slice/socket'

type Inputs = z.infer<typeof zodSchemas.loginDataZS>
interface ILoginFormProps { }

const LoginFrom: React.FC<ILoginFormProps> = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(zodSchemas.loginDataZS),
    })

    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const url = `${import.meta.env.VITE_SERVER_URL}/login`
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)
        if (response.status !== 200) return
        dispatch(setConnected(true))

        // .then(res => res.json())
        // .then(data => {
        //     console.log("response: ", data)
        //     dispatch(setConnected(true))
        // })
        // .catch(err => console.log(err))
    }

    return <form autoComplete='off' onSubmit={handleSubmit(onSubmit)} noValidate className='loginForm'>
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
        <button type='submit' >submit</button>

    </form>
}

export default LoginFrom