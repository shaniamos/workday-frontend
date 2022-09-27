import io from 'socket.io-client'
import { userService } from './user.service'

// BOARDS
export const SOCKET_EMIT_BOARDS_CHANGE = 'boards-send-change'  //emit
export const SOCKET_EVENT_BOARDS_CHANGE = 'boards-add-change'  //on

// BOARD
export const SOCKET_EMIT_SET_BOARD_ID = 'board-set-id'        //emit
export const SOCKET_EMIT_BOARD_CHANGED = 'board-send-change'  //emit
export const SOCKET_EVENT_BOARD_CHANGED = 'board-add-change'  //on

// TASK
export const SOCKET_EMIT_SET_TASK_ID = 'task-set-id'         //emit
export const SOCKET_EMIT_SEND_TASK = 'task-send'             //emit
export const SOCKET_EVENT_TASK_ADDED = 'task-added'          //on
export const SOCKET_EVENT_TASK_ABOUT_YOU = 'task-about-you'  //on

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

// for debugging from console
// window.socketService = socketService
socketService.setup()

function createSocketService() {
  var socket = null;
  const socketService = {
    setup() {
      socket = io(baseUrl)
      setTimeout(() => {
        const user = userService.getLoggedinUser()
        // Setting the user ID on the socket for identification in the backend!
        if (user) this.login(user._id)
      }, 500)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },

  }
  return socketService
}