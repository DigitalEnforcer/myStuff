import React, {useState} from 'react';


function Form(props) {


    const initState = {username:'', password:''}

    const [formData, setFormData] = useState(initState)

    const {isMember, submit, errMsg} = props

    function handleChange(e){
        const {name, value} = e.target 
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        submit(formData)
    }
    return ( 
     
            <form name = 'auth-form' id = 'auth-form' onSubmit={handleSubmit}>

                <input 
                    className="usernameInput"
                    placeholder="username" 
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input 
                    className="passwordInput"
                    type="password"
                    placeholder='password' 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button className="login-button">{isMember ? "Login" : "Signup"}</button>
                <p className="errorMsg">{errMsg}</p>
            </form>
       
     );
}

export default Form;