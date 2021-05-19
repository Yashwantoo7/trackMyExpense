import React, { useContext, useEffect, useState } from 'react'
import { TransactionContext } from '../../context/TransactionContext'
import Axios from '../../api';
import { useHistory } from 'react-router';

const Signin = () => {
    const {signin,setSignin,setUserInfo,setTransactions} = useContext(TransactionContext);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const history = useHistory();

    useEffect(()=>{
        if(signin){
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
                setTransactions([income,expense]);
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
                    <div className='title'><p>Signin </p></div>
                    <form className='form-container'>
                        <label>Email</label>
                        <input type='email' placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
                        <label>Password</label>
                        <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
                        <button type='submit' onClick={(e)=>handleSignin(e)}>Signin</button>
                    </form>               
                </div>
        </div>
    )
}

export default Signin
