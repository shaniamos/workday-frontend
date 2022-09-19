import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffectUpdate } from "../../../hooks/useEffectUpdate.js";
import { useFormRegister } from "../../../hooks/useFormRegister.js";
import { boardService } from "../../../services/board.service.local.js";
import { updateTask } from "../../../store/actions/board.action.js";

export function TaskEdit() {

    const params = useParams()
    const dispatch = useDispatch()
    const [task, setTask] = useState({ title: '' })
    const [register, setNewTask, newTask] = useFormRegister({
        title: task.title
    })
    const boardId = params.id
    const groupId = params.groupId
    const navigate = useNavigate()

    useEffect(() => {
        loadTask()
    }, [params.taskId])

    useEffectUpdate(() => dispatch(updateTask(boardId, groupId, task)), [task])

    const loadTask = async () => {
        const task = await boardService.getTaskById(boardId, groupId, params.taskId)
        setTask(task)
        setNewTask({ title: task.title })
    }

    const onUpdateTask = (event) => {
        event.preventDefault()
        setTask(prevTask => {
            return { ...prevTask, title: newTask.title }
        })
    }

    const onCloseModal = () => {
        navigate(`/board/${params.id}`)
    }

    return (
        <section className="container open">
            <div className="main-screen" onClick={onCloseModal}></div>
            <section className={`task-edit`}>
                <form className="editable-heading" onSubmit={onUpdateTask}>
                    <input className="clean-input" {...register('title', 'text')} />
                </form>
                <div className="task-edit-tool-bar flex align-center">
                    <button className="view-nav-btn"><span>Updates</span></button>|
                    <button className="view-nav-btn"><span>Files</span></button>|
                    <button className="view-nav-btn"><span>Activity Log</span></button>|
                </div>
                <Link to={`/board/${params.id}`} className="close-modal">X</Link>
            </section>
        </section>
    )
}