import { userService } from "../../services/user.service"

// login
export function login(loggedInUser) {
    return async (dispatch) => {
        try {
            const user = await userService.login(loggedInUser)
            if (user) dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.error(err)
        }
    }
}

//signup
export function signup(loggedInUser) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(loggedInUser)
            if (user) dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.error(err)
        }
    }
}

// logout
export function logout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({ type: 'RESET_USER' })
        } catch (err) {
            console.error(err)
        }
    }
}
