import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useFormRegister } from "../hooks/useFormRegister.js"
import { removeTask } from "../store/actions/board.action.js"
import { updateTask } from "../store/actions/board.action.js"
import { PersonCircle } from "./person-circle.jsx"
import { StatusTypeDisplay } from "./board/status-display.jsx"
import { LastUpdated } from "./last-updated.jsx"

import { RiArrowRightSLine } from 'react-icons/ri' //subitem
import { TbArrowsDiagonal } from 'react-icons/tb' //open item
import { BiMessageRoundedAdd, BiMessageRounded } from 'react-icons/bi' //empty updates, with updates
import { HiOutlineDotsHorizontal } from 'react-icons/hi' //More
import { MdDeleteOutline } from 'react-icons/md'//Delete
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'//Duplicate
import React from "react"

export const TaskPreview = ({ task, groupId, groupColor }) => {
    const dispatch = useDispatch()
    const params = useParams()

    const [register, setNewTask, newTask] = useFormRegister({
        title: task.title
    })

    const onRemoveTask = () => {
        const boardId = params.id
        dispatch(removeTask(boardId, groupId, task.id))
    }

    const onSaveTask = (event) => {
        event.preventDefault()
        task.title = newTask.title
        const boardId = params.id
        dispatch(updateTask(boardId, groupId, task))
    }

    const { persons, status, priority, deadline, lastUpdated } = task
    let date = new Date(1607110465663)
    return (
        <React.Fragment>

            <div className="board-preview flex">
                <div className="dropdown">
                    <div ><HiOutlineDotsHorizontal className="dot" /></div>
                    <div className="dropdown-content">
                        <a onClick={onRemoveTask}>< MdDeleteOutline /> Delete</a>
                        <a href="#"><HiOutlineDocumentDuplicate /> Duplicate</a>
                    </div>
                </div>
                <section className="preview-cell task-preview flex">


                    {/* Item area (color, checkbox, name) */}
                    <div className="task-name-area preview-cell flex">
                        <div className="task-group-color" style={{ backgroundColor: `var(${groupColor})` }}></div>
                        <div className="preview-checkbox"><input className="input-checkbox" type="checkbox" name="" id="" /></div>
                        <form className="" onSubmit={onSaveTask}>
                            {/* <RiArrowRightSLine /> */}
                            <input className="task-name clean-input" {...register('title', 'text')} />
                            <div className="flex"><TbArrowsDiagonal /> Open</div>
                        </form>
                        <div className="preview-update"><BiMessageRoundedAdd /></div>
                    </div>

                    {/* Persons / Responsbility */}
                    <div> {typeof persons === 'object' && <PersonCircle persons={persons} />}</div>

                    {/* Status */}
                    <StatusTypeDisplay label='status' value={`${status}`} />

                    {/* Priority */}
                    <StatusTypeDisplay label='priority' value={`${priority}`} />

                    {/* DeadLine */}
                    <LastUpdated lastUpdated={lastUpdated} />

                    {/* Due Date */}
                    <div>
                        {date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}
                    </div>

                    {/* <div onClick={onRemoveTask}> Delete</div> */}


                </section>
            </div>
        </React.Fragment>

    )
}