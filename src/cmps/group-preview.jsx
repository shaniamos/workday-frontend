import { TaskList } from "./task-list.jsx"

export const GroupPreview = ({ group }) => {
    return (
        <section className="group-preview">
            <h1>{group.title}</h1>
            <div>
                <TaskList tasks={group.tasks} groupId={group.id} />
            </div>
        </section>
    )
}