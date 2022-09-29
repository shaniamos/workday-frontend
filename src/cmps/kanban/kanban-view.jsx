import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { updateBoard } from '../../store/actions/board.action';

import { KanbanGroup } from './kanban-group';

export const KanbanView = ({ board, boardId, groups, onAddTask }) => {
    const dispatch = useDispatch()

    const onDragEnd = (result, groups) => {
        if (!result.destination) return
        const { source, destination } = result
        if (
          source.index === destination.index &&
          source.droppableId === destination.droppableId
        )
          return
        if (source.droppableId !== destination.droppableId) {
          const sourceColumn = groups[source.droppableId]
          const destColumn = groups[destination.droppableId]
          const sourceItems = [...sourceColumn.tasks]
          const destTasks = [...destColumn.tasks]
          const [removed] = sourceItems.splice(source.index, 1)
          destTasks.splice(destination.index, 0, removed)
          groups[source.droppableId] = {
            ...groups[source.droppableId],
            tasks: sourceItems,
          }
          groups[destination.droppableId] = {
            ...groups[destination.droppableId],
            tasks: destTasks,
          }
          onUpdateGroups(groups)
        } else {
          const column = groups[source.droppableId]
          const copiedItems = [...column.tasks]
          const [removed] = copiedItems.splice(source.index, 1)
          copiedItems.splice(destination.index, 0, removed)
          groups[source.droppableId] = {
            ...groups[source.droppableId],
            tasks: copiedItems,
          }
          onUpdateGroups(groups)
        }
      }

      const onUpdateGroups = (groups) => {
        const newBoard = { ...board }
        newBoard.groups = [...groups]
        dispatch(updateBoard(newBoard))
    }
    return (
        <section className="kanban-content">
            <DragDropContext onDragEnd={(result) => onDragEnd(result, groups)}>
                {groups.map(( group, idx) => {
                    return (
                        <Droppable droppableId={`${idx}`} key={group.id}>
                            {(provided, snapchat) => {
                                return (
                                    <section ref={provided.innerRef} {...provided.droppableProps} key={group.id}>
                                    <KanbanGroup
                                        provided={provided}
                                        snapchat={snapchat}
                                        group={group}
                                        key={group.id}
                                        boardId={boardId}
                                        onAddTask={onAddTask}
                                    />
                                    </section>
                                )
                            }}
                        </Droppable >
                    )
                })}
            </DragDropContext >
        </section>
    )
}
