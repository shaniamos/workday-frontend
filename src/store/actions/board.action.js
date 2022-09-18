import { boardService } from "../../services/board.service.local.js"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js"

// CRUDL BOARD

//get list of boards
export function loadBoards(filterBy) {
    // console.log('filterBy', filterBy);
    return async (dispatch) => {
        try {
            const boards = await boardService.queryBoards(filterBy)
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.error('Cannot load boards:', err)
        }
    }
}

//get board by id
export function loadSelectedBoard(boardId, filterBy = {}) {
    return async (dispatch) => {
        try {
            const board = await boardService.getBoardById(boardId, filterBy)
            dispatch({ type: 'SET_SELECTED_BOARD', board })
        } catch (err) {
            console.log('Cannot load board:', err)
        }
    }
}

//remove board 
export function removeBoard(boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.removeBoard(boardId)
            console.log('board', board);
            dispatch({ type: 'REMOVE_BOARD', boardId })
            dispatch({ type: 'RESET_SELECTED_BOARD' })
            showSuccessMsg(`Board successfully deleted`)
        } catch (err) {
            showErrorMsg('Cannot delete board')
            console.log('Cannot delete board', err)
        }
    }
}

//add board 
export function addBoard(board) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.saveBoard(board)
            dispatch({ type: 'ADD_BOARD', board: savedBoard })
            return savedBoard
        } catch (err) {
            console.error('err:', err)
        }
    }
}

// update board
export function updateBoard(board) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.saveBoard(board)
            dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
        } catch (err) {
            console.error('err:', err)
        }
    }
}

export function setFilterBy(filterBy) {
    // console.log('filterBy', filterBy);
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy });
    };
}


// CRUDL GROUP

// remove group
export function removeGroup(boardId, groupId) {
    return async (dispatch) => {
        try {
            const board = await boardService.removeGroup(boardId, groupId)
            dispatch({ type: 'UPDATE_BOARD', board })
            showSuccessMsg(`Group successfully deleted`)
        } catch (err) {
            console.error('err:', err)
            showErrorMsg('Cannot delete group')
        }
    }
}

//add group
export function addGroup(boardId, group) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.saveGroup(boardId, group)
            dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
        } catch (err) {
            console.error('err:', err)
        }
    }
}

//update group
export function updateGroup(boardId, group) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.saveGroup(boardId, group)
            dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
        } catch (err) {
            console.error('err:', err)
        }
    }
}

// CRUDL TASK

//remove task
export function removeTask(boardId, groupId, taskId) {
    return async (dispatch) => {
        try {
            const board = await boardService.removeTask(boardId, groupId, taskId)
            dispatch({ type: 'UPDATE_BOARD', board })
            showSuccessMsg(`Item successfully deleted`)
        } catch (err) {
            console.error('err:', err)
            showErrorMsg('Cannot delete item')
        }
    }
}

//add task
export function addTask(boardId = '', groupId = '', task = '') {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.saveTask(boardId, groupId, task)
            dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
        } catch (err) {
            console.error('err:', err)
        }
    }
}

//update task
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

export function onSetFilterTasks(boardId) {
    // console.log('boardId', boardId);
    return async (dispatch, getState) => {
        try {
            const { filterBy } = getState().boardModule
            // console.log('filterBy', filterBy);
            const board = await boardService.filterGroupAndTasks(boardId, filterBy)

            dispatch({ type: "SET_SELECTED_BOARD", board })
        } catch (err) {
            console.log(err);
        }


    }

}


