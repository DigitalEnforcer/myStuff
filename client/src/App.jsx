import react, {useContext} from "react"
import Auth from "./components/Auth"
import GoalPage from "./components/GoalPage"
import JournalPage from "./components/JournalPage"
import ReminderPage from "./components/ReminderPage"
import WebsitePage from "./components/WebsitePage"
import Public from "./components/Public"
import Navbar from "./components/Navbar"
import { Routes, Route, Navigate } from "react-router-dom"
import { UserContext } from "./context/UserProvider"

export default function App() {

  const {token, logout} = useContext(UserContext)
  return (
    <>
      <Navbar logout ={logout}/>
      <div id="app">
        <Routes>
          <Route path="/" element={token ? <Navigate to = "/GoalPage" /> : <Auth />} />
          <Route path="/GoalPage" element={token ? <GoalPage /> : <Navigate to = "/"/>} />
          <Route path="/JournalPage" element={token ? <JournalPage /> : <Navigate to = "/"/>} />
          <Route path="/ReminderPage" element={token ? <ReminderPage /> : <Navigate to = "/"/>} />
          <Route path="/WebsitePage" element={token ? <WebsitePage /> : <Navigate to = "/"/>} />
          <Route path="/Public" element={token ? <Public /> : <Navigate to = "/"/>} />
        </Routes>
      </div>

    </>
  )
}