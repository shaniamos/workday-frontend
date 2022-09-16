import { boardService } from "../../services/board.service.local.js"

// CRUDL BOARD
export function loadBoards() {
    return async (dispatch) => {
        try {
            const boards = await boardService.query()
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.error('Cannot load boards:', err)
        }
    }
}

export function loadSelectedBoard(boardId, filterBy = {}) {
    return async (dispatch) => {
        try {
            const board = await boardService.getByBoardId(boardId, filterBy)
            dispatch({ type: 'SET_SELECTED_BOARD', board })
        } catch (err) {
            console.log('Cannot load board:', err)
        }
    }
}

// CRUDL TASK
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

export function addTask(boardId, groupId, task) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.saveTask(boardId, groupId, task)
            dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
        } catch (err) {
            console.error('err:', err)
        }
    }
}

export function updateTask(boardId, groupId, task) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.saveTask(boardId, groupId, task)
            dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
        } catch (err) {
            console.error('err:', err)
        }
    }
}
