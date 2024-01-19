import './Login.scss'
import Switch from '../components/Switch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons'
import { zodSchemas } from '@chatapp/shared'
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from 'zod'
import { useState } from 'react'

type Inputs = z.infer<typeof zodSchemas.registerDataZodSchema>

type TFormAcion = 'login' | 'register'

const Login: React.FC = () => {
  const [formAction, setFormAction] = useState<TFormAcion>('login')

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

  const changeFormAction = (action: TFormAcion) => () => {
    setFormAction(action)
  }

  const switchCb = (activeSide: 'left' | 'right') => {
    const newAction = activeSide === 'left' ? 'login' : 'register'
    setFormAction(newAction)
  }

  return <div className='Login'>

    <div className="header">
      <span onClick={changeFormAction('login')}>Log in</span>
      <span onClick={changeFormAction('register')}>Sign in</span>
    </div>

    <Switch
      state={formAction === 'login' ? 'left' : 'right'}
      cb={switchCb}
    />

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