import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../imgs/logo.png'


export function HomeHeader() {

    return (
        <div className="home-header flex space-between">
            <Link to='/' ><img className="logo" src={logo} /></Link>
            <nav className='header-nav'>
                <NavLink className='nav-a' to='/auth/:status' >Log in</NavLink>
                <Link to='/board/b101'>
                    <button className='get-started-btn btn fa-arrow-right'>
                        Get Started <span> &#8594; </span>
                    </button>
                </Link>
            </nav>
        </div>
    )
}