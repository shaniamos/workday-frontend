import { GroupPreview } from "./group-preview.jsx"

export const GroupList = ({ groups, onAddGroup }) => {

    return (
        <section className="group-list">
            {groups.map(group => <GroupPreview key={group.id} group={group} />)}
            <button onClick={onAddGroup}> + Add New Group</button>
        </section>
    )
}