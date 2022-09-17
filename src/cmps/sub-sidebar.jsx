import { useState } from "react"
import { IoIosArrowForward } from 'react-icons/io'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowDown } from 'react-icons/io'
import { HiDotsHorizontal } from 'react-icons/hi'
import { GrAdd } from 'react-icons/gr'
import { FiSearch } from 'react-icons/fi'
import { GrFilter } from 'react-icons/gr'
import { BsFillLightningFill } from 'react-icons/bs'
import { HiOutlineClipboard } from 'react-icons/hi'
import { MdDeleteOutline } from 'react-icons/md'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { RiPencilLine } from 'react-icons/ri'
import { HiOutlineArchive } from 'react-icons/hi'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addBoard, loadSelectedBoard, removeBoard } from '../store/actions/board.action.js'
import { useNavigate, useParams } from 'react-router-dom'


export function SubSidebar() {
    const boards = useSelector(state => state.boardModule.boards)
    const [isNavOpen, setNavOpen] = useState()
    const [isDropDownOpen, setDropDownOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const toggleSubSidebar = () => {
        setNavOpen(!isNavOpen)
        console.log(isNavOpen);
    }

    const onAddBoard = () => {
        console.log('add function');
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
    const onRemoveBoard = (boardId) => {
        dispatch(removeBoard(boardId))
        setDropDownOpen(!isDropDownOpen)
    }

    const onToggleDropdown = () => {
        setDropDownOpen(!isDropDownOpen)
        console.log('isDropDownOpen', isDropDownOpen);
        // console.log('eev', ev);
    }

    return (

        <section className={isNavOpen ? "sub-sidebar-container is-open" : "sub-sidebar-container"}>
            <div>
                {isNavOpen && <IoIosArrowBack className='btn-left open-btn' onClick={toggleSubSidebar} />}
                {!isNavOpen && <IoIosArrowForward className='btn-right open-btn' onClick={toggleSubSidebar} />}
            </div>
            {isNavOpen && (
                <div>
                    <div className="workspace-sidebar flex space-between ">
                        <span>Workspace</span>
                        <HiDotsHorizontal className="dot" />
                    </div>
                    <div className="workspace-board flex space-between align-center">
                        <div className="workspace-board-name flex align-center">
                            <div className="workspace-icon flex align-center" >
                                <BsFillLightningFill />
                            </div>
                            <h2> Shani Amos</h2>
                        </div>
                        <IoIosArrowDown />
                    </div>

                    <div>
                        <div className="workspace-options flex column ">
                            <div className="action-btn">

                                <a onClick={onSaveBoard} className="flex  option"> <GrAdd /><span>Add</span></a>
                                <a onClick={onAddBoard} className="flex  option"> <GrFilter /><span>Filter</span></a>
                                <a onClick={onAddBoard} className="flex  option last-one"> <FiSearch /><span>Search</span></a>
                            </div>
                            <div className="boards-options">
                                {boards.map(board =>
                                    <div className="boards-list flex space-between" key={board._id}>

                                        <Link className="flex inline-flex  option" to={`/board/${board._id}`}>
                                            <HiOutlineClipboard className="table-chart flex column align-center" />
                                            {board.title}
                                            <i className="dropdown-dot"
                                            >
                                                <div className="dropdown" onClick={onToggleDropdown} ><HiDotsHorizontal />

                                                    { isDropDownOpen && <div className="dropdown-content">
                                                        <i href="#"><HiOutlineDocumentDuplicate className="garbage" /> Duplicate Board</i>
                                                        <i href="#"><RiPencilLine  className="garbage"/> Rename</i><hr />
                                                        <i href="#"><HiOutlineArchive className="garbage" /> Archive</i>
                                                        <i onClick={(ev) => {
                                                            ev.preventDefault()
                                                            ev.stopPropagation()
                                                            onRemoveBoard(board._id)
                                                        }}><MdDeleteOutline className="garbage" /> Delete</i>

                                                    </div>}
                                                </div>
                                            </i>
                                        </Link>

                                    </div>

                                )}

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>

    )



}