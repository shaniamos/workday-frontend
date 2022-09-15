import { boardService } from "../../services/board.service.local.js"

export function loadBoards() {
    return async (dispatch) => {
        try {
            const boards = await boardService.query()
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.error('err:', err)
        }
    }
}

export function loadSelectedBoard(boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.getByBoardId(boardId)
            dispatch({ type: 'SET_SELECTED_BOARD', board })
        } catch (err) {
            console.error('err:', err)
        }
    }
}

// task
export function removeTask(boardId, groupId, taskId) {
    return async (dispatch) => {
        try {
            const board = await boardService.removeTask(boardId, groupId, taskId)
            dispatch({ type: 'UPDATE_BOARD', board })
        } catch (err) {
            console.error('err:', err)
        }
    }
}

export function addTask(task) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(task)
            dispatch({ type: 'ADD_BOARD', board: savedBoard })
        } catch (err) {
            console.error('Oops:', err)
        }
    }
}






export function addBoard(board) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(board)
            dispatch({ type: 'ADD_BOARD', board: savedBoard })
        } catch (err) {
            console.error('Oops:', err)
        }
    }
}

export function updateBoard(board) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(board)
            dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
        } catch (err) {
            console.log('err:', err)
        }
    }
}