import React, {useContext, useEffect} from 'react';
import { UserContext } from '../context/UserProvider';
import WebsiteList from './WebsiteList';
import WebsiteForm from './WebsiteForm';

function WebsitePage() {

    const {user, getUserWebsites, websites} = useContext(UserContext)
    useEffect(() => {
        getUserWebsites()
    }, [])
    
    return ( 
        <div>
            <div>
                <h1>{user.username}'s Favorite Websites</h1>
                <WebsiteForm />
            </div>

            <WebsiteList websites = {websites}/>
        </div>
     );
}

export default WebsitePage;