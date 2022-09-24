import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useFormRegister } from "../../../hooks/useFormRegister.js"
import { addGroup, removeGroup, updateGroup } from "../../../store/actions/board.action.js"
import { TaskList } from "../task/task-list.jsx"
import { GroupHeader } from "./group-header.jsx"
// ICONS
import { HiOutlineDotsHorizontal } from 'react-icons/hi' //More
import { MdDeleteOutline } from 'react-icons/md'//Delete
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'//Duplicate
import { IoChevronDown } from 'react-icons/io5'
import { BiDotsHorizontalRounded } from "./group-header.jsx"
import { useState } from "react"
import { AreYouSureModal } from "../task/are-you-sure-modal.jsx"
import { utilService } from "../../../services/util.service.js"

export const GroupPreview = ({ group, sortGroup }) => {
    const params = useParams()
    const dispatch = useDispatch()
    const [isDeleteBtnClicked, setBtnClicked] = useState(false)
    const [register, setNewGroup, newGroup] = useFormRegister({
        title: group.title
    })

    const boardId = params.id

    const onRemoveGroup = () => {
        toggleNewBoardModal()
        dispatch(removeGroup(boardId, group.id))
    }

    const onUpdateGroup = (event) => {
        event.preventDefault()
        group.title = newGroup.title
        dispatch(updateGroup(boardId, group))
    }

    const toggleNewBoardModal = () => {
        setBtnClicked(!isDeleteBtnClicked)
    }

    const onDuplicateGroup = () => {
        const duplicateGroup = { ...group }
        delete duplicateGroup.id
        // if (duplicateGroup.tasks) {
        //     duplicateGroup.tasks.forEach(task => {
        //         task.id = utilService.makeId()
        //          task.lastUpdated = Date.now()
        //         if (duplicateGroup.task.comments) {
        //             duplicateGroup.task.comments.forEach(comment => comment.id = utilService.makeId())
        //         }
        //     })
        // }
        dispatch(addGroup(boardId, duplicateGroup))
    }

    return (
        <section className="group-preview ">
            {/* Group Title  */}
            <div className="group-header-name heading-component flex  sticky-feature">
                <div className="dropdown">
                    <div ><HiOutlineDotsHorizontal className="dots" /></div>
                    <div className="dropdown-content">
                        <a onClick={toggleNewBoardModal}>< MdDeleteOutline /> Delete Gruop</a>
                        <a onClick={onDuplicateGroup}><HiOutlineDocumentDuplicate /> Duplicate</a>
                    </div>
                </div>
                <div className="questModal">
                    {isDeleteBtnClicked && <AreYouSureModal toggleNewBoardModal={toggleNewBoardModal} onRemoveEntity={onRemoveGroup} />}
                </div>
                <div className="group-name flex sticky-feature">

                    <span className="collapse-group-button" style={{ color: `var(${group.colorId})` }}><IoChevronDown /></span>
                    <div className="group-title" >
                        <form onSubmit={onUpdateGroup}>
                            <input {...register('title', 'text')} className="group-name-input clean-input" style={{ color: `var(${group.colorId})` }} />
                        </form>
                    </div>
                    <span className="group-task-count">{`${group.tasks.length} items`}</span>
                </div>
            </div>
            {/* Group columns identifier (color, checkbox, task name, persons, status, priority....) */}
            <GroupHeader groupColor={group.colorId} sortGroup={sortGroup} />
            <TaskList tasks={group.tasks} groupId={group.id} groupColor={group.colorId} />
            {/* TODO <GroupFooter/> (Columns Summary) */}
        </section>
    )
}