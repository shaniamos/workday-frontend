import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/imgs/logo.png'
import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineWorkOutline } from 'react-icons/md'
import { CgMoreO } from 'react-icons/cg'
import { useSelector } from 'react-redux'


export function HomeHeader() {

    return (
        <React.Fragment>
            <div className="home-header flex space-between ">
                <Link to='/' ><img className="logo" src={logo} /></Link>
                <nav className='header-nav'>
                    <div className='side-header-links'>
                        <NavLink className='btn-login' to='/auth/login' >Log in</NavLink>
                        {/* <NavLink className='btn-contant-us' >Contact us</NavLink> */}
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