import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useFormRegister } from "../../hooks/useFormRegister.js"

export const LoginSignup = () => {

    const params = useParams()
    const [register, setUser, user] = useFormRegister(
        {
            email: '',
            fullname: '',
            username: '',
            password: '',
        }
    )
    const [status, setStatus] = useState(params.status)

    const onSaveUser = (event) => {
        event.preventDefault()
        console.log(user)
    }

    const statusTitle = (status === 'login') ? 'Log In' : 'Sign up'
    return (
        <section className={`login-signup ${status}`}>
            <h1 className="login-signup-title">{statusTitle}</h1>
            <form className="login-signup-form" onSubmit={onSaveUser}>
                <label> Email
                    <input {...register('email', 'email')} />
                </label>
                {status === 'signup' && <label> Fullname
                    <input {...register('fullname', 'text')} />
                </label>}
                {status === 'signup' && <label> Username
                    <input {...register('username', 'text')} />
                </label>}
                <label> Password
                    <input {...register('password', 'password')} />
                </label>
                <button className="btn-login-signup">{statusTitle}</button>
            </form>
            <Link to={`/auth/${status}`}
                onClick={() => {
                    if (status === 'login')
                        setStatus('signup')
                    if (status === 'signup')
                        setStatus('login')
                }}>
                {status === 'login' &&
                    <div className="login-signup-footer">Don't have an account?
                        <span>Sign up</span>
                    </div>}
                {status === 'signup' &&
                    <div className="login-signup-footer">Do you already have an account?
                        <span>Log In</span>
                    </div>}
            </Link>
        </section>
    )
}