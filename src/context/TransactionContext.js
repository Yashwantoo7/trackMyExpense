import React, { createContext, useState } from 'react'
import { expenseCategories, incomeCategories, resetCategories } from '../constants/categories';
import { formateDate } from '../utils';

export const TransactionContext = createContext();

const TransactionContextProvider = (props) => {

    const inititalState={
        trans:localStorage.getItem('transactions')?JSON.parse(localStorage.getItem('transactions')):[],
        user:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):{},
        loggedIn:localStorage.getItem('loggedIn')?JSON.parse(localStorage.getItem('loggedIn')):false
    }
    const [transactions,setTransactions]=useState(inititalState.trans);
    const [transactionType,setTransactoinType]=useState('Income')
    const [category,setCategory]=useState('Business');
    const [amount,setAmount] = useState(0);
    const [date,setDate] = useState(formateDate(new Date()));
    const [signin,setSignin] = useState(inititalState.loggedIn)
    const [userInfo,setUserInfo] = useState(inititalState.user);
    const [totalIncome,setTotalIncome] = useState(0);
    const [totalExpense,setTotalExpense] = useState(0);

    const findChartData = (trans,title)=>{
        resetCategories();
         const transactionsIncomeType = trans.filter((t)=>t.type===title);
        const total = Number(transactionsIncomeType.reduce((acc,t)=>acc+=Number(t.amount),0));
        const categories=title==='Income'?incomeCategories:expenseCategories;
        transactionsIncomeType.forEach((t)=>{
            const category = categories.find((c)=>c.type===t.category);
            if(category)category.amount+=Number(t.amount);
        })
        if(title==='Income'){
            setTotalIncome(total)
        }
        else{
            setTotalExpense(total);
        }
        const filteredCategories = categories.filter((t)=>t.amount>0);

        const chartData={
            datasets:[{
                data:filteredCategories.map((c)=>c.amount),
                backgroundColor:filteredCategories.map((c)=>c.color)
            }],
            labels: filteredCategories.map((c)=>c.type)
        }
        return {total,chartData}
    }

    return (
        <TransactionContext.Provider
            value={{
                transactions,setTransactions,
                transactionType,setTransactoinType,
                category,setCategory,
                amount,setAmount,
                date,setDate,
                findChartData,
                signin,setSignin,
                userInfo,setUserInfo,
                totalExpense,setTotalExpense,
                totalIncome,setTotalIncome
            }}>
            {props.children}
        </TransactionContext.Provider>
    )
}

export default TransactionContextProvider
