import { GroupPreview } from "./group-preview.jsx"
import { GrAdd } from 'react-icons/gr'

export const GroupList = ({ groups, onAddGroup, onChangeFilter }) => {
    return (
        <section className="group-list">
            {groups.map(group => <GroupPreview key={group.id} group={group} onChangeFilter={onChangeFilter} />)}
            <button className="btn-add-group" onClick={onAddGroup}>
            <span className="add-icon"><GrAdd /></span> Add New Group
            </button>
        </section >
    )
}