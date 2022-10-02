import { useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineDotsHorizontal } from 'react-icons/hi' //More
import { TiArrowUnsorted } from 'react-icons/ti' //More

export const GroupHeader = ({ groupColor, sortGroup }) => {

    return (
        <div className='preview-group-header flex'>
            {/* <div ><HiOutlineDotsHorizontal className="dot" /></div> */}
            <div className="group-header-identifier flex">
                <div className="cell task-name-area group-task-name-area cell sticky-feature flex">
                    <div className="task-group-color task-group-color-header" style={{ backgroundColor: `var(${groupColor})` }}></div>
                    <div className="preview-checkbox"><input className="input-checkbox" type="checkbox" name="" id="" /></div>

                    {/* <button className='sort-btn name' onClick={() => onSort('itemTitle')}><TiArrowUnsorted /></button> */}
                    <div className='header-identifier-title'>Item</div>
                </div>
                <div className="cell persons-header">
                    {/* <button className='sort-btn person' onClick={() => onSort('personName')}><TiArrowUnsorted /></button> */}
                    <span>Person</span>
                </div>

                <div className="cell label-type-status">
                    {/* <button className='sort-btn' onClick={() => onSort('status')}><TiArrowUnsorted /></button> */}
                    <span>Status</span>
                </div>

                <div className="cell label-type-priority">
                    {/* <button className='sort-btn' onClick={() => onSort('priority')} ><TiArrowUnsorted /></button> */}
                    <span>Priority</span>
                </div>

                <div className="cell last-updated">
                    {/* <button className='sort-btn last-update' onClick={() => onSort('lastUpdated')}><TiArrowUnsorted /></button> */}
                    <span>Last updated</span>
                </div>
                <div className="cell last-updated">
                    {/* <button className='sort-btn timeline' ><TiArrowUnsorted /></button> */}
                    <span>Timeline</span>
                </div>
                {/* <div className="cell date-header">
                    <button className='sort-btn created-at' onClick={() => onSort('deadline')}><TiArrowUnsorted /></button>
                    <span>Due date</span>
                </div>
                */}
            </div>

        </div>
    )
}
