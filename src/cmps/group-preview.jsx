import { TaskList } from "./task-list.jsx"

export const GroupPreview = ({ group }) => {
    return (
        <section className="group-preview">
            <table>
                <thead>{group.title}</thead>
                <tbody>
                    <TaskList tasks={group.tasks} />
                </tbody>
            </table>
        </section>
    )
}