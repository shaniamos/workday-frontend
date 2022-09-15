import { boardService } from "../../services/board.service.local.js"

export function loadBoards() {
    return async (dispatch, getState) => {
        const { filterBy } = getState().boardModule
        try {
            const boards = await boardService.query(filterBy)
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.error('Cannot load boards:', err)
        }
    }
}

export function loadBoard(boardId, filterBy) {
    return async (dispatch) => {
      try {
        const board = await boardService.getById(boardId, filterBy)
        dispatch({ type: 'SET_BOARD', board})
      } catch (err) {
        console.log('Cannot load board:', err)
      }
    }
  }

export function removeBoard(boardId) {
    return async (dispatch) => {
        try {
            await boardService.remove(boardId)
            dispatch({ type: 'REMOVE_BOARD', boardId })
        } catch (err) {
            console.error('err:', err)
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
    return (dispatch) => {
        return boardService.save(board)
            .then((savedBoard) => {
                dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
            })
            .catch((err) => {
                console.log('err:', err)
            })
    }
}

export function setFilterBy(filterBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}

export function sortByBoards(sortBy) {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_SORT_BY', sortBy })
        let { boards } = getState().boardModule

        if (sortBy.sortBy === 'name') boards = boards.sort((t1, t2) => t1.name.localeCompare(t2.name))
        if (sortBy.sortBy === 'price') {
            boards = boards.sort((t1, t2) => t1.price - t2.price)
        }
        dispatch({ type: 'SET_BOARDS', boards })
    }
}