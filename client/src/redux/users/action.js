import {createActions} from "../../utils/createActions";
import {gitHubApi} from "../../services/API";

const actions = createActions(
    {
        async: ["FIND_GIT_USERS"]
    },
    {
        prefix: "users"
    }
);

export const ACTIONS = {
    ...actions.async
};

export const getGitHubUsers = (query, page, pageSize) => async (dispatch) => {
    try {
        dispatch(ACTIONS.findGitUsers.request());
        const data = await gitHubApi.get(`search/users?q=${query}&per_page=${pageSize}&page=${page}`);
        dispatch(ACTIONS.findGitUsers.success(data));
    } catch (e) {
        dispatch(ACTIONS.findGitUsers.fail(e));
    }
}