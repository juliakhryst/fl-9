import { getCurrentUsers } from '../utils/utils';

const mainContainer = document.getElementById('root');

export default class UsersTable {
    constructor(store) {
        this.store = store;
        this.init = this.init.bind(this);
        this.renderUsersItems = this.renderUsersItems.bind(this);
        this.addUsersTable = this.addUsersTable.bind(this);
    }

    addUsersTable() {
        const tableContainer = document.createElement('div');
        const table = document.createElement('table');
        const tableHead = document.createElement('thead');
        const tableBody = document.createElement('tbody');
        const epmtyError = document.createElement('p');

        tableContainer.id = 'table-container';
        table.id = 'user-table';
        tableBody.id = 'user-table-content'
        epmtyError.className = 'empty-list';
        epmtyError.id = 'error';

        const headerTemplate = `<tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Timezone</th>
            <th>Actions</th>
        </tr>`;
        tableHead.innerHTML = headerTemplate;
        

        table.appendChild(tableHead);
        table.appendChild(tableBody);
        tableContainer.appendChild(table);
        tableContainer.appendChild(epmtyError);
        mainContainer.appendChild(tableContainer);
    }

    renderUsersItems() {
        const tableBody = document.getElementById('user-table-content');
        const epmtyError = document.getElementById('error');
        const users = getCurrentUsers(this.store);
        tableBody.innerHTML = '';
        epmtyError.innerHTML = '';

        if (!users.length) {
            tableBody.innerHTML = '';
            epmtyError.innerHTML = 'No users are found!';
            return;
        }

        users.forEach((user) => {
            const userRow = document.createElement('tr');
            const cells = `
                <td><img src="${user.picture}" class="user-img"></td>
                <td>${user.name}</td>
                <td>${user.location}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.timezone}</td>
                <td><button class="delete-btn">Remove</button></td>
            `;
            userRow.innerHTML = cells;

            const deleteButton = userRow.getElementsByClassName('delete-btn')[0];
            deleteButton.addEventListener('click', this.deleteUser.bind(this, user.id));

            tableBody.appendChild(userRow);
        });
    }

    deleteUser(id) {
        this.store.dispatch({
            type: 'REMOVE_USER',
            data: id
        });
    }

    init() {
        this.addUsersTable();
        this.renderUsersItems();

        this.store.subscribe(this.renderUsersItems);
    }
}
