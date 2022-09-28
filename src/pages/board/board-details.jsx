import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BoardHeader } from '../../cmps/board/board-header/board-header.jsx'
import { GroupList } from '../../cmps/board/group/group-list.jsx'
import { KanbanView } from '../../cmps/kanban/kanban-view.jsx'
import { Dashboard } from '../../cmps/board/dashboard.jsx'
import { Loader } from '../../cmps/loader.jsx'
import { addGroup, loadSelectedBoard, updateBoard } from '../../store/actions/board.action.js'
import { socketService, SOCKET_EMIT_SET_BOARD_ID, SOCKET_EVENT_BOARD_CHANGED } from '../../services/socket.service.js'

export const BoardDetails = ({ boards, onChangeFilter }) => {
    const board = useSelector(state => state.boardModule.selectedBoard)
    const isLoading = useSelector(state => state.boardModule.isLoading)
    const [isBoardView, setBoardView] = useState('board-details')

    const dispatch = useDispatch()
    const params = useParams()
    const boardId = params.id

    // useEffect(() => {
    //     // socketService.on(SOCKET_EVENT_BOARD_CHANGED, changeBoard)
    //     // return () => {
    //     //     socketService.off(SOCKET_EVENT_BOARD_CHANGED, changeBoard)
    //     // }
    // }, [])

    useEffect(() => {
        const boardId = params.id
        socketService.emit(SOCKET_EMIT_SET_BOARD_ID, boardId)
        console.log(params.id)
        dispatch(loadSelectedBoard(boardId))
    }, [params.id])

    const changeBoard = (newBoard) => {
        // console.log('newBoard', newBoard)
        dispatch(updateBoard(newBoard))
    }

    const onAddGroup = (place) => {
        const boardId = board._id
        const group = { title: 'New Group' }
        dispatch(addGroup(boardId, group, place))
    }

    const toggleView = (currView) => {
        console.log('currView', currView);
        setBoardView(currView)
    }
    console.log('boardId', boardId);
    if (isLoading) return <Loader />
    return (
        <section className="board-details">
            {(board && boards.length) &&
                <BoardHeader
                    board={board}
                    onAddGroup={onAddGroup}
                    onChangeFilter={onChangeFilter}
                    selectedBoardId={board._id}
                    toggleView={toggleView}
                />}
            {(board && boards.length) &&
                <div className='board-content'>
                    {isBoardView === 'board-details' &&
                        < GroupList
                            groups={board.groups}
                            onAddGroup={onAddGroup}
                            onChangeFilter={onChangeFilter}
                        />}
                    {isBoardView === 'kanban' &&
                        <KanbanView
                        groups={board.groups}
                        boardId={boardId}
                           
                        />}
                    {isBoardView === 'dashboard' &&
                        <Dashboard />}
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