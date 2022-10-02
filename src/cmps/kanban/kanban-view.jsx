import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { updateBoard } from '../../store/actions/board.action';

import { KanbanGroup } from './kanban-group';

export const KanbanView = ({ board, boardId, groups, onAddTask }) => {
  const filterBy = useSelector(state => state.boardModule.filterBy)
  const [filteredGroups, setFilteredGroups] = useState(groups)
  const dispatch = useDispatch()

  useEffect(() => {
    filterGroupsAndTasks()
  }, [groups, filterBy])

  const filterGroupsAndTasks = () => {
    //filter
    const { txt } = filterBy
    const regex = new RegExp(txt, 'i')
    const filteredTasksGroups = groups.map(group => {
      return { ...group, tasks: group.tasks.filter((task) => regex.test(task.title)) }
    })
    const filtered = filteredTasksGroups.filter(group => group.tasks.length || regex.test(group.title))

    setFilteredGroups(filtered)
  }


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
        {filteredGroups.map((group, idx) => {
          return (
            <Droppable droppableId={`${idx}`} key={group.id}>
              {(provided, snapchat) => {
                return (
                  <div {...provided.droppableProps} key={group.id}>
                    <KanbanGroup
                      provided={provided}
                      snapchat={snapchat}
                      group={group}
                      key={group.id}
                      boardId={boardId}
                      onAddTask={onAddTask}
                    />
                  </div>
                )
              }}
            </Droppable >
          )
        })}
      </DragDropContext >
    </section>
  )
}
