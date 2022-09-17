import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards } from '../store/actions/board.action.js'
import { BoardHeader } from '../cmps/board/board-header.jsx'
import { GroupList } from '../cmps/group-list.jsx'
import { useParams } from 'react-router-dom'
import { MainSidebar } from '../cmps/main-sidebar.jsx'
import { BoardDetails } from './board-details'
import { SubSidebar } from '../cmps/sub-sidebar.jsx'

export const BoardApp = () => {
    const boards = useSelector(state => state.boardModule.boards)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(loadBoards())
    }, [params.id])

    // if (!boards) return <section className='monday-loader-page'>
    //     <img className='monday-loader-animation' src="https://cdn.monday.com/images/loader/loader.gif" alt="" />
    // </section>
    return (
        <section className="board-app flex">
            <SubSidebar />
            <BoardDetails />
        </section>
    )
}