import React from "react";
import { useState } from "react"
import { NavLink } from "react-router-dom";

import { MdOutlineWorkOutline } from 'react-icons/md'
import { CgMoreO } from 'react-icons/cg'
// import { RiCalendarCheckFill, RiCalendarCheckLine } from 'react-icons/ri'

import { AiOutlineHome, AiFillHome } from 'react-icons/ai' // Home 
import { IoCalendarClearOutline, IoCalendarClear } from 'react-icons/io5' // My work
import { HiOutlineDotsCircleHorizontal, HiDotsCircleHorizontal } from 'react-icons/hi' // More
// import { HiOutlineClipboardDocumentList, HiClipboardDocumentList } from 'react-icons/hi' // Workspace
import { ClipboardDocumentListIcon as HiOutlineClipboardDocumentList } from '@heroicons/react/24/outline' // Workspace
import { ClipboardDocumentListIcon as HiClipboardDocumentList } from '@heroicons/react/24/solid' // Workspace
import { IoFilterOutline } from 'react-icons/io5' // filter


export const SidebarNarrow = () => {
    const [isHomeActive, setIsHomeActive] = useState(false);
    const [isWorkspaceActive, setIsWorkspaceActive] = useState(false);
    const [isMoreActive, setIsMoreActive] = useState(false);

    return (
        <section className="navbar-mobile-container">
            <div className='icons-navigation'>
                <NavLink className='home-btn' to='/'
                    isActive={(match, location) => {
                        if (match) setIsHomeActive(true)
                        return match;
                    }} >
                    <div className="mobile-navbar-icon">{isHomeActive ? <AiFillHome /> : <AiOutlineHome />}</div>
                    <span>Home</span>
                </NavLink>
                <NavLink className='workspace-btn' to='/workspace'
                    isActive={(match, location) => {
                        if (match) setIsWorkspaceActive(true)
                        return match;
                    }}>
                    <div className="mobile-navbar-icon">{isWorkspaceActive ? <HiClipboardDocumentList /> : <HiOutlineClipboardDocumentList />}</div>
                    <span>Workspace</span>
                </NavLink>
                <div className='more-btn'>
                    <div className="mobile-navbar-icon">{isMoreActive ? <HiDotsCircleHorizontal /> : <HiOutlineDotsCircleHorizontal />}</div>
                    {/* <div className="mobile-navbar-icon"><CgMoreO /></div> */}
                    <span>More</span>
                </div>
            </div>


        </section>
    )
}

