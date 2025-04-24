// local storagee files

export const fetchData = (key)=> {
    return JSON.parse(localStorage.getItem(key));

};

export const deleItem = ({key, id})=>{
    const existingData = fetchData(key);
    if(id){
        const newData = existingData.filter((item)=>item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key)
}


export const createBudget = ({name, amount})=>{
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount
    }
    const existingBudget = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudget, newItem]))
}

export const createExpense = ({name, amount, budgetId})=>{
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
      // check if expense.id === budgetId I passed in
      if (expense.budgetId !== budgetId) return acc
  
      // add the current amount to my total
      return acc += expense.amount
    }, 0)
    return budgetSpent;
  }

//format currency
export const formatCurrency = (amt)=>{
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "BDT"
    })
}

//format percentage
export const formatPercentage = (amt)=>{
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    })
}

//format date
export const formarDate = (epoch)=>
    new Date(epoch).toLocaleString();


// get all matching items
export const getAllMatchingItems = ({category, key, value})=>{
    const data = fetchData(category) ?? [];
    return data.filter((item)=> item[key] === value);
}