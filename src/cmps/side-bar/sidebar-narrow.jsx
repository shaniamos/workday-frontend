import { NavLink } from "react-router-dom";
import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineWorkOutline } from 'react-icons/md'
import { CgMoreO } from 'react-icons/cg'

export function SidebarNarrow() {
    return (
        <section className="navbar-mobile-container">
            <div className='icons-navigation'>
                <NavLink className='home-btn' to='/'>
                    <div className="mobile-navbar-icon"><AiOutlineHome /></div>
                    <span>Home</span>
                </NavLink>
                <NavLink className='workspace-btn' to='/workspace'>
                    <div className="mobile-navbar-icon"><MdOutlineWorkOutline /></div>
                    <span>Workspace</span>
                </NavLink>
                <div className='more-btn'>
                    <div className="mobile-navbar-icon"><CgMoreO /></div>
                    <span>More</span>
                </div>
            </div>


        </section>
    )
}

