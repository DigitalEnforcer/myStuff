import Goal from "./Goal"

export default function GoalList(props){

    const {goals} = props
    
    const goalElements = goals.map(goal => {
        return(
            <Goal {...goal} key={goal._id}/>
        )
    })
    return(
        <div className="goal-container">
            {goalElements.reverse()}
        </div>
    )
}