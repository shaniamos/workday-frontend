import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BoardHeader } from '../cmps/board/board-header.jsx'
import { GroupList } from '../cmps/group-list.jsx'
import { loadSelectedBoard, removeBoard } from '../store/actions/board.action.js'

export const BoardDetails = () => {
    const board = useSelector(state => state.boardModule.selectedBoard)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(loadSelectedBoard(params.id))
    }, [])

    const onRemoveBoard = () => {
        console.log(board._id)
        dispatch(removeBoard(board._id))
    }

    return (
        <section className="board-details">
            <BoardHeader />
            <button onClick={onRemoveBoard}>Remove Board</button>
            <div className='board-content'></div>
            {board && < GroupList groups={board.groups} />}
        </section>
    )
}