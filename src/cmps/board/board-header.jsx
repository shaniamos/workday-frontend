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


export function BoardHeader({ board, onAddGroup, onChangeFilter }) {

    return (
        <header className="board-header-container">
            <div className="board-header-content">
                
                <MainBoardHeader board={board} />
                <ToolbarBoardHeader />
                <ViewbarBoardHeader onAddGroup={onAddGroup} onChangeFilter={onChangeFilter} />
            </div>
        </header>
    )
}