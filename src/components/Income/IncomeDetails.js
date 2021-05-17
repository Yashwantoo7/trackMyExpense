import React, { useContext, useEffect, useState } from 'react'
import { TransactionContext } from '../../context/TransactionContext'

const IncomeDetails = () => {

    const {transactions} = useContext(TransactionContext);
    const [validTrans,setValidTrans] = useState([]);

    useEffect(()=>{
        setValidTrans(transactions.filter((t)=>t.type==='Income'))
    },[transactions])

    return (
        <div className='table'>
            <table>
                <caption className='heading'>Income</caption>
                <tbody>
                    <tr>
                        <th>Type</th>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                    </tr>
                    {validTrans.map((t,ind)=><tr id={ind===0?'even':'odd'} key={t.id}>
                        <td>{t.type}</td>
                        <td>{t.id}</td>
                        <td>{t.date}</td>
                        <td>{t.category}</td>
                        <td>{t.amount}</td>                    
                    </tr>)}
                </tbody>                
            </table>
        </div>
    )
}

export default IncomeDetails
