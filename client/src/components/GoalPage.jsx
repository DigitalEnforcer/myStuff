import React, {useContext, useEffect} from 'react';
import { UserContext } from '../context/UserProvider';
import GoalList from './GoalList';
import GoalForm from './GoalForm';

function GoalPage() {

    const {user, getUserGoals, goals} = useContext(UserContext)
    useEffect(() => {
        getUserGoals()
    }, [])
    
    return ( 
        <div>
            <div>
                <h1>{user.username}'s Goals </h1>
                <GoalForm />
            </div>

            <GoalList goals = {goals}/>
        </div>
     );
}

export default GoalPage;