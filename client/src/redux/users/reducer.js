import {ACTIONS} from "./action";

const INITIAL_STATE = {
    loading: false,

    gitHubUsers: {
        data: [],
        userCount: 0,
        page: 1,
        pageSize: 20
    },

    error: ""
}

export default (state = INITIAL_STATE, {payload, type}) => {
    switch (type) {
        case String(ACTIONS.findGitUsers.request):
            return {
                ...state,
                loading: true
            }
        case String(ACTIONS.findGitUsers.success):
            return {
                ...state,
                data: [...payload?.items],
                loading: false
            }
        case String(ACTIONS.findGitUsers.fail):
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state
    }
}