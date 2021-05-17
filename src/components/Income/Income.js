import React, { useContext, useEffect, useState } from 'react'
import { TransactionContext } from '../../context/TransactionContext';
import {Doughnut} from 'react-chartjs-2';
import {  useHistory } from 'react-router-dom';

const Income = () => {

    const {transactions,findChartData} = useContext(TransactionContext);
    const [chartData,setChartData] = useState({});
    const [total,setTotal] = useState(0);
    useEffect(()=>{
        const {total,chartData}=findChartData(transactions,'Income');
        setChartData(chartData);
        setTotal(total)
    },[transactions])
    
    const history = useHistory();

    const incomeDetails=()=>{
        history.push('/incomedetails');
    }

    return (
        <div className='card'>
                <div className='card-body'>
                    <div className='title'><p>Income ${total}</p></div>       
                    <Doughnut data={chartData}/>
                    <button onClick={()=>incomeDetails()}>Details</button>
                </div>
        </div>
    )
}

export default Income
