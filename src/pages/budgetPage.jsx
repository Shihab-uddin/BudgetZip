import { getAllMatchingItems } from "../helper"
import {useLoaderData} from "React-router-dom";
import BudgetItem from "../components/budgetItem";
import AddExpenseForm from "../components/addExpenseForm";
import ExpenseTable from "../components/expenseTable";

//loader
export async function budgetLoader({params}) {
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id
    })[0];
    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id
    });

    if(!budget){
        throw new Error("The wallet you're looking for doesn't exists!")
    }
    return {budget, expenses}
}

const BudgetPage = ()=>{
    const {budget, expenses} = useLoaderData();
    return(
        <div className="grid-lg">
            <h1 className="h2">
                <span className="accent">{budget.name} </span>
                 wallet overview
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} />
                <AddExpenseForm budgets={[budget]} />
            </div>
            {
                expenses && expenses.length > 0 &&(
                    <div className="grid-md">
                        <h2><span className="accent">{budget.name} </span>expanses</h2>
                        <ExpenseTable expenses={expenses} />
                    </div>
                )
            }
        </div>
    )
}
export default BudgetPage