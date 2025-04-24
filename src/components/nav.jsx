import logo from "../assets/logomark.svg";
import {Form,NavLink} from "React-router-dom";

import {TrashIcon} from '@heroicons/react/24/solid'

const Nav = ({userName})=>{
    return(
        <nav>
            <NavLink
            to="/"
            aria-label="go to home"
            >
                <img src={logo} alt="" height={30}/>
                <span>Budgetzip</span>
            </NavLink>
            {
                userName && (
                    <Form method="POST" action="/logout" 
                    onSubmit={
                        (event)=>{
                            if(!confirm("Delete user and all data?")){
                                event.preventDefault()
                            }
                        }
                    }>
                        <button type="submit" className="btn btn--warning">
                            <span>Delete User</span>
                            <TrashIcon width={20} />
                        </button>
                    </Form>
                )
            }
        </nav>
        
    )
}
export default Nav