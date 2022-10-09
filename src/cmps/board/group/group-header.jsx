export const GroupHeader = ({ groupColor }) => {

    return (
        <div className='preview-group-header flex'>
            <div className="group-header-identifier flex">
                <div className="cell task-name-area group-task-name-area cell sticky-feature flex">
                    <div className="task-group-color task-group-color-header" style={{ backgroundColor: `var(${groupColor})` }}></div>
                    <div className="preview-checkbox"><input className="input-checkbox" type="checkbox" name="" id="" /></div>
                    <div className='header-identifier-title'>Item</div>
                </div>
                <div className="cell persons-header">
                    <span>Person</span>
                </div>
                <div className="cell label-type-status">
                    <span>Status</span>
                </div>
                <div className="cell label-type-priority">
                    <span>Priority</span>
                </div>
                <div className="cell last-updated">
                    <span>Last updated</span>
                </div>
                <div className="cell last-updated">
                    <span>Timeline</span>
                </div>
            </div>
        </div>
    )
}
