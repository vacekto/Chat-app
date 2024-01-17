import React, { useState, useRef } from 'react'
import './Login.scss'
import { zodSchemas } from '@chatapp/shared'
import socketSingleton from '../util/socketSingleton'
import { useForm, SubmitHandler } from "react-hook-form"

interface ILoginProps {

}

const Login: React.FC<ILoginProps> = () => {
    // const [usernameError, setUsernameError] = useState<string>('')
    // const [emailError, setEmailError] = useState<string>('')
    // const [passwordError, setPasswordError] = useState<string>('')
    // const [repeatPasswordError, setRepeatPasswordError] = useState<string>('')

    // const [formAction, setFormAction] = useState<'register' | 'login'>('login')

    // const usernameRef = useRef<HTMLInputElement>({} as HTMLInputElement)
    // const emailRef = useRef<HTMLInputElement>({} as HTMLInputElement)
    // const passwordRef = useRef<HTMLInputElement>({} as HTMLInputElement)
    // const repeatPasswordRef = useRef<HTMLInputElement>({} as HTMLInputElement)
    // const validateTimer = useRef<NodeJS.Timeout | number>(-1)


    // const validateUsername = () => {
    //     const valid = zodSchemas.usernameZodSchema.safeParse(usernameRef.current?.value)
    //     if (valid.success) {
    //         if (usernameError) setUsernameError('')
    //         return true
    //     }
    //     const errMsg = valid.error.errors[0].message
    //     if (usernameError !== errMsg) setUsernameError(errMsg)
    //     return false
    // }

    // const validateEmail = () => {
    //     const valid = zodSchemas.emailZodSchema.safeParse(emailRef.current?.value)
    //     if (valid.success) {
    //         if (emailError) setEmailError('')
    //         return true
    //     }
    //     const errMsg = valid.error.errors[0].message
    //     if (emailError !== errMsg) setEmailError(errMsg)
    //     return false
    // }

    // const validatePassword = () => {
    //     const passValidation = zodSchemas.passwordZodSchema.safeParse(passwordRef.current?.value)
    //     if (passValidation.success) {
    //         if (passwordError) setPasswordError('')
    //         return true
    //     }
    //     const errMsg = passValidation.error.errors[0].message
    //     if (passwordError !== errMsg) setPasswordError(errMsg)
    //     return false
    // }

    // const validateRepeatPassword = () => {
    //     const p = passwordRef.current.value
    //     const rp = repeatPasswordRef.current.value
    //     if (p === rp) {
    //         setRepeatPasswordError('')
    //         return true
    //     }
    //     setRepeatPasswordError('Passwords must match')
    //     return false

    // }

    // const withDelay = (func: Function, timer: number = 500, funcArgs: any[] = []) => () => {
    //     clearTimeout(validateTimer.current)
    //     validateTimer.current = setTimeout(func, timer, ...funcArgs)
    // }

    // const handleLogin = () => {
    //     const usernameVal = validateUsername()
    //     const passVal = validatePassword()
    //     if (!usernameVal || !passVal) return

    //     const payload = {
    //         username: usernameRef.current.value,
    //         password: passwordRef.current.value
    //     }

    //     const url = `${import.meta.env.VITE_SERVER_URL}/login`

    //     fetch(url, {
    //         method: 'POST',
    //         body: JSON.stringify(payload),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => res.json()).then(data => {
    //         if (typeof data.token === 'string') {
    //             localStorage.setItem('chatAppToken', data.token)
    //             if (
    //                 !socketSingleton.instance ||
    //                 !socketSingleton.instance.connected
    //             ) {
    //                 socketSingleton.connect(data.token)
    //             }
    //         }

    //     })

    // }

    // const handleRegister = () => {
    //     const usernameVal = validateUsername()
    //     const passVal = validatePassword()
    //     const emailVal = validateEmail()
    //     const repeatPassVal = validateRepeatPassword()

    //     if (!usernameVal || !passVal || !emailVal || !repeatPassVal) return

    //     const payload = {
    //         username: usernameRef.current.value,
    //         email: emailRef.current.value,
    //         password: passwordRef.current.value
    //     }

    //     const url = `${import.meta.env.VITE_SERVER_URL}/register`

    //     fetch(url, {
    //         method: 'POST',
    //         body: JSON.stringify(payload),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => res.text()).then(data => { })
    // }

    // const handleSubmit = () => {
    //     if (formAction === 'login') handleLogin()
    //     else handleRegister()
    // }

    // const toggleAction = () => {
    //     setFormAction(prevState => prevState === 'login' ? 'register' : 'login')
    // }

    return <div className='login'>
        <form action=""></form>
        {/* 
        username
        <input
            type="text"
            onChange={withDelay(validateUsername)}
            onBlur={withDelay(validateUsername)}
            ref={usernameRef}
        />
        <div>
            {usernameError}
        </div>
        {formAction === 'register' ? <>
            email
            <input
                type="email"
                onChange={withDelay(validateEmail)}
                onBlur={withDelay(validateEmail)}
                ref={emailRef}
            />
            <div>
                {emailError}
            </div> </> : null}
        password
        <input
            type="password"
            onChange={withDelay(validatePassword)}
            onBlur={withDelay(validatePassword)}
            ref={passwordRef}
        />
        <div>
            {passwordError}
        </div>
        {formAction === 'register' ? <>
            repeatPassword
            <input
                type="password"
                onChange={withDelay(validateRepeatPassword)}
                onBlur={withDelay(validateRepeatPassword)}
                ref={repeatPasswordRef}
            />
            <div>
                {repeatPasswordError}
            </div>

        </> : null}
        <button onClick={handleSubmit}>submit</button>
        <button onClick={toggleAction}>{formAction}</button> */}
    </div>
}

export default Login