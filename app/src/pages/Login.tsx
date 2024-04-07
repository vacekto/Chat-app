import './Login.scss'
import Switch from '../components/Switch'
import { useState } from 'react'
import LoginFrom from '../components/LoginForm'
import RegisterFrom from '../components/RegisterForm'

export type TFormAction = 'login' | 'register'

const Login: React.FC = () => {

  const [formAction, setFormAction] = useState<TFormAction>('login')

  const switchCb = (activeSide: 'left' | 'right') => {
    const newAction = activeSide === 'left' ? 'login' : 'register'
    setFormAction(newAction)
  }



  return <div className='Login'>

    <div className="header">
      <span onClick={() => setFormAction('login')}>Log in</span>
      <span onClick={() => setFormAction('register')}>Register</span>

      <Switch
        state={formAction === 'login' ? 'left' : 'right'}
        cb={switchCb}
      />
    </div>

    <div className={`formContainer ${formAction}`}>
      <LoginFrom />
      <RegisterFrom />
    </div>
  </div>
}

export default Login