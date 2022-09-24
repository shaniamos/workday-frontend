// import { useEffect } from "react";
// import { useRef } from "react";
// import { useState } from "react"

export const TimeLine = ({task, board, groupId, }) => {
}
//     const firstTimeUpdated = useRef(true);

//     const [dateStart, setDateStart] = useState((!task.timeline[0]) ? null : new Date(task.timeline[0]))
//     const [endDate, setEndDate] = useState((!task.timeline[1]) ? null : new Date(task.timeline[1]))
//     const [isDateSet, setIsDateSet] = useState(false)
//     const [isSettingDate, setIsSettingDate] = useState(false)

//     useEffect(() => {
//         setIsDateSet((!task.timeline[0] && !task.timeline[1]) ? false : true)
//         return () => {
//             firstTimeUpdated.current = true
//         }
//     }, [])

//     useEffect(() => {
//         if (firstTimeUpdated.current) {
//             firstTimeUpdated.current = false
//             return
//         } 
//         if (!endDate) return
//         onSetTimeline()
//     }, [endDate])

//     const setDateRange = (newRange) => {
//         if (!newRange[1]) {
//             setDateStart(newRange[0])
//             setEndDate(null)
//             setIsSettingDate(true)
//             return
//         }
//         setEndDate(newRange[1])
//     }
//     return (
//     <div className="timeline" onMouseEnter={onEnter} onMouseLeave={onLeave}>

//             {!isDateSet && !isSettingDate && !isHover &&
//                 <span className="no-date">-</span>}

//             {!isDateSet && !isSettingDate && isHover &&
//                 <span className="set-dates" onClick={onSetDates}>Set Dates</span>}

//             {!isDateSet && isSettingDate && <DatePicker
//                 popperPlacement="bottom"
//                 className="date-picker-cmp"
//                 // locale="uk"
//                 selectsRange={true}
//                 startDate={dateStart}
//                 endDate={endDate}
//                 onChange={(update) => {
//                     setDateRange(update);
//                 }}
//             />}
//             </div>
//     )

// }