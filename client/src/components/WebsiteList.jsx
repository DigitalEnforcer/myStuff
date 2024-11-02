import Website from "./Website"

export default function WebsiteList(props){

    const {websites} = props
    
    const websiteElements = websites.map(website => {
        return(
            <Website {...website} key={website._id}/>
        )
    })
    return(
        <div>
            {websiteElements.reverse()}
        </div>
    )
}