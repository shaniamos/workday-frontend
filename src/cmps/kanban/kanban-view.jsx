// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { KanbanGroup } from './kanban-group';

export const KanbanView = ({ boardId, groups }) => {
    console.log('groups from kanbannnn  ', groups);
    // if(!groups) return <div>No Groups</div>
    return <section className="kanban-content">
        {groups.map(group => {
            return ( 
                <KanbanGroup group={group} key={group.id} boardId={boardId}  />
           )
        })}
                
    </section>

}