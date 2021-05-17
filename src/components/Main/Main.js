import React, { useContext } from 'react'
import {incomeCategories,expenseCategories} from '../../constants/categories';
import { TransactionContext } from '../../context/TransactionContext';
import {v4 as uuidv4} from 'uuid';

const Main = () => {
    const {transactionType,setTransactoinType}=useContext(TransactionContext)
    const {category,setCategory}=useContext(TransactionContext)
    const {amount,setAmount} = useContext(TransactionContext)
    const {transactions,setTransactions} = useContext(TransactionContext)
    
    const {date,setDate} = useContext(TransactionContext)
    
    const createTransaction=(e)=>{
        e.preventDefault();
        const transaction={"amount":amount,"category":category,"type":transactionType,"date":date,"id":uuidv4()}
        setTransactions([...transactions,transaction])
    }

    const  selectCategories = transactionType==='Income'?incomeCategories:expenseCategories
    
    const handleType=(e)=>{
        setTransactoinType(e.target.value);
        if(transactionType==='Income')setCategory(expenseCategories[0].type);
        else setCategory(incomeCategories[0].type)
    }

    return (
        <div className='card'>
                <div className='card-body'>
                    <div className='title'><p>Expense Tracker </p></div>
                    <div ><p className='balance'>Total Balance $100</p></div>
                    <form className='form-container'>
                        <label>Type</label>
                       <select value={transactionType} onChange={(e)=>handleType(e)}>
                            <option value='Income'>Income</option>
                            <option value='Expense'>Expense</option>
                        </select>
                        <label>Category</label>
                        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                            {selectCategories.map((c)=><option key={c.type} value={c.type}>{c.type}</option>)}
                        </select>
                        <label>Amount</label>
                        <input type='number' name='Amount' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                        <label>Date</label>
                        <input type='date' name='date' value={date} onChange={(e)=>setDate(e.target.value)}/>
                        <button type='submit' onClick={(e)=>createTransaction(e)}>Create</button>
                    </form>               
                </div>
        </div>
    )
}

export default Main
