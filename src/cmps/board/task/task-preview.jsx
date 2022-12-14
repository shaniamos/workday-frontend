import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet, Route, Routes, useParams } from "react-router-dom"

import { ConfirmModal } from "./confirm-modal.jsx"
import { utilService } from "../../../services/util.service.js"
import { addTask, removeTask, updateTask } from "../../../store/actions/board.action.js"
import { useFormRegister } from "../../../hooks/useFormRegister.js"
import { StatusTypeDisplay } from "../task/status-display.jsx"
import { AvatarsChain } from "../../avatarsChain.jsx"
import { LastUpdated } from "../task/last-updated.jsx"
// ICONS
import { RiArrowRightSLine } from 'react-icons/ri' //subitem
import { TbArrowsDiagonal } from 'react-icons/tb' //open item
import { HiOutlineDotsHorizontal } from 'react-icons/hi' //More
import { MdDeleteOutline } from 'react-icons/md'//Delete
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'//Duplicate
import { ReactComponent as NoneUpdatesIcon } from '../../../assets/svgs/NoneUpdatesIcon.svg'
import { TimeLine } from "../../timeline.jsx"


export const TaskPreview = ({ task, groupId, groupColor, provided }) => {
    const labels = useSelector(state => state.boardModule.selectedBoard.labels)
    const [isDeleteBtnClicked, setBtnClicked] = useState(false)
    const dispatch = useDispatch()
    const params = useParams()
    const boardId = params.id

    const [register, setNewTask, newTask] = useFormRegister({
        title: task.title
    })

    useEffect (() => {
        setNewTask({title: task.title})
    }, [task])

    const onRemoveTask = () => {
        toggleNewBoardModal()
        dispatch(removeTask(boardId, groupId, task.id))
    }

    const onUpdateTask = (event) => {
        event.preventDefault()
        task.title = newTask.title
        dispatch(updateTask(boardId, groupId, task))
    }

    const onDuplicateTask = () => {
        const duplicateTask = { ...task }
        duplicateTask.id = utilService.makeId()
        duplicateTask.lastUpdated = Date.now()
        if (duplicateTask.comments || duplicateTask.comments.length) {
            duplicateTask.comments = [...task.comments]
            duplicateTask.comments.forEach(comment => comment.id = utilService.makeId())
        } else duplicateTask.comments = []
        dispatch(addTask(boardId, groupId, duplicateTask))
    }

    const setStatusOrPriority = (currStatusOrPriority, label) => {
        if (label === 'priority') {
            const taskToUpdate = { ...task, priority: currStatusOrPriority }
            dispatch(updateTask(boardId, groupId, taskToUpdate))
        }
        else if (label === 'status') {
            const taskToUpdate = { ...task, status: currStatusOrPriority }
            dispatch(updateTask(boardId, groupId, taskToUpdate))
        }
    }

    const toggleNewBoardModal = () => {
        setBtnClicked(!isDeleteBtnClicked)
    }

    const { persons, lastUpdated } = task

    return (
        <React.Fragment>
            <div className="preview-full-task flex"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <div className="dropdown">
                    <div ><HiOutlineDotsHorizontal className="dot" /></div>
                    <div className="dropdown-content">
                        <a onClick={toggleNewBoardModal}>< MdDeleteOutline /> Delete Item</a>
                        <a onClick={onDuplicateTask}><HiOutlineDocumentDuplicate /> Duplicate</a>
                    </div>
                </div>
                <div className="questModal\questions">
                    {isDeleteBtnClicked && <ConfirmModal toggleNewBoardModal={toggleNewBoardModal} onRemoveEntity={onRemoveTask} />}
                </div>
                <section className="task-preview flex">
                    <div className="cell task-name-area sticky-feature flex">
                        <div className="task-group-color" style={{ backgroundColor: `var(${groupColor})`, borderBlock: `0.5px solid var(${groupColor})` }}></div>
                        <div className="preview-checkbox"><input className="input-checkbox" type="checkbox" name="" id="" /></div>
                        <div className="btn-subitem"><RiArrowRightSLine className="subitem-icon" /></div>
                        <div className="task-name-heading">
                            <form className="editable-heading" onSubmit={onUpdateTask}>
                                <input className="clean-input" {...register('title', 'text')} />
                            </form>
                        </div>
                        <Link to={`/board/${params.id}/${groupId}/${task.id}`} className="btn-open-link">
                            <div className="btn-open-task flex"><TbArrowsDiagonal className="open-icon" />
                                <span className="open-txt"> Open </span>
                            </div>
                        </Link>
                        <Link to={`/board/${params.id}/${groupId}/${task.id}`} className="btn-update-link">
                            <div className="btn-comments-count"><NoneUpdatesIcon /></div>
                        </Link>
                    </div>

                    {/* Persons / Responsbility */}
                    <div className="cell persons-header"> {typeof persons === 'object' && <AvatarsChain task={task} groupId={groupId} assigneeMembers={persons} />}</div>

                    {/* ALL Label Type Columns (Status + Priority) */}
                    {labels && labels.map(label => {
                        const labelName = label.name
                        const labelValue = task[labelName]
                        return <StatusTypeDisplay setStatusOrPriority={setStatusOrPriority} key={label.name} label={`${label.name}`} value={labelValue} options={label.options} />
                    })}

                    {/* LastUpdated */}
                    <LastUpdated lastUpdated={lastUpdated} />

                    {/* TimeLine */}
                    <div className="cell timeline-header">
                        <TimeLine task={task} boardId={boardId} groupId={groupId} groupColor={groupColor} />
                    </div>

                    {/* Empty column */}
                    <div className="cell add-column"></div>
                </section>
            </div>
        </React.Fragment>
    )
}