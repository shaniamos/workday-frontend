

export const StatusTypeDisplay = ({ label, value }) => {

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
                colorName = ' --color-wolf_gray' //c3c6d4
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

    return (
        <div className="cell label-type status-header" style={{ backgroundColor: `var(${getColorByLabel(label, value)})` }}>{`${value}`}</div>
    )
}