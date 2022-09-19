import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

import { addTask, removeTask, updateTask } from "../../../store/actions/board.action.js"
import { useFormRegister } from "../../../hooks/useFormRegister.js"
import { StatusTypeDisplay } from "../task/status-display.jsx"
import { PersonCircle } from "../../person-circle.jsx"
import { LastUpdated } from "../task/last-updated.jsx"
// ICONS
import { RiArrowRightSLine } from 'react-icons/ri' //subitem
import { TbArrowsDiagonal } from 'react-icons/tb' //open item
import { BiMessageRoundedAdd } from 'react-icons/bi' //empty updates, with updates
import { HiOutlineDotsHorizontal } from 'react-icons/hi' //More
import { MdDeleteOutline } from 'react-icons/md'//Delete
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'//Duplicate

export const TaskPreview = ({ task, groupId, groupColor }) => {
    const labels = useSelector(state => state.boardModule.selectedBoard.labels)

    const dispatch = useDispatch()
    const params = useParams()
    const boardId = params.id


    const [register, setNewTask, newTask] = useFormRegister({
        title: task.title
    })

    const onRemoveTask = () => {
        dispatch(removeTask(boardId, groupId, task.id))
    }

    const onUpdateTask = (event) => {
        event.preventDefault()
        task.title = newTask.title
        dispatch(updateTask(boardId, groupId, task))
    }

    const onDuplicateTask = () => {
        const duplicateTask = { ...task }
        delete duplicateTask.id
        delete duplicateTask.lastUpdated
        dispatch(addTask(boardId, groupId, duplicateTask))
    }


    const { persons, status, priority, lastUpdated } = task
    let date = new Date(Date.now())
    return (
        <React.Fragment>
            <div className="preview-full-task flex">
                <div className="dropdown">
                    <div ><HiOutlineDotsHorizontal className="dot" /></div>
                    <div className="dropdown-content">
                        <a onClick={onRemoveTask}>< MdDeleteOutline /> Delete Item</a>
                        <a onClick={onDuplicateTask}><HiOutlineDocumentDuplicate /> Duplicate</a>
                    </div>
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
                        <Link to={`/board/${params.id}/${groupId}/${task.id}`} className="">
                            <div className="btn-open-task flex"><TbArrowsDiagonal />Open</div>
                        </Link>
                        <div className="btn-updates-count"><BiMessageRoundedAdd /></div>
                    </div>

                    {/* Persons / Responsbility */}
                    <div className="cell persons-header"> {typeof persons === 'object' && <PersonCircle persons={persons} />}</div>

                    {/* ALL Label Type Columns (Status + Priority) */}
                    {labels.map(label => {
                        const labelName = label.name
                        const labelValue = task[labelName]
                        console.log(labelName, labelValue)
                        return <StatusTypeDisplay key={label.name} label={`${label.name}`} value={labelValue} options={label.options} />
                    })}

                    {/* DeadLine */}
                    <LastUpdated lastUpdated={lastUpdated} />

                    {/* Due Date */}
                    <div className="cell date-header">
                        {date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}
                    </div>
                    {/* Empty column */}
                    <div className="cell add-column"></div>
                </section>
            </div>
        </React.Fragment>
    )
}