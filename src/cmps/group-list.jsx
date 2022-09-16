import { useParams } from "react-router-dom"
import { GroupPreview } from "./group-preview.jsx"

export const GroupList = ({ groups }) => {
    const params = useParams()

    // const onSaveGroup = () => {
        // onClick={onSaveGroup}
    //     const boardId = params.id
    //     console.log(boardId)
    //     dispatch(addGroup(boardId))
    // }

    return (
        <section className="group-list">
            <button>Add Group</button>
            {groups.map(group => {
                return <GroupPreview key={group.id} group={group} />
            })}
        </section>
    )
}