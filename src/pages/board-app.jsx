import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards } from '../store/actions/board.action.js'
import { BoardDetails } from './board-details.jsx'

export const BoardApp = () => {
    const boards = useSelector(state => state.boardModule.boards)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadBoards())
    }, [])

    console.log(boards)
    if (!boards) return <h1>Loading...</h1>
    return (
        <section className="board-app">
            {/* nav */}
            <BoardDetails />
        </section>
    )
}