import { useState } from "react";
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { updateTask } from "../../store/actions/board.action";
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiFillCaretUp } from 'react-icons/ai'


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

    const setStatus = (status) => {
        console.log('status', status);
        // const taskToUpdate = { ...task, status: status }
        // dispatch(updateTask(boardId, groupId, taskToUpdate))
    }

    const setPriority = (priority) => {
        console.log('priority', priority);
        // const taskToUpdate = { ...task, priority: priority }
        // dispatch(updateTask(boardId, groupId, taskToUpdate))
    }

    // const bgHoverStatus = () => {
    //     const setStatusColor = isStatusHover ? task.status.hover : task.status.color
    //     return setStatusColor
    //   }

    const getColor = (status) => {
        console.log('status', status);
    }

    
   console.log('task',task);
    return (
        <section className="trello-task-preview">
            <div className="trello-task-title">
                <span>{task.title}</span>
            </div>

            <div className="trello-task-data">
                <div className="trello-task-status">
                    <div className="trello-task-status-title">
                        {/* <GiHamburgerMenu /> */}
                    
                        <span>Status</span>
                    </div>
                    <div
                        onClick={() => {
                            setIsStatusModal(!isStatusModal)
                        }}
                        className="trello-status-label" >

                        {/* <span>{task.status}</span> */}
                        {isStatusModal && (
                            <div className="trello-status-modal">
                                <div>
                                    {/* <AiFillCaretUp /> */}
                                </div>
                                <div>
                                    {statuses.map((status) => (
                                        
                                        <div
                                            key={status.id}
                                            onClick={(ev) => setStatus(status)}
                                            style={{ background: status.color }}
                                            onMouseEnter={() => setIsStatusHover(false)}>
                                            {status.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="trello-task-priority">
                    <div className="trello-task-priority-title">
                        {/* <GiHamburgerMenu /> */}
                        <span>Priority</span>
                    </div>
                    <div
                        onClick={() => setIsPrioritysModal(!isPrioritysModal)}
                        className="trello-priority-label"
                        style={{ background: getColor(task.status) }}
                       
                    >
                        <span>{task.priority}</span>
                        {isPrioritysModal && (
                            <div className="trello-priority-modal">
                                <div>
                                    {/* <AiFillCaretUp /> */}
                                </div>
                                <div>
                                    {priority.map((priority) => (
                                        <div
                                            key={priority.id}
                                            onClick={() => setPriority(priority)}
                                            style={{ background: priority.color }}
                                            onMouseEnter={() => setIsPriorityHover(false)}>
                                            {priority.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}