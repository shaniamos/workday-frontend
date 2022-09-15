import React from 'react'
import { Link } from 'react-router-dom'


export function Home() {

    return (
        <section className='home'>
        <h1>Hello from Home</h1>
        
        <Link to='/board/board101'>go to board </Link>
        </section>
        
    )
}