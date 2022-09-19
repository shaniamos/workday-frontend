import React from "react";
import { useState } from "react"


export const StatusTypeDisplay = ({ label, value, options }) => {
    const [isShownClass, setIsShownClass] = useState('')
    const onLabelClick = () => {
        setIsShownClass((isShownClass) ? '' : 'show')
    }
    const getColorByLabel = (label, value) => {
        switch (label) {
            case 'status':
                return getStatusTypeColor(value)
                break;
            case 'priority':
                return getPriorityTypeColor(value)
            default:
                break;
        }
    }

    const getStatusTypeColor = (value) => {
        let colorName
        switch (value) {
            case 'Done':
                colorName = '--color-done-green' //'#00c875'
                return colorName
            case 'Stuck':
                colorName = '--color-stuck-red' // '#e2445c'
                return colorName
            case 'Working on it':
                colorName = '--color-orange' // '#fdab3d'
                return colorName
            case 'On Hold':
                colorName = '--color-lipstick' //'#ff5ac4'
                return colorName
            default:
                colorName = '--color-wolf_gray' //c3c6d4
                return colorName
        }
    }
    const getPriorityTypeColor = (value) => {
        let colorName
        switch (value) {
            case 'High':
                colorName = '--color-orange' //'#fdab3d'
                return colorName
            case 'Low':
                colorName = '--color-done-green' // '#00c875'
                return colorName
            case 'Medium':
                colorName = '--color-bright-blue' // '#579bfc'
                return colorName
            case 'Critical':
                colorName = '--color-error' //'#d83a52'
                return colorName
            default:
                colorName = ' --color-wolf_gray' //c3c6d4
                return colorName
        }
    }

    return <React.Fragment>

        <div className="label-dropdown">
            <div className="cell label-type status-header btn-open-label-drop" onClick={onLabelClick} style={{ backgroundColor: `var(${getColorByLabel(label, value)})` }}>
                {`${value}`}
            </div>
            {/* <button onclick="myFunction()" class="dropbtn">Dropdown</button> */}
            <div className={`dropdown-labels-content ${isShownClass}`}>
                <div className="picker-content">
                    <ul className="picker-list" style={{ gridTemplateRows: `repeat(${options.length}, auto)` }}>
                        {options.map(option => {
                            return <li className="option" style={{backgroundColor: `var(${option.id})`}} onClick={() => { console.log('Option') }}>{option.title}</li>
                        })}
                    </ul>
                </div>
                {/* TODO picker-footer for edit labels */}
            </div>
        </div>
    </React.Fragment>
}