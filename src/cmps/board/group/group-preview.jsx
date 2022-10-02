import { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useFormRegister } from "../../../hooks/useFormRegister.js"
import { addGroup, removeGroup, updateGroup } from "../../../store/actions/board.action.js"
import { TaskList } from "../task/task-list.jsx"
import { GroupHeader } from "./group-header.jsx"
import { AreYouSureModal } from "../task/are-you-sure-modal.jsx"
import { GroupFooter } from "./group-footer.jsx"
import { utilService } from "../../../services/util.service.js"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { GroupColors } from "../../group-color.jsx"

// ICONS
import { HiOutlineDotsHorizontal } from 'react-icons/hi' //More
import { MdDeleteOutline } from 'react-icons/md'//Delete
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'//Duplicate
import { IoChevronDown } from 'react-icons/io5'
import { TiArrowUnsorted } from 'react-icons/ti' //More

export const GroupPreview = ({ group, sortGroup, provided, snapchat, index }) => {
    const params = useParams()
    const dispatch = useDispatch()
    const [isDeleteBtnClicked, setBtnClicked] = useState(false)
    const [isColorMenuClicked, setColorClicked] = useState(false)
    const [register, setNewGroup, newGroup] = useFormRegister({
        title: group.title
    })

    const boardId = params.id

    const onSort = (sortOption) => {
        sortGroup(sortOption)
    }

    const isColorMenuOpen = () => {
        console.log('hey');
        setColorClicked(!isColorMenuClicked)
    }

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
        const newTasks = group.tasks.map(task => {
            task.id = utilService.makeId()
            task.lastUpdated = Date.now()
            if (task.comments)
                task.comments.forEach(comment => comment.id = utilService.makeId())
            else task.comments = []
            return task
        })
        duplicateGroup.tasks = [...newTasks]
        dispatch(addGroup(boardId, duplicateGroup, 'last'))
    }

    const onChangeColor = (newColor) => {
        let newGroup = { ...group, colorId: newColor }
        dispatch(updateGroup(boardId, newGroup))
    }

    return (
        <section className="group-preview "
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.droppableProps}
            {...provided.dragHandleProps}>

            {/* Group Title  */}
            <div className="group-header-container">
                <div className="group-header-name heading-component flex sticky-feature">
                    <div className="dropdown">
                        <div ><HiOutlineDotsHorizontal className="dots" /></div>
                        <div className="dropdown-content">
                            <a onClick={toggleNewBoardModal}>< MdDeleteOutline /> Delete gruop</a>
                            <a onClick={onDuplicateGroup}><HiOutlineDocumentDuplicate /> Duplicate</a>
                            <div className={`group-color-container`} onClick={isColorMenuOpen}  >
                                <div className={`color-icon`} style={{ backgroundColor: `var(${group.colorId})` }} ></div>
                                <a>Change group color</a>
                            </div>
                            {isColorMenuClicked && <GroupColors isColorMenuOpen={isColorMenuOpen} onChangeColor={onChangeColor} />}

                        </div>
                    </div>
                    <div className="questModal">
                        {isDeleteBtnClicked &&
                            <AreYouSureModal
                                toggleNewBoardModal={toggleNewBoardModal}
                                onRemoveEntity={onRemoveGroup}
                            />}
                    </div>
                    <div className="group-name flex sticky-feature">
                        <span className="collapse-group-button"
                            style={{ color: `var(${group.colorId})` }}>
                            <IoChevronDown />
                        </span>
                        <div className="group-title" >
                            <form onSubmit={onUpdateGroup}>
                                <input {...register('title', 'text')} className="group-name-input clean-input" style={{ color: `var(${group.colorId})` }} />
                            </form>
                        </div>
                        <span className="group-task-count">{`${group.tasks.length} items`}</span>
                    </div>
                </div>
                <div className="sort-btns">
                    <button className='sort-btn name' onClick={() => onSort('itemTitle')}><TiArrowUnsorted /></button>
                    <button className='sort-btn person' onClick={() => onSort('personName')}><TiArrowUnsorted /></button>
                    <button className='sort-btn status' onClick={() => onSort('status')}><TiArrowUnsorted /></button>
                    <button className='sort-btn priority' onClick={() => onSort('priority')} ><TiArrowUnsorted /></button>
                    <button className='sort-btn last-update' onClick={() => onSort('lastUpdated')}><TiArrowUnsorted /></button>
                    <button className='sort-btn timeline' ><TiArrowUnsorted /></button>
                </div>
                <GroupHeader
                    groupColor={group.colorId}
                    sortGroup={sortGroup}
                />
            </div>
            {/* <Draggable  key={group.id} >
                {(provided, snapchat) => {
                    return ( */}
            <TaskList
                index={index}
                snapchat={snapchat}
                tasks={group.tasks}
                group={group}
                groupColor={group.colorId}
                provided={provided}
            />

            {/* ) */}
            {/* }} */}
            {/* </Draggable> */}
            {provided.placeholder}

            <GroupFooter
                tasks={group.tasks} />
        </section>
    )
}