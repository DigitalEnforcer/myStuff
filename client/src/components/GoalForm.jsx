import { useState, useContext } from 'react'
import { UserContext } from "../context/UserProvider"

export default function GoalForm(props){
    const {addGoal} = useContext(UserContext)

    const {_id} = props

    const initState = {
        title: "",
        description: ""
    }

    const [formData, setFormData] = useState(initState)

    function handleChange(e){
        const {name, value} = e.target 
        setFormData(prevData => {
            return {
                ...prevData,
                [name]:value
            }
        })
    }

    function handleSubmit (e){
        e.preventDefault()
        addGoal(formData)
        setFormData(initState)
    }

    return (
        <form className = "form-container" onSubmit={handleSubmit}>
            <input 
                type="text"
                name="title"
                value={formData.title}
                placeholder="title"
                onChange={handleChange}
                required
            />
            <textarea
                type="text"
                name="description"
                value={formData.description}
                placeholder="description"
                onChange={handleChange}
                required
                rows={6}
            />

            <button type = "submit" className="submitButton">Submit</button>
        </form>
    )
}