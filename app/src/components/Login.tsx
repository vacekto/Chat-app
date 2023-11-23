import React, { useEffect, useState } from 'react'
import './Login.scss'
import { validateLoginOrRegister } from '../util/validation'
import { ILoginState } from "../util/types"



interface ILoginProps {

}

const Login: React.FC<ILoginProps> = () => {
    const [formAction, setFormAction] = useState<'login' | 'register'>('login')

    const [isValid, setIsValid] = useState<boolean>(false)

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [errors, setErrors] = useState<Omit<ILoginState, 'formAction'>>({
        email: '',
        password: '',
        repeatPassword: '',
        username: ''
    })

    const validate = () => {
        const validateProps = {
            formAction,
            username,
            password,
            repeatPassword,
            email
        }
        const [outcome, errors] = validateLoginOrRegister(validateProps)
        setErrors(errors)
        setIsValid(outcome)
    }



    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value.trim()
        setUsername(value)
    }

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value.trim()
        setEmail(value)
    }

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value.trim()
        setPassword(value)
    }

    const handleRepeatPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value.trim()
        setRepeatPassword(value)
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') handleSubmit()
    }

    const handleSubmit = async () => {
        console.log('submitting')
        return
        if (!isValid) {
            console.error('NOT VALID!')
            return
        }

        const url = `${import.meta.env.VITE_SERVER_URL}/${formAction}`

        const body = formAction === 'register' ? {
            username,
            password,
            email
        } : {
            username,
            password
        }

        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const text = await res.text()
        console.log(text)
    }

    const toggleFormAction = () => {
        setFormAction(prevState => {
            const newState = prevState === 'login' ? 'register' : 'login'
            return newState
        })
    }

    useEffect(
        validate,
        [username, password, repeatPassword, email]
    )

    const test = () => {
        fetch('http://localhost:3000/test')
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => {console.log(err)})
        // const time = new Date()
        // console.log(time.toUTCString() + '\n')
    }

    const test2 = () => {
        fetch('http://localhost:3000/test2')
    }

    return <div className='Login'>

        <input
            type="text"
            onChange={handleUsernameChange}
            onKeyDown={handleKeyDown}
            value={username}
            placeholder='username'
            autoFocus
        />
        <div className="errorMessage">
            {errors.username}
        </div>
        {formAction === 'register' ? <>
            <input
                onChange={handleEmailChange}
                onKeyDown={handleKeyDown}
                value={email}
                placeholder='email'
            />
            <div className="errorMessage">
                {errors.email}
            </div>
        </> : null}

        <input
            type="password"
            onChange={handlePasswordChange}
            onKeyDown={handleKeyDown}
            value={password}
            placeholder='password'
        />
        <div className="errorMessage">
            {errors.password}
        </div>

        {formAction === 'register' ? <>
            <input
                type='password'
                onChange={handleRepeatPasswordChange}
                onKeyDown={handleKeyDown}
                value={repeatPassword}
                placeholder='repeat password'
            />
            <div className="errorMessage">
                {errors.repeatPassword}
            </div>
        </>
            : null}

        <button onClick={handleSubmit}>submit</button>

        <button onClick={toggleFormAction}> {formAction} </button>

        <button onClick={test}>test</button>
        <button onClick={test2}>test2</button>
    </div>
}

export default Login