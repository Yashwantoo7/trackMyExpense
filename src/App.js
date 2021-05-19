import React from 'react'
import { Route, Switch } from 'react-router'
import ExpenseDetails from './components/Expense/ExpenseDetails'
import Home from './components/Home'
import IncomeDetails from './components/Income/IncomeDetails'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import PrivateRoute from './components/Routes/PrivateRoute';
import IncomeRoute from './components/Routes/IncomeRoute'
import ExpenseRoute from './components/Routes/ExpenseRoute'

const App = () => {
  return (
      <Switch>
        <PrivateRoute path='/' exact component={Home}/>
        <IncomeRoute path='/incomedetails' exact component={IncomeDetails}/>
        <ExpenseRoute path='/expensedetails' exact component={ExpenseDetails}/>        
        <Route path='/signin' exact component={Signin}/>
        <Route path='/signup' exact component={Signup}/>        
      </Switch>
  )
}

export default App
