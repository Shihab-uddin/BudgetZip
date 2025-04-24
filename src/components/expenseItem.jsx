import {Link, useFetcher, Form} from "React-router-dom";
import { formarDate, formatCurrency, getAllMatchingItems } from "../helper"
import { TrashIcon } from "@heroicons/react/24/solid";

const ExpenseItem = ({expense})=>{
    const fetcher = useFetcher()
    const budget = getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: expense.budgetId
    })[0]
    // console.log(budget)

    return(
        <>
            <td>{expense.name}</td>
            <td>{formatCurrency(expense.amount)}</td>
            <td>{formarDate(expense.createdAt)}</td>
            <td>
                <Link to={`/budget/${budget.id}`}>
                    {budget.name}
                </Link>
            </td>
            <td>
                <fetcher.Form method="POST">
                    <input type="hidden" name="_action" value="deleteExpense" />
                    <input type="hidden" name="expenseId" value={expense.id} />
                    <button type="submit" className="btn btn--warning">
                        <TrashIcon width={20}/>
                    </button>
                </fetcher.Form>
            </td>
        </>
    )
}
export default ExpenseItem