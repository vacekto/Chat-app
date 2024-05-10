import './AppForm.scss'
import Switch from '../components/Switch'
import LoginFrom from '../components/Login'
import RegisterFrom from '../components/Register'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { dataActions } from '../redux/slice/userData'
import BitWardenIcon from '../util/SVG/BitWardenSVG'
import GoogleSVG from '../util/SVG/Google'

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
      <div className="icons">
        <BitWardenIcon />
        <GoogleSVG />
      </div>
      <div className='forms'>
        <LoginFrom />
        <RegisterFrom />
      </div>
    </div>
  </div>
}

export default AppForm