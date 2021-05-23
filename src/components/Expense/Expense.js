import React, { useContext, useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Link, useHistory } from 'react-router-dom';
import { TransactionContext } from '../../context/TransactionContext';

const Expense = () => {
    const {transactions,findChartData} = useContext(TransactionContext);
    const [chartData,setChartData] = useState({});
    const [total,setTotal] = useState(0);
    useEffect(()=>{
        const {total,chartData}=findChartData(transactions,'Expense');
        setChartData(chartData);
        setTotal(total)
    },[transactions])

    const history = useHistory();

    const expenseDetails=()=>{
        history.push('/expensedetails');
    }

    return (
        <div className='card'>
                <div className='card-body'>
                    <div className='balance' style={{outlineColor: 'rgb(245, 25, 30)'}}>Expense Rs.<p style={{color:'red'}}>{total}</p></div>       
                    <Doughnut data={chartData}/>
                    <button onClick={()=>expenseDetails()}>Details</button>
                </div>
        </div>
    )
}

export default Expense
