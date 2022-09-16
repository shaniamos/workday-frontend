import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BoardHeader } from '../cmps/board/board-header.jsx'
import { GroupList } from '../cmps/group-list.jsx'
import { addBoard, loadSelectedBoard, removeBoard } from '../store/actions/board.action.js'

export const BoardDetails = () => {
    const board = useSelector(state => state.boardModule.selectedBoard)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        dispatch(loadSelectedBoard(params.id))
    }, [params.id])

    const onRemoveBoard = () => {
        dispatch(removeBoard(board._id))
    }

    const onSaveBoard = async () => {
        try {
            const title = prompt("Please enter a board name")
            let newBoard = { title }
            newBoard = await dispatch(addBoard(newBoard))
            navigate(`/board/${newBoard._id}`)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <section className="board-details">
            {board && <BoardHeader board={board} />}
            <button onClick={onRemoveBoard}>Remove Board</button>
            <button onClick={onSaveBoard}>+ Add New Board</button>
            <div className='board-content'></div>
            {board && < GroupList groups={board.groups} />}
        </section>
    )
}