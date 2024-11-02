import { useState, useContext } from 'react'
import { UserContext } from "../context/UserProvider"

export default function WebsiteForm(props){
    const {addWebsite} = useContext(UserContext)

    const {_id} = props

    const initState = {
        title: "",
        website: "",
        genre: ""
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
        addWebsite(formData)
        setFormData(initState)
    }

    return (
        <form className = "webform-container" onSubmit={handleSubmit}>
            <input 
                type="text"
                name="title"
                value={formData.title}
                placeholder="website Name"
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="website"
                value={formData.website}
                placeholder="website address"
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="genre"
                value={formData.genre}
                placeholder="genre"
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    )
}