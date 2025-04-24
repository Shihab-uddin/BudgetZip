import { useEffect, useRef } from "react";
import {Form, useFetcher} from "React-router-dom"




const AddExpenseForm = ({budgets})=>{
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";


    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if (!isSubmitting) {
          // clear form
          formRef.current.reset()
          // reset focus
          focusRef.current.focus()
        }
    
      }, [isSubmitting])

    return(
        <div className="form-wrapper">
            <h2 className="h3">Add new {" "}
                <span className="accent">
                    {budgets.length === 1 && `${budgets.map((budg)=>budg.name)}`}
                </span>{" "} Expense
            </h2>

            <fetcher.Form method="POST" className="grid-sm" ref={formRef}>
                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input type="text" name="newExpense" id="newExpense" ref={focusRef} required placeholder="e.g: coffee"/>
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Expense Amount</label>
                        <input type="number" name="newExpenseAmount" id="newExpenseAmount" required/>
                    </div>
                </div>
                <div className="grid-xs" hidden={budgets.length === 1}>
                    <label htmlFor="newExpensebudget">Choose Wallet</label>
                    <select name="newExpensebudget" id="newExpensebudget"  required>
                        {
                            budgets
                            .sort((a, b) => a.createdAt - b.createdAt)
                            .map((budget) => {
                              return (
                                <option key={budget.id} value={budget.id}>
                                  {budget.name}
                                </option>
                              )
                            })
                        }
                    </select>
                </div>
                <input type="hidden" name="_action" value="createExpense" />
                <button type="submit" className="btn btn--dark">
                    <span>Add expense</span>
                </button>
            </fetcher.Form>
        </div>
    )
}
export default AddExpenseForm;