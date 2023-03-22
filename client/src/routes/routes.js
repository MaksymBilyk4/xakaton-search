import {PATH} from "../utils/constants";
import GitHub from "../pages/GitHubPage/GitHub";
import LinkedIn from "../pages/LinkedInPage/LinkedIn";
import GitHubUser from "../pages/GitHubUserPage/GitHubUser";

export const routes = () => [
    {
        path: PATH.GITHUB,
        element: <GitHub/>
    },
    {
        path: PATH.LINKEDIN,
        element: <LinkedIn/>
    },
    {
        path: PATH.GIT_HUB_PAGE.GIT_HUB_PROFILE,
        element: <GitHubUser/>
    }
]