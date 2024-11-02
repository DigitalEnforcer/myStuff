import { UserContext } from "../context/UserProvider"
import { useContext } from "react"
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export default function Goal(props){

    const {title, description, _id, username, userId, upvotes, downvotes} = props
    const {user, handleUpVote, handleDownVote, deleteGoal} = useContext(UserContext)
    console.log("userId:", userId)

    let isUser = userId === user._id

    return(
        <div className ="goal-item">
            <p>{username}</p>
            <h2>{title}</h2>
            <p>{description}</p>
            <div className="votes">
                <span>{upvotes.length}</span>
                <FaThumbsUp 
                    className="icon" 
                    onClick={() => handleUpVote(_id)} 
                />
                <span >{downvotes.length}</span>
                <FaThumbsDown 
                style={{position: "relative", top: "5px"}}
                    className="icon" 
                    onClick={() => handleDownVote(_id)} 
                />
                
            </div>
            {/* <button onClick={()=> handleUpVote(_id)}>upvote</button>
            <span >{upvotes.length}</span>
            <button onClick={()=> handleDownVote(_id)}>downvote</button>
            <span>{downvotes.length}</span> */}
            { isUser && (
                <>
                <button className="delete-btn" onClick={() => deleteGoal(_id)}>Delete</button>
                </>
            )}
        </div>
    )
}