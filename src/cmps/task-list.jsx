import React, { useRef } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { TaskPreview } from "./task-preview.jsx"
import { useFormRegister } from '../hooks/useFormRegister.js'
import { addTask } from '../store/actions/board.action.js'

export const TaskList = ({ tasks, groupId }) => {

    const inputRef = useRef()
    const dispatch = useDispatch()
    const params = useParams()
    const [register, setTask, task] = useFormRegister({
        title: ''
    })

    const onSaveTask = (event) => {
        event.preventDefault()
        console.log(task)
        const boardId = params.id
        // inputRef.current = ''
        dispatch(addTask(boardId, groupId, task))
    }

    return (
        <section className="task-list">
            {tasks.map(task => {
                return <TaskPreview key={task.id} task={task} groupId={groupId} />
            })}
            <form onSubmit={onSaveTask}>
                <input ref={inputRef} {...register('title', 'text')} placeholder="+ Add Item" />
            </form>
        </section>
    )
}