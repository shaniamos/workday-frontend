import { KanbanAddTask } from "./kanban-add-task"
import { KanbanHeader } from "./kanban-header"
import { KanbanPreview } from "./kanban-preview"


export const KanbanGroup = ({ group, boardId}) => {
    const { id, colorId, title, tasks } = group


    return <section className="kanban-group-container" style={{ border: `3px solid var(${colorId})` }} >
        <KanbanHeader colorId={colorId} title={title} group={group} />
        {tasks.map((task, idx) => {
            return (
                <KanbanPreview task={task} groupId={id} taskId={task.id} boardId={boardId}/>
            )

        })}
        <KanbanAddTask groupId={id} boardId={boardId} /> 
    </section>

}