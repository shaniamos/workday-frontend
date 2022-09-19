import { PersonCircle } from "../../person-circle"
import { RiErrorWarningLine, RiUserAddLine } from 'react-icons/ri'
import { AiOutlineStar } from 'react-icons/ai'
import { FaStumbleuponCircle } from 'react-icons/fa'
import { useDispatch } from "react-redux"
import { useFormRegister } from "../../../hooks/useFormRegister.js"
import { updateBoard } from "../../../store/actions/board.action.js"
import { useEffect } from "react"

export function MainBoardHeader({ board }) {
    const dispatch = useDispatch()
    const [register, setNewBoard, newBoard] = useFormRegister({
        title: board.title
    })

    useEffect(() => {
        newBoard.title = board.title
    }, [board])

    const onSaveBoard = (event) => {
        event.preventDefault()
        board.title = newBoard.title
        dispatch(updateBoard(board))
    }

    return (

        <div className="board-header-title flex space-between ">
            <div className="board-header-left flex">
                <form onSubmit={onSaveBoard}>
                    <input
                        className="input-title"
                        {...register('title', 'text')}
                    />
                </form>
                <button className="btn-board-description"><RiErrorWarningLine /></button>
                <button className="btn-board-starred">
                    <AiOutlineStar />
                </button>
            </div>
            <div className="board-header-right flex">
                <button className="btn-board-activity">
                    <FaStumbleuponCircle />
                </button>
                <div className="btn-last-seen flex">
                    Last seen
                    <PersonCircle persons={board.members} />
                </div>
                <div className="btn-invite-subscribers">
                    <RiUserAddLine /> Invite/ <span>9</span>
                </div>
            </div>
        </div>
    )
}