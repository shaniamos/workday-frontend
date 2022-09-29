import { KanbanHeader } from "./kanban-header"
import { KanbanPreview } from "./kanban-preview"


export const KanbanGroup = ({ group, boardId}) => {
    const { id, colorId, title, tasks } = group


    return <section className="kanban-group-container" style={{ border: `4px solid var(${colorId})` }} >
        <KanbanHeader colorId={colorId} title={title} group={group} />
        {tasks.map((task, idx) => {
            return (
                <KanbanPreview task={task} groupId={id} taskId={task.id} boardId={boardId}/>
            )

        })}
    </section>

}