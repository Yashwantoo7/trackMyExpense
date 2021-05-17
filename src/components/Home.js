import React from 'react'
import Expense from './Expense/Expense'
import Income from './Income/Income'
import Main from './Main/Main'

const Home = () => {
    return (
        <div className='home'>
            <Income/>
            <Main/>
            <Expense/>
        </div>
    )
}

export default Home
