import './Login.scss'
import Switch from '../components/Switch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons'
import { zodSchemas } from '@chatapp/shared'
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from 'zod'
import { useEffect, useState } from 'react'

type Inputs = z.infer<typeof zodSchemas.registerDataZodSchema>
type TFormAcion = 'login' | 'signin'

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

  const switchCb = (activeSide: 'left' | 'right') => {
    const newAction = activeSide === 'left' ? 'login' : 'signin'
    setFormAction(newAction)
  }

  useEffect(() => {
    console.log(formAction)
  }, [formAction])

  return <div className='Login'>

    <div className="header">
      {/* <div className="options"> */}
      <span onClick={() => setFormAction('login')}>Log in</span>
      <span onClick={() => setFormAction('signin')}>Sign in</span>
      {/* </div> */}

      <Switch
        state={formAction === 'login' ? 'left' : 'right'}
        cb={switchCb}
      />
    </div>

    <div className={`formContainer ${formAction}`}>

      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)} noValidate className='signinForm'>
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

      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)} noValidate className='loginForm'>
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

    </div>
  </div>
}
export default Login