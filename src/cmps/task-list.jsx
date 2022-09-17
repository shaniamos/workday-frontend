import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { TaskPreview } from "./task-preview.jsx"
import { useFormRegister } from '../hooks/useFormRegister.js'
import { addTask } from '../store/actions/board.action.js'
import React from "react"

export const TaskList = ({ tasks, groupId, groupColor }) => {

    const dispatch = useDispatch()
    const params = useParams()
    const [register, setTask, task] = useFormRegister({
        title: ''
    })

    const onSaveTask = (event) => {
        console.log('hi task')
        event.preventDefault()
        const boardId = params.id
        dispatch(addTask(boardId, groupId, task))
        setTask({ title: '' })
    }

    return (
        <React.Fragment>
            {tasks.map(task => <TaskPreview key={task.id} task={task} groupId={groupId} groupColor={groupColor} />)}

            <div className="task-name-area flex ">
                <div className="task-group-color" style={{ backgroundColor: `var(${groupColor})` }}></div>
                <div className="preview-checkbox"><input className="input-checkbox" type="checkbox" name="" id="" /></div>

                <form onSubmit={onSaveTask}>
                    <input {...register('title', 'text')} className="clean-input" placeholder="+ Add Item" />
                </form>
            </div>
        </React.Fragment>

    )
}