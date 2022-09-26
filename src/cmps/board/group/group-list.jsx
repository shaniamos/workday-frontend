import { GroupPreview } from "./group-preview.jsx"
import { GrAdd } from 'react-icons/gr'
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export const GroupList = ({ members, groups, onAddGroup, onChangeFilter }) => {
    const filterBy = useSelector(state => state.boardModule.filterBy)
    const [filteredGroups, setFilteredGroups] = useState(groups)
    const [sort, setSort] = useState({ sortBy: '', isDescending: 1 })

    useEffect(() => {
        filterGroupsAndTasks()
    }, [groups, filterBy, sort])

    const filterGroupsAndTasks = () => {
        //filter
        const { txt } = filterBy
        const regex = new RegExp(txt, 'i')
        const filteredTasksGroups = groups.map(group => {
            return { ...group, tasks: group.tasks.filter((task) => regex.test(task.title)) }
        })
        const filtered = filteredTasksGroups.filter(group => group.tasks.length || regex.test(group.title))

        //sort
        filtered.forEach(group => {
            if (sort.sortBy === 'itemTitle') {
                group.tasks.sort((task1, task2) => task1.title.localeCompare(task2.title) * sort.isDescending)
            } else if (sort.sortBy === 'personName') {
                group.tasks.sort((task1, task2) => {
                    if (task1.persons.length && task2.persons.length)
                        return task1.persons[0].fullname.localeCompare(task2.persons[0].fullname) * sort.isDescending
                })
            } else if (sort.sortBy === 'lastUpdated') {
                group.tasks.sort((task1, task2) => (task1.lastUpdated - task2.lastUpdated) * sort.isDescending)
            } else if (sort.sortBy === 'deadline') {
                group.tasks.sort((a, b) => (b.deadline - a.deadline) * sort.isDescending)
            } else if (sort.sortBy === 'status') {
                group.tasks.sort((a, b) => b.status.localeCompare(a.status) * sort.isDescending)
            } else if (sort.sortBy === 'priority') {
                group.tasks.sort((a, b) => b.priority.localeCompare(a.priority) * sort.isDescending)
            }
        })
        setFilteredGroups(filtered)
    }

    const onSort = (sortBy) => {
        const isDescending = sort.isDescending
        if (sortBy === sort.sortBy) {
            setSort({ ...sort, isDescending: -isDescending })
        }
        else setSort({ ...sort, sortBy, isDescending: 1 })
    }

    return (
        <DragDropContext>
            <Droppable droppableId='group'>
                {(droppableProvided) => {
                    return <section ref={droppableProvided.innerRef} {...droppableProvided.droppableProps} className="group-list">
                        {filteredGroups.map(group =>
                            <GroupPreview
                                key={group.id}
                                group={group}
                                onChangeFilter={onChangeFilter}
                                sortGroup={onSort} />
                        )}
                        <button className="btn-add-group sticky-feature" onClick={() => onAddGroup('last')}>
                            <span className="add-icon"><GrAdd /></span> Add New Group
                        </button>
                    </section >
                }}
            </Droppable>
        </DragDropContext >
    )
}
