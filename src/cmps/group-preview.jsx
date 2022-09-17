import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { removeGroup } from "../store/actions/board.action.js"
import { TaskList } from "./task-list.jsx"
import { useFormRegister } from "../hooks/useFormRegister.js"
import { updateGroup } from "../store/actions/board.action.js"
import { GroupHeader } from "./group-header.jsx"
import { BiDotsHorizontalRounded } from "./group-header.jsx"

import { BsChevronDown } from 'react-icons/bs'


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
        console.log('hi')
        event.preventDefault()
        group.title = newGroup.title
        const boardId = params.id
        dispatch(updateGroup(boardId, group))
    }
    return (
        <section className="group-preview">
            {/* <button onClick={onRemoveGroup}>Delete Group</button> */}

            {/* Board Name  */}
            <div className="group-header-name flex">
                <span className="collapse-group-button"><BsChevronDown /></span>
                <form onSubmit={onSaveTask}>
                    <input {...register('title', 'text')} className="group-name-input clean-input"/>
                </form>
                <span className="group-task-count">{`${group.tasks.length} items`}</span>
            </div>

            {/* Board identifier (color, checkbox, task name, persons, status, priority....) */}
            <GroupHeader groupColor={group.colorId} />

            {/* Task lines  */}
            <TaskList tasks={group.tasks} groupId={group.id} groupColor={group.colorId} />

        </section>
    )
}