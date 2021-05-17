import React from 'react'
import { Route, Switch } from 'react-router'
import ExpenseDetails from './components/Expense/ExpenseDetails'
import Home from './components/Home'
import IncomeDetails from './components/Income/IncomeDetails'

const App = () => {
  return (
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/incomedetails' exact component={IncomeDetails}/>
        <Route path='/expensedetails' exact component={ExpenseDetails}/>        
      </Switch>
  )
}

export default App
