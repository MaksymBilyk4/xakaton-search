import {gitHubApi} from "./API";

export const getHubUsers = async (query, page, pageSize) => await gitHubApi.get(`search/users?q=${query}&per_page=${pageSize}&page=${page}`);
export const getGitHubOptionalInfo = async (url) => await gitHubApi.get(url)