import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards, setFilterBy, onSetFilterTasks } from '../../store/actions/board.action.js'
import { Outlet, useParams } from 'react-router-dom'
import { BoardDetails } from './board-details'
import { SubSidebar } from '../../cmps/side-bar/sub-sidebar.jsx'
import { UserMsg } from "../../cmps/msg/user-msg.jsx"
import { MainSidebar } from '../../cmps/side-bar/main-sidebar.jsx'
import { boardService } from '../../services/board.service.local.js'

export const BoardApp = () => {

    const filterBy = useSelector(state => state.boardModule.filterBy)
    const boards = useSelector(state => state.boardModule.boards)
    const [filteredGroups, setFilteredGroups] = useState([])
    const dispatch = useDispatch()
    const params = useParams()
    useEffect(() => {
        dispatch(loadBoards(filterBy))
    }, [params.id])

    const onChangeFilter = async (filterBy, contentSearch, sortBy) =>  {
        console.log('filterBy',filterBy);
        console.log('contentSearch',contentSearch);
        console.log('sortBy',sortBy);
        try {
            await dispatch(setFilterBy(filterBy))
            if(contentSearch === 'boards') 
                await dispatch(loadBoards(filterBy))
            else {
                try {
                    const filteredGroups = await boardService.filterGroupAndTasks(params.id, filterBy, sortBy)
                    setFilteredGroups(filteredGroups)
                }
                catch (err) {
                    console.error(err);
                }
            }    
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
            <SubSidebar boards={boards} isOpen={true} onChangeFilter={onChangeFilter} />
            <BoardDetails filteredGroups={filteredGroups} onChangeFilter={onChangeFilter} />
            <Outlet />
        </section>
    )
}