import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {getGitHubOptionalInfo, getHubUsers} from "../../services/gitHubApi";
import {Link} from "react-router-dom";
import {GIT_HUB_API_URL} from "../../services/API";
import {PATH} from "../../utils/constants";
import Loader from "../../components/Loader/Loader";
import {LeftOutlined} from "@ant-design/icons"
import {Button, Result} from "antd";

const GitHubUser = () => {
    const {username} = useParams();
    const [userData, setUserData] = useState({});
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const linkStyles = {
        color: "black", fontSize: "16px"
    }

    useEffect(() => {
        setLoading(true);
        getHubUsers(username, 1, 1)
            .then(r => {
                if (r?.data.total_count > 0) {
                    const userData = r.data.items[0];
                    setUserData(userData);

                    getGitHubOptionalInfo(userData?.repos_url?.replace(GIT_HUB_API_URL, ""))
                        .then(res => setRepos(res?.data));
                    getGitHubOptionalInfo(userData?.following_url?.replace(GIT_HUB_API_URL, "").replace("{/other_user}", ""))
                        .then(res => setFollowings(res?.data));
                    getGitHubOptionalInfo(userData?.followers_url?.replace(GIT_HUB_API_URL, ""))
                        .then(res => setFollowers(res?.data))
                        .then(() => setLoading(false));
                }else {
                    setError(true)
                }
            })
        ;
    }, [username]);

    if (error) {
        return <Result
            title="No user found"
            extra={
                <Button onClick={() => navigate(PATH.GITHUB)} type="primary" key="back">
                    Go to 'Git Hub' page
                </Button>
            }
        />
    }

    return (
        <div className={"container"}>
            {loading ? <Loader/> :
                <>
                    <h2 style={{fontWeight: "bold", fontSize: "28px", margin: "20px", cursor: "pointer"}}
                        onClick={() => navigate(-1)}><LeftOutlined/> Back</h2>
                    <div style={{display: "flex", justifyContent: "flex-start"}}>
                        <img src={userData?.avatar_url} alt={username}/>
                        <div style={{padding: "0 0 0 50px"}}>
                            <h2>{username}</h2>
                            <a
                                style={linkStyles}
                                target={"_blank"}
                                href={userData?.html_url}
                            >
                                Git Hub Profile
                            </a>

                            <p>Followers: [
                                {followers.map(f =>
                                    <Link style={linkStyles}
                                          to={PATH.GIT_HUB_PAGE.gitHubProfile(f.login)}>{f.login}, </Link>
                                )}
                                ]
                            </p>

                            <p>Followings: [
                                {followings.map(f =>
                                    <Link style={linkStyles}
                                          to={PATH.GIT_HUB_PAGE.gitHubProfile(f.login)}>{f.login}, </Link>
                                )}
                                ]
                            </p>
                        </div>
                    </div>

                    <p>Repos: [
                        {repos?.map(repo =>
                            <a key={repo.id} style={linkStyles} href={repo.html_url} target={"_blank"}>{repo.name}, </a>
                        )} ]
                    </p>
                </>
            }

        </div>
    );
};

export default GitHubUser;