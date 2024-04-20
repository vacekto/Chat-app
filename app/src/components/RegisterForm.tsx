import { SubmitHandler, useForm } from 'react-hook-form'
import { faAt, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons'
import { zodSchemas } from '@chatapp/shared'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sha3_256 } from "js-sha3"
import { TFormAction } from '../pages/Login'

type Inputs = z.infer<typeof zodSchemas.registerDataZodSchema>
interface IRegisterFormProps {
    toggleFormAction: React.Dispatch<React.SetStateAction<TFormAction>>
}

const RegisterFrom: React.FC<IRegisterFormProps> = ({ toggleFormAction }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(zodSchemas.registerDataZodSchema),
    })

    const onSubmit: SubmitHandler<Inputs> = async data => {
        data.password = sha3_256(data.password)
        const url = `${import.meta.env.VITE_SERVER_URL}/register`
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)
        if (response.status === 200) toggleFormAction("login")
    }

    return <form autoComplete='off' onSubmit={handleSubmit(onSubmit)} noValidate className='registerForm'>
        <div className="form-group">
            <div className="input-container">
                <input type="text" placeholder='username' {...register('username')} />
                <FontAwesomeIcon icon={faUser} className='input-icon' />
            </div>
            <span className="error-message">{errors.username?.message}</span>
        </div>

        <div className="form-group">
            <div className="input-container">
                <input type="text" placeholder='email' {...register('email')} />
                <FontAwesomeIcon icon={faAt} className='input-icon' />
            </div>
            <span className="error-message">{errors.email?.message}</span>
        </div>

        <div className="form-group">
            <div className="input-container">
                <input type="password" placeholder='password' {...register('password')} />
                <FontAwesomeIcon icon={faUnlock} className='input-icon' />
            </div>
            <span className="error-message">{errors.password?.message}</span>
        </div>
        <button type='submit'>submit</button>

    </form>
}

export default RegisterFrom