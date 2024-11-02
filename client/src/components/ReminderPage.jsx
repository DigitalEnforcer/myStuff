import React, {useContext, useEffect} from 'react';
import { UserContext } from '../context/UserProvider';
import ReminderList from './ReminderList';
import ReminderForm from './ReminderForm';

function ReminderPage() {

    const {user, getUserReminders, reminders} = useContext(UserContext)
    useEffect(() => {
        getUserReminders()
    }, [])
    
    return ( 
        <div>
            <div>
                <h1>{user.username}'s Reminders </h1>
                <ReminderForm />
            </div>

            <ReminderList reminders = {reminders}/>
        </div>
     );
}

export default ReminderPage;