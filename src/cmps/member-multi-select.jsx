import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { updateTask } from '../store/actions/board.action'

export const MemberMultiSelect = ({ groupId, task, setIsMemberModalOpen, assigneeMembers }) => {
    console.log('groupId ===>', groupId);
    console.log('task==>', task)
    console.log('setIsMemberModalOpen', setIsMemberModalOpen)
    console.log('assigneeMembers', assigneeMembers)
    const { members } = useSelector(state => state.boardModule.selectedBoard)
    const dispatch = useDispatch()

    const params = useParams()
    const boardId = params.id


    const onRemoveMember = (id) => {
        console.log('id', id);
        const currMembers = members.filter(member => member.id !== id)
        const taskToUpdate = { ...task, persons: currMembers }
        // dispatch(updateTask(boardId, groupId, taskToUpdate))
    }

    console.log('members', members)
    return (
        <section className="member-multi-select-container">
            <div className="are-assignee">
                {assigneeMembers && assigneeMembers?.length &&
                    assigneeMembers.map(member => (
                        <div key={member.id}>
                            <img src={member.imgUrl} alt="" />
                            <span>{member.fullname}</span>
                            <span onClick={() => {
                                onRemoveMember(member._id)
                                setIsMemberModalOpen(false)
                            }}>X</span></div>
                    ))}
            </div>
            

        </section>
    )
}