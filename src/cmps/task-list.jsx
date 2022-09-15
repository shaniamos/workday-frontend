import React from "react"
import { TaskPreview } from "./task-preview.jsx"

export const TaskList = ({ tasks, groupId }) => {

    return (
        <section className="task-list">
            {tasks.map(task => {
                return <TaskPreview key={task.id} task={task} groupId={groupId} />
            })}
            <div>+ Add Item</div>
        </section>
    )
}