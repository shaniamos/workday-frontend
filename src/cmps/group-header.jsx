// import { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'
// import { updateGroup } from '../../store/actions/board.actions'
// import { GroupModal } from './group-modal'

import { HiOutlineDotsHorizontal } from 'react-icons/hi' //More
import { MdDeleteOutline } from 'react-icons/md'//Delete
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'//Duplicate

export const GroupHeader = ({ groupColor, onRemoveGroup }) => {



    return (

        <div className='preview-group-header flex'>
            <div ><HiOutlineDotsHorizontal className="dot" /></div>
            <div className="group-header-identifier  flex">
                <div className="cell task-name-area group-task-name-area cell sticky-feature flex">
                    <div className="task-group-color task-group-color-header" style={{ backgroundColor: `var(${groupColor})` }}></div>
                    <div className="preview-checkbox"><input className="input-checkbox" type="checkbox" name="" id="" /></div>
                    <div className='header-identifier-title'>Item</div>

                </div>

                <div className="cell persons-header">
                    <span>Person</span>
                </div>
                <div className="cell label-type">
                    <span>Status</span>
                </div>
                <div className="cell label-type">
                    <span>Priority</span>
                </div>
                <div className="cell last-updated">
                    <span>Last Updated</span>
                </div>
                <div className="cell date-header">
                    <span>Due Date</span>
                </div>
                <div className="cell add-column">
                    <span>+</span>
                </div>
            </div>

        </div>
    )
}
