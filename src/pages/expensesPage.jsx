import {useLoaderData} from "React-router-dom";
import { deleItem, fetchData } from "../helper";
import ExpenseTable from "../components/expenseTable";
import { toast } from "react-toastify";

//loader
export function expensePageLoader(){
    const expenses = fetchData("expenses");
    return{expenses}
}

//action
export async function expenseAction({request}){
    const data = await request.formData()
    const {_action, ...values} = Object.fromEntries(data)
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

const ExpensesPage = ()=>{
    const {expenses} = useLoaderData()
    // console.log(expenses);
    return(
        <div className="grid-lg">
            <h1>All expenses</h1>
            {expenses && expenses.length > 0 ? (
                    <div className="grid-md">
                        <h2>Recent Expenses <small>({expenses.length} Total)</small></h2>
                        <ExpenseTable expenses={expenses} />
                    </div>
                ):(
                    <p>No expenses to show!</p>
                )
            }
        </div>
    )
}
export default ExpensesPage