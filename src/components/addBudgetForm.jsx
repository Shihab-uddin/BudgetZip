import { useEffect, useRef } from "react";
import {Form, useFetcher} from "React-router-dom"

const AddBudgetForm = ()=>{
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const formRef = useRef();
    const focusRef = useRef();
    
    useEffect(()=>{
        if(!isSubmitting){
            formRef.current.reset()
            focusRef.current.focus()
        }
    }, [isSubmitting])

    return(
        <div className="form-wrapper">
            <h2 className="h3">Create Wallet</h2>
            <fetcher.Form method="POST" className="grid-sm" ref={formRef}>
                <div className="grid-xs">
                    <label htmlFor="newBudget">Wallet Name</label>
                    <input type="text" name="newBudget" id="newBudget" placeholder="e.g : Groceries" ref={focusRef}/>
                </div>
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount</label>
                    <input type="number" step="0.01" name="newBudgetAmount" id="newBudgetAmount" />
                </div>
                <input type="hidden" name="_action" value="createBudget" />
                <button type="submit" className="btn btn--dark">
                    <span>Create wallet</span>
                </button>
            </fetcher.Form>
        </div>
    )
}
export default AddBudgetForm