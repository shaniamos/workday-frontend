import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { updateTask } from '../store/actions/board.action'

export const MemberMultiSelect = (task, groupId, setIsMemberModalOpen, assigneeMembers, boardMembers) => {
    const { members } = useSelector(state => state.boardModule.selectedBoard)
    const dispatch = useDispatch()

    const params = useParams
    const boardId = params.id


    const onRemoveMember = (id) => {
        const currMembers = boardMembers.filter(member => member.id !== id)
        const taskToUpdate = { ...task, persons: currMembers }
        dispatch(updateTask(boardId, groupId, taskToUpdate))
    }

    console.log(assigneeMembers)
    console.log(members)
    return <section className="member-multi-select-container">
        <div className="are-assignee">
            {assigneeMembers && assigneeMembers?.length &&
                assigneeMembers.map(member => (
                    <div key={member.id}>
                        <img src={member.imgUrl} alt="" />
                        <span>{member.fullname}</span>
                        <span onClick={() => {
                            onRemoveMember(member.id)
                            setIsMemberModalOpen(false)
                        }}>X</span></div>
                ))}
        </div>

    </section>
}