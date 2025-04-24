import {redirect} from "React-router-dom";
import { deleItem } from "../helper";
import { toast } from "react-toastify";

export async function logoutAction(){

    deleItem({
        key:"userName"
    })
    deleItem({
        key:"budgets"
    })
    deleItem({
        key:"expenses"
    })
    
    toast.success("you've deleted your account successfully!")
    return redirect("/")
}