import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { KanbanAddTask } from "./kanban-add-task"
import { KanbanHeader } from "./kanban-header"
import { KanbanPreview } from "./kanban-preview"


export const KanbanGroup = ({ group, boardId, provided, snapchat }) => {
    const { id, colorId, title, tasks } = group


    return (
        <div
            className="kanban-group-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ border: `3px solid var(${colorId})` }}
        >

            <KanbanHeader colorId={colorId} title={title} group={group} />
            {tasks.map((task, idx) => {
                return (
                    <Draggable key={task.id} draggableId={task.id} index={idx}>
                        {(provided, snapchat) => {
                            return (
                                <KanbanPreview
                                    snapchat={snapchat}
                                    provided={provided}
                                    task={task}
                                    groupId={id}
                                    taskId={task.id}
                                    boardId={boardId}
                                />
                            )
                        }}
                    </Draggable>
                )
            })}
            {provided.placeholder}
            <KanbanAddTask groupId={id} boardId={boardId} />
        </div>
    )
}