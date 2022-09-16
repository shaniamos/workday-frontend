import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { TaskPreview } from "./task-preview.jsx"
import { useFormRegister } from '../hooks/useFormRegister.js'
import { addTask } from '../store/actions/board.action.js'

export const TaskList = ({ tasks, groupId }) => {

    const dispatch = useDispatch()
    const params = useParams()
    const [register, setTask, task] = useFormRegister({
        title: ''
    })

    const onSaveTask = (event) => {
        event.preventDefault()
        const boardId = params.id
        dispatch(addTask(boardId, groupId, task))
        setTask({ title: '' })
    }

    return (
        <section className="task-list">
            {tasks.map(task => {
                return <TaskPreview key={task.id} task={task} groupId={groupId} />
            })}
            <form onSubmit={onSaveTask}>
                <input className="clean-input" {...register('title', 'text')} placeholder="+ Add Item" />
            </form>
        </section>
    )
}