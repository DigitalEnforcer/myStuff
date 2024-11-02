import Reminder from "./Reminder"

export default function ReminderList(props){

    const {reminders} = props
    
    const reminderElements = reminders.map(reminder => {
        return(
            <Reminder {...reminder} key={reminder._id}/>
        )
    })
    return(
        <div className="goal-container">
            {reminderElements.reverse()}
        </div>
    )
}