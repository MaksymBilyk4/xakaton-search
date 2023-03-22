import axios from "axios";

const GIT_HUB_API_URL = "https://api.github.com/";

export const gitHubApi = axios.create({
    baseURL: GIT_HUB_API_URL,
});

