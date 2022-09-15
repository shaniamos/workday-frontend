// import { connect, useSelector } from "react-redux";
// import { NavLink, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export function BoardHeader() {
    const [ board ] = useSelector((storeState) => storeState.boardModule)
    const [title , setTitle] = useState(board.title)


    useEffect(() => {
        setTitle(board.title)
    }, [])

    return (
        <header className="board-header-container flex" style={{backgroundColor: 'red', height: '260px'}}>
            <div className="board-header-title">

            </div>
            <div className="board-header-view-nav">
            </div>
        </header>
    )
}