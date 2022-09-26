import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useFormRegister } from "../../hooks/useFormRegister.js"
import logo from '../../assets/imgs/logo.png'
import signUpPic from '../../assets/imgs/signup-pic.jpg'
import { useDispatch } from "react-redux"
import { login, signup } from "../../store/actions/user.action.js"
import { useNavigate } from "react-router-dom/dist/index.js"

export const LoginSignup = () => {

    const params = useParams()
    const dispath = useDispatch()
    const navigate = useNavigate()
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
        if (status === 'login') dispath(login(user))
        if (status === 'signup') dispath(signup(user))
        navigate('/')
    }

    const statusTitle = (status === 'login') ? 'Log In' : 'Sign up'
    return (
        <section className={`login-signup flex ${status}`}>
            {status === 'signup' && <div className="bottom-space"></div>}
            {status === 'login' && <header>
                <Link to='/' ><img className="logo" src={logo} /></Link>
            </header>}

            <div className="signup-img-container flex">
                <div className="sign-up-container ">
                    {status === 'signup' &&
                        <h3 className="login-signup-title">Welcome to Workday.com</h3>
            
                    }
                    {status === 'login' &&
                        <h1 className="login-signup-title">Log in to your account</h1>
                    }
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
                            <div style={{ marginop: '100px' }} className="login-signup-footer">Do you already have an account?

                                <span>Log In</span>
                            </div>}
                    </Link>
                </div>
                {status === 'signup' &&
                    <div className="signup-img">
                        <img src={signUpPic} />
                    </div>}
            </div>
        </section>
    )
}