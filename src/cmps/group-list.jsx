import { GroupPreview } from "./group-preview.jsx"

export const GroupList = ({ groups }) => {
    return (
        <section className="group-list">
            {groups.map(group => {
                return <GroupPreview key={group._id} group={group} />
            })}
        </section>
    )
}