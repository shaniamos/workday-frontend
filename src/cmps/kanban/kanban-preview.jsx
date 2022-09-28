import { useState } from "react";
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { updateTask } from "../../store/actions/board.action";
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiFillCaretUp } from 'react-icons/ai'
import { FaRegUserCircle } from 'react-icons/fa'
import { AvatarsChain } from "../avatarsChain";


export const KanbanPreview = ({ task, taskId, groupId, boardId }) => {
    const currBoard = useSelector(state => state.boardModule.selectedBoard)
    const prio = currBoard.labels.map(label => label)
    const statuses = prio[0].options.map(option => option)
    // const statuses = prio[0].options.map(option => console.log('asdsd',option))
    const priority = prio[1].options.map(option => option)
    // console.log('statuses', statuses);

    const dispatch = useDispatch()

    const [isStatusModal, setIsStatusModal] = useState(false)
    const [isStatusHover, setIsStatusHover] = useState(false)
    const [isPriorityHover, setIsPriorityHover] = useState(false)
    const [isPrioritysModal, setIsPrioritysModal] = useState(false)
    const [isPersonsModal, setIsPersonsModal] = useState(false)

    const setStatus = (status) => {
        console.log('status', status);
        // const taskToUpdate = { ...task, status: status }
        // dispatch(updateTask(boardId, groupId, taskToUpdate))
    }

    const setPriority = (priority) => {
        console.log('priority', priority);
        const taskToUpdate = { ...task, priority: priority }
        dispatch(updateTask(boardId, groupId, taskToUpdate))
    }

    // const bgHoverStatus = () => {
    //     const setStatusColor = isStatusHover ? task.status.hover : task.status.color
    //     return setStatusColor
    //   }

    const getStatusColor = (status) => {
        if (status === 'On Hold') return "#ff5ac4"
        else if (status === 'Done') return "#00c875"
        else if (status === 'Working on it') return "#fdab3d"
        else if (status === 'Stuck') return "#e2445c"
    }
    const getPriorityColor = (priority) => {
        if (priority === 'Critical') return "#d83a52"
        else if (priority === "High") return "#fdab3d"
        else if (priority === "Medium") return "#579bfc"
        else if (priority === "Low") return "#00c875"
    }

    const { persons, lastUpdated, deadline } = task
    // console.log('color prio', priority.color);
    return (
        <section className="kanban-task-preview">
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
                                            onClick={(ev) => setStatus(status)}
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
                                            onClick={() => setPriority(priority)}
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
                    <div className="">
                        <FaRegUserCircle className="kanban-icons person" />
                        <span className="person-title">Persons</span>
                    </div>
                    <div
                        onClick={() => setIsPersonsModal(!isPersonsModal)}
                        className="kanban-priority-label"

                    >

                        {(
                            <div className="">
                                <AvatarsChain task={task} groupId={groupId} assigneeMembers={persons} />

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}