// import { AiOutlineStar } from 'react-icons/ai'
// import { IoMdNotificationsOutline } from 'react-icons/io'
// import { FiInbox } from 'react-icons/fi'
// import { FaRegCalendarCheck } from 'react-icons/fa'
// import { BsStars } from 'react-icons/bs'
// import { BsPersonPlus } from 'react-icons/bs'
// import { FiSearch } from 'react-icons/fi'
// import { BiQuestionMark } from 'react-icons/bi'
// import { CgMenuGridO } from 'react-icons/cg'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/imgs/sidebar-icon.png'

export function MainSidebar() {
    const board = useSelector(state => state.boardModule.selectedBoard)
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    let user
    if (loggedInUser) {
        user = board.members.find(member => member.fullname === loggedInUser.fullname)
    }

    return (
        <section className='sidebar-container flex column  '>
            <div className='nav-top-down flex column  '>
                <nav className='btn-home'>
                    <NavLink to='/'>
                        <img className="sidebar-logo" src={logo} alt="logo" />
                    </NavLink>
                </nav>
                <div className='all-nav-bar flex column space-between'>
                    <div className="navigations-icons flex column align-center  ">
                        <nav className='btn-boards'>
                            <NavLink to={`/board/b101`}>
                                <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5063 0.983153C0.782691 2.23087 0.3638 4.68688 1.57068 6.46881L11.7573 21.509C12.5031 22.6101 13.6951 23.1962 14.9037 23.1889C16.1107 23.1945 17.3004 22.6086 18.0451 21.509L28.2344 6.46481C29.4413 4.68289 29.0224 2.22688 27.2988 0.979157C25.5752 -0.268562 23.1995 0.164499 21.9927 1.94643L14.9012 12.4168L7.81243 1.95042C6.60555 0.168496 4.22991 -0.264566 2.5063 0.983153Z" fill="#D7D7FF" /><path d="M2.50923 23.8352C0.785618 22.5875 0.366728 20.1315 1.57361 18.3495L11.7558 3.31581C12.499 2.21855 13.6853 1.63274 14.8897 1.6359C16.1013 1.62581 17.2971 2.21204 18.0447 3.3157L28.2269 18.3495C29.4338 20.1315 29.0149 22.5875 27.2913 23.8352C25.5677 25.0829 23.1921 24.6499 21.9852 22.8679L14.9003 12.4073L7.81536 22.8679C6.60848 24.6499 4.23284 25.0829 2.50923 23.8352Z" fill="url(#paint0_linear_1640_88925)" /><path d="M10.2475 19.2773L5.59619 12.4098L10.2475 5.54228L14.8988 12.4098L10.2475 19.2773Z" fill="#C1C1FF" /><defs><linearGradient id="paint0_linear_1640_88925" x1="18.3366" y1="19.6173" x2="15.7336" y2="1.25856" gradientUnits="userSpaceOnUse"><stop stopColor="#8F8FFF" /><stop offset="1" stopColor="#C2C2FF" /></linearGradient></defs>
                                </svg>
                            </NavLink>
                        </nav>
                        {/* <IoMdNotificationsOutline className='sidebar-icon' /> */}
                        {/* <FiInbox className='sidebar-icon' /> */}
                        {/* <FaRegCalendarCheck className='sidebar-icon' /> */}
                        {/* <AiOutlineStar className='sidebar-icon' /> */}
                    </div>
                    {/* <div className="plans-modal">
                        <span> <BsStars className='stars' />See plans </span>
                    </div> */}
                    <div>
                        {/* <div className='icons-bottom flex column align-center'>
                            <BsPersonPlus className='sidebar-icon' />
                            <FiSearch className='sidebar-icon' />
                            <BiQuestionMark className='sidebar-icon bottom' />
                        </div> */}

                        <div className='down-icons flex column align-center'>
                            {/* <CgMenuGridO className='sidebar-icon down menu' /> */}
                            {!user && <FaUserCircle className='sidebar-icon user-icon' />}
                            {user && <img className="user-img" src={user.imgUrl} alt='user image' />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}