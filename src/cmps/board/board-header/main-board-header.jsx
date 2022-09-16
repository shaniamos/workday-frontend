import { PersonCircle } from "../person-circle.jsx"
import { RiErrorWarningLine, RiUserAddLine } from 'react-icons/ri'
import { AiOutlineStar } from 'react-icons/ai'
import { FaStumbleuponCircle } from 'react-icons/fa'
import { useForm } from '../../../hooks/useForm.js'

export function MainBoardHeader() {
    const [title, handleChange, setTitle] = useForm()

    return (
        <div className="board-header-title flex space-between ">
            <div className="board-header-left flex">
                <input
                    className="input-title"
                    type="text"
                    name="title"
                    value='Developers board'
                    //value={selectedBoard.title} 
                    onChange={handleChange}
                />
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
                    <PersonCircle />
                </div>
                <div className="btn-invite-subscribers">
                    <RiUserAddLine /> Invite/ <span>9</span>
                </div>
            </div>
        </div>
    )
}