import React from 'react'
import { Link } from 'react-router-dom'
import { HomeHeader } from './home-header'

export function Home() {
    return (
        <section className='home-page'>
            <HomeHeader />
            <div className='text-container flex column justify-center align-center'>
                <h2 className='main-text'>
                    A platform built for a
                    <br />
                    new way of working
                </h2>
                <p className='sub-text'>What would you like to manage with Workday.com Work OS?</p>
                <Link to={`/board/b101`} ><button className='get-started-btn-home'>Get Started <span> &#8594;	</span></button> </Link>
                <p className='small-text'>No credit card needed   ✦   Unlimited time on Free plan</p>
            </div>
        </section>
    )
}