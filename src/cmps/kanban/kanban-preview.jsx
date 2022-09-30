import { useState } from "react";
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { updateTask } from "../../store/actions/board.action";
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiFillCaretUp } from 'react-icons/ai'
import { FaRegUserCircle } from 'react-icons/fa'
import { AvatarsChain } from "../avatarsChain";


export const KanbanPreview = ({ provided, task, taskId, groupId, boardId }) => {
    const currBoard = useSelector(state => state.boardModule.selectedBoard)

    const boardOptions = currBoard.labels.map(label => label)
    const statuses = boardOptions[0].options.map(option => option)
    const priority = boardOptions[1].options.map(option => option)

    const dispatch = useDispatch()
    const [isStatusModal, setIsStatusModal] = useState(false)
    const [isPrioritysModal, setIsPrioritysModal] = useState(false)
    const [isPersonsModal, setIsPersonsModal] = useState(false)

    const setStatus = (status) => {
        const taskToUpdate = { ...task, status: status }
        dispatch(updateTask(boardId, groupId, taskToUpdate))
    }

    const setPriority = (priority) => {
        const taskToUpdate = { ...task, priority: priority }
        dispatch(updateTask(boardId, groupId, taskToUpdate))
    }

    const getStatusColor = (status) => {

        switch (status) {
            case 'On Hold':
                return "#ff5ac4"
            case 'Done':
                return "#00c875"
            case 'Working on it':
                return "#fdab3d"
            case 'Stuck':
                return "#e2445c"
            default:
                return "lightgrey"

        }

    }
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Critical':
                return "#d83a52"
            case 'High':
                return "#fdab3d"
            case 'Medium':
                return "#579bfc"
            case 'Low':
                return "#00c875"
            default:
                return "lightgrey"

        }
    }

    const { persons } = task
    return (
        <section className="kanban-task-preview"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            <div className="kanban-task-title">
                <span>{task.title}</span>
            </div>
            <div className="kanban-task-data">
                <div className="kanban-task-status">
                    <div className="kanban-task-status-title">
                        <GiHamburgerMenu className="kanban-icons" />

                        <span>Status</span>
                    </div>
                    <div
                        onClick={() => {
                            setIsStatusModal(!isStatusModal)

                        }}
                        className="kanban-status-label" style={{ background: getStatusColor(task.status) }}>

                        <span>{task.status}</span>
                        {isStatusModal && (
                            <div className="kanban-status-modal">
                                <div>
                                    <AiFillCaretUp />
                                </div>
                                <div>
                                    {statuses.map((status) => (

                                        <div

                                            key={status.id}
                                            onClick={(ev) => setStatus(status.title)}
                                            style={{ background: status.color }}>
                                            {status.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="kanban-task-priority">
                    <div className="kanban-task-priority-title">
                        <GiHamburgerMenu className="kanban-icons" />
                        <span>Priority</span>
                    </div>
                    <div
                        onClick={() => setIsPrioritysModal(!isPrioritysModal)}
                        className="kanban-priority-label"
                        style={{ background: getPriorityColor(task.priority) }}>
                        <span>{task.priority}</span>
                        {isPrioritysModal && (
                            <div className="kanban-priority-modal">
                                <div>
                                    <AiFillCaretUp />
                                </div>
                                <div>
                                    {priority.map((priority) => (
                                        <div
                                            key={priority.id}
                                            onClick={() => setPriority(priority.title)}
                                            style={{ background: priority.color }}>

                                            {priority.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="kanban-task-persons flex ">
                    <div className="person-container">
                        <FaRegUserCircle className="kanban-icons person" />
                        <span className="person-title">Persons</span>
                    </div>
                    <div
                        onClick={() => setIsPersonsModal(!isPersonsModal)} className="kanban-priority-label">{(
                            <AvatarsChain task={task} groupId={groupId} assigneeMembers={persons} />)}
                    </div>
                </div>
            </div>
        </section>
    )
}