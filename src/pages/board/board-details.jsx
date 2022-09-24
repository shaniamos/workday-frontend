import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BoardHeader } from '../../cmps/board/board-header/board-header.jsx'
import { GroupList } from '../../cmps/board/group/group-list.jsx'
import { addGroup, loadSelectedBoard } from '../../store/actions/board.action.js'

export const BoardDetails = ({ boards, onChangeFilter }) => {
    const board = useSelector(state => state.boardModule.selectedBoard)
    const isLoading = useSelector(state => state.boardModule.isLoading)

    // const filterBy = useSelector(state => state.boardModule.filterBy)
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


    // if (isLoading) {
    //     return (
    //         <section className='monday-loader-page'>
    //             <img className='monday-loader-animation' src="https://cdn.monday.com/images/loader/loader.gif" alt="" />
    //         </section>
    //     )
    // }

    return (
        <section className="board-details">
            {(board && boards.length) && <BoardHeader board={board} onAddGroup={onAddGroup} onChangeFilter={onChangeFilter} />}
            {(board && boards.length) && <div className='board-content'>
                < GroupList members={board.members} groups={board.groups} onAddGroup={onAddGroup} onChangeFilter={onChangeFilter} />
            </div>}
            {!boards.length && <section className='board-details-empty'>
                <div className='board-details-empty-header'>
                    <div className='board-details-empty-header-cover'>
                        <div className='board-details-empty-header-content'>
                            <div className='board-details-empty-icon-container'>
                                <div className='board-details-empty-icon'>
                                    <span className='workspace-letter'>W</span>
                                </div>
                            </div>
                            <div className='board-details-empty-header-title'>
                                <h2 className='workspace-title'>Workday Project</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='board-details-empty-content'>
                    <span>You have 0 boards in your workspace</span>
                </div>
            </section>}
        </section>
    )
}