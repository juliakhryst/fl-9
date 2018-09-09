const rootNode = document.getElementById('root');
const mainSection = document.getElementById('main');
const listName = 'todo-items';
const NULL = 0;
const notFoundIndex = -1;

let id = 0;
let isDone;
let description;

function createItem() {
    description = document.getElementById('action-input').value;
    if (!description){
        return;
    }
    document.getElementById('action-input').value = '';
    isDone = false;
    id++;
    return {
        isDone,
        id,
        description
    };
}

function addNew() {
    const todoItems = getFromStorage();
    let newItem = createItem();
    if (!newItem) {
        return;
    }
    const doneItemIndex = todoItems.findIndex(item => item.isDone === true);
    if (doneItemIndex === notFoundIndex) {
        todoItems.push(newItem);
    } else {
        todoItems.splice(doneItemIndex, NULL, newItem);
    }
    setToStorage(todoItems);
    location.hash = '';
}

function discard() {
    location.hash = '';
}

function renderList(itemsArray) {
    const taskList = document.getElementById('task-list');
    if (itemsArray.length) {
        document.getElementById('empty-list').style.display = 'none';
    }
    taskList.innerHTML = '';
    itemsArray.forEach((element, i) => {

        let itemContainer = document.createElement('div');
        itemContainer.id = element.id;
        itemContainer.className = 'item';

        let newCheckbox = document.createElement('input');
        newCheckbox.type = 'checkbox';
        newCheckbox.checked = element.isDone;
        itemContainer.appendChild(newCheckbox);

        let deleteButton = document.createElement('button');
        let icon = document.createElement('i');
        icon.className = 'material-icons';
        icon.appendChild(document.createTextNode('delete'));
        deleteButton.appendChild(icon);

        let textContainer = document.createElement('span');
        textContainer.className = 'description';
        textContainer.appendChild(document.createTextNode(element.description));

        itemContainer.appendChild(textContainer);
        itemContainer.appendChild(deleteButton);
        taskList.appendChild(itemContainer);

        textContainer.onclick = function editHandler(e) {
            location.hash = '#/modify/' + element.id;
            let editInput = document.getElementById('edit-input');
            editInput.value = element.description;
            editInput.setAttribute('data-id', element.id);
        };

        newCheckbox.onclick = function checkHandler(e) {
            element.isDone = true;
            isChecked(i, itemsArray);
            newCheckbox.disabled = true;
        }

        deleteButton.onclick = function deleteHandler(e) {
            deleteItem(i);
        }
    });
}

function editDescription() {
    const todoItems = getFromStorage();
    let newValue = document.getElementById('edit-input').value;
    let itemId = document.getElementById('edit-input').getAttribute('data-id');
    todoItems.forEach(element => {
        if (element.id === +itemId) {
            element.description = newValue;
        }
    });
    setToStorage(todoItems);
    location.hash = '';
}

function isChecked(elementID, items) {
    let current = items[elementID];
    items.splice(elementID, 1);
    items.push(current);
    setToStorage(items);
    renderList(items);
}

function deleteItem(elementID) {
    const todoItems = getFromStorage();
    todoItems.splice(elementID, 1);
    setToStorage(todoItems);
    renderList(todoItems);
}

function getFromStorage() {
    return JSON.parse(window.localStorage.getItem(listName) || '[]');
}

function setToStorage(data) {
    window.localStorage.setItem(listName, JSON.stringify(data));
}

window.addEventListener('load', function () {
    const todoItems = getFromStorage();
    renderList(todoItems);
});

window.addEventListener('hashchange', function (e) {
    const todoItems = getFromStorage();
    let sections = Array.from(document.getElementsByClassName('page-section'));

    sections.forEach(section => {
        section.style.display = location.hash.includes(section.id) ? 'block' : 'none';
    });
    if (!location.hash) {
        sections[NULL].style.display = 'block';
        renderList(todoItems);
    }
});