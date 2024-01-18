import './Login.scss'
import Switch from '../components/Switch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons'
import { zodSchemas } from '@chatapp/shared'
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from 'zod'


type Inputs = z.infer<typeof zodSchemas.registerDataZodSchema>

const Login: React.FC = () => {
  console.log('rendering form ')
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


  return <div className='Login'>
    <Switch />
    <form autoComplete='off' onSubmit={handleSubmit(onSubmit)} noValidate>

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
      <button type='submit'>submit or die</button>

    </form>
  </div>
}
export default Login