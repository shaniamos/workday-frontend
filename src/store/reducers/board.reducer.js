const INITIAL_STATE = {
    boards: null,
    filterBy: null,
    sortBy: 'name',
    isLoading: false,
    board: {}
}

export function boardReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_BOARDS':
            return { ...state, boards: action.boards }
        case 'SET_BOARD':
            return { ...state, board: action.board }
        case 'ADD_BOARD':
            return { ...state, boards: [...state.boards, action.board] }
        case 'REMOVE_BOARD':
            return { ...state, boards: state.boards.filter(board => board._id !== action.boardId) }
        case 'UPDATE_BOARD':
            return { ...state, boards: state.boards.map(board => board._id === action.board._id ? action.board : board) }
        case 'SET_FILTER_BY':
            return { ...state, filterBy: { ...action.filterBy } }
        case 'SET_SORT_BY':
            return { ...state, sortBy: { ...action.sortBy } }
        case 'SET_LOADING':
            return { ...state, isLoading: action.isLoading }
        default:
            return state;
    }
}