import React from 'react';
import {useParams} from "react-router";

const GitHubUser = () => {
    const {username} = useParams();

    return (
        <div>
            User with username or id: {username}
        </div>
    );
};

export default GitHubUser;