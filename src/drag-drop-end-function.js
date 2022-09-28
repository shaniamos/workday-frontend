const onHandleDragEnd = (result) => {
    const { source, destination } = result

    if (!destination) return

    if (source.index === destination.index &&
        source.droppableId === destination.droppableId) return

    if (source.droppableId !== destination.droppableId) {
        const sourceGroup = groups[+source.droppableId]
        const destGroup = groups[+destination.droppableId]
        const sourceTasks = [...sourceGroup.tasks]
        const destTasks = [...destGroup.tasks]
        const [removedTask] = sourceTasks.splice(source.index, 1)
        destTasks.splice(destination.index, 0, removedTask)
        groups[+source.droppableId] = {
            ...groups[+source.droppableId],
            tasks: sourceTasks,
        }
        groups[+destination.droppableId] = {
            ...groups[+destination.droppableId],
            tasks: destTasks,
        }
        onUpdateGroups(groups)
    } else {
        const group = groups[+source.droppableId]
        const copiedItems = [...group.tasks]
        const [removedTask] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removedTask)
        groups[+source.droppableId] = {
            ...groups[+source.droppableId],
            tasks: copiedItems,
        }
        onUpdateGroups(groups)
    }
}