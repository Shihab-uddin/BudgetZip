import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helper"

const BudgetItem = ({budget})=>{
    const{id, name, amount} = budget;
    const spent = calculateSpentByBudget(id)
    // console.log(spent);

    return(
        <div className="budget">
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{ formatCurrency(amount) } Budgeted</p>
            </div>
            <progress max={amount} value={spent}>
                {formatPercentage(spent/amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)} spent</small>
                <small>{formatCurrency(amount-spent)} remaining</small>
            </div>
        </div>
    )
}
export default BudgetItem