import { GroupPreview } from "./group-preview.jsx"
import { GrAdd } from 'react-icons/gr'
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useState } from "react"

export const GroupList = ({ groups, onAddGroup, onChangeFilter }) => {
    const filterBy = useSelector(state => state.boardModule.filterBy)
    const [filteredGroups, setFilteredGroups] = useState(groups)
    const [sort, setSort] = useState('')

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
            if (sort === 'itemTitle') {
                group.tasks.sort((a, b) => a.title.localeCompare(b.title))
                console.log(group.tasks)
            } else if (sort === 'lastUpdated') {
                group.tasks.sort((a, b) => b.lastUpdated - a.lastUpdated)
            } else if (sort === 'deadline') {
                group.tasks.sort((a, b) => b.deadline - a.deadline)
            }
        })
        setFilteredGroups(filtered)
    }

    const onSort = (sortBy) => {
        setSort(sortBy)
    }

    return (
        <section className="group-list">
            {filteredGroups.map(group => <GroupPreview key={group.id} group={group} onChangeFilter={onChangeFilter} sortGroup={onSort} />)}
            <button className="btn-add-group sticky-feature" onClick={onAddGroup}>
                <span className="add-icon"><GrAdd /></span> Add New Group
            </button>
        </section >
    )
}
