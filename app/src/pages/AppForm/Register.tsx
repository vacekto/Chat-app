import { SubmitHandler, useForm } from 'react-hook-form'
import { faAt, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons'
import { zodSchemas } from '@chatapp/shared'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sha3_256 } from "js-sha3"
import { useAppDispatch } from '../../redux/hooks'
import * as thunk from '../../redux/thunk'

type Inputs = z.infer<typeof zodSchemas.registerFormZS>
interface IRegisterFormProps { }

const Register: React.FC<IRegisterFormProps> = () => {
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(zodSchemas.registerFormZS),
    })

    const onSubmit: SubmitHandler<Inputs> = async data => {
        data.password = sha3_256(data.password)
        dispatch(thunk.register(data))
    }

    return <form autoComplete='off' onSubmit={handleSubmit(onSubmit)} noValidate className='RegisterForm'>
        <div className="formGroup">
            <div className="inputContainer">
                <input type="text" placeholder='username' {...register('username')} />
                <FontAwesomeIcon icon={faUser} className='inputIcon' />
            </div>
            <span className="errorMessage">{errors.username?.message}</span>
        </div>

        <div className="formGroup">
            <div className="inputContainer">
                <input type="text" placeholder='email' {...register('email')} />
                <FontAwesomeIcon icon={faAt} className='inputIcon' />
            </div>
            <span className="errorMessage">{errors.email?.message}</span>
        </div>

        <div className="formGroup">
            <div className="inputContainer">
                <input type="password" placeholder='password' {...register('password')} />
                <FontAwesomeIcon icon={faUnlock} className='inputIcon' />
            </div>
            <span className="errorMessage">{errors.password?.message}</span>
        </div>
        <div className="formGroup">
            <div className="inputContainer">
                <input type="password" placeholder='repeat password' {...register('repeatPassword')} />
                <FontAwesomeIcon icon={faUnlock} className='inputIcon' />
            </div>
            <span className="errorMessage">{errors.repeatPassword?.message}</span>
        </div>
        <button type='submit'>submit</button>
    </form>
}

export default Register