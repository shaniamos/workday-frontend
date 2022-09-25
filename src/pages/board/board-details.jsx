import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BoardHeader } from '../../cmps/board/board-header/board-header.jsx'
import { GroupList } from '../../cmps/board/group/group-list.jsx'
import { KanbanView } from '../../cmps/kanban/kanban-view.jsx'
import { addGroup, loadSelectedBoard } from '../../store/actions/board.action.js'

export const BoardDetails = ({ boards, onChangeFilter }) => {
    const board = useSelector(state => state.boardModule.selectedBoard)
    console.log(board)
    const isLoading = useSelector(state => state.boardModule.isLoading)
    const [isBoardView, setBoardView] = useState(true)

    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(loadSelectedBoard(params.id))
    }, [params.id])

    const onAddGroup = (place) => {
        const boardId = board._id
        const group = { title: 'New Group' }
        dispatch(addGroup(boardId, group, place))
    }

    const toggleView = (currView) => {
        console.log('currView', currView);
        setBoardView(currView)
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
            {(board && boards.length) && 
                    <BoardHeader 
                        board={board} 
                        onAddGroup={onAddGroup} 
                        onChangeFilter={onChangeFilter} 
                        toggleView={toggleView} 
                        />}
            {(board && boards.length) &&
                <div className='board-content'>
                    {isBoardView &&
                     < GroupList
                        groups={board.groups}
                        onAddGroup={onAddGroup}
                        onChangeFilter={onChangeFilter} 
                        />}
                    {!isBoardView &&
                     <KanbanView 
                        board={board}
                        groups={board.groups}
                        onAddGroup={onAddGroup}
                        />} 
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