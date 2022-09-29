// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { KanbanGroup } from './kanban-group';

export const KanbanView = ({ boardId, groups, onAddTask }) => {
    return <section className="kanban-content">
        {groups.map(group => {
            return ( 
                <KanbanGroup group={group} key={group.id} boardId={boardId} onAddTask={onAddTask}  />
                )
            })}
                  
    </section>

}