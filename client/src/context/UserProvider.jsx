import React, {useState} from "react"
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props){
    
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        goals: [],
        journals: [],
        reminders: [],
        websites: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)
    const [allGoals, setAllGoals] = useState([])

    async function signup(creds){
        try {
            const res = await axios.post('/api/auth/signup', creds)
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    user: user,
                    token: token
                }
            })
            console.log(res.data)
        } catch (error) {
            handleAuthErr(error.response.data.errMsg)
        }
    }

    async function login(creds){
        try {
            const res = await axios.post('/api/auth/login', creds)
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    user: user,
                    token: token
                }
            })
            console.log(res.data)
        } catch (error) {
            handleAuthErr(error.response.data.errMsg)
        }
    }

    async function logout(){
        try {
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    token: "",
                    user: {},
                    errMsg: ""
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    function handleAuthErr(errMsg){
        setUserState(prevUserState =>{
            return{
                ...prevUserState,
                errMsg
            }
        })
    }

    function resetAuthErr(){
        setUserState(prevUserState =>{
            return {
                ...prevUserState,
                errMsg: ""
            }
        })
    }
// ----------------------------------------Goals--------------------------------------------//
    async function getUserGoals(){
        try {
            const res = await userAxios.get('/api/main/goals/user')
            setUserState(prevState => {
                return {
                    ...prevState,
                    goals: res.data
                }
            })
        } catch (error) {
            console.log(error)   
        }
    }

    async function addGoal(newGoal){
        try {
            const res = await userAxios.post('/api/main/goals', newGoal)
            setUserState(prevState => {
                return {
                    ...prevState,
                    goals: [...prevState.goals, res.data]
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteGoal(goalId){
        try {
            const res = await userAxios.delete(`/api/main/goals/${goalId}`)
            setAllGoals(prevGoals => prevGoals.filter(goal => goal._id !== goalId))
            setUserState(prevState => {
                return {
                    ...prevState,
                    goals: prevState.goals.filter(goal => goal._id !== goalId)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
//------------------------------------Journal--------------------------------------//
    async function getUserJournals(){
        try {
            const res = await userAxios.get('/api/main/journals/user')
            setUserState(prevState => {
                return {
                    ...prevState,
                    journals: res.data
                }
            })
        } catch (error) {
            console.log(error)   
        }
    }

    async function addJournal(newJournal){
        try {
            const res = await userAxios.post('/api/main/journals', newJournal)
            setUserState(prevState => {
                return {
                    ...prevState,
                    journals: [...prevState.journals, res.data]
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteJournal(journalId){
        try {
            const res = await userAxios.delete(`/api/main/journals/${journalId}`)
            setUserState(prevState => {
                return {
                    ...prevState,
                    journals: prevState.journals.filter(journal => journal._id !== journalId)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
//------------------------------------Reminders------------------------------------//
    async function getUserReminders(){
        try {
            const res = await userAxios.get('/api/main/reminders/user')
            setUserState(prevState => {
                return {
                    ...prevState,
                    reminders: res.data
                }
            })
        } catch (error) {
            console.log(error)   
        }
    }

    async function addReminder(newReminder){
        try {
            const res = await userAxios.post('/api/main/reminders', newReminder)
            setUserState(prevState => {
                return {
                    ...prevState,
                    reminders: [...prevState.reminders, res.data]
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteReminder(reminderId){
        try {
            const res = await userAxios.delete(`/api/main/reminders/${reminderId}`)
            setUserState(prevState => {
                return {
                    ...prevState,
                    reminders: prevState.reminders.filter(reminder => reminder._id !== reminderId)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
//------------------------------------Websites-------------------------------------//
    async function getUserWebsites(){
        try {
            const res = await userAxios.get('/api/main/websites/user')
            setUserState(prevState => {
                return {
                    ...prevState,
                    websites: res.data
                }
            })
        } catch (error) {
            console.log(error)   
        }
    }

    async function addWebsite(newWebsite){
        try {
            const res = await userAxios.post('/api/main/websites', newWebsite)
            setUserState(prevState => {
                return {
                    ...prevState,
                    websites: [...prevState.websites, res.data]
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteWebsite(websiteId){
        try {
            const res = await userAxios.delete(`/api/main/websites/${websiteId}`)
            setUserState(prevState => {
                return {
                    ...prevState,
                    websites: prevState.websites.filter(website => website._id !== websiteId)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
//------------------------------------All User Goals-------------------------------//
    async function getAllUserGoals(){
        try {
            const res = await userAxios.get('/api/main/goals')
            setAllGoals(res.data)
        } catch (error) {
            console.log(error)
        }
    }
//---------------------------------Upvotes and Downvotes --------------------------//
async function handleUpVote(goalId){
    try {
        const res = await userAxios.put(`/api/main/goals/upvotes/${goalId}`) //don't need to send anything back
        console.log(res.data)
        setAllGoals(prevGoals => prevGoals.map(goal => goal._id === goalId ? res.data : goal))
        setUserState(prevUserState => {
            return {
                ...prevUserState,
                goals: prevUserState.goals.map(goal => goal._id === goalId ? res.data : goal)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

async function handleDownVote(goalId){
    try {
        const res = await userAxios.put(`/api/main/goals/downvotes/${goalId}`)
        setAllGoals(prevGoals => {
            return prevGoals.map(goal => goal._id === goalId ? res.data : goal)
        })
        setUserState(prevUserState => ({
            ...prevUserState,
            goals: prevUserState.goals.map(goal => goal._id === goalId ? res.data : goal)
        }))
    } catch (error) {
        console.log(error)
    }
}

    console.log(userState.user)
    return (
        <UserContext.Provider value = {{
            ...userState,
            signup,
            login,
            logout,
            addGoal,
            getUserJournals,
            addJournal,
            getUserReminders,
            addReminder,
            getUserWebsites,
            addWebsite,
            getUserGoals,
            getAllUserGoals,
            handleAuthErr,
            resetAuthErr,
            handleUpVote,
            handleDownVote,
            deleteGoal,
            deleteJournal,
            deleteReminder,
            deleteWebsite,
            allGoals}}>
            {props.children}
        </UserContext.Provider>
    )
}