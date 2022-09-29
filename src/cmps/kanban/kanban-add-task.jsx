export const KanbanAddTask = ({onAddTask}) => {
    return (
      <div className="kanban-new-task">
        <div>
          <a onClick={onAddTask}>+ Add Task</a>
        </div>
      </div>
    )
  }
  