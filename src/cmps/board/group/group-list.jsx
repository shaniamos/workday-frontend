import { GroupPreview } from "./group-preview.jsx"

export const GroupList = ({ groups, onAddGroup, onChangeFilter }) => {
    return (
        <section className="group-list">
            {groups.map(group => <GroupPreview key={group.id} group={group} onChangeFilter={onChangeFilter} />)}
            <button onClick={onAddGroup}> + Add New Group</button>
        </section>
    )
}