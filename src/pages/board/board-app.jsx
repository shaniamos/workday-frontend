import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards, setFilterBy } from '../../store/actions/board.action.js'
import { Outlet, useParams } from 'react-router-dom'
import { BoardDetails } from './board-details'
import { SubSidebar } from '../../cmps/side-bar/sub-sidebar.jsx'
import { UserMsg } from "../../cmps/msg/user-msg.jsx"
import { MainSidebar } from '../../cmps/side-bar/main-sidebar.jsx'

export const BoardApp = () => {

    const filterBy = useSelector(state => state.boardModule.filterBy)
    const boards = useSelector(state => state.boardModule.boards)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(loadBoards(filterBy))
    }, [params.id])

    const onChangeFilter = async (filterBy) => {
        try {
            await dispatch(setFilterBy(filterBy))
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <section className="board-app flex">
            <MainSidebar />
            <UserMsg boards={boards} />
            <SubSidebar />
            <BoardDetails boards={boards} onChangeFilter={onChangeFilter} />
            <Outlet />
        </section>
    )
}