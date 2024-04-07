import { SubmitHandler, useForm } from 'react-hook-form'
import { faUnlock, faUser } from '@fortawesome/free-solid-svg-icons'
import { zodSchemas } from '@chatapp/shared'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Inputs = z.infer<typeof zodSchemas.registerDataZodSchema>
interface ILoginFormProps { }

const LoginFrom: React.FC<ILoginFormProps> = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(zodSchemas.registerDataZodSchema),
    })

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log('submitting')
        console.log(data)
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
            {/* <span className="error-message">{errors.password?.message}</span> */}
        </div>
        <button type='submit'>submit</button>

    </form>
}

export default LoginFrom