import { GroupPreview } from "./group-preview.jsx"
import { GrAdd } from 'react-icons/gr'
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useState } from "react"

export const GroupList = ({ groups, onAddGroup, onChangeFilter }) => {
    const filterBy = useSelector(state => state.boardModule.filterBy)
    const [filteredGroups, setFilteredGroups] = useState(groups)
    const [sort, setSort] = useState({sortBy: '', isDescending: 1})

    useEffect(() => {
        filterGroupsAndTasks()
    }, [groups, filterBy, sort])

    const filterGroupsAndTasks = () => {
        const { txt } = filterBy
        const regex = new RegExp(txt, 'i')
        const filteredTasksGroups = groups.map(group => {
            return { ...group, tasks: group.tasks.filter((task) => regex.test(task.title)) }
        })
        const filtered = filteredTasksGroups.filter(group => group.tasks.length || regex.test(group.title))
        filtered.forEach(group => {
            if (sort.sortBy === 'itemTitle') {
                group.tasks.sort((a, b) => a.title.localeCompare(b.title) * sort.isDescending)
            } else if (sort.sortBy === 'lastUpdated') {
                group.tasks.sort((a, b) => (b.lastUpdated - a.lastUpdated) * sort.isDescending)
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
            setSort({...sort, sortBy, isDescending: - isDescending})
        }
        else setSort({...sort, sortBy, isDescending: 1})
    }

    // console.log(sort)
    return (
        <section className="group-list">
            {filteredGroups.map(group => <GroupPreview key={group.id} group={group} onChangeFilter={onChangeFilter} sortGroup={onSort} />)}
            <button className="btn-add-group sticky-feature" onClick={onAddGroup}>
                <span className="add-icon"><GrAdd /></span> Add New Group
            </button>
        </section >
    )
}
