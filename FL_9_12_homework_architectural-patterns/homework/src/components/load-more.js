import {getCurrentUsers, getFilteredUsers} from '../utils/utils';
const mainContainer = document.getElementById('root');

export default class LoadMore {
    constructor(store) {
        this.store = store;
        this.init = this.init.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.countUpdate = this.countUpdate.bind(this);
    }

    addLoadMoreBlock() {
        const loadMoreContainer = document.createElement('div');
        loadMoreContainer.className = 'load-more-container';

        const loadMoreButton = document.createElement('button');
        loadMoreButton.innerText = 'Load more';
        loadMoreButton.className = 'btn-default';
        loadMoreButton.id = 'load-more';
        loadMoreButton.addEventListener('click', this.onLoadMore);

        const displayNumberContainer = document.createElement('div');
        displayNumberContainer.className = 'display-number';
        displayNumberContainer.id = 'display-number';

        loadMoreContainer.appendChild(displayNumberContainer);
        loadMoreContainer.appendChild(loadMoreButton);
        mainContainer.appendChild(loadMoreContainer);
    }

    onLoadMore() {
        this.store.dispatch({type: 'LOAD_USERS'});
    }

    countUpdate() {
        const usersShown = getCurrentUsers(this.store).length;
        const totalUsersAmount = getFilteredUsers(this.store).length;
        const displayNumber = document.getElementById('display-number');
        const countText = document.createElement('p');
        countText.innerHTML = `Displayed ${usersShown} users out of ${totalUsersAmount}`;
        displayNumber.innerHTML = '';
        displayNumber.appendChild(countText);
    }

    init() {
        this.addLoadMoreBlock();
        this.countUpdate();
        this.store.subscribe(this.countUpdate);
    }
}
