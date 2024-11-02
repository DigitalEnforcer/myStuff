import Journal from "./Journal"

export default function JournalList(props){

    const {journals} = props
    
    const journalElements = journals.map(journal => {
        return(
            <Journal {...journal} key={journal._id}/>
        )
    })
    return(
        <div className="goal-container">
            {journalElements.reverse()}
        </div>
    )
}