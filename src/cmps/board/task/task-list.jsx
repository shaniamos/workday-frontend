import { useDispatch, useSelector } from "react-redux"

import { useParams } from "react-router-dom"
import { TaskPreview } from "./task-preview.jsx"
import { useFormRegister } from '../../../hooks/useFormRegister.js'
import { addTask } from '../../../store/actions/board.action.js'
import React from "react"
import { utilService } from "../../../services/util.service.js"

export const TaskList = ({ tasks, groupId, groupColor }) => {
    const board = useSelector(state => state.boardModule.selectedBoard)
    const dispatch = useDispatch()
    const params = useParams()
    let [register, setTask, task] = useFormRegister({
        title: ''
    })

    const onAddTask = (event) => {
        event.preventDefault()
        const boardId = params.id
        task = createTask(task)
        dispatch(addTask(boardId, groupId, task))
        setTask({ title: '' })
    }

    const createTask = (task) => {
        task.id = utilService.makeId()
        task.status = ''
        task.priority = ''
        task.persons = ''
        task.deadLine = ''
        task.lastUpdate = Date.now()
        return task
    }

    return (
        <React.Fragment>
            {tasks.map(task => <TaskPreview key={task.id} task={task} groupId={groupId} groupColor={groupColor} />)}
            {/* NEW TASK */}
            <div className="preview-new-task sticky-feature">
                <div className="cell task-name-area flex">
                    <div className="task-group-color" style={{ backgroundColor: `var(${groupColor})` }}></div>
                    <div className="preview-checkbox"><input className="input-checkbox" type="checkbox" /></div>
                    <div className="editable-heading task-name-heading">
                        <form className="clean-input" onSubmit={onAddTask}>
                            <input {...register('title', 'text')} className="clean-input" placeholder="+ Add Item" />
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}