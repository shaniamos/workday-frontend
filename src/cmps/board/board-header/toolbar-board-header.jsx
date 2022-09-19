import { NavLink } from "react-router-dom"
import { IoHomeOutline } from 'react-icons/io5'

export function ToolbarBoardHeader() {

    return (
        <div className="board-header-tool-bar flex align-center">
            <NavLink><button className="view-nav-btn"><IoHomeOutline className="tool-bar-icon"/><span>Main Table</span></button></NavLink>|
            <button className="view-nav-btn"><span>Calender</span></button>|
            <button className="view-nav-btn"><span>Files</span></button>|
            <button className="view-nav-btn"><span>Timeline</span></button>|
            <button className="view-nav-btn"><span>KanBan</span></button>| +
        </div>
    )
}