export class Search {

    setCurrentPage(pageNumber) {
        this.currentPage = pageNumber;
    }

    setUserCount(count) {
        this.usersCount = count;
    }

    constructor(view, api, log) {
        this.view = view;
        this.api = api;
        this.log = log;

        this.view.searchInput.addEventListener('keyup', this.debounce(this.loadUsers.bind(this), 500));
        this.view.loadMore.addEventListener('click', this.loadMoreUsers.bind(this));
        this.currentPage = 1;
        this.usersCount = 0;
    }

    async loadUsers() {
        this.view.setCounterMessage('');
        this.setCurrentPage(1);

        if (this.view.searchInput.value) {
            this.clearUsers();
            this.usersRequest(this.view.searchInput.value);
        } else {
            this.clearUsers();
            this.view.toggleLoadMoreBtn(false);
        }

    }

    loadMoreUsers() {
        this.setCurrentPage(this.currentPage + 1);
        this.usersRequest(this.view.searchInput.value);
    }

    async usersRequest(searchValue) {
        let totalCount;
        let users;
        let message;

        try {
            await this.api.loadUsers(searchValue, this.currentPage)
                .then((res) => {
                    if (res.ok) {
                        res.json().then(res => {
                            totalCount = res?.total_count;
                            users = res?.items;
                            message = this.log.counterMessage(totalCount);
                            this.setUserCount(this.usersCount + res?.items.length);
                            this.view.setCounterMessage(message);
                            this.view.toggleLoadMoreBtn(totalCount > 20 && users * this.currentPage !== totalCount);
                            users?.forEach(user => this.view.renderUser(user))

                        });
                    }
                })
        } catch (e) {
            console.log("Error ===> ", e);
        }

    }

    clearUsers() {
        this.view.usersList.innerHTML = '';
    }

    debounce(func, wait, imm) {
        let timeout;
        return function () {
            const context = this, args = arguments
            const later = () => {
                timeout = null;
                if (!imm) func.apply(context, args);
            };
            const callNow = imm && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        }
    }
}