import React, {useContext, useEffect} from 'react';
import { UserContext } from '../context/UserProvider';
import JournalList from './JournalList';
import JournalForm from './JournalForm';

function JournalPage() {

    const {user, getUserJournals, journals} = useContext(UserContext)
    useEffect(() => {
        getUserJournals()
    }, [])
    
    return ( 
        <div>
            <div>
                <h1>{user.username}'s Journal </h1>
                <JournalForm />
            </div>

            <JournalList journals = {journals}/>
        </div>
     );
}

export default JournalPage;