import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards } from '../store/actions/board.action.js'
import { BoardHeader } from '../cmps/board/board-header.jsx'
import { GroupList } from '../cmps/group-list.jsx'
import { useParams } from 'react-router-dom'
import { MainSidebar } from '../cmps/main-sidebar.jsx'

export const BoardApp = () => {
    const boards = useSelector(state => state.boardModule.boards)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        // dispatch(loadBoard(params.id))
        // console.log(boards)
        dispatch(loadBoards())
    }, [params.id])

    console.log(boards)
    return (
        <section className="board-app">
            <MainSidebar />
            <h1>Hello BoardApp</h1>
            {/* <BoardHeader /> */}
            <div className='board-content'></div>
            {boards && < GroupList groups={boards[0].groups} />}
        </section>
    )
}