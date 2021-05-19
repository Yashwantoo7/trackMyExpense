import React, { useContext, useEffect, useState } from 'react'
import { TransactionContext } from '../../context/TransactionContext';

import Axios from '../../api';
import { useHistory } from 'react-router';

const Signup = () => {
    const {transactions,signin,setSignin,userInfo,setUserInfo,setTransactions} = useContext(TransactionContext);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const history = useHistory();

    useEffect(()=>{
        if(signin){
            localStorage.setItem('userInfo',JSON.stringify(userInfo));
            localStorage.setItem('transactions',JSON.stringify(transactions))
            localStorage.setItem('loggedIn',JSON.stringify(true));
            
            history.push('/');       
        } 
    },[signin])

    const handleSignup=async (e)=>{
        e.preventDefault();
        try{
            if(name===''||email===''||password.length<5){
                return;
            }
            const {data} = await Axios.post('/api/signup',{name,email,password})
            if(data.userData){
                setUserInfo(data.userData)
                const id = data.userData.id;
                var income = await Axios.get(`/api/income/${id}`,{
                    headers:{Authorization:`Bearer ${data.userData.token}`}
                })
                income = income.data.data
                var expense = await Axios.get(`/api/expense/${id}`,{
                    headers:{Authorization:`Bearer ${data.userData.token}`}
                })
                expense = expense.data.data
                // const filteredIncome = 
                income=income.concat(expense)
                setTransactions(income);
                setSignin(true)
            };
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div className='auth-card'>
                <div className='card-body auth' >
                    <div className='title'><p>Sign-Up </p></div>
                    <form className='form-container'>
                        <label>Name</label>
                        <input type='name' placeholder='name' onChange={(e)=>setName(e.target.value)}/>
                        <label>Email</label>
                        <input type='email' placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
                        <label>Password</label>
                        <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
                        <button type='submit' onClick={(e)=>handleSignup(e)}>Signup</button>
                    </form>               
                </div>
        </div>
    )
}

export default Signup
