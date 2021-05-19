import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router';
import { TransactionContext } from '../../context/TransactionContext'

const ExpenseRoute = ({component:Component,...rest}) => {
    const {signin} = useContext(TransactionContext);

    return (
        <Route {...rest} render={(props)=>
            signin?(<Component {...props}></Component>):
            (<Redirect to ='/signin'/>)
        }></Route>
    )
}

export default ExpenseRoute
