import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { addGroup } from "../store/actions/board.action.js"
import { GroupPreview } from "./group-preview.jsx"

export const GroupList = ({ groups }) => {
    const params = useParams()
    const dispatch = useDispatch()

    const onSaveGroup = () => {
        const boardId = params.id
        const group = { title: 'New Group' }
        console.log(boardId, group)
        dispatch(addGroup(boardId, group))
    }

    return (
        <section className="group-list">
            {groups.map(group => <GroupPreview key={group.id} group={group} />)}
            {/* <button onClick={onSaveGroup}> + Add New Group</button> */}
        </section>
    )
}