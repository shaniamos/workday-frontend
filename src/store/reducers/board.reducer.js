const INITIAL_STATE = {
    boards: [],
    selectedBoard: null,
    filterBy: { txt: '' },
    isLoading: true,
    sortBy: null,
}

export function boardReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.isLoading }
        case 'SET_BOARDS':
            return { ...state, isLoading: false, boards: action.boards }
        case 'SET_SELECTED_BOARD':
            return { ...state, selectedBoard: action.board }
        case 'ADD_BOARD':
            return { ...state, boards: [...state.boards, action.board], selectedBoard: action.board }
        case 'REMOVE_BOARD':
            return { ...state, boards: state.boards.filter(board => board._id !== action.boardId) }
        case 'RESET_SELECTED_BOARD':
            return { ...state, selectedBoard: null }
        case 'UPDATE_BOARD':
            return {
                ...state, boards: state.boards.map(board =>
                    board._id === action.board._id ? action.board : board), selectedBoard: action.board
            }
        case 'SET_FILTER_BY':
            return { ...state, filterBy: { ...action.filterBy } }
        case 'SET_SORT_BY':
            return action.sortBy ? { ...state, sortBy: { ...state.sortBy, ...action.sortBy } }
                : { ...state, sortBy: null }
        default:
            return state;
    }
}