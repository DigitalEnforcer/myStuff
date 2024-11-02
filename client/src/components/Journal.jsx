import { UserContext } from "../context/UserProvider"
import { useContext } from "react"

export default function Journal(props){
    const {title, description, _id} = props
    const {deleteJournal} = useContext(UserContext)
    return(
        <div className="goal-item">
            <h2>{title}</h2>
            <p>{description}</p>
            <button className="delete-btn" onClick={() => deleteJournal(_id)}>Delete</button>
        </div>
    )
}