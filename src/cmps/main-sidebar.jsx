import { AiOutlineStar } from 'react-icons/ai'
import { SiGoogletagmanager } from 'react-icons/si'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { FiInbox } from 'react-icons/fi'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { BsStars } from 'react-icons/bs'
import { BsPersonPlus } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'
import { BiQuestionMark } from 'react-icons/bi'
import { CgMenuGridO } from 'react-icons/cg'
import { FaUserCircle } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import logo from '../imgs/sidebar-icon.png'

export function MainSidebar() {

    return (
        <section className='sidebar-container flex column  '>
            <div className='nav-top-down flex column  '>
                <nav className='home-btn '>
                    <Link to='/'><img className="sidebar-logo" src={logo} alt="" /></Link>
                </nav>
                <div className='all-nav-bar flex column space-between'>
                    <div className="navigations-icons flex column align-center  ">
                        <SiGoogletagmanager className='sidebar-icon' />
                        <IoMdNotificationsOutline className='sidebar-icon' />
                        <FiInbox className='sidebar-icon' />
                        <FaRegCalendarCheck className='sidebar-icon' />
                        <AiOutlineStar className='sidebar-icon' />
                    </div>

                    <div className="plans-modal"> <span> <BsStars className='stars' />See plans </span> </div>

                    <div>
                        <div className='icons-bottom flex column align-center'>
                            <BsPersonPlus className='sidebar-icon' />
                            <FiSearch className='sidebar-icon' />
                            <BiQuestionMark className='sidebar-icon bottom' />
                        </div>

                        <div className='down-icons flex column align-center'>
                            <CgMenuGridO className='sidebar-icon down menu' />
                            <FaUserCircle className='sidebar-icon down' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}