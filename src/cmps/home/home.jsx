import React from 'react'
import { Link } from 'react-router-dom'
import { HomeHeader } from './home-header'
import { SidebarNarrow } from '../side-bar/sidebar-narrow'
import bgHomefooter from '../../assets/imgs/home-img-footer.jpg'

export function Home() {

    return (
        <section className='home-page full'>
            <HomeHeader />
            <div className='main-content'>
                <div>
                    <h2 className='main-text'>
                        A platform built for a new way of working
                    </h2>
                    <p className='sub-text'>What would you like to manage with Workday.com Work OS?</p>
                    <Link to='workspace'>
                        <button className='get-started-btn-home btn-mobile'>
                            <p>Get Started<span className='get-started-arrow'>&#8594;</span></p>
                        </button>
                    </Link>
                    <Link to={`/board/6331957ec46e6b54a700bb94`}>
                        <button className='get-started-btn-home btn-desktop'>
                            <p>Get Started<span className='get-started-arrow'>&#8594;</span></p>
                        </button>
                    </Link>
                    <p className='credit-text'>No credit card needed   ✦   Unlimited time on Free plan</p>
                </div>
                <img className='img-footer' src={bgHomefooter} />
            </div>
            {/* <StarCanvas /> */}
            <SidebarNarrow />
        </section>
    )
}