import React, { useState } from 'react'
import './LoginForm.scss'

interface ILoginFormProps {

}

const LoginForm: React.FC<ILoginFormProps> = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value)
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') handleSubmit()
    }

    const handleSubmit = async () => {
        const serverURL = import.meta.env.VITE_SERVER_URL
        const res = await fetch(serverURL)
        const text = await res.text()
        console.log(text)
    }

    return <div className='LoginForm'>
        <input
            type="text"
            onChange={handleUsernameChange}
            onKeyDown={handleKeyDown}
            value={username}
            placeholder='username'
            autoFocus
        />
        <input
            type="password"
            onChange={handlePasswordChange}
            onKeyDown={handleKeyDown}
            value={password}
            placeholder='password'
        />
        <button onClick={handleSubmit}>submit</button>
    </div>
}

export default LoginForm