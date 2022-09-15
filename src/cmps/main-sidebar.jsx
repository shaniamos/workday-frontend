// import {AiOutlineStar} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import logo from '../imgs/sidebar-icon.png'

export function MainSidebar() {

    return (
        <section className='sidebar-container'>
            <nav className='icons-sidebar'>
            <Link to='/'><img className="sidebar-logo" src={logo} alt="" /></Link>
            <h1>haloooooo</h1>

            </nav>



        </section>
    )
}