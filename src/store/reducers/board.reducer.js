const INITIAL_STATE = {
    boards: null,
    selectedBoard: null,
    filterBy: null,
    sortBy: 'status',
    isLoading: false,
}

export function boardReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_BOARDS':
            return { ...state, boards: action.boards }
        case 'SET_SELECTED_BOARD':
            return { ...state, selectedBoard: action.board }
        case 'ADD_BOARD':
            return { ...state, boards: [...state.boards, action.board] }
        case 'REMOVE_BOARD':
            return { ...state, boards: state.boards.filter(board => board._id !== action.boardId) }
        case 'RESET_SELECTED_BOARD':
            return { ...state, selectedBoard: null }
        case 'UPDATE_BOARD':
            return {
                ...state, boards: state.boards.map(board =>
                    board._id === action.board._id ? action.board : board),
                selectedBoard: action.board
            }
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