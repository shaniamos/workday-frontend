import { NavLink } from "react-router-dom"
import { IoIosArrowDown } from 'react-icons/io' //New item
import { FaRegUserCircle } from 'react-icons/fa' //Person
import { CgArrowsScrollV } from 'react-icons/cg' //Sort
import { BsSearch } from 'react-icons/bs'  //Search
import { BiFilterAlt } from 'react-icons/bi'//Filter
import { AiOutlineEyeInvisible } from 'react-icons/ai'//Hide
import { HiOutlineDotsHorizontal } from 'react-icons/hi' //More
import { AiOutlinePlusCircle } from 'react-icons/ai' //Plus
import { HiOutlineInbox } from 'react-icons/hi' //box
import { useDispatch } from "react-redux"
import { addTask } from "../../../store/actions/board.action.js"
import { useRef } from "react"
import { useState } from "react"

//IoHomeOutline - Main Table
//RiErrorWarningLine - description
//AiOutlineStar - starred
//FaSort - Sort on group
//HiFolder - new item
//TbArrowsDiagonal - open item
//BiMessageRoundedAdd - empty updates
//BiMessageRounded - with updates 
//IoIosCheckmarkCircleOutline -checklist 


export function ViewbarBoardHeader({ onSaveGroup, board, onChangeFilter }) {
    const [isSearch, setSearch] = useState(false)

    const dispatch = useDispatch()

    const onSaveTask = () => {
        dispatch(addTask())
    }

    return (
        <div className="board-header-view-bar flex ">
            <div className="new-item-btn flex ">
                <button onClick={onSaveTask} className="view-nav-btn btn">New Item</button>
                <section className="dropdown">
                    <button className="view-nav-btn-arrow">< IoIosArrowDown className="arrow-down" /></button>
                    <div className="dropdown-content flex column ">
                        <i onClick={onSaveTask}> <AiOutlinePlusCircle className="dropdown-icon" /> <span> + Add new Item </span></i>
                        <i onClick={onSaveGroup}> <HiOutlineInbox className="dropdown-icon" /><span> + New group of Items </span></i>

                    </div>
                </section>
            </div>
            <button className="view-nav-btn arrow"><BsSearch /> Search  </button>
            <button className="view-nav-btn"><FaRegUserCircle /> Person  </button>
            <button className="view-nav-btn"><BiFilterAlt /> Filter <IoIosArrowDown /> </button>
            <button className="view-nav-btn"><CgArrowsScrollV /> Sort  </button>
            <button className="view-nav-btn"><AiOutlineEyeInvisible /> Hide  </button>
            <button className="view-nav-btn"><HiOutlineDotsHorizontal />  </button>
        </div>


    )
}