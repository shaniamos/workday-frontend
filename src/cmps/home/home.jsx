import React from 'react'
import { Link } from 'react-router-dom'
import { HomeHeader } from './home-header'

export function Home() {
    return (
        <section className='home-page'>
            <HomeHeader />
            <div className='main-content'>
                <h2 className='main-text'>
                    A platform built for a new way of working
                </h2>
                <p className='sub-text'>What would you like to manage with Workday.com Work OS?</p>
                <Link to={'workspace'} >
                    <button className='get-started-btn-home'>
                        <p >Get Started<span className='get-started-arrow'>&#8594;</span></p>
                    </button> </Link>
                <p className='credit-text'>No credit card needed   ✦   Unlimited time on Free plan</p>
            </div>
        </section>
    )
}