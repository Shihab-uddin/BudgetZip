import {Link, useLoaderData} from "React-router-dom";
import { createBudget, createExpense, fetchData, deleItem } from "../helper";
import Intro from "../components/intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/addBudgetForm";
import AddExpenseForm from "../components/addExpenseForm";
import BudgetItem from "../components/budgetItem";
import ExpenseTable from "../components/expenseTable";

//loader
export function dashboardLoader(){
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return{userName, budgets, expenses}
}

//action
export async function dashboardAction({request}){
    const data = await request.formData()
    const {_action, ...values} = Object.fromEntries(data)

    //new user submission
    if (_action == "newUser"){
        try{
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success(`      , ${values.userName}`)
        }catch{
            throw new Error("There was an error creating your account!")
        }
    }
    //new budget submission
    if(_action == "createBudget"){
        try{
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount
            })
            return toast.success("budget Created Successfully!")
        }catch{
            throw new Error("There was an error adding your budget!")
        }
    }
    //new expense submission
    if(_action == "createExpense"){
        try{
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpensebudget
            })
            return toast.success(`Expense ${values.newExpense} created!`)
        }catch{
            throw new Error("There was an error adding your budget!")
        }
    }

    //delete expense
    if(_action == "deleteExpense"){
        try{
            deleItem({
                key: "expenses",
                id: values.expenseId
            })
            return toast.success("Expense Deleted!")
        }catch{
            throw new Error("There was an error adding your budget!")
        }
    }
}

const Dashboard = ()=> {

    const {userName, budgets, expenses} = useLoaderData()

    return(
        <div>
            {userName ? (
                <div className="dashboard">
                    <h1>Welcome Back, <span className="accent">{userName}</span></h1>
                    <div className="grid-sm">
                        { budgets && budgets.length > 0 ? (
                            <div className="grid-lg">
                                <div className="flex-lg">
                                    <AddBudgetForm />
                                    <AddExpenseForm budgets={budgets} />
                                </div>
                                <h2>All Wallets</h2>
                                <div className="budget">
                                    {
                                        budgets.map((budget)=>(
                                            <BudgetItem key={budget.id} budget={budget}/>
                                        ))
                                    }
                                </div>
                                {
                                    expenses && expenses.length > 0 && (
                                        <div className="grid-md">
                                            <h2>Recent Expenses</h2>
                                            <ExpenseTable expenses={expenses.sort((a,b)=>b.createdAt-a.createdAt).slice(0,6)}/>
                                                {expenses.length > 6 && (
                                                    <Link to="expenses" className="btn btn--dark">
                                                        View all expenses
                                                    </Link>
                                                )}
                                        </div>
                                    )
                                }
                            </div>
                        ): (
                            <div className="grid-sm">
                                <p>Create your first wallet to get started!</p>
                                <AddBudgetForm />
                            </div>
                        )}
                        
                    </div>
                </div>
                
            ) : <Intro />}
        </div>
    )
}
export default Dashboard;