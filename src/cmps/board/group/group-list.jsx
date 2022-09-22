import { GroupPreview } from "./group-preview.jsx"
import { GrAdd } from 'react-icons/gr'
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useState } from "react"

export const GroupList = ({groups, onAddGroup, onChangeFilter }) => {
    const filterBy = useSelector(state => state.boardModule.filterBy)
    const [filteredGroups, setFilteredGroups] = useState(groups)
    // const [sort, setSort] = useState('lastUpdated')

    useEffect(() => {
        // filteredGroups.forEach(group => {
        //     if (sort === 'itemTitle') {
        //         group.tasks.sort((a, b) => {
        //             const nameA = a.title.toUpperCase(); // ignore upper and lowercase
        //             const nameB = b.title.toUpperCase(); // ignore upper and lowercase
        //             if (nameA < nameB) {
        //                 return -1;
        //             }
        //             if (nameA > nameB) {
        //               return 1;
        //             }
        //             // names must be equal
        //             return 0;
        //         });
        //     } else if (sort === 'lastUpdated') {
        //         group.tasks.sort((a, b) => b.lastUpdated - a.lastUpdated)
        //     }
            
        // })
        const { txt } = filterBy
        const regex = new RegExp(txt, 'i')
        const filteredTasksGroups = groups.map(group => {
            return { ...group, tasks: group.tasks.filter((task) => regex.test(task.title)) }
        })
        const filtered = filteredTasksGroups.filter(group => group.tasks.length || regex.test(group.title))
        // console.log('wwwoww')
        setFilteredGroups(filtered)
    }, [filterBy])


    // const onSort = (sortBy) => {
    //     setSort(sortBy)
    // }

    
    return (
        <section className="group-list">
            {filteredGroups.map(group => <GroupPreview key={group.id} group={group} onChangeFilter={onChangeFilter} />)}
            <button className="btn-add-group sticky-feature" onClick={onAddGroup}>
                <span className="add-icon"><GrAdd /></span> Add New Group
            </button>
        </section >
    )
}
