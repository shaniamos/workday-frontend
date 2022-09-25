import { Fragment } from "react"
import React, { useState } from "react"

import { MemberMultiSelect } from "./member-multi-select"

export function AvatarsChain({ task, assigneeMembers, groupId }) {
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false)

    if (assigneeMembers === undefined || assigneeMembers.length === 0) {
        return (
            <div className="overlap-image">
                <img src="https://cdn.monday.com/icons/dapulse-person-column.svg" alt="" />
            </div>
        )
    }
    return (
        <Fragment>
            < div className="overlap-images-wrapper flex" onClick={() => setIsMemberModalOpen(!isMemberModalOpen)}>
                <div className="overlap-image first-person"><img src={`${assigneeMembers[0].imgUrl}`} alt="" /></div>
                {(assigneeMembers.length > 1) &&
                    <div className="overlap-image second-person"><img src={`${assigneeMembers[1].imgUrl}`} alt="" /></div>}
                {(assigneeMembers.length > 2) &&
                    <div className="overlap-image-show-more"><span className="show-more-count">{`+${assigneeMembers.length - 2}`}</span></div>}
            </div >
            {isMemberModalOpen && <MemberMultiSelect groupId={groupId} task={task} setIsMemberModalOpen={setIsMemberModalOpen} assigneeMembers={assigneeMembers} />}
        </Fragment>

    )

}

