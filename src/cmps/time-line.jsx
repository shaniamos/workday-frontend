import React, { useState, useEffect, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { utilService } from '../services/util.service'
import { useDispatch } from 'react-redux';
import { boardService } from '../services/board.service.local';
import { updateBoard, updateTask } from '../store/actions/board.action';

// registerLocale('uk', uk)

export const TimeLine = ({ task, boardId, groupId }) => {
    console.log('task', task);
    const [startDate, setStartDate] = useState((!task.timeline[0]) ? null : new Date(task.timeline[0]))
    const [endDate, setEndDate] = useState((!task.timeline[1]) ? null : new Date(task.timeline[1]))
    const [isSetDate, setIsDateSet] = useState(false)
    const [isSettingDate, setIsSettingDate] = useState(false)
    const [onHover, setIsHover] = useState(false)
    const isFirstDateUpdate = useRef(true);
    const dispatch = useDispatch()

    useEffect(() => {
        setIsDateSet((!task.timeline[0] && !task.timeline[1]) ? false : true)
        return () => {
            isFirstDateUpdate.current = true
        }
    }, [])

   
    const setDateRange = (newRange) => {
        console.log(newRange);
        if (!newRange[1]) {
            setStartDate(newRange[0])
            setEndDate(null)
            setIsSettingDate(true)
            return
        }
        setEndDate(newRange[1])
    }

    const EnterHover = () => {
        console.log('Enter Hover');
        setIsHover(true)
    }
    const LeaveHover = () => {
        console.log('Leave Hover');
        setIsHover(false)
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

    const onUpdateTask = (startDate, endDate) => {
        task.timeline[0] = startDate
        task.timeline[1] = endDate
        task.lastUpdated = Date.now
        dispatch(updateTask(boardId, groupId, task))  
    }

    return (
        <div className="timeline" onMouseEnter={EnterHover} onMouseLeave={LeaveHover}>
            {isSetDate && 
                <div className="date-pick-wrapper">
                    <div className="date-picker-container">
                        <div className="progress-bar">
                        </div>
                        <div className="position"></div>
                        <DatePicker
                            className="date-picker-cmp"
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                setDateRange(update)
                                onUpdateTask(startDate, endDate );
                            }}
                        />
                    </div>
                </div>}
        </div>
    );

}
