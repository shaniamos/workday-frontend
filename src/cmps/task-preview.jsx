import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useFormRegister } from "../hooks/useFormRegister.js"
import { removeTask } from "../store/actions/board.action.js"
import { updateTask } from "../store/actions/board.action.js"

export const TaskPreview = ({ task, groupId }) => {
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

    const { persons, status, priority, deadLine, lastUpdate } = task
    return (
        <section className="task-preview flex">
            <form onSubmit={onSaveTask}>
                <input className="clean-input" {...register('title', 'text')} />
            </form>
            {/* <p>{persons}</p> */}
            <p>{status}</p>
            <p>{priority}</p>
            <p>{deadLine}</p>
            <p>{lastUpdate}</p>
            <div onClick={onRemoveTask}>Delete Item</div>
        </section>
    )
}