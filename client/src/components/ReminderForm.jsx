import { useState, useContext } from 'react'
import { UserContext } from "../context/UserProvider"

export default function ReminderForm(props){
    const {addReminder} = useContext(UserContext)

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
        addReminder(formData)
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
                rows={5}
            />
            {/* <label>
                Important:
                <input
                    type="checkbox"
                    name="important"
                    checked={formData.important}
                    onChange={handleChange}
                />
            </label> */}

            <button type="submit">Submit</button>
        </form>
    )
}