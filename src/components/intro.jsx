import {Form} from "React-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";

import illustration from "../assets/illustration.jpg"


const Intro = ()=>{
    return(
        <div className="intro">
            <div>
                <h1>Take Control of <span className="accent">Your Money!</span></h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium vitae voluptatum nihil numquam quaerat. Maiores, provident rerum soluta eligendi voluptas sit omnis repellendus et iusto! Eaque eos optio neque impedit.</p>
                <Form method="POST" >
                    <input type="text" name="userName" required placeholder="Enter your name.." aria-label="your names" />
                    <input type="hidden" name="_action" value="newUser"/>
                    <button type="submit" className="btn btn--dark">
                        <span>Create Account!</span>
                        <UserPlusIcon width={20} />
                    </button>
                </Form>
            </div> 
            <img src={illustration} alt="" />
        </div>
       
    )
}
export default Intro