import { TaskComment } from "./task-comment.jsx";
import { TaskActivity } from "./task-activity.jsx";
import { useFormRegister } from "../../../hooks/useFormRegister.js";
import { useEffectUpdate } from "../../../hooks/useEffectUpdate.js";
import { useState } from "react";
import { addComment, removeComment, updateTask } from "../../../store/actions/board.action.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GoX } from 'react-icons/go';//delete or exit


export function TaskEdit() {
    const [toggle, setNewBoardModalOpen] = useState(false)
    const board = useSelector(state => state.boardModule.selectedBoard)
    const boards = useSelector(state => state.boardModule.boards)
    const params = useParams()
    const dispatch = useDispatch()
    const [task, setTask] = useState({ title: '' })
    const [register, setNewTask, newTask] = useFormRegister({
        title: task.title
    })
    const boardId = params.id
    const groupId = params.groupId
    const taskId = params.taskId

    const navigate = useNavigate()

    useEffect(() => {
        loadTask()
    }, [params.taskId, board])

    useEffectUpdate(() =>
        dispatch(updateTask(boardId, groupId, task)), [task])



    const loadTask = async () => {
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const task = board.groups[groupIdx].tasks.find(task => task.id === taskId)
        setTask(task)
        setNewTask({ title: task.title })
    }

    const togglePage = (isTrue) => {
        setNewBoardModalOpen(isTrue)
    }


    const onUpdateTask = (event) => {
        event.preventDefault()
        setTask(prevTask => {
            return { ...prevTask, title: newTask.title, lastUpdated: Date.now() }
        })
    }

    const onCloseModal = () => {
        navigate(`/board/${params.id}`)
    }

    const onRemoveComment = async (commentIdx) => {
        dispatch(removeComment(boardId, groupId, task.id, commentIdx))
    }

    const onAddComment = async (newComment) => {
        // console.log('newComment', newComment);
        // console.log('boardId', boardId);
        // console.log('groupId', groupId);
        // console.log('task.id', task.id);
        dispatch(addComment(boardId, groupId, task.id, newComment))
    }

    return (
        <section className="task-edit-container open">
            <div className="main-screen" onClick={onCloseModal}></div>
            <section className="task-edit">
                 <Link to={`/board/${params.id}`}><GoX /></Link>
                <form className="editable-heading" onSubmit={onUpdateTask}>
                    <input className="clean-input" {...register('title', 'text')} />
                </form>
                <div className="navigate-btns ">
                    {/* buttons navigation */}
                    <div className="task-edit-tool-bar flex align-center">
                        <a className={`updates-btn btn ${!toggle && "is-selected"}`}
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
                    {/* <Link to={`/board/${params.id}`} className="close-modal">X</Link> */}
                </div>


                {toggle ? <TaskActivity task={task} /> : <TaskComment task={task} onRemoveComment={onRemoveComment} onAddComment={onAddComment} />}


            </section>
        </section>
    )
}

// {labels && labels.map(label => {
//     const labelName = label.name
//     const labelValue = task[labelName]
//     return <StatusTypeDisplay key={label.name} label={`${label.name}`} value={labelValue} options={label.options} />
// })}