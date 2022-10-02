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
import { useState } from "react"
import { AreYouSureModal } from "../task/are-you-sure-modal.jsx"
import { GroupFooter } from "./group-footer.jsx"
import { utilService } from "../../../services/util.service.js"
import { Draggable, Droppable } from "react-beautiful-dnd"

export const GroupPreview = ({ group, sortGroup, provided, snapchat, index }) => {
    const params = useParams()
    const dispatch = useDispatch()
    const [isDeleteBtnClicked, setBtnClicked] = useState(false)
    const [isColorMenuClicked, setColorClicked] = useState(false)
    const [register, setNewGroup, newGroup] = useFormRegister({
        title: group.title
    })

    const boardId = params.id

    const isColorMenuOpen = () => {
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
            return task
        })
        duplicateGroup.tasks = [...newTasks]
        dispatch(addGroup(boardId, duplicateGroup, 'last'))
    }

    const onChangeColor = (newColor) => {
        let newGroup = {...group, colorId: newColor}
        dispatch(updateGroup(boardId, newGroup))
    }

    return (
        <section className="group-preview "
            ref={provided.innerRef}
            {...provided.draggableProps}
        // {...provided.dragHandleProps}
        >

            {/* Group Title  */}
            <div className="group-header-name heading-component flex  sticky-feature">
                <div className="dropdown">
                    <div ><HiOutlineDotsHorizontal className="dots" /></div>
                    <div className="dropdown-content">
                        <a onClick={toggleNewBoardModal}>< MdDeleteOutline /> Delete gruop</a>
                        <a onClick={onDuplicateGroup}><HiOutlineDocumentDuplicate /> Duplicate</a>
                        <div className={`group-color-container`} onClick={isColorMenuOpen}  >
                            <div className={`color-icon`} style={{ backgroundColor: `var(${group.colorId})` }} ></div>
                            <a > Change group color</a>
                        </div>
                        {isColorMenuClicked &&
                            <section className='color-menu' onClick={(ev) => { 
                                ev.stopPropagation()
                                isColorMenuOpen()
                            }}>
                                <i className='color1' onClick={() => onChangeColor('--color-pdf-red')}></i>
                                <i className='color2' onClick={() => onChangeColor('--color-like_red')}></i>
                                <i className='color3' onClick={() => onChangeColor('--color-excel-green')}></i>
                                <i className='color4' onClick={() => onChangeColor('--color-word-blue')}></i>
                                <i className='color5' onClick={() => onChangeColor('--color-zip-orange')}></i>
                                <i className='color6' onClick={() => onChangeColor('--color-brand-iris')}></i>
                                <i className='color7' onClick={() => onChangeColor('--color-brand-gold')}></i>
                                <i className='color8' onClick={() => onChangeColor('--color-board_views_blue')}></i>
                                <i className='color9' onClick={() => onChangeColor('--color-jade')}></i>
                                <i className='color10' onClick={() => onChangeColor('--color-trolley-grey')}></i>
                                <i className='color11' onClick={() => onChangeColor('--color-pecan-hover')}></i>
                                <i className='color12' onClick={() => onChangeColor('--color-lavender-hover')}></i>
                                <i className='color13' onClick={() => onChangeColor('--color-royal-hover')}></i>
                                <i className='color14' onClick={() => onChangeColor('--color-tan')}></i>
                                <i className='color15' onClick={() => onChangeColor('--color-orchid')}></i>             
                            </section>}
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
            <GroupHeader
                groupColor={group.colorId}
                sortGroup={sortGroup}
            />
            <Draggable key={group.id}>
                {(provided, snapchat) => {
                    return (
                        <div {...provided.droppableProps} key={group.id}>
                            <TaskList
                                snapchat={snapchat}
                                tasks={group.tasks}
                                group={group}
                                groupColor={group.colorId}
                                provided={provided}
                            />
                        </div>
                    )
                }}
            </Draggable>

            <GroupFooter
                tasks={group.tasks} />
        </section>
    )
}