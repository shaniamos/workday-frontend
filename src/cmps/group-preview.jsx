import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { removeGroup } from "../store/actions/board.action.js"
import { TaskList } from "./task-list.jsx"
import { useFormRegister } from "../hooks/useFormRegister.js"
import { updateGroup } from "../store/actions/board.action.js"

export const GroupPreview = ({ group }) => {
    const params = useParams()
    const dispatch = useDispatch()

    const [register, setNewGroup, newGroup] = useFormRegister({
        title: group.title
    })

    const onRemoveGroup = () => {
        const boardId = params.id
        dispatch(removeGroup(boardId, group.id))
    }

    const onSaveTask = (event) => {
        event.preventDefault()
        group.title = newGroup.title
        const boardId = params.id
        dispatch(updateGroup(boardId, group))
    }

    return (
        <section className="group-preview">
            <button onClick={onRemoveGroup}>Delete Group</button>
            <form onSubmit={onSaveTask}>
                <input className="clean-input" {...register('title', 'text')} />
            </form>
            <div>
                <TaskList tasks={group.tasks} groupId={group.id} />
            </div>
        </section>
    )
}