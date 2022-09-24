import React from "react";
import { useState } from "react"


export const StatusTypeDisplay = ({ label, value, options }) => {
    const [isLabelsOpen, setIsLabelsOpen] = useState('')

    const getColorByValue = (value) => {
        const option = options.find(option => option.title === value)
        if (!option) return '--layout-border-color' //default bgColor
        return option.id
    }
    const onOpenLabels = () => {
        setIsLabelsOpen('show')
    }

    const onCloseLabels = () => {
        setIsLabelsOpen('')
    }
    return <React.Fragment>
        <div className={`label-dropdown ${isLabelsOpen}`}>
            <div className="cell label-type status-header btn-open-label-drop" onClick={onOpenLabels} style={{ backgroundColor: `var(${getColorByValue(value)})` }}>
                {`${value}`}
            </div>
            <div className="main-screen" onClick={onCloseLabels}></div>
            <div className={`dropdown-labels-content ${isLabelsOpen} `}>
                <div className="picker-content">
                    <ul className="picker-list" style={{ gridTemplateRows: `repeat(${options.length}, auto)` }}>
                        {options.map(option => {
                            return <li key={option.id} className="option" style={{ backgroundColor: `var(${option.id})` }} onClick={() => { console.log('Option') }}>{option.title}</li>
                        })}
                    </ul>
                </div>
                {/* TODO picker-footer for edit labels */}
            </div>
        </div>
    </React.Fragment>
}