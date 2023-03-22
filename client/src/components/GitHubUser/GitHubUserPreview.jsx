import React from 'react';
import PropTypes from "prop-types";
import {useNavigate} from "react-router";
import {PATH} from "../../utils/constants";

const GitHubUserPreview = ({image, login}) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`${PATH.GIT_HUB_PAGE.gitHubProfile(login)}`)}
            style={{display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer"}}
        >
            <img width={200} src={image} alt={login}/>
            <h4>{login}</h4>
        </div>
    );
};

GitHubUserPreview.propTypes = {
    image: PropTypes.string,
    login: PropTypes.string,
}

export default GitHubUserPreview;