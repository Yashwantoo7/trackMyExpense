import React, { useContext, useEffect, useState } from 'react'
import { TransactionContext } from '../../context/TransactionContext'
import Axios from '../../api';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Signin = () => {
    const {transactions,signin,setSignin,userInfo,setUserInfo,setTransactions} = useContext(TransactionContext);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const history = useHistory();

    useEffect(()=>{
        if(signin){
            localStorage.setItem('userInfo',JSON.stringify(userInfo));
            localStorage.setItem('transactions',JSON.stringify(transactions))
            localStorage.setItem('loggedIn',JSON.stringify(true))
            
            history.push('/');       
        } 
    },[signin])

    const handleSignin=async (e)=>{
        e.preventDefault();
        try{
            const {data} = await Axios.post('/api/signin',{email,password})
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
                    <div className='title'><p>Sign-In </p></div>
                    <form className='form-container'>
                        <label>Email</label>
                        <input type='email' placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
                        <label>Password</label>
                        <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
                        <button type='submit' onClick={(e)=>handleSignin(e)}>Signin</button>
                    </form>   
                    <Link className='signup-link' to='signup'>Signup</Link>            
                </div>
               
        </div>
    )
}

export default Signin
