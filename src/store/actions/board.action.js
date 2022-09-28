import { boardService } from "../../services/board.service.js"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js"

// Action Creators:
export function getActionRemoveBoard(boardId) {
    return {
        type: 'REMOVE_BOARD',
        boardId
    }
}
export function getActionAddBoard(board) {
    return {
        type: 'ADD_BOARD',
        board
    }
}
// export function getActionUpdateBoard(board) {
//     return {
//         type: 'UPDATE_BOARD',
//         board
//     }
// }
export function getActionUpdateBoard(board) {
    return (dispatch) => {
        dispatch({ type: 'UPDATE_BOARD', board })
    }
}

// CRUDL BOARD
export function loadBoards(filterBy = {}) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_LOADING', isLoading: true })
            const boards = await boardService.queryBoards(filterBy)
            dispatch({ type: 'SET_BOARDS', boards })
            return boards
        } catch (err) {
            console.error('Cannot load boards:', err)
        } finally {
            dispatch({ type: 'SET_LOADING', isLoading: false })
        }
    }
}

//get board by id
export function loadSelectedBoard(boardId, filterBy = {}) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_LOADING', isLoading: true })
            const board = await boardService.getBoardById(boardId, filterBy)
            dispatch({ type: 'SET_SELECTED_BOARD', board })
            return board
        } catch (err) {
            console.log('Cannot load board:', err)
        } finally {
            dispatch({ type: 'SET_LOADING', isLoading: false })
        }
    }
}

export function removeBoard(boardId) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_LOADING', isLoading: true })
            await boardService.removeBoard(boardId)
            dispatch({ type: 'REMOVE_BOARD', boardId })
            dispatch({ type: 'RESET_SELECTED_BOARD' })
            showSuccessMsg(`Board successfully deleted`)
        } catch (err) {
            showErrorMsg('Cannot delete board')
            console.log('Cannot delete board', err)
        } finally {
            dispatch({ type: 'SET_LOADING', isLoading: false })
        }
    }
}

export function addBoard(board) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_LOADING', isLoading: true })
            const savedBoard = await boardService.saveBoard(board)
            dispatch({ type: 'ADD_BOARD', board: savedBoard })
            return savedBoard
        } catch (err) {
            console.error('err:', err)
        } finally {
            dispatch({ type: 'SET_LOADING', isLoading: false })
        }
    }
}

export function updateBoard(board) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.saveBoard(board)
            dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
        } catch (err) {
            console.error('err:', err)
        } finally {
            dispatch({ type: 'SET_LOADING', isLoading: false })
        }
    }
}

export function setFilterBy(filterBy) {
    try {
        return (dispatch) => {
            dispatch({ type: 'SET_FILTER_BY', filterBy });
        };
    } catch (err) {
        console.log('err:', err);
        throw err
    }
}

export function setSortBy(sortBy) {
    try {
        return (dispatch) => {
            dispatch({ type: 'SET_SORT_BY', sortBy });
        };
    } catch (err) {
        console.log('err:', err);
        throw err
    }
}

// CRUDL GROUP
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

export function addGroup(boardId, group, place) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.addGroup(boardId, group, place)
            console.log('savedBoard', savedBoard)

            dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
        } catch (err) {
            console.error('err:', err)
        }
    }
}

export function updateGroup(boardId, group) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.updateGroup(boardId, group)
            dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
        } catch (err) {
            console.error('err:', err)
        }
    }
}

// CRUDL TASK
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

export function addTask(boardId, groupId, task) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.addTask(boardId, groupId, task)
            dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
        } catch (err) {
            console.error('err:', err)
        }
    }
}

export function updateTask(boardId, groupId, task) {
    return async (dispatch) => {
        try {
            task = {
                ...task,
                lastUpdated: Date.now()
            }
            const savedBoard = await boardService.updateTask(boardId, groupId, task)
            dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
        } catch (err) {
            console.error('err:', err)
        }
    }
}

//COMMENTS 
export function removeComment(boardId, groupId, taskId, commentIdx) {
    return async (dispatch) => {
        try {
            const board = await boardService.removeComment(boardId, groupId, taskId, commentIdx)
            dispatch({ type: 'UPDATE_BOARD', board })
            showSuccessMsg(`Comment successfully deleted`)
        } catch (err) {
            console.error('err:', err)
            showErrorMsg('Cannot delete item')
        }
    }
}

export function addComment(boardId, groupId, taskId, newComment) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.addComment(boardId, groupId, taskId, newComment)
            dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
            showSuccessMsg(`Comment successfully added`)
        } catch (err) {
            console.error('err:', err)
            showErrorMsg('Cannot add item')
        }
    }
}

