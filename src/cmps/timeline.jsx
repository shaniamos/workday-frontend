import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import { socketService } from '../../services/socketService'
import { useDispatch } from 'react-redux';
import { updateTask } from '../store/actions/board.action';

// registerLocale('uk', uk)

export const TimeLine = ({task, boardId, groupId}) => {
    const [startDate, setStartDate] = useState((new Date(task.timeline[0])))
    const [endDate, setEndDate] = useState((new Date(task.timeline[1])))
    const [isDateSet, setIsDateSet] = useState(true)
    const [isSettingDate, setIsSettingDate] = useState(false)
    const [isHover, setIsHover] = useState(false)
    const dispatch = useDispatch()
    
    // useEffect(() => {
    //     onSetTimeline()
    // }, [endDate])
    
    const setDateRange = (newRange) => {
        if (!newRange[1]) {
            setStartDate(newRange[0])
            setEndDate(null)
            setIsSettingDate(true)
            return
        }
        setEndDate(newRange[1])
    }

    const onSetTimeline = async () => {
        console.log('im here!!');
        task.timeline[0] = startDate
        task.timeline[1] = endDate
        // task.lastUpdated = Date.now()
        dispatch(updateTask(boardId, groupId, task))  
        setIsDateSet(true)
        setIsSettingDate(false)
    }

    const onSetDates = () => {
        setIsSettingDate(true)
    }

    const getNumOfDays = () => {
        if (!startDate || !endDate) return
        const timestampStart = startDate.getTime()
        const timestampEnd = endDate.getTime()
        const totalDays = (timestampEnd - timestampStart) / 1000 / 60 / 60 / 24
        return totalDays.toFixed(0)
    }
 
    return (
        <div className="timeline-container" >

            {!task.timeline && !isSettingDate && 
                <span className="set-dates" onClick={onSetDates}>Set Dates</span>}

         
            {task.timeline && 
                <div className="date-pick-area">
                    {<span className="sum-days" onClick={() => setIsHover(false) }>{getNumOfDays()} d</span>}
                    <div className="date-picker">
                        <div className="progress-bar">
                        </div>
                        <div className="grey-bck"></div>
                        <DatePicker
                            className="date-picker-cmp"
                            popperPlacement="bottom"
                            popperClassName="date-picker-pos"
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                setDateRange(update)
                                // onSetTimeline()
                            }}
                        />
                    </div>
                </div>}
        </div>
    );
}
