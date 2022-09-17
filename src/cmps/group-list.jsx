import { GroupPreview } from "./group-preview.jsx"

export const GroupList = ({ groups, onSaveGroup }) => {

    return (
        <section className="group-list">
            {groups.map(group => <GroupPreview key={group.id} group={group} />)}
            <button onClick={onSaveGroup}> + Add New Group</button>
        </section>
    )
}