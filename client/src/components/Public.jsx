import React, {useEffect, useContext} from 'react';
import { UserContext } from '../context/UserProvider';
import GoalList from './GoalList';

function Public() {

    const{getAllUserGoals, allGoals} = useContext(UserContext)

    useEffect(()=>{
        getAllUserGoals()
    },[])

    return ( 
        <div>
            <GoalList goals={allGoals}/>
        </div>
     );
}

export default Public;