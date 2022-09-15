import { NavLink } from "react-router-dom"
import { IoHomeOutline } from 'react-icons/io5'

export function ToolbarBoardHeader() {

    return (
        <div className="board-header-tool-bar">
            <NavLink>
                <button className="view-nav-btn">
                    <IoHomeOutline />
                    Main Table
                </button>
            </NavLink>
        </div>
    )
}