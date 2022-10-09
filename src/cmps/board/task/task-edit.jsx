import { TaskComment } from "./task-comment.jsx";
import { TaskActivity } from "./task-activity.jsx";
import { useFormRegister } from "../../../hooks/useFormRegister.js";
import { useState } from "react";
import { addComment, removeComment, updateTask } from "../../../store/actions/board.action.js";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GoX } from 'react-icons/go';//delete or exit
import { useEffect } from "react";
import { useSelector } from "react-redux";


export const TaskEdit = () => {
    const board = useSelector(state => state.boardModule.selectedBoard)

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [toggle, setNewBoardModalOpen] = useState(false)
    const [task, setTask] = useState({ title: '', comments: [] })
    const [register, setNewTask, newTask] = useFormRegister({
        title: task.title
    })

    const boardId = params.id
    const groupId = params.groupId
    const taskId = params.taskId

    useEffect(() => {
        loadTask()
    }, [taskId, board])

    function loadTask() {
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const task = board.groups[groupIdx].tasks.find(task => task.id === taskId)
        setTask(task)
        setNewTask({ title: task.title })
    }

    const togglePage = (isTrue) => {
        setNewBoardModalOpen(isTrue)
    }

    const onUpdateTask = async (event) => {
        event.preventDefault()
        dispatch(updateTask(boardId, groupId, { ...task, title: newTask.title, lastUpdated: Date.now() }))
    }

    const onCloseModal = () => {
        navigate(`/board/${params.id}`)
    }

    const onRemoveComment = async (commentIdx) => {
        dispatch(removeComment(boardId, groupId, task.id, commentIdx))
    }

    const onAddComment = async (newComment) => {
        dispatch(addComment(boardId, groupId, task.id, newComment))
    }

    return (
        <section className="task-edit-container open">
            <div className="main-screen" onClick={onCloseModal}></div>
            <section className="task-edit">
                <Link to={`/board/${params.id}`}><GoX className="task-exit-btn" /></Link>
                <form className="editable-heading" onSubmit={onUpdateTask}>
                    <input className="clean-input" {...register('title', 'text')} />
                </form>
                <div className="navigate-btns ">
                    {/* buttons navigation */}
                    <div className="task-edit-tool-bar flex align-center">
                        <a className={`comments-btn btn ${!toggle && "is-selected"}`}
                            onClick={(ev) => {
                                ev.preventDefault()
                                togglePage(false)
                            }}
                        >Updates
                        </a>
                        <a className={`activity-btn btn ${toggle && "is-selected"}`}
                            onClick={(ev) => {
                                ev.preventDefault()
                                togglePage(true)
                            }}
                        >Activity
                        </a>
                    </div>
                </div>
                {task && toggle ? <TaskActivity task={task} /> : <TaskComment task={task} onRemoveComment={onRemoveComment} onAddComment={onAddComment} />}
            </section>
        </section>
    )
}