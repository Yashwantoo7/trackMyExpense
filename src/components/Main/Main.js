import React, { useContext } from 'react'
import {incomeCategories,expenseCategories} from '../../constants/categories';
import { TransactionContext } from '../../context/TransactionContext';
import {v4 as uuidv4} from 'uuid';
import Axios from '../../api';
import { useHistory } from 'react-router';

const Main = () => {
    const {transactionType,setTransactoinType}=useContext(TransactionContext)
    const {category,setCategory}=useContext(TransactionContext)
    const {amount,setAmount} = useContext(TransactionContext)
    const {transactions,setTransactions} = useContext(TransactionContext)
    const {totalIncome,setTotalIncome,totalExpense,setTotalExpense} = useContext(TransactionContext);

    const {userInfo,date,setDate} = useContext(TransactionContext)
    
    const history = useHistory();

    const createTransaction=async (e)=>{
        e.preventDefault();
        const {email} = userInfo;
        const transaction={"amount":amount,"category":category,"type":transactionType,"date":date,"id":uuidv4()}
        try{
            if(transaction.type==='Income'){
                var data =await Axios.post(`/api/income/${userInfo.id}`,{...transaction,email},{
                    headers:{Authorization:`Bearer ${userInfo.token}`}
                })
                data = data.data.data
                setTransactions([...transactions,data])
                localStorage.setItem('transactions',JSON.stringify([...transactions,data]));
            }
            else{
                var data =await Axios.post(`/api/expense/${userInfo.id}`,{...transaction,email},{
                    headers:{Authorization:`Bearer ${userInfo.token}`}
                })
                data = data.data.data
                setTransactions([...transactions,data])
                localStorage.setItem('transactions',JSON.stringify([...transactions,data]));
            }
        }
        catch(err){
            console.log(err)
        }
        
    }

    const  selectCategories = transactionType==='Income'?incomeCategories:expenseCategories
    
    const handleType=(e)=>{
        setTransactoinType(e.target.value);
        if(transactionType==='Income')setCategory(expenseCategories[0].type);
        else setCategory(incomeCategories[0].type)
    }

    const handleLogout=(e)=>{
        var conf = window.confirm("Are you sure");
        if(conf){
            localStorage.removeItem('userInfo');
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('transactions');
            history.replace('/');
        }
    }
    return (
        <div className='card' style={{paddingLeft:'20px',paddingRight:'20px'}}>
                <div className='card-body'>
                    <div className='title'><p>Expense Tracker </p></div>
                    <div ><div className='balance' style={{
                                outlineColor:totalIncome-totalExpense>0?'rgb(13, 197, 38)':'rgb(245, 30, 30)'}}>
                                Overall Savings Rs.<p style={{color:totalIncome-totalExpense>0?'green':'red'}}>
                                {totalIncome-totalExpense}</p></div></div>
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
                        <button style={{backgroundColor:'rgba(242, 38, 19, 0.8)', marginTop:'20px'}} onClick={(e)=>handleLogout(e)}>Logout</button>
                    </form>               
                </div>
        </div>
    )
}

export default Main
