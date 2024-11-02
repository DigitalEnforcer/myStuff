import React, {useState, useContext} from 'react';
import Form from './Form';
import { UserContext } from '../context/UserProvider';


function Auth() {

  const {login, signup, errMsg, resetAuthErr} = useContext(UserContext)

    const [isMember, setIsMember] = useState(true)

    const toggleForm = () => {
        setIsMember(!isMember)
        resetAuthErr()
    }

    return ( 
        <div id = "auth-div">
          <div className="title-container">
                <h1 className="title">Welcome to myStuff</h1>
                <p className="catchphrase">Where you can keep all of your favorite things in ONE place</p>
            </div>
        {
          isMember ? 
          
          <div className="login">
            <Form 
              isMember = {isMember} 
              submit={login}
              errMsg = {errMsg}
            /> 
            <button onClick = {toggleForm} >Create a myStuff account?</button>
                 
          </div>
          
          : 
          
          <div className="login">
            <Form 
              isMember = {isMember} 
              submit={signup}
              errMsg = {errMsg}
            /> 
            <button onClick = {toggleForm}>Already a myStuff member?</button>
                   
          </div>
        }
        
     
       
        </div>
     );
}

export default Auth;