import React from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { removeTask } from "../store/actions/board.action"

export const TaskPreview = ({ task, groupId }) => {
    const dispatch = useDispatch()
    const params = useParams()

    const onRemoveTask = () => {
        const boardId = params.id
        dispatch(removeTask(boardId, groupId, task.id))
    }

    const { title, persons, status, priority, deadLine, lastUpdate } = task
    return (
        <section className="task-preview flex">
            <p>{title}</p>
            {/* <p>{persons}</p> */}
            <p>{status}</p>
            <p>{priority}</p>
            <p>{deadLine}</p>
            <p>{lastUpdate}</p>
            <div onClick={onRemoveTask}>Delete Task</div>
        </section>
    )
}