// import { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'
// import { updateGroup } from '../../store/actions/board.actions'
// import { GroupModal } from './group-modal'

import { HiOutlineDotsHorizontal } from 'react-icons/hi' //More
import { MdDeleteOutline } from 'react-icons/md'//Delete
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'//Duplicate

export const GroupHeader = ({ groupColor }) => {

    return (

        <div className='preview-group-header flex'>

            <div className="dropdown">
                <div ><HiOutlineDotsHorizontal className="dot" /></div>
                <div className="dropdown-content">
                    <a>< MdDeleteOutline /> Delete Group</a>
                    <a><HiOutlineDocumentDuplicate /> Duplicate</a>
                </div>
            </div>

            <div className="preview-cell group-header-identifier  flex">


                <div className="task-name-area group-task-name-area  preview-cell flex">
                    <div className="task-group-color task-group-color-header" style={{ backgroundColor: `var(${groupColor})` }}></div>
                    <div className="preview-checkbox"><input className="input-checkbox" type="checkbox" name="" id="" /></div>
                    <span>Item</span>

                </div>
                <div className="group-column-person">
                    <span>Person</span>
                </div>
                <div className="group-column-status">
                    <span>Status</span>
                </div>
                <div className="group-column-priority">
                    <span>Priority</span>
                </div>
                <div className="group-column-last-updated">
                    <span>LastUpdated</span>
                </div>
                <div className="group-column-due-date">
                    <span>Due Date</span>
                </div>
            </div>

        </div>
    )
}
