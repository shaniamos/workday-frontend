import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { KanbanGroup } from './kanban-group';

export const KanbanView = ({ board, groups }) => {
    return <section className='kanban-container'>
        {/* <DragDropContext> */}
            {/* <Droppable droppableId="groups"> */}
                {/* {(provided) => ( */}
                {/* {...provided.droppableProps} ref={provided.innerRef} */}
                     <div className="kanban-view flex" >
                        {groups.map((group, idx) => {
                            return (
                                // <Draggable key={group.id} draggableId={group.id} groupIndex={idx}>
                                    // {(provided) => (
                                        // <div {...provided.draggableProps} ref={provided.innerRef}>
                                            <KanbanGroup
                                                // provided={provided}
                                                groupIndex={idx}
                                                key={group.id}
                                                group={group}
                                                board={board}
                                            />
                                        // </div>
                                    // )}
                                /* </Draggable> */
                            )
                        })}
                        {/* {provided.placeholder} */}
                    </div>
                {/* )} */}
            {/* </Droppable> */}
        {/* </DragDropContext> */}
    </section>

}