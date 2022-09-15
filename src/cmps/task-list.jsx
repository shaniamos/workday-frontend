import { TaskPreview } from "./task-preview.jsx"

export const TaskList = ({ tasks }) => {
    return (
        <section className="task-list">
                {tasks.map(task => {
                    return <TaskPreview key={task._id} task={task} />
                })}
        </section>
    )
}