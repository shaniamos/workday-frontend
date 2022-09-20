import { NavLink } from "react-router-dom";
import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineWorkOutline } from 'react-icons/md'
import { CgMoreO } from 'react-icons/cg'

export function SidebarNarrow() {
    return (

        <section className="navbar-mobile-container">
            <div className='icons-navigation flex '>

                <NavLink className='flex column align-center' to='/'> <AiOutlineHome />
                    <span>Home</span>
                </NavLink>
                <NavLink className='flex column align-center' to='/workspace'> <MdOutlineWorkOutline />
                    <span>Work Space </span>
                </NavLink>
                <NavLink className='flex column align-center'> <CgMoreO />
                    <span>More</span>
                </NavLink>
            </div>


        </section>
    )
}

