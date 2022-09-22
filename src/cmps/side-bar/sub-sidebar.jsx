// ICONS
import { IoIosArrowForward } from 'react-icons/io'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowDown } from 'react-icons/io'
import { HiDotsHorizontal } from 'react-icons/hi'
import { GrAdd } from 'react-icons/gr'
// import { FiSearch } from 'react-icons/fi'
// import { GrFilter } from 'react-icons/gr'
import { BsFillLightningFill } from 'react-icons/bs'
import { HiOutlineClipboard } from 'react-icons/hi'
import { MdDeleteOutline } from 'react-icons/md'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { RiPencilLine } from 'react-icons/ri'
import { HiOutlineArchive } from 'react-icons/hi'
//LIBS
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, NavLink, useLocation } from 'react-router-dom'
import { loadBoards, removeBoard } from '../../store/actions/board.action.js'
import { NewBoardMoadl } from "../board/new-board-modal.jsx"
import { Search } from "../search.jsx"
import { useEffect } from 'react'

export function SubSidebar({ isOpen }) {
    const boards = useSelector(state => state.boardModule.boards)
    const [filteredBoards, setFilteredBoards] = useState([boards])
    const [isNavOpen, setNavOpen] = useState(isOpen)
    const [isNewBoardModalOpen, setNewBoardModalOpen] = useState(false)
    const [isDropDownOpen, setDropDownOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const currLocation = useLocation()

    useEffect(() => {
        dispatch(loadBoards())
        // if (!boards) loadBoardsFromServer()
    }, [])

    const onChangeBoardsFilter = (filterBy) => {
        const { txt } = filterBy
        const regex = new RegExp(txt, 'i')
        const newBoards = boards.filter(board => regex.test(board.title))
        setFilteredBoards(newBoards)
    }

    // const loadBoardsFromServer = async () => {
    //     boards = await dispatch(loadBoards())
    //     setNavOpen(true)
    // }

    const toggleSubSidebar = () => {
        setNavOpen(!isNavOpen)
    }

    const toggleNewBoardModal = () => {
        setNewBoardModalOpen(!isNewBoardModalOpen)
    }

    const toggleDropdown = () => {
        setDropDownOpen(!isDropDownOpen)
    }

    const onRemoveBoard = async (boardId) => {
        try {
            await dispatch(removeBoard(boardId))
            navigate(`/board/${boards[0]._id}`)
            setDropDownOpen(!isDropDownOpen)
        } catch (err) {
            console.error(err)
        }
    }
    // const styleSubSidebar = (currLocation.pathname === '/workspace') ? '{display: flex}' : ''
    const sideBarClassName = isNavOpen ? 'is-open' : ''
    // style={styleSubSidebar}
    if (!boards) return <div>Loading.....</div>
    return (
        <section className={`sub-sidebar-container ${sideBarClassName}`} >
            {isNewBoardModalOpen && <NewBoardMoadl toggleNewBoardModal={toggleNewBoardModal} />}
            {isNavOpen && <IoIosArrowBack className='btn-left open-btn' onClick={toggleSubSidebar} />}
            {!isNavOpen && <IoIosArrowForward className='btn-right open-btn' onClick={toggleSubSidebar} />}
            {isNavOpen && (
                <div className="side-bar-content">
                    <div className="workspace-sidebar flex space-between">
                        <span>Workspace</span>
                    </div>
                    <div className="workspace-board flex space-between align-center">
                        <div className="workspace-board-name flex align-center">
                            <div className="workspace-icon flex align-center" >
                                <BsFillLightningFill />
                            </div>
                            <h2>Workday Project</h2>
                        </div>
                        <IoIosArrowDown className='arrow-btn' />
                    </div>
                    <div className="workspace-options flex column">
                        <div className="action-btn ">
                            <a onClick={toggleNewBoardModal} className="flex option"> <GrAdd /><span className="menu-btn-inner-text">Add</span></a>
                            <div>
                                {<a className="flex  option last-one"><Search contentSearch={'boards'} onChangeFilter={onChangeBoardsFilter} /> </a>}
                            </div>
                        </div>
                        <div className="spacer"></div>
                        <div className="boards-options">
                            {boards.map(board => {
                                return <div className="boards-list flex space-between" key={board._id}>
                                    <NavLink className="flex inline-flex option" to={`/board/${board._id}`}>
                                        <HiOutlineClipboard className="table-chart flex column align-center" />
                                        <span className="menu-btn-inner-text">{board.title}</span>
                                        <i className="dropdown-dot">
                                            <div className="dropdown" onClick={(ev) => {
                                                ev.preventDefault()
                                                toggleDropdown()
                                            }} ><HiDotsHorizontal className="points" />
                                                {isDropDownOpen && <div className="dropdown-content ">
                                                    <i><HiOutlineDocumentDuplicate className="icon-dropdown" /> Duplicate Board</i>
                                                    <i><RiPencilLine className="icon-dropdown" /> Rename</i><hr />
                                                    <i><HiOutlineArchive className="icon-dropdown" /> Archive</i>
                                                    <i onClick={(ev) => {
                                                        ev.preventDefault()
                                                        ev.stopPropagation()
                                                        onRemoveBoard(board._id)
                                                    }}><MdDeleteOutline className="icon-dropdown" /> Delete</i>
                                                </div>}
                                            </div>
                                        </i>
                                    </NavLink>
                                </div>
                            }
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section >
    )
}