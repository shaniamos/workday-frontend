import { NavLink } from "react-router-dom"
import { HiDotsHorizontal } from 'react-icons/hi'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { MdDeleteOutline } from 'react-icons/md'
import { ReactComponent as NoneUpdatesIcon } from '../../assets/svgs/BoardNavIcon.svg'


export function BoardList({ filteredBoards, onRemoveBoard, isDropDownOpen, toggleDropdown, onDuplicateBoard}) {

    return <section>
        {filteredBoards.map(board => {
            return <div className="boards-list flex space-between" key={board._id}>
                <NavLink className="flex inline-flex option" to={`/board/${board._id}`}>
                    {/* <HiOutlineClipboard className="table-chart flex column align-center" /> */}                  
                    <i className="table-chart flex column align-center"> <NoneUpdatesIcon className="nav-icon"/></i>
                    <span className="menu-btn-inner-text">{board.title}</span>
                    <i className="dropdown-dot">
                        <div className="dropdown" onClick={(ev) => {
                            ev.preventDefault()
                            toggleDropdown()
                        }} ><HiDotsHorizontal className="points" />
                            {isDropDownOpen && <div className="dropdown-content ">
                                <i onClick={() => onDuplicateBoard(board)}><HiOutlineDocumentDuplicate className="icon-dropdown" /> Duplicate board</i>
                                <i onClick={(ev) => {
                                    ev.preventDefault()
                                    ev.stopPropagation()
                                    onRemoveBoard(board._id)
                                }}><MdDeleteOutline className="icon-dropdown" /> Delete board</i>
                            </div>}
                        </div>
                    </i>
                </NavLink>
            </div>
        }
        
        )}

</section>
}