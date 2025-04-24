import ExpenseItem from "./expenseItem"

const ExpenseTable = ({expenses})=>{
    // console.log(expenses)
    return(
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {
                            ["Name", "Amount", "Date", "Wallet Name", ""].map((i, index)=>(
                                <th key={index}>{i}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses.map((expense)=>(
                            <tr key={expense.id}> 
                                <ExpenseItem expense={expense}/>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default ExpenseTable