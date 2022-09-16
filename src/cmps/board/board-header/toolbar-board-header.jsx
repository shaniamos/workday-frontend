import { NavLink } from "react-router-dom"
import { IoHomeOutline } from 'react-icons/io5'

export function ToolbarBoardHeader() {

    return (
        <div className="board-header-tool-bar">
            <NavLink><button className="view-nav-btn"><IoHomeOutline className="tool-bar-icon"/><span>Main Table</span></button></NavLink>|
            <button className="view-nav-btn"><span>Calender</span></button>|
            <button className="view-nav-btn"><span>Files</span></button>|
            <button className="view-nav-btn"><span>Timeline</span></button>|
            <button className="view-nav-btn"><span>KanBan</span></button>| +
            {/* <NavLink><button className="view-nav-btn"><IoHomeOutline />Main Table</button></NavLink>
            <NavLink><button className="view-nav-btn">Calender</button></NavLink>
            <NavLink><button className="view-nav-btn">Files</button></NavLink>
            <NavLink><button className="view-nav-btn">Timeline</button></NavLink>
            <NavLink><button className="view-nav-btn">KanBan</button></NavLink> */}
        </div>
    )
}