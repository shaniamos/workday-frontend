

export const KanbanHeader = ({ colorId, title, group }) => {
  console.log('colorId', colorId);
  const color = colorId
    return (
      <div className="kanban-header" style={{ backgroundColor: `var(${colorId})` }}>
        {title} / {group.tasks.length}
      </div>
    )
  }
  