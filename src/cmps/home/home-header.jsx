import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/imgs/logo.png'
import { useSelector } from 'react-redux'


export function HomeHeader() {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    return (
        <React.Fragment>
            <div className="home-header flex space-between ">
                <Link to='/' ><img className="logo" src={logo} /></Link>
                <nav className='header-nav'>
                    <div className='side-header-links'>
                        {!loggedInUser && <NavLink className='btn-login' to='/auth/login' >Log in</NavLink>}
                        {loggedInUser && <NavLink className='btn-login' to='/' >Logout</NavLink>}
                    </div>
                    <Link to='/board/6331957ec46e6b54a700bb94'>
                        <button className='get-started-btn btn fa-arrow-right'>
                            <p>Get Started<span className='get-started-arrow'>&#8594;</span></p>
                        </button>
                    </Link>
                </nav>
            </div>
        </React.Fragment>
    )
}