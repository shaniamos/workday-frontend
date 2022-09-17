// import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
// import { addGroup } from "../store/actions/board.action.js"
import { addGroup } from "../../store/actions/board.action.js"

import { MainBoardHeader } from './board-header/main-board-header.jsx'
import { ToolbarBoardHeader } from './board-header/toolbar-board-header.jsx'
import { ViewbarBoardHeader } from './board-header/viewbar-board-header.jsx'

//IoHomeOutline - Main Table
//RiErrorWarningLine - description
//AiOutlineStar - starred
//IoIosArrowDown - New item
//BsSearch - Search
//FaRegUserCircle - Person
//FaSort - Sort on group
//CgArrowsScrollV - Sort
//HiFolder - new item

//IoIosCheckmarkCircleOutline -checklist 


export function BoardHeader({ board }) {
    // const [title , setTitle] = useState(selectedBoard.title)

    // useEffect(() => {
    //     setTitle(selectedBoard.title)
    // }, [])
    const dispatch = useDispatch()

    const onSaveGroup = () => {
        const boardId = board._id
        const group = { title: 'New Group' }
        console.log(boardId, group)
        dispatch(addGroup(boardId, group))
    }

    return (
        <header className="board-header-container">
            <div className="board-header-content">
                <MainBoardHeader board={board} />
                <ToolbarBoardHeader />
                <ViewbarBoardHeader onSaveGroup={onSaveGroup} />
            </div>
        </header>
    )
}