import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { updateTask } from '../store/actions/board.action'
import { GoX } from 'react-icons/go';//delete or exit

export const MemberMultiSelect = ({ groupId, task, setIsMemberModalOpen, assigneeMembers }) => {
    const { members } = useSelector(state => state.boardModule.selectedBoard)
    const dispatch = useDispatch()

    const params = useParams()
    const boardId = params.id


    const onRemoveMember = (memberId) => {
        const currMembers = task.persons.filter(person => person._id !== memberId)
        const taskToUpdate = { ...task, persons: currMembers }
        dispatch(updateTask(boardId, groupId, taskToUpdate))
    }

    const onAddMember = (member) => {
        const currMembers = [...task.persons]
        currMembers.push(member)
        const taskToUpdate = { ...task, persons: currMembers }
        dispatch(updateTask(boardId, groupId, taskToUpdate))
    }

    const checkMembers = (memberId) => {
        return assigneeMembers.find(asiigneedMember => asiigneedMember._id === memberId)


    }

    
    return (
        <section className="member-multi-select-container">
            <a onClick={() => setIsMemberModalOpen(false)}><GoX className="exit-btn" /></a>
            <div className="are-assignee">
                {assigneeMembers && assigneeMembers?.length &&
                    assigneeMembers.map(member => (
                        <div key={member.id}>
                            <img src={member.imgUrl} alt="" />
                            <span>{member.fullname}</span>
                            <span onClick={() => {
                                onRemoveMember(member._id)
                                setIsMemberModalOpen(false)
                            }}><GoX /></span></div>
                    ))}
            </div>
            <div className="not-assignee">
                <span className="members-title">Suggested people</span>
                <div className="not-assignee-users">
                    {members.map((member) => {
                        if (checkMembers(member._id)) return
                        else {
                            return <div
                                className="not-assignee-single-user"
                                key={member.id}
                                onClick={() => {
                                    onAddMember(member)
                                    setIsMemberModalOpen(false)
                                }}>
                                <img key={member.id} src={member.imgUrl} alt="" />
                                <span>{member.fullname}</span>
                            </div>

                        }
                    })}
                </div>
            </div>

        </section>
    )
}