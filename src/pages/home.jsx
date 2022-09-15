import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HomeHeader } from '../cmps/home-header'


export function Home() {

    return (

        <section className='home-page'>
            <HomeHeader />
            <div>
                <h1>A platform built for a new way of working</h1>
            </div>
            <div>
                <p>What would you like to manage with Workday.com Work OS?</p>
            </div>

            <Link to={`/board/b101`} ><button>Get Started</button></Link>


        </section>

    )
}