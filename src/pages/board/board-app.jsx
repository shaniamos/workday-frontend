import { useEffect, useState } from 'react'
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

    //  CR - function that called filter won't do sort
    // const onChangeFilter = async (filterBy, sortBy) => {
    const onChangeFilter = async (filterBy, sortBy) => {
        try {
            // if (contentSearch === 'boards') await dispatch(loadBoards(filterBy))
            // else  await dispatch(setFilterBy(filterBy))
            // CR - why not two seperated functions?
            await dispatch(setFilterBy(filterBy))
        }
        catch (err) {
            console.error(err);
        }
    }

    // if (!boards) return <section className='monday-loader-page'>
    //     <img className='monday-loader-animation' src="https://cdn.monday.com/images/loader/loader.gif" alt="" />
    // </section>

    return (
        <section className="board-app flex">
            <MainSidebar />
            <UserMsg boards={boards} />
            <SubSidebar isOpen={true} />
            <BoardDetails boards={boards} onChangeFilter={onChangeFilter} />
            <Outlet />
        </section>
    )
}