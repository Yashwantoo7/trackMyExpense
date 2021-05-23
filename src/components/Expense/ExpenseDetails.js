import React, { useContext, useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { TransactionContext } from '../../context/TransactionContext'
import { findBarData } from '../../utils';


const ExpenseDetails = () => {

    const {transactions} = useContext(TransactionContext);
    const [validTrans,setValidTrans] = useState([]);
    const [barData,setBarData] = useState({});

    useEffect(()=>{
        setValidTrans(transactions.filter((t)=>t.type==='Expense'))
        setBarData(findBarData(transactions,'Expense'));
    },[transactions])
    return (
        <div>            
            <div className='bar'>
                <Bar data={barData.data} options={barData.options}/>
                </div>
                <div className='table'>
                <table>
                    <tbody>
                        <tr>
                            <th>Type</th>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Amount</th>
                        </tr>
                        {validTrans.map((t,ind)=><tr id={ind%2===0?'even':'odd'} key={t.id}>
                            <td>{t.type}</td>
                            <td>{t.id}</td>
                            <td>{t.date.slice(0,10)}</td>
                            <td>{t.category}</td>
                            <td>{t.amount}</td>                    
                        </tr>)}
                    </tbody>                
                </table>
            </div>
        </div>
    )
}

export default ExpenseDetails
