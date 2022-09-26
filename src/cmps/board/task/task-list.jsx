import React from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { TaskPreview } from "./task-preview.jsx"
import { useFormRegister } from '../../../hooks/useFormRegister.js'
import { addTask } from '../../../store/actions/board.action.js'
import { utilService } from "../../../services/util.service.js"

export const TaskList = ({ tasks, groupId, groupColor }) => {
    const dispatch = useDispatch()
    const params = useParams()
    let [register, setTask, task] = useFormRegister({
        title: ''
    })

    const onAddTask = (event) => {
        event.preventDefault()
        const boardId = params.id
        task = createTask(task)
        dispatch(addTask(boardId, groupId, task))
        setTask({ title: '' })
    }

    const createTask = (task) => {
        task.id = utilService.makeId()
        task.status = ''
        task.priority = ''
        task.persons = ''
        task.deadLine = ''
        task.lastUpdate = ''
        task.timeline = [Date.now(), Date.now()]
        return task
    }

    return (
        // <DragDropContext>

        //     <Droppable droppableId='group'>
        //         {(provided) => {
        //             <div  {...provided.droppableProps} ref={provided.innerRef} className="task-list">
        <div className="task-list">
            {tasks.map((task, idx) => {
                // <Draggable draggableId={task.id} index={idx}>
                //     {(provided) => {
                // return <TaskPreview provided={provided} key={task.id} task={task} groupId={groupId} groupColor={groupColor} />
                return <TaskPreview key={task.id} task={task} groupId={groupId} groupColor={groupColor} />
                //     }}
                // </Draggable>
            })}
        </div>
        //         }}
        //     </Droppable>
        // </DragDropContext >
    )
}