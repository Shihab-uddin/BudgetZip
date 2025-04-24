import {createBrowserRouter, RouterProvider} from "React-router-dom";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard, { dashboardAction, dashboardLoader } from "./pages/dashboard";
import Error from "./pages/error";
import Main, {mainLoader} from "./layouts/main";
import { logoutAction } from "./actions/logout";
import ExpensesPage, {expenseAction, expensePageLoader} from "./pages/expensesPage";
import BudgetPage, { budgetLoader } from "./pages/budgetPage";

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensePageLoader,
        action: expenseAction,
        errorElement: <Error />
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        errorElement: <Error />
      },
      {
        path:"logout",
        action: logoutAction
      }
    ]
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
      <ToastContainer />
    </div>
  )
}

export default App
