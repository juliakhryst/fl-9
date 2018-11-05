import './style.scss';
import {createStore} from 'redux';
import users from './data';

import UsersTable from './components/users-table';
import Search from './components/search';
import LoadMore from './components/load-more';

const DEFAULT_NUMBER_PER_PAGE = 5;

const defaultState = {
    users,
    userNumberToShow: DEFAULT_NUMBER_PER_PAGE,
    search: ''
};

function userReducers(state = defaultState, action) {
    switch (action.type) {
    case 'SEARCH':
        return Object.assign({}, state, {
            userNumberToShow: DEFAULT_NUMBER_PER_PAGE,
            search: action.data
        });
    case 'LOAD_USERS':
        return Object.assign({}, state, {
            userNumberToShow: state.userNumberToShow + DEFAULT_NUMBER_PER_PAGE
        });
    case 'REMOVE_USER':
        return Object.assign({}, state, {
            users: state.users.filter((user) => user.id !== action.data)
        });
    default:
        return state;
    }
};

const usersStore = createStore(userReducers);
const search = new Search(usersStore);
const usersList = new UsersTable(usersStore);
const loadMore = new LoadMore(usersStore);

search.init();
usersList.init();
loadMore.init();