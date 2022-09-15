import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logout, login } from '../store/actions/user.action.js'
import { useEffect } from 'react'
import { userService } from '../services/user.service'

export const AppHeader = () => {
    const dispatch = useDispatch()
    const { loggedInUser } = useSelector(state => state.userModule)

    // useEffect(() => {
    //     const user = userService.getLoggedinUser() 
    //     console.log(user)       
    //     if (user) dispatch(login(user))
    // }, [])
    
    const logoutUser = () => {
        dispatch(logout())
    }

    return <header className="app-header main-header full flex space-around align-center">
        <NavLink to='/' >Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/toy'>Toys</NavLink>
        <NavLink to='/review'>Reviews</NavLink>
        {loggedInUser && <section>
            <h3>Hello {loggedInUser.fullname}</h3>
            <button onClick={logoutUser}>Logout</button>
        </section>}
    </header>
}