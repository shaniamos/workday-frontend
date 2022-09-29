

export const KanbanHeader = ({ colorId, title, group }) => {
 
    return (
      <div className="kanban-header" style={{ backgroundColor: `var(${colorId})` }}>
        {title} / {group.tasks.length}
      </div>
    )
  }
  