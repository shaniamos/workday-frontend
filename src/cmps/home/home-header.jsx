import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../imgs/logo.png'
import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineWorkOutline } from 'react-icons/md'
import { CgMoreO } from 'react-icons/cg'



export function HomeHeader() {

    return (
        <React.Fragment>
            <div className="home-header flex space-between ">
                <Link to='/' ><img className="logo" src={logo} /></Link>
                <nav className='header-nav'>
                    <div className='side-header-links'>
                        <NavLink className='btn-login' to='/auth/:status' >Log in</NavLink>
                        <NavLink className='btn-contant-us' >Contact us</NavLink>
                    </div>
                    <Link to='/board/b101'>
                        <button className='get-started-btn btn fa-arrow-right'>
                            Get Started <span> &#8594; </span>
                        </button>
                    </Link>
                </nav>
            </div>
        </React.Fragment>
    )
}