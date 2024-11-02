import { UserContext } from "../context/UserProvider"
import { useContext } from "react"

export default function Website(props){
    const {title, website, genre, _id} = props
    const {deleteWebsite} = useContext(UserContext)
    return(
        <div className="website-item">
            <h2>
                <a href ={`http://${website}`}> {title}</a>
            </h2>
            <p>
                <a href = {`http://${website}`}>{website}</a>
            </p>
            <h6>Genre: {genre}</h6>
            <button className="delete-btn" onClick={() => deleteWebsite(_id)}>Delete</button>
        </div>
    )
}