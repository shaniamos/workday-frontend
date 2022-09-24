import { GroupPreview } from "./group-preview.jsx"
import { GrAdd } from 'react-icons/gr'
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useState } from "react"

export const GroupList = ({ groups, onAddGroup, onChangeFilter }) => {
    const filterBy = useSelector(state => state.boardModule.filterBy)
    const [filteredGroups, setFilteredGroups] = useState(groups)
    const [sort, setSort] = useState('itemTitle')

    useEffect(() => {
        console.log('sort', sort);
        filteredGroups.forEach(group => {
            if (sort === 'itemTitle') {
                group.tasks.sort((a, b) => a.title.localeCompare(b.title))
            } else if (sort === 'lastUpdated') {
                group.tasks.sort((a, b) => b.lastUpdated - a.lastUpdated)
            }
            
        })
        const { txt } = filterBy
        const regex = new RegExp(txt, 'i')
        const filteredTasksGroups = groups.map(group => {
            return { ...group, tasks: group.tasks.filter((task) => regex.test(task.title)) }
        })
        const filtered = filteredTasksGroups.filter(group => group.tasks.length || regex.test(group.title))
        setFilteredGroups(filtered)
    }, [filterBy, sort])

    const onSort = (sortBy) => {
        setSort(sortBy)
    }
    return (
        <section className="group-list">
            {groups.map(group => <GroupPreview key={group.id} group={group} onChangeFilter={onChangeFilter} sortGroup={onSort} />)}
            <button className="btn-add-group sticky-feature" onClick={onAddGroup}>
                <span className="add-icon"><GrAdd /></span> Add New Group
            </button>
        </section >
    )
}
