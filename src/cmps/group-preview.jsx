import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { removeGroup } from "../store/actions/board.action.js"
import { TaskList } from "./task-list.jsx"
import { useFormRegister } from "../hooks/useFormRegister.js"
import { updateGroup } from "../store/actions/board.action.js"
import { GroupHeader } from "./group-header.jsx"
import { HiOutlineDotsHorizontal } from 'react-icons/hi' //More
import { MdDeleteOutline } from 'react-icons/md'//Delete
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'//Duplicate

// import { GroupFooter } from "./group-footer.jsx"
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
            <div className="dropdown">
                <div ><HiOutlineDotsHorizontal className="dots" /></div>
                <div className="dropdown-content">
                    <a onClick={() => onRemoveGroup()}>< MdDeleteOutline /> Delete Gruop</a>
                    <a><HiOutlineDocumentDuplicate /> Duplicate</a>
                </div>
            </div>
                <span className="collapse-group-button"><BsChevronDown /></span>
                <form onSubmit={onSaveTask}>
                    <input {...register('title', 'text')} className="group-name-input clean-input"/>
                </form>
                <span className="group-task-count">{`${group.tasks.length} items`}</span>
            </div>

            {/* Board identifier (color, checkbox, task name, persons, status, priority....) */}
            <GroupHeader groupColor={group.colorId} onRemoveGroup={onRemoveGroup} />

            {/* Task lines  */}
            <TaskList tasks={group.tasks} groupId={group.id} groupColor={group.colorId} />
            {/* <GroupFooter/> */}
        </section>
    )
}