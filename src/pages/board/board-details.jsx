import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BoardHeader } from '../../cmps/board/board-header/board-header.jsx'
import { GroupList } from '../../cmps/board/group/group-list.jsx'
import { addGroup, loadSelectedBoard } from '../../store/actions/board.action.js'

export const BoardDetails = ({ filteredGroups, onChangeFilter }) => {
    const board = useSelector(state => state.boardModule.selectedBoard)
    const isLoading = useSelector(state => state.boardModule.isLoading)
    const dispatch = useDispatch()
    const params = useParams()
    // const [groups, setGroups] = useState([])

    useEffect(() => {
        dispatch(loadSelectedBoard(params.id))
        // setGroups(board.groups)
    }, [params.id])

    // useEffect(() => {
    //     setGroups(filteredGroups)
    // }, [filteredGroups])

    const onAddGroup = () => {
        const boardId = board._id
        const group = { title: 'New Group' }
        dispatch(addGroup(boardId, group))
    }

    // if (isLoading) {
    //     return (
    //         <section className='monday-loader-page'>
    //             <img className='monday-loader-animation' src="https://cdn.monday.com/images/loader/loader.gif" alt="" />
    //         </section>
    //     )
    // }
    return (
        <section className="board-details">
            {board && <BoardHeader board={board} onAddGroup={onAddGroup} onChangeFilter={onChangeFilter} />}
            <div className='board-content'>
                {board && < GroupList groups={board.groups} onAddGroup={onAddGroup} />}
            </div>
        </section>
    )
}