import './AppForm.scss'
import Switch from '../components/Switch'
import LoginFrom from '../components/Login'
import RegisterFrom from '../components/Register'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { dataActions } from '../redux/slice/userData'


export type TFormAction = 'login' | 'register'

const AppForm: React.FC = () => {
  const formAction = useAppSelector(state => state.userData.formAction)
  const dispatch = useAppDispatch()

  const setAction = (action: "login" | "register") => {
    dispatch(dataActions.setFormAction(action))
  }

  const switchCb = (activeSide: 'left' | 'right') => {
    const newAction = activeSide === 'left' ? 'login' : 'register'
    setAction(newAction)
  }

  return <div className='AppForm'>
    <div className="header">
      <span onClick={() => setAction("login")}>Log in</span>
      <span onClick={() => setAction("register")}>Register</span>

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

export default AppForm