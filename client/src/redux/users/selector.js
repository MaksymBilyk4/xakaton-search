import {useSelector} from "react-redux";

const gitHubUsers = useSelector(state => state.users.gitHubUsers.data);
const gitHubUsersPage = useSelector(state => state.users.gitHubUsers.page);
const gitHubUsersPageSize = useSelector(state => state.users.gitHubUsers.pageSize);