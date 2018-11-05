const mainContainer = document.getElementById('root');

export default class Search {
    constructor(store) {
        this.store = store;
        this.init = this.init.bind(this);
        this.onSearchEnter = this.onSearchEnter.bind(this);
    }

    addSearchInput() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        const title = document.createElement('span');
        title.innerText = 'Search by name: ';
        const input = document.createElement('input');
        input.className = 'search-input';
        input.placeholder = 'Enter user name...';
        input.addEventListener('input', this.onSearchEnter);

        searchContainer.appendChild(title);
        searchContainer.appendChild(input);
        mainContainer.appendChild(searchContainer);
    }

    onSearchEnter(event) {
        this.store.dispatch({
            type: 'SEARCH',
            data: event.target.value
        });
    }

    init() {
        this.addSearchInput();
    }
}
