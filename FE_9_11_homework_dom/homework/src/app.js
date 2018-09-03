let rootNode = document.getElementById('root');
let itemCounter = 0;
const MAX_ITEMS = 10
let addButton;
//let checkboxIcon;

function handleChange(event){
    addButton = document.getElementById('add-button');
    addButton.disabled = !event.target.value;
    console.log(event.target.value);
}

function addItem() {
    let inputValue = document.getElementById('action-input').value;
    if (itemCounter < MAX_ITEMS) {
        let itemContainer = document.createElement('div');
        itemContainer.className = 'item-style';

        let newCheckbox = document.createElement('button');
        //newCheckbox.id = 'check-box';

        let checkboxIcon = document.createElement('i');
        checkboxIcon.className = 'material-icons';
        checkboxIcon.appendChild(document.createTextNode('check_box_outline_blank'));
        newCheckbox.appendChild(checkboxIcon);
        itemContainer.appendChild(newCheckbox);
        itemContainer.appendChild(document.createTextNode(' '+ inputValue));

        let deleteButton = document.createElement('button');
        //deleteButton.id = 'delete-button';
        let icon = document.createElement('i');
        icon.className = 'material-icons';
        icon.appendChild(document.createTextNode('delete'));

        deleteButton.appendChild(icon);
        itemContainer.appendChild(deleteButton);
        rootNode.appendChild(itemContainer);
        itemCounter++;
        //newCheckbox.addEventListener('click', ifChecked);
        //newCheckbox.attachEvent('onclick',ifChecked);
        document.getElementById('action-input').value = '';
        newCheckbox.onclick = function() {
            checkboxIcon.innerText = 'check_box';
            newCheckbox.disabled = true;
        }

        deleteButton.onclick = function() {
            itemCounter--;
            itemContainer.remove();
            document.querySelector('.alert').style.display = 'none' ;
            addButton.disabled = 'false';
            document.getElementById('action-input').disabled = 'false';
        }

    } else {
        document.querySelector('.alert').style.display = 'block' ;
        addButton.disabled = 'true';
        document.getElementById('action-input').disabled = 'true';
        

    }

}
