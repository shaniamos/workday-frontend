import { NavLink } from "react-router-dom"
import { IoIosArrowDown } from 'react-icons/io' //New item
import { FaRegUserCircle } from 'react-icons/fa' //Person
import {  CgArrowsScrollV } from 'react-icons/cg' //Sort
import { BsSearch } from 'react-icons/bs'  //Search
import { BiFilterAlt } from 'react-icons/bi'//Filter
import { AiOutlineEyeInvisible } from 'react-icons/ai'//Hide
import { HiOutlineDotsHorizontal } from 'react-icons/hi' //More

//IoHomeOutline - Main Table
//RiErrorWarningLine - description
//AiOutlineStar - starred
//FaSort - Sort on group
//HiFolder - new item
//TbArrowsDiagonal - open item
//BiMessageRoundedAdd - empty updates
//BiMessageRounded - with updates 
//IoIosCheckmarkCircleOutline -checklist 


export function ViewbarBoardHeader() {

    return (
        <div className="board-header-view-bar">
            <button className="view-nav-btn arrow">New Item <IoIosArrowDown /> </button>
            <button className="view-nav-btn arrow"><BsSearch /> Search  </button>
            <button className="view-nav-btn"><FaRegUserCircle /> Person  </button>
            <button className="view-nav-btn"><BiFilterAlt /> Filter <IoIosArrowDown /> </button>
            <button className="view-nav-btn"><CgArrowsScrollV /> Sort  </button>
            <button className="view-nav-btn"><AiOutlineEyeInvisible /> Hide  </button>
            <button className="view-nav-btn"><HiOutlineDotsHorizontal />  </button>
        </div>
    )
}