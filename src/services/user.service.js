import { httpService } from './http.service'
import { store } from '../store/store'
// import { getActionSetWatchedUser } from '../store/actions/board.action.js'
import { socketService, SOCKET_EVENT_TASK_ABOUT_YOU } from './socket.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

// const notificationChannel = new BroadcastChannel('notificationChannel');
// (() => {
//     // socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
//     //     console.log('GOT from socket', review)
//     //     store.dispatch(getActionAddReview(review))
//     // })
//     socketService.on(SOCKET_EVENT_TASK_ABOUT_YOU, (task) => {
//         console.log(`New task about me ${task.title}`)
//     })
// })()

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update
}

window.userService = userService


function getUsers() {
    return httpService.get(`user`)
}

function onUserUpdate(user) {
    // store.dispatch(getActionSetWatchedUser(user))
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
    // socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    // socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    return user
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        socketService.login(user._id)
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    userCred.imgUrl = 'https://cdn.monday.com/icons/dapulse-person-column.svg'
    const user = await httpService.post('auth/signup', userCred)
    socketService.login(user._id)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}



