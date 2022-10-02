import React from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { TaskPreview } from "./task-preview.jsx"
import { useFormRegister } from '../../../hooks/useFormRegister.js'
import { addTask } from '../../../store/actions/board.action.js'
import { utilService } from "../../../services/util.service.js"
import { Draggable } from 'react-beautiful-dnd'

export const TaskList = ({ tasks, group, groupColor, provided, snapchat }) => {
    const dispatch = useDispatch()
    const params = useParams()
    let [register, setTask, task] = useFormRegister({
        title: ''
    })

    const onAddTask = (event) => {
        event.preventDefault()
        const boardId = params.id
        task = createTask(task)
        dispatch(addTask(boardId, group.id, task))
        setTask({ title: '' })
    }

    const createTask = (task) => {
        task.id = utilService.makeId()
        task.status = ''
        task.priority = ''
        task.persons = []
        task.deadLine = ''
        task.lastUpdate = ''
        task.comments = []
        task.timeline = [Date.now(), Date.now()]
        return task
    }

    return (
        <section className="task-list"
        {...provided.droppableProps}
            ref={provided.innerRef}>
            {tasks.map((task, idx) => {
                return (
                    <section {...provided.droppableProps} ref={provided.innerRef} key={task.id}>
                        <Draggable draggableId={task.id} index={idx} key={task.id}>
                            {(provided) => {
                                return (
                                    <TaskPreview
                                        snapchat={snapchat}
                                        provided={provided}
                                        task={task}
                                        groupId={group.id}
                                        groupColor={groupColor} />
                                )
                            }}
                        </Draggable>           
                    </section>
                )
            }
            )}
            {provided.placeholder}
            {/* NEW TASK */}
            
                <div className="preview-new-task">

                    <div className="cell task-name-area flex">
                        <div className="task-group-color" style={{ backgroundColor: `var(${groupColor})`, borderBlock: `0.5px solid var(${groupColor})` }}></div>
                        <div className="preview-checkbox"><input className="input-checkbox" type="checkbox" /></div>
                        <div className="editable-heading task-name-heading">
                            <form className="clean-input" onSubmit={onAddTask}>
                                <input {...register('title', 'text')} className="clean-input" placeholder="+ Add Item" />
                            </form>
                        </div>
                    </div>
                   
                </div>
        </section>
    )
}