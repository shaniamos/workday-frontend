import { NavLink } from "react-router-dom"
import { IoHomeOutline } from 'react-icons/io5'

export function ToolbarBoardHeader({ selectedBoardId, toggleView }) {

    return (
        <div className="board-header-tool-bar flex align-center">
            <NavLink to={`/board/${selectedBoardId}`} className="flex">
                <button className="view-nav-btn" onClick={() => toggleView('board-details')}>
                    <IoHomeOutline className="tool-bar-icon" />
                    <span>Main Table</span>
                </button>
            </NavLink>
            <span className="separator">|</span>
            {/* <NavLink to={`/board/${selectedBoardId}/kanban`}> */}
                <button className="view-nav-btn" onClick={() => toggleView('kanban')}>
                    <span>Kanban</span>
                </button>
            {/* </NavLink> */}
            <span className="separator">|</span>
            {/* <NavLink to={`/board/${selectedBoardId}/dashboard`}> */}
                {/* <button className="view-nav-btn" onClick={() => toggleView('dashboard')}>
                    <span>Dashboard</span>
                </button> */}
            {/* </NavLink> */}
        </div>
    )
}