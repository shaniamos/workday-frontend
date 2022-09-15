// import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { connect, useSelector, useDispatch } from "react-redux"
import { Link, Route, Routes } from "react-router-dom"
import { useForm } from '../../hooks/useForm'
import { BoardDesc } from "../board-desc"

export function BoardHeader() {
    const board = useSelector((storeState) => storeState.boardModule.board)
    // const [title , setTitle] = useState(board.title)


    const [title, handleChange, setTitle] = useForm()

    // useEffect(() => {
    //     setTitle(board.title)
    // }, [])

    return (
        <header className="board-header-container flex" style={{ backgroundColor: 'red', height: '200px' }}>

            <div className="board-header-title">
                Develepers board
                <input
                 type="text" 
                 name="title" 
                 onChange={handleChange} 
                 value={board.title} />
                <Link to={`/board/${board._id}/description`}><button className="btn-board-description">description</button></Link>
                <button className="btn-board-starred">Starred</button>
            </div>
            <div className="board-header-view-nav">
            </div>

            <section>
                {/* <Route path="board/:id/description" component={BoardDesc}/> */}
            </section>
        </header>
    )
}