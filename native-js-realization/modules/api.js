const API_URL = "https://api.github.com/"
const $USER_PER_PAGE = 20;

export class Api {

    async loadUsers(value, page) {
        return await fetch(`${API_URL}search/users?q=${value}&per_page=${$USER_PER_PAGE}&page=${page}`)
    }

    async loadUserData(login) {
        const urls = [
            `${API_URL}users/${login}/following`,
            `${API_URL}users/${login}/followers`,
            `${API_URL}users/${login}/repos`,
        ];

        const requests = urls.map(url => fetch(url));
        return Promise.all(requests)
            .then(res => Promise.all(res))
            .then(res => res.map(res => console.log(res.json())));
    }
}