export class View {
    constructor(api) {
        this.api = api;
        this.app = document.getElementById("app");

        this.title = this.createElement("h1", "title");
        this.title.textContent = "Search users"

        this.searcLine = this.createElement("div", "search-line");
        this.searchInput = this.createElement("input", "search-input");
        this.searchCounter = this.createElement("span", "counter");
        this.searcLine.append(this.searchInput);
        this.searcLine.append(this.searchCounter);

        this.usersWrapper = this.createElement("div", "users-wrapper");
        this.usersList = this.createElement("ul", "users");
        this.usersWrapper.append(this.usersList);

        this.main = this.createElement("div", "main");
        this.main.append(this.usersWrapper);

        this.loadMore = this.createElement("button", "btn");
        this.loadMore.textContent = "Загрузить ещё";
        this.loadMore.style.display = "none";
        this.usersWrapper.append(this.loadMore);

        this.app.append(this.title);
        this.app.append(this.searcLine);
        this.app.append(this.main);
    }

    createElement(elementTag, elementClass) {
        const element = document.createElement(elementTag);
        if (elementClass) element.classList.add(elementClass);
        return element;
    }

    renderUser(userData) {
        const userElement = this.createElement("li", "user-prev");
        userElement.addEventListener('click', () => this.showUserData(userData.login));
        userElement.innerHTML = `<img class="user-prev-photo" src="${userData.avatar_url}" alt="${userData.login}"/>
                                    <span class="user-prev-name">${userData.login}</span>`
        this.usersList.append(userElement);
    }

    showUserData(login) {
        const userEl = this.createElement('div', 'user');
        this.api.loadUserData(login)
            .then(res => console.log(res));
    }

    toggleLoadMoreBtn(show) {
        this.loadMore.style.display = show ? 'block' : 'none';
    }

    setCounterMessage(message) {
        this.searchCounter.textContent = message;
    }
}