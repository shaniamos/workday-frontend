// import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { connect, useSelector, useDispatch } from "react-redux"
import { Link, NavLink, Route, Routes } from "react-router-dom"
import { useForm } from '../../hooks/useForm'
import { BoardDesc } from "../board-desc"
import { PersonCircle } from "./person-circle.jsx"
import { MainBoardHeader } from './board-header/main-board-header.jsx'
import { ToolbarBoardHeader } from './board-header/toolbar-board-header.jsx'
import { ViewbarBoardHeader } from './board-header/viewbar-board-header.jsx'

//IoHomeOutline - Main Table
//RiErrorWarningLine - description
//AiOutlineStar - starred
//IoIosArrowDown - New item
//BsSearch - Search
//FaRegUserCircle - Person
//FaSort - Sort on group
//CgArrowsScrollV - Sort
//HiFolder - new item
//TbArrowsDiagonal - open item
//BiMessageRoundedAdd - empty updates
//BiMessageRounded - with updates 
//IoIosCheckmarkCircleOutline -checklist 


export function BoardHeader() {
    const selectedBoard = useSelector((storeState) => storeState.boardModule.selectedBoard)
    // const [title , setTitle] = useState(selectedBoard.title)

    // const [title, handleChange, setTitle] = useForm()

    // useEffect(() => {
    //     setTitle(selectedBoard.title)
    // }, [])

    return (
        <header className="board-header-container">
            <div className="board-header-content">
                <MainBoardHeader />
                <ToolbarBoardHeader />
                <ViewbarBoardHeader />
            </div>
        </header>
    )
}