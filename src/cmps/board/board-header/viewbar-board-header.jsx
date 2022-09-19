import { IoIosArrowDown } from 'react-icons/io' //New item
import { FaRegUserCircle } from 'react-icons/fa' //Person
import { CgArrowsScrollV } from 'react-icons/cg' //Sort
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { BsSearch } from 'react-icons/bs'  //Search
import { BiFilterAlt } from 'react-icons/bi'//Filter
import { AiOutlineEyeInvisible } from 'react-icons/ai'//Hide
import { HiOutlineDotsHorizontal } from 'react-icons/hi' //More
import { AiOutlinePlusCircle } from 'react-icons/ai' //Plus
import { HiOutlineInbox } from 'react-icons/hi' //box
import { useDispatch } from "react-redux"
import { addTask } from "../../../store/actions/board.action.js"
import { useState } from "react"
import { SearchBoard } from "../../search.jsx"
import { FilterBoardByType } from './board-filter.jsx';

//IoHomeOutline - Main Table
//RiErrorWarningLine - description
//AiOutlineStar - starred
//FaSort - Sort on group
//HiFolder - new item
//TbArrowsDiagonal - open item
//BiMessageRoundedAdd - empty updates
//BiMessageRounded - with updates 
//IoIosCheckmarkCircleOutline -checklist 


export function ViewbarBoardHeader({ onAddGroup, onChangeFilter }) {
    const [isSearch, setSearch] = useState(false)
    const [isFilter, setFilter] = useState(false)

    const dispatch = useDispatch()

    const onAddTask = () => {
        dispatch(addTask())
    }

    return (
        <div className="board-header-view-bar flex ">
            <div className="new-item-btn flex ">
                <button onClick={onAddTask} className="view-nav-btn btn">New Item</button>
                <section className="dropdown">
                    <button className="view-nav-btn-arrow">< IoIosArrowDown className="arrow-down" /></button>
                    <div className="dropdown-content flex column ">
                        <i onClick={onAddTask}> <AiOutlinePlusCircle className="dropdown-icon" /> <span> + Add new Item </span></i>
                        <i onClick={onAddGroup}> <HiOutlineInbox className="dropdown-icon" /><span> + New group of Items </span></i>
                    </div>
                </section>
            </div>

            <ClickAwayListener onClickAway={() => setSearch(false)}>
                <div>
                    {!isSearch && <button className="view-nav-btn" onClick={() => setSearch(!isSearch)}><BsSearch /> <span>Search</span>  </button>}
                    {isSearch && <SearchBoard contentSearch={'items'} onChangeFilter={onChangeFilter} setSearch={setSearch} />}
                </div>
            </ClickAwayListener>
            <button className="view-nav-btn"><FaRegUserCircle /> Person  </button>

            <ClickAwayListener onClickAway={() => setFilter(false)}>
                <div>
                    <button onClick={() => setFilter(!isFilter)} className="view-nav-btn"><BiFilterAlt /> <p>Filter</p></button>
                    {isFilter &&
                        <FilterBoardByType />
                    }
                </div>
            </ClickAwayListener>
            <button className="view-nav-btn"><CgArrowsScrollV /> Sort  </button>
            <button className="view-nav-btn"><AiOutlineEyeInvisible /> Hide  </button>
            <button className="view-nav-btn"><HiOutlineDotsHorizontal />  </button>
        </div>
    )
}