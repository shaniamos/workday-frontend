import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { removeGroup } from "../store/actions/board.action.js"
import { TaskList } from "./task-list.jsx"

export const GroupPreview = ({ group }) => {
    const params = useParams()
    const dispatch = useDispatch()

    const onRemoveGroup = () => {
        const boardId = params.id
        dispatch(removeGroup(boardId, group.id))
    }

    return (
        <section className="group-preview">
            <button onClick={onRemoveGroup}>Delete Group</button>
            <h1>{group.title}</h1>
            <div>
                <TaskList tasks={group.tasks} groupId={group.id} />
            </div>
        </section>
    )
}