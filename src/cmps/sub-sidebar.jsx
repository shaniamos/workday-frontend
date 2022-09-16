import {IoIosArrowForward} from 'react-icons/io'
import {IoIosArrowBack} from 'react-icons/io'
import { useState } from "react"



export function SubSidebar() {
    // var isSubNavOpen = false
    const [isNavOpen, setNavOpen] = useState()


    const toggleSubSidebar = () => {
        setNavOpen(!isNavOpen)
        console.log(isNavOpen);
    }

    return (
        <section className={isNavOpen ? "sub-sidebar-container is-open" : "sub-sidebar-container"}>
            {isNavOpen && <IoIosArrowBack className='arrow-left' onClick={toggleSubSidebar} />}
            {!isNavOpen && <IoIosArrowForward className='arrow-right'  onClick={toggleSubSidebar}/>}

            {/* <i className={isNavOpen ?  "fas arrow arrow-left" : "fas arrow arrow-right"}
                 onClick={toggleSubSidebar}></i> */}
            {/* <IoIosArrowForward className="hamburger" onClick={toggleSubSidebar}/> */}
        </section>
    )



}