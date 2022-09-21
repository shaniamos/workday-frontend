import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BoardHeader } from '../../cmps/board/board-header/board-header.jsx'
import { GroupList } from '../../cmps/board/group/group-list.jsx'
import { addGroup, loadSelectedBoard } from '../../store/actions/board.action.js'

export const BoardDetails = ({ onChangeFilter }) => {
    const board = useSelector(state => state.boardModule.selectedBoard)
    const isLoading = useSelector(state => state.boardModule.isLoading)
    const filterBy = useSelector(state => state.boardModule.filterBy)
    // console.log('filterBy', filterBy)
    // const [newGroups, setNewGroups] = useState([])

    const dispatch = useDispatch()
    const params = useParams()

    // useEffect(() => {
        // let groups = filteredGroupsAndTasks()
        // setNewGroups(groups)

    // }, [filterBy])


    useEffect(() => {
        dispatch(loadSelectedBoard(params.id))
    }, [params.id])

    const onAddGroup = () => {
        const boardId = board._id
        const group = { title: 'New Group' }
        dispatch(addGroup(boardId, group))
    }

    // const filteredGroupsAndTasks = () => {
    //     let filteredGroups = board.groups
    //     if (filterBy.txt) {
    //         console.log('filterBy.txt', filterBy.txt);
    //         const regex = new RegExp(filterBy.txt, 'i')
    //         filteredGroups = board.groups.filter((group) => {
    //             if (regex.test(group.title)) {
    //                 console.log('group.title', group.title);
    //                 return group
    //             }
    //             else {
    //                 const filteredTasks = group.tasks.filter((task) => {
    //                     if (regex.test(task.title))
    //                         return task
    //                 })
    //                 group.tasks = filteredTasks
    //                 if (group.tasks.length) return group
    //             }
    //         })
    //         return filteredGroups
    //     }
    // }


    if (isLoading) {
        return (
            <section className='monday-loader-page'>
                <img className='monday-loader-animation' src="https://cdn.monday.com/images/loader/loader.gif" alt="" />
            </section>
        )
    }
    return (
        <section className="board-details">
            {board && <BoardHeader board={board} onAddGroup={onAddGroup} onChangeFilter={onChangeFilter} />}
            <div className='board-content'>
                {board && < GroupList   groups={board.groups} onAddGroup={onAddGroup} onChangeFilter={onChangeFilter} />}
            </div>
        </section>
    )
}