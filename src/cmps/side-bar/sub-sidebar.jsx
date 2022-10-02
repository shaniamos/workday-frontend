// ICONS
import { IoIosArrowForward } from 'react-icons/io'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowDown } from 'react-icons/io'
import { GrAdd } from 'react-icons/gr'
import { BsFillLightningFill } from 'react-icons/bs'
import { BsPlusLg } from 'react-icons/bs'


//LIBS
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation } from 'react-router-dom'
import { addBoard, loadBoards, removeBoard } from '../../store/actions/board.action.js'
import { NewBoardMoadl } from "../board/new-board-modal.jsx"
import { Search } from "../search.jsx"
import { useEffect } from 'react'
// import BoardNavIcon from '../../assets/svgs/BoardNavIcon.svg'
import { utilService } from '../../services/util.service.js'
import { BoardList } from '../board/board-list.jsx'


export function SubSidebar() {
    const boards = useSelector(state => state.boardModule.boards)
    const [filteredBoards, setFilteredBoards] = useState(boards)
    const [isNavOpen, setNavOpen] = useState(true)
    const [isNewBoardModalOpen, setNewBoardModalOpen] = useState(false)
    const [isDropDownOpen, setDropDownOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currLocation = useLocation()

    useEffect(() => {
        dispatch(loadBoards())
    }, [])

    useEffect(() => {
        setFilteredBoards(boards)
    }, [boards])

    const onChangeBoardsFilter = (filterBy) => {
        const { txt } = filterBy
        const regex = new RegExp(txt, 'i')
        const newBoards = boards.filter(board => regex.test(board.title))
        setFilteredBoards(newBoards)
    }

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
    const onSaveBoard = async (newBoardTitle) => {
        console.log(newBoardTitle)
        toggleNewBoardModal()
        try {
            const title = newBoardTitle.title
            let newBoard = { title }
            newBoard = await dispatch(addBoard(newBoard))
        } catch (err) {
            console.error(err)
        }
    }

    const onDuplicateBoard = async (board) => {
        const duplicateBoard = { ...board }
        delete duplicateBoard._id
        duplicateBoard.title = 'copy-' + board.title
        duplicateBoard.lastUpdated = Date.now()
        const newGroups = board.groups.map(group => {
            group.id = utilService.makeId()
            const newTasks = group.tasks.map(task => {
                task.id = utilService.makeId()
                if (task.comments) {
                    task.comments.forEach(comment => comment.id = utilService.makeId())
                } else task.comments = []
                return task
            })
            group.tasks = [...newTasks]
            return group
        })
        duplicateBoard.groups = [...newGroups]
        try {
            const newBoard = await dispatch(addBoard(duplicateBoard))
            navigate(`/board/${newBoard._id}`)
        } catch (err) {
            console.error(err)
        }
    }

    const styleSubSidebar = (currLocation.pathname === '/workspace') ? '{display: flex}' : ''
    const isWorkspace = (currLocation.pathname === '/workspace')
    const sideBarClassName = isNavOpen ? 'is-open' : ''

    return (
        <section className={`sub-sidebar-container ${sideBarClassName} full`}  >
            {isNewBoardModalOpen && <NewBoardMoadl onSaveBoard={onSaveBoard} toggleNewBoardModal={toggleNewBoardModal} />}
            {isNavOpen && <IoIosArrowBack className='btn-left open-btn' onClick={toggleSubSidebar} />}
            {!isNavOpen && <IoIosArrowForward className='btn-right open-btn' onClick={toggleSubSidebar} />}
            {isNavOpen && (
                <div className="side-bar-content">
                    {!isWorkspace && <div className="workspace-sidebar flex space-between"> <span>Workspace</span></div>}

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
                            {/* <div> */}
                            {<a className="flex  option last-one"><Search onChangeFilter={onChangeBoardsFilter} /> </a>}
                            {/* </div> */}
                        </div>

                        <div className="spacer"></div>
                        <div className="boards-options">
                            <BoardList
                                filteredBoards={filteredBoards}
                                onRemoveBoard={onRemoveBoard}
                                isDropDownOpen={isDropDownOpen}
                                toggleDropdown={toggleDropdown}
                                onDuplicateBoard={onDuplicateBoard}
                            />
                        </div>
                    </div>
                    {isWorkspace &&
                        <button className="add-mobile-btn">
                            <a onClick={toggleNewBoardModal} className="flex option">
                                <GrAdd className='plus-icon' />
                            </a>
                        </button>}
                </div>
            )}

            {(!boards.length && isNavOpen) && <div className='workspace-empty'>
                <h2 className='workspace-empty-title'>Your workspace is empty</h2>
                <h2 className='workspace-empty-subtitle'>Get started by adding new boards</h2>
                <button onClick={toggleNewBoardModal} className='btn-add-board'>Add New Board</button>
            </div>}
        </section >
    )
}