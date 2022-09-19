import { GroupPreview } from "./group-preview.jsx"
import { GrAdd } from 'react-icons/gr'

export const GroupList = ({ groups, onAddGroup }) => {
    return (
        <section className="group-list">
            {groups.map(group => <GroupPreview key={group.id} group={group} />)}
            <button className="btn-add-group sticky-feature" onClick={onAddGroup}>
            <span className="add-icon"><GrAdd /></span> Add New Group
            </button>
        </section >
    )
}