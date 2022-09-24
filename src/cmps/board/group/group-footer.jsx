import { useSelector } from "react-redux"

export const GroupFooter = ({  tasks }) => {
    const labels = useSelector(state => state.boardModule.selectedBoard.labels)
    
    const sortTasksStatus = () => {
        const sortedTasksByStatus = tasks.map((task) => task.status)
        sortedTasksByStatus.sort((a, b) => {
            if (a[0] < b[0]) {
                return -1
            }
            if (b[0] > a[0]) {
                return -1
            }
            return 0
        })
        
        return sortedTasksByStatus
    }

    const sortTasksPriority = () => {
        const sortedTasksByPrioity = tasks.map((task) => task.priority)
        sortedTasksByPrioity.sort((a, b) => {
            if (a[0] < b[0]) {
                return -1
            }
            if (b[0] > a[0]) {
                return -1
            }
            return 0
        })

        return sortedTasksByPrioity
    }

    const getColor = (status) => {

        if(status === 'Done')
            return "#00c875"
        if(status === 'Working on it')
            return "#fdab3d"
    
        if(status === 'On Hold')
            return "#ff5ac4"
    
        if(status === 'Stuck')
            return "#e2445c"
          
}

    const getPriorityColor = (priority) => {
        if(priority === 'Critical')
            return "#d83a52"
        if(priority === 'High')
            return "#fdab3d"
    
        if(priority === 'Medium')
            return "#579bfc"

        if(priority === 'Low')
            return "#00c875"
  
}
    return <section className="group-footer flex">
        <div className="invisible1"></div>
        <div className="group-status-sum flex">
            {sortTasksStatus().map((status, idx) => (
                <div 
                key={idx}
                className="group-status-col"
                    style={{
                        background: getColor(status),
                        width: 150 / tasks.length,
                        height: '24px'
                    }}
                ></div>
            ))}
        </div>
        <div className="group-priority flex">
            {sortTasksPriority().map((priority, idx) => (
                <div
                    key={idx}
                    className="group-status-col"
                    style={{
                        background: getPriorityColor(priority),
                        width: 150 / tasks.length,
                        height: '24px',
                    }}
                ></div>
            ))}
        </div>
        <div className="invisible3"></div>
        <div className="invisible4"></div>
        <div className="invisible5"></div>
    </section>
}