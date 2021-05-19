import React, { createContext, useState } from 'react'
import { expenseCategories, incomeCategories, resetCategories } from '../constants/categories';
import { formateDate } from '../utils';

export const TransactionContext = createContext();

const TransactionContextProvider = (props) => {

    const [transactions,setTransactions]=useState([{"amount":77,"category":"Lottery","type":"Income","date":"2021-02-14","id":"34f1bba5-6c49-43f1-9a00-8a1d07363e85"},{"amount":55,"category":"Shopping","type":"Expense","date":"2021-02-14","id":"708e9bf9-709b-4ed3-b095-05dc6393cb55"}]);
    const [transactionType,setTransactoinType]=useState('Income')
    const [category,setCategory]=useState('Business');
    const [amount,setAmount] = useState(0);
    const [date,setDate] = useState(formateDate(new Date()));
    const [signin,setSignin] = useState(false)
    const [userInfo,setUserInfo] = useState({});

    const findChartData = (trans,title)=>{
        resetCategories();
         const transactionsIncomeType = trans.filter((t)=>t.type===title);
        const total = Number(transactionsIncomeType.reduce((acc,t)=>acc+=Number(t.amount),0));
        const categories=title==='Income'?incomeCategories:expenseCategories;
        transactionsIncomeType.forEach((t)=>{
            const category = categories.find((c)=>c.type===t.category);
            if(category)category.amount+=Number(t.amount);
        })

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
            }}>
            {props.children}
        </TransactionContext.Provider>
    )
}

export default TransactionContextProvider
