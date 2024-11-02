import React, {useState, useContext} from 'react';
import {Link} from "react-router-dom"
import { UserContext } from '../context/UserProvider';

function Navbar(props) {
    const {token} = useContext(UserContext)
    const {logout} = props
    return ( 
        <nav>
            { token ?
                <>
                    <Link to = "/GoalPage">Goals</Link>
                    <Link to = "/public">Everyone's Goals</Link>
                    <Link to = "/JournalPage">Journal</Link>
                    <Link to = "/ReminderPage">Reminders</Link>
                    <Link to = "/WebsitePage">Fav Websites</Link>
                    <Link to = "/" onClick = {logout}>Logout</Link>
                </>
                : 
                <>
                    <div></div>
                </>
            }
        </nav>
     );
}

export default Navbar;